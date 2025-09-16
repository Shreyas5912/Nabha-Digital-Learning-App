"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Pause, 
  Download, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  LogOut
} from "lucide-react"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

interface Lesson {
  id: string
  title: string
  content: string
  type: "video" | "text" | "interactive" | "quiz"
  duration: number
  order: number
  isDownloaded: boolean
  progress: number
  completed: boolean
  resources: LessonResource[]
}

interface LessonResource {
  id: string
  title: string
  type: "video" | "pdf" | "image" | "audio" | "document"
  url: string
  size?: number
  isDownloaded: boolean
}

interface QuizQuestion {
  id: string
  question: string
  type: "multiple_choice" | "true_false" | "short_answer" | "fill_in_blank"
  options?: string[]
  correctAnswer: string
  userAnswer?: string
  isCorrect?: boolean
}

export default function LessonViewer({ 
  lesson, 
  onComplete, 
  onNext, 
  onPrevious,
  onDownload 
}: {
  lesson: Lesson
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
  onDownload: () => void
}) {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isOnline, setIsOnline] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Set initial online status
    setIsOnline(navigator.onLine)
    
    // Initialize quiz questions if lesson type is quiz
    if (lesson.type === 'quiz') {
      const mockQuestions: QuizQuestion[] = [
        {
          id: "1",
          question: "What is the most important safety rule when using the internet?",
          type: "multiple_choice",
          options: [
            "Share personal information freely",
            "Keep personal information private",
            "Download everything you see",
            "Talk to strangers online"
          ],
          correctAnswer: "Keep personal information private"
        },
        {
          id: "2",
          question: "A strong password should include letters, numbers, and symbols.",
          type: "true_false",
          correctAnswer: "true"
        },
        {
          id: "3",
          question: "What should you do if you receive a suspicious email?",
          type: "short_answer",
          correctAnswer: "Do not click on links and report it"
        }
      ]
      setQuizQuestions(mockQuestions)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [lesson.type])

  const handleDownload = () => {
    onDownload()
  }

  const handleQuizAnswer = (answer: string) => {
    const updatedQuestions = [...quizQuestions]
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      userAnswer: answer,
      isCorrect: answer.toLowerCase() === updatedQuestions[currentQuestion].correctAnswer.toLowerCase()
    }
    setQuizQuestions(updatedQuestions)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      const score = quizQuestions.filter(q => q.isCorrect).length
      alert(`Quiz completed! You scored ${score} out of ${quizQuestions.length}`)
      setShowQuiz(false)
      onComplete()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleLogout = () => {
    // Clear any user session data and redirect to home
    if (typeof window !== 'undefined') {
      // Clear any localStorage or session data if needed
      localStorage.clear()
      sessionStorage.clear()
    }
    router.push('/')
  }

  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
              {isPlaying ? (
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => setIsPlaying(false)}
                  className="text-white hover:text-white/80"
                >
                  <Pause className="h-12 w-12" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => setIsPlaying(true)}
                  className="text-white hover:text-white/80"
                >
                  <Play className="h-12 w-12" />
                </Button>
              )}
              
              {/* Video progress bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-xs">{formatTime(currentTime)}</span>
                  <Progress value={(currentTime / (lesson.duration * 60)) * 100} className="flex-1" />
                  <span className="text-white text-xs">{formatTime(lesson.duration * 60)}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-white/80"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Video Transcript</h3>
              <p className="text-gray-700">{lesson.content}</p>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed">
                {lesson.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )

      case 'interactive':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Interactive Activity</h3>
              <p className="text-gray-700 mb-4">{lesson.content}</p>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-medium mb-2">Try it yourself:</h4>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Type your answer here..." 
                      className="w-full p-2 border rounded-md"
                    />
                    <Button className="w-full">Submit Answer</Button>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-green-800">Great job!</h4>
                  <p className="text-green-700 text-sm">
                    You're learning how to interact with digital content. This skill will help you use computers and websites more effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'quiz':
        return (
          <div className="space-y-6">
            {!showQuiz ? (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Lesson Quiz</h3>
                <p className="text-gray-700 mb-4">{lesson.content}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <HelpCircle className="h-4 w-4" />
                      <span>{quizQuestions.length} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} minutes</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowQuiz(true)}
                    className="w-full"
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      Progress: {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                    </div>
                  </div>
                  
                  <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mb-6" />
                  
                  <h3 className="text-lg font-semibold mb-4">
                    {quizQuestions[currentQuestion]?.question}
                  </h3>
                  
                  {quizQuestions[currentQuestion]?.type === 'multiple_choice' && (
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion]?.options?.map((option, index) => (
                        <Button
                          key={index}
                          variant={quizQuestions[currentQuestion]?.userAnswer === option ? "default" : "outline"}
                          className="w-full justify-start text-left"
                          onClick={() => handleQuizAnswer(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {quizQuestions[currentQuestion]?.type === 'true_false' && (
                    <div className="space-y-2">
                      <Button
                        variant={quizQuestions[currentQuestion]?.userAnswer === 'true' ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleQuizAnswer('true')}
                      >
                        True
                      </Button>
                      <Button
                        variant={quizQuestions[currentQuestion]?.userAnswer === 'false' ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleQuizAnswer('false')}
                      >
                        False
                      </Button>
                    </div>
                  )}
                  
                  {quizQuestions[currentQuestion]?.type === 'short_answer' && (
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-3 border rounded-md"
                        rows={3}
                        placeholder="Type your answer here..."
                        value={quizQuestions[currentQuestion]?.userAnswer || ''}
                        onChange={(e) => handleQuizAnswer(e.target.value)}
                      />
                    </div>
                  )}
                  
                  {quizQuestions[currentQuestion]?.userAnswer && (
                    <Button 
                      onClick={handleNextQuestion}
                      className="w-full mt-4"
                    >
                      {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      default:
        return <div>Unknown lesson type</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onPrevious}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{lesson.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="outline">{lesson.type}</Badge>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{lesson.duration} min</span>
                  </div>
                  {isOnline ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Wifi className="h-3 w-3" />
                      <span>Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <WifiOff className="h-3 w-3" />
                      <span>Offline</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
              {lesson.isDownloaded ? (
                <Badge variant="outline" className="text-green-600">
                  <Download className="h-3 w-3 mr-1" />
                  Downloaded
                </Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
              
              {lesson.completed && (
                <Badge variant="outline" className="text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Lesson Progress</span>
            <span>{lesson.progress}%</span>
          </div>
          <Progress value={lesson.progress} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            {renderLessonContent()}
          </div>
        </div>

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Additional Resources</span>
              </CardTitle>
              <CardDescription>
                Download these materials to help with your learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{resource.title}</div>
                        <div className="text-xs text-gray-500">
                          {resource.type.toUpperCase()} • {formatFileSize(resource.size)}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      {resource.isDownloaded ? 'View' : 'Download'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>
          
          <div className="flex space-x-2">
            {!lesson.completed && (
              <Button variant="outline" onClick={onComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            )}
            <Button onClick={onNext}>
              Next Lesson
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}