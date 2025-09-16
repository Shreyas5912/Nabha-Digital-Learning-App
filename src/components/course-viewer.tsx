"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Play, 
  ArrowLeft,
  Users,
  Star,
  FileText,
  Video,
  HelpCircle,
  MousePointer,
  LogOut
} from "lucide-react"
import LessonViewer from "./lesson-viewer"
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
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  language: string
  progress: number
  totalLessons: number
  completedLessons: number
  totalDuration: number
  rating: number
  lessons: Lesson[]
}

export default function CourseViewer({ 
  course, 
  onBack 
}: {
  course: Course
  onBack: () => void
}) {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showLesson, setShowLesson] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const currentLesson = course.lessons[currentLessonIndex]

  const handleLessonClick = (index: number) => {
    setCurrentLessonIndex(index)
    setShowLesson(true)
  }

  const handleLessonComplete = () => {
    // Update lesson completion status
    const updatedLessons = [...course.lessons]
    updatedLessons[currentLessonIndex] = {
      ...updatedLessons[currentLessonIndex],
      completed: true,
      progress: 100
    }
    
    // Update course progress
    const completedLessons = updatedLessons.filter(l => l.completed).length
    const newProgress = Math.round((completedLessons / course.totalLessons) * 100)
    
    // In a real app, this would update the backend
    console.log("Lesson completed, new progress:", newProgress)
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    } else {
      // Course completed
      setShowLesson(false)
      setActiveTab("overview")
    }
  }

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    } else {
      setShowLesson(false)
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'text': return <FileText className="h-4 w-4" />
      case 'interactive': return <MousePointer className="h-4 w-4" />
      case 'quiz': return <HelpCircle className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
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

  if (showLesson && currentLesson) {
    return (
      <LessonViewer
        lesson={currentLesson}
        onComplete={handleLessonComplete}
        onNext={handleNextLesson}
        onPrevious={handlePreviousLesson}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Courses
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{course.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                  <span>{course.category}</span>
                  <span>{course.language}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Course Progress</h2>
              <p className="text-gray-600">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{course.progress}%</div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{course.totalDuration} minutes total</span>
              </div>
            </div>
          </div>
          <Progress value={course.progress} className="mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">{course.totalLessons} Lessons</div>
                <div className="text-sm text-gray-600">
                  {course.totalLessons - course.completedLessons} remaining
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium">{course.completedLessons} Completed</div>
                <div className="text-sm text-gray-600">
                  {Math.round((course.completedLessons / course.totalLessons) * 100)}% completion rate
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <div className="font-medium">{course.rating}/5.0</div>
                <div className="text-sm text-gray-600">Course rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">What you'll learn:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Fundamental computer operations and terminology</li>
                          <li>• Essential internet safety practices</li>
                          <li>• Basic software usage and troubleshooting</li>
                          <li>• Digital communication skills</li>
                          <li>• Online research and information evaluation</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Basic reading and writing skills</li>
                          <li>• Access to a computer or mobile device</li>
                          <li>• Internet connection (for downloading content)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Difficulty</span>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Language</span>
                      <span className="text-sm font-medium">{course.language}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm font-medium">{course.totalDuration} minutes</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lessons</span>
                      <span className="text-sm font-medium">{course.totalLessons}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        const firstIncompleteLesson = course.lessons.findIndex(l => !l.completed)
                        if (firstIncompleteLesson !== -1) {
                          setCurrentLessonIndex(firstIncompleteLesson)
                          setShowLesson(true)
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Lessons</CardTitle>
                <CardDescription>
                  Click on any lesson to start learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        lesson.completed ? 'bg-green-50 border-green-200' : ''
                      }`}
                      onClick={() => handleLessonClick(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getLessonIcon(lesson.type)}
                        </div>
                        <div>
                          <div className="font-medium flex items-center space-x-2">
                            <span>{lesson.title}</span>
                            {lesson.completed && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center space-x-2">
                            <span className="capitalize">{lesson.type}</span>
                            <span>•</span>
                            <span>{lesson.duration} min</span>
                            <span>•</span>
                            <span>{lesson.progress}% complete</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          {lesson.completed ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
                <CardDescription>
                  Additional materials to support your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Course Guide PDF</div>
                        <div className="text-sm text-gray-500">Complete course overview • 2.3 MB</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Practice Videos</div>
                        <div className="text-sm text-gray-500">Video tutorials • 156 MB</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Exercise Worksheets</div>
                        <div className="text-sm text-gray-500">Practice activities • 1.8 MB</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Glossary of Terms</div>
                        <div className="text-sm text-gray-500">Technical terms explained • 890 KB</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}