"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Star, TrendingUp, Award, Calendar, Monitor, LogOut, HelpCircle, CheckCircle, Trophy, Play } from "lucide-react"
import CourseViewer from "./course-viewer"
import DigitalLiteracyModule from "./digital-literacy-module"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  language: string
  progress: number
  enrolledAt: string
  totalLessons: number
  completedLessons: number
  rating: number
  lessons: Lesson[]
  totalDuration: number
}

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

interface ProgressData {
  totalHours: number
  completedCourses: number
  currentStreak: number
  weeklyProgress: number
}

export default function StudentDashboard() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [progressData, setProgressData] = useState<ProgressData>({
    totalHours: 0,
    completedCourses: 0,
    currentStreak: 0,
    weeklyProgress: 0
  })
  const [showCourse, setShowCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showDigitalLiteracy, setShowDigitalLiteracy] = useState(false)

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Computer Basics",
        description: "Learn fundamental computer operations and terminology including hardware, software, and basic troubleshooting. Perfect for beginners who want to build a strong foundation in digital literacy.",
        category: "Digital Literacy",
        difficulty: "Beginner",
        language: "ਪੰਜਾਬੀ",
        progress: 75,
        enrolledAt: "2024-01-15",
        totalLessons: 12,
        completedLessons: 9,
        rating: 4.8,
        totalDuration: 180,
        lessons: [
          {
            id: "1-1",
            title: "Introduction to Computers",
            content: "Computers are electronic devices that process data and perform tasks. They consist of hardware (physical parts) and software (programs). Understanding these basics is your first step to digital literacy.",
            type: "text",
            duration: 15,
            order: 1,
      
            progress: 100,
            completed: true,
            resources: [
              {
                id: "r1",
                title: "Computer Parts Diagram",
                type: "image",
                url: "/images/computer-parts.png",
                size: 512000
              }
            ]
          },
          {
            id: "1-2",
            title: "Hardware vs Software",
            content: "Hardware refers to the physical parts of a computer you can touch, like the keyboard, mouse, and monitor. Software includes programs and operating systems that tell the hardware what to do.",
            type: "video",
            duration: 20,
            order: 2,
      
            progress: 100,
            completed: true,
            resources: []
          },
          {
            id: "1-3",
            title: "Basic Computer Operations",
            content: "Let's practice what we've learned! This interactive lesson will guide you through basic computer operations like starting up, using the mouse, and opening programs.",
            type: "interactive",
            duration: 25,
            order: 3,
      
            progress: 100,
            completed: true,
            resources: []
          },
          {
            id: "1-4",
            title: "Quiz: Computer Basics",
            content: "Test your knowledge of computer fundamentals with this quiz. Covering hardware, software, and basic operations.",
            type: "quiz",
            duration: 10,
            order: 4,
      
            progress: 0,
            completed: false,
            resources: []
          }
        ]
      },
      {
        id: "2",
        title: "Internet Safety",
        description: "Stay safe online with essential cybersecurity knowledge. Learn about password security, phishing scams, and safe browsing practices.",
        category: "Digital Literacy",
        difficulty: "Beginner",
        language: "हिंदी",
        progress: 40,
        enrolledAt: "2024-01-20",
        totalLessons: 8,
        completedLessons: 3,
  
        rating: 4.6,
        totalDuration: 120,
        lessons: [
          {
            id: "2-1",
            title: "Introduction to Internet Safety",
            content: "The internet is a powerful tool, but it's important to use it safely. This lesson covers the basics of online safety and why it matters.",
            type: "text",
            duration: 15,
            order: 1,
      
            progress: 100,
            completed: true,
            resources: []
          }
        ]
      },
      {
        id: "3",
        title: "Microsoft Office",
        description: "Master Word, Excel, and PowerPoint for school and work. Create documents, spreadsheets, and presentations like a pro.",
        category: "Computer Skills",
        difficulty: "Intermediate",
        language: "English",
        progress: 20,
        enrolledAt: "2024-02-01",
        totalLessons: 15,
        completedLessons: 3,
  
        rating: 4.7,
        totalDuration: 240,
        lessons: [
          {
            id: "3-1",
            title: "Introduction to Microsoft Word",
            content: "Microsoft Word is a word processing program used to create documents. Learn the interface and basic text formatting.",
            type: "video",
            duration: 20,
            order: 1,
      
            progress: 100,
            completed: true,
            resources: []
          }
        ]
      }
    ]

    const mockProgress: ProgressData = {
      totalHours: 24,
      completedCourses: 1,
      currentStreak: 7,
      weeklyProgress: 65
    }

    setCourses(mockCourses)
    setProgressData(mockProgress)
  }, [])

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    setShowCourse(true)
  }

  const handleBackToDashboard = () => {
    setShowCourse(false)
    setSelectedCourse(null)
  }

  const handleDigitalLiteracyClick = () => {
    setShowDigitalLiteracy(true)
  }

  const handleBackFromDigitalLiteracy = () => {
    setShowDigitalLiteracy(false)
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // Show course viewer if a course is selected
  if (showCourse && selectedCourse) {
    return (
      <CourseViewer 
        course={selectedCourse} 
        onBack={handleBackToDashboard}
      />
    )
  }

  // Show digital literacy module if selected
  if (showDigitalLiteracy) {
    return (
      <DigitalLiteracyModule 
        onBack={handleBackFromDigitalLiteracy}
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
              <Button variant="outline" size="sm" onClick={() => router.back()}>← Back</Button>
              <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">S</span>
                </div>
                <span className="text-sm font-medium">Student</span>
              </div>
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
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.totalHours}h</div>
              <p className="text-xs text-muted-foreground">Total time spent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.completedCourses}</div>
              <p className="text-xs text-muted-foreground">Out of {courses.length} enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.currentStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressData.weeklyProgress}%</div>
              <Progress value={progressData.weeklyProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="my-courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="digital-literacy">Student Library</TabsTrigger>
            <TabsTrigger value="monthly-quiz">Monthly Quiz</TabsTrigger>
            <TabsTrigger value="class-toppers">Class Toppers</TabsTrigger>
          </TabsList>

          <TabsContent value="my-courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course)}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{course.category}</span>
                      <span>{course.language}</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div className="flex items-center justify-end gap-4">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {course.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="digital-literacy" className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Student Library</h3>
                  <p className="text-blue-100">
                    Access comprehensive learning resources and digital materials curated for rural students
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Monitor className="h-8 w-8" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDigitalLiteracyClick}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <CardTitle>Computer Basics</CardTitle>
                  <CardDescription>
                    Learn fundamental computer operations, hardware, software, and troubleshooting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">12 lessons</Badge>
                    <Button size="sm">Start Learning</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDigitalLiteracyClick}>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <CardTitle>Internet Safety</CardTitle>
                  <CardDescription>
                    Essential cybersecurity practices, password management, and safe browsing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">8 lessons</Badge>
                    <Button size="sm">Start Learning</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDigitalLiteracyClick}>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle>Document Processing</CardTitle>
                  <CardDescription>
                    Create, edit, and format documents using word processors and spreadsheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">14 lessons</Badge>
                    <Button size="sm">Start Learning</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Why Student Library Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">For Education</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Access online learning resources</li>
                      <li>• Complete digital assignments</li>
                      <li>• Research and information gathering</li>
                      <li>• Collaboration with peers online</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">For Future Opportunities</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Job readiness and employability</li>
                      <li>• Higher education opportunities</li>
                      <li>• Entrepreneurship skills</li>
                      <li>• Global connectivity and communication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">More Courses Coming Soon</h3>
              <p className="text-gray-600">
                We're adding new courses regularly. Check back for more digital literacy content!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="monthly-quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5" />
                  Monthly Quiz Challenge
                </CardTitle>
                <CardDescription>
                  Test your knowledge and compete with classmates in our monthly quiz competition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">November 2024 Quiz</h3>
                      <p className="text-purple-100">
                        Digital Literacy and Internet Safety
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">30 minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HelpCircle className="h-4 w-4" />
                          <span className="text-sm">25 questions</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <Award className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quiz Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Computer Basics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Internet Safety</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Digital Communication</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Information Literacy</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 font-bold text-sm">1</span>
                          </div>
                          <div>
                            <div className="font-medium">Certificate of Excellence</div>
                            <div className="text-sm text-gray-600">Top performer recognition</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-sm">2</span>
                          </div>
                          <div>
                            <div className="font-medium">Digital Badge</div>
                            <div className="text-sm text-gray-600">Shareable achievement</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-sm">3</span>
                          </div>
                          <div>
                            <div className="font-medium">Progress Points</div>
                            <div className="text-sm text-gray-600">Bonus learning points</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Start Monthly Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="class-toppers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    This Month's Top Performers
                  </CardTitle>
                  <CardDescription>
                    Students who excelled in the monthly quiz competition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <div className="font-semibold">Priya Sharma</div>
                          <div className="text-sm text-gray-600">Class 10A • 95% score</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <div className="font-semibold">Rahul Kumar</div>
                          <div className="text-sm text-gray-600">Class 10B • 92% score</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <div className="font-semibold">Anita Singh</div>
                          <div className="text-sm text-gray-600">Class 10A • 88% score</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">4</span>
                        </div>
                        <div>
                          <div className="font-medium">Vikram Patel</div>
                          <div className="text-sm text-gray-600">Class 10B • 85% score</div>
                        </div>
                      </div>
                      <Badge variant="outline">Excellent</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">5</span>
                        </div>
                        <div>
                          <div className="font-medium">Sunita Devi</div>
                          <div className="text-sm text-gray-600">Class 10A • 82% score</div>
                        </div>
                      </div>
                      <Badge variant="outline">Great Job</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    Achievement Hall of Fame
                  </CardTitle>
                  <CardDescription>
                    All-time top performers in digital literacy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Quiz Champion</h3>
                      <p className="text-gray-600">Priya Sharma</p>
                      <p className="text-sm text-gray-500">3 consecutive monthly wins</p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Recent Achievements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Rahul Kumar - Perfect Score</span>
                          <span className="text-gray-500">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Anita Singh - Speed Champion</span>
                          <span className="text-gray-500">1 week ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Vikram Patel - Most Improved</span>
                          <span className="text-gray-500">2 weeks ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-blue-800">Your Position</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600">Current Rank: #12</span>
                        <span className="text-sm text-blue-600">78% average score</span>
                      </div>
                      <div className="mt-2">
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}