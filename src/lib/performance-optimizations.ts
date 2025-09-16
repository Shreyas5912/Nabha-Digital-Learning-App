/**
 * Performance Optimizations for Low-End Devices and Poor Connectivity
 * 
 * This file contains utilities and configurations specifically designed to optimize
 * the Nabha Digital Learning platform for rural areas with limited infrastructure.
 */

// Configuration for performance optimizations
export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: 0.7,
  IMAGE_SIZES: [320, 640, 1024],
  LAZY_LOADING_THRESHOLD: '200px',
  
  // Network optimization
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 hours
  OFFLINE_CACHE_SIZE: 100 * 1024 * 1024, // 100MB
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  
  // Performance optimization
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  BATCH_SIZE: 50,
  
  // Memory optimization
  MAX_CACHED_ITEMS: 100,
  CLEANUP_INTERVAL: 5 * 60 * 1000, // 5 minutes
}

// Utility functions for performance optimization
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer
  private cache: Map<string, { data: any; timestamp: number; size: number }> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  private constructor() {
    this.startCleanupInterval()
  }

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer()
    }
    return PerformanceOptimizer.instance
  }

  // Cache management
  setCache(key: string, data: any, size: number = 1): void {
    const now = Date.now()
    
    // Remove oldest items if cache is full
    if (this.cache.size >= PERFORMANCE_CONFIG.MAX_CACHED_ITEMS) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, { data, timestamp: now, size })
  }

  getCache(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    // Check if cache is expired
    if (Date.now() - item.timestamp > PERFORMANCE_CONFIG.CACHE_TTL) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clearCache(): void {
    this.cache.clear()
  }

  // Cleanup expired cache items
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now()
      for (const [key, item] of this.cache.entries()) {
        if (now - item.timestamp > PERFORMANCE_CONFIG.CACHE_TTL) {
          this.cache.delete(key)
        }
      }
    }, PERFORMANCE_CONFIG.CLEANUP_INTERVAL)
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.clearCache()
  }
}

// Network utilities for poor connectivity
export class NetworkOptimizer {
  private static retryCount = 0
  private static isOnline = navigator.onLine

  static init(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true
      this.retryCount = 0
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  static async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    maxRetries: number = PERFORMANCE_CONFIG.MAX_RETRIES
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(PERFORMANCE_CONFIG.REQUEST_TIMEOUT)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      this.retryCount = 0
      return response
    } catch (error) {
      if (this.retryCount < maxRetries && !this.isOnline) {
        this.retryCount++
        await this.delay(Math.pow(2, this.retryCount) * 1000) // Exponential backoff
        return this.fetchWithRetry(url, options, maxRetries)
      }
      throw error
    }
  }

  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static isOnline(): boolean {
    return this.isOnline
  }
}

// Image optimization utilities
export class ImageOptimizer {
  static generateSrcSet(src: string, widths: number[] = PERFORMANCE_CONFIG.IMAGE_SIZES): string {
    return widths
      .map(width => `${src}?w=${width} ${width}w`)
      .join(', ')
  }

  static generateSizes(): string {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }

  static getOptimizedImageUrl(src: string, width?: number): string {
    const params = new URLSearchParams()
    params.set('q', PERFORMANCE_CONFIG.IMAGE_QUALITY.toString())
    if (width) {
      params.set('w', width.toString())
    }
    return `${src}?${params.toString()}`
  }
}

// Memory optimization utilities
export class MemoryOptimizer {
  private static observers: IntersectionObserver[] = []

  static createLazyObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    const observer = new IntersectionObserver(callback, {
      rootMargin: PERFORMANCE_CONFIG.LAZY_LOADING_THRESHOLD,
      ...options
    })

    this.observers.push(observer)
    return observer
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map()

  static measureTime(key: string, startTime: number): void {
    const endTime = performance.now()
    const duration = endTime - startTime

    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }

    this.metrics.get(key)!.push(duration)

    // Keep only last 100 measurements
    const measurements = this.metrics.get(key)!
    if (measurements.length > 100) {
      measurements.shift()
    }
  }

  static getAverageTime(key: string): number {
    const measurements = this.metrics.get(key)
    if (!measurements || measurements.length === 0) return 0

    const sum = measurements.reduce((acc, val) => acc + val, 0)
    return sum / measurements.length
  }

  static getMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {}
    
    for (const [key, measurements] of this.metrics.entries()) {
      const sum = measurements.reduce((acc, val) => acc + val, 0)
      result[key] = {
        average: sum / measurements.length,
        count: measurements.length
      }
    }

    return result
  }

  static clearMetrics(): void {
    this.metrics.clear()
  }
}

// Debounce and throttle utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = PERFORMANCE_CONFIG.DEBOUNCE_DELAY
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = PERFORMANCE_CONFIG.THROTTLE_DELAY
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Batch processing utilities
export class BatchProcessor {
  private queue: any[] = []
  private processing = false

  constructor(
    private processor: (items: any[]) => Promise<void>,
    private batchSize: number = PERFORMANCE_CONFIG.BATCH_SIZE
  ) {}

  async add(item: any): Promise<void> {
    this.queue.push(item)
    
    if (!this.processing) {
      this.processQueue()
    }
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length === 0) {
      this.processing = false
      return
    }

    this.processing = true

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.batchSize)
      try {
        await this.processor(batch)
      } catch (error) {
        console.error('Batch processing error:', error)
      }
    }

    this.processing = false
  }

  clear(): void {
    this.queue = []
    this.processing = false
  }
}

// Initialize performance optimizations
export function initializePerformanceOptimizations(): void {
  // Initialize network optimizer
  NetworkOptimizer.init()

  // Set up performance monitoring
  if (typeof window !== 'undefined') {
    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        PerformanceMonitor.measureTime('pageLoad', navigation.loadEventEnd - navigation.fetchStart)
      }
    })

    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          PerformanceMonitor.measureTime('resourceLoad', entry.duration)
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    PerformanceOptimizer.getInstance().destroy()
    MemoryOptimizer.cleanup()
  })
}

// Export utilities for use in components
export const usePerformance = () => {
  const measureTime = (key: string) => {
    const startTime = performance.now()
    return () => PerformanceMonitor.measureTime(key, startTime)
  }

  return {
    measureTime,
    getMetrics: PerformanceMonitor.getMetrics,
    isOnline: NetworkOptimizer.isOnline,
    debounce,
    throttle
  }
}

// Service worker registration for offline support
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }
}