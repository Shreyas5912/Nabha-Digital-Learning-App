import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";
import { initializePerformanceOptimizations, registerServiceWorker } from "@/lib/performance-optimizations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nabha Digital Learning - Digital Education for Rural Students",
  description: "Empowering rural students in Nabha with digital literacy skills and quality education. Offline learning platform with courses in Punjabi, Hindi, and English.",
  keywords: ["Nabha Digital Learning", "Digital Literacy", "Rural Education", "Punjab Education", "Offline Learning", "Digital Skills"],
  authors: [{ name: "Government of Punjab, Department of Higher Education" }],
  openGraph: {
    title: "Nabha Digital Learning",
    description: "Digital education platform for rural students in Nabha, Punjab",
    url: "https://nabha-digital-learning.example.com",
    siteName: "Nabha Digital Learning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabha Digital Learning",
    description: "Digital education platform for rural students in Nabha, Punjab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
        
        {/* Initialize performance optimizations */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance optimizations
              if (typeof window !== 'undefined') {
                // Register service worker for offline support
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('SW registered: ', registration);
                  }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                  });
                }
                
                // Initialize performance monitoring
                console.log('Performance optimizations initialized');
              }
            `
          }}
        />
      </body>
    </html>
  );
}
