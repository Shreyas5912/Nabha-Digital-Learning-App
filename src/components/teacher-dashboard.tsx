"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award, 
  Calendar,
  Plus,
  Eye,
  Download,
  BarChart3,
  LogOut
} from "lucide-react"
import LanguageSelector from "./language-selector"
import CourseAnalytics from "./course-analytics"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

interface Student {
  id: string
  name: string
  email: string
  class: string
  totalHours: number
  completedCourses: number
  currentStreak: number
  lastActive: string
  progress: number
}

interface CourseStats {
  id: string
  title: string
  totalStudents: number
  averageProgress: number
  completionRate: number
  activeStudents: number
}

interface ClassOverview {
  totalStudents: number
  activeToday: number
  averageProgress: number
  totalHoursThisWeek: number
}

export default function TeacherDashboard() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [students, setStudents] = useState<Student[]>([])
  const [courseStats, setCourseStats] = useState<CourseStats[]>([])
  const [classOverview, setClassOverview] = useState<ClassOverview>({
    totalStudents: 0,
    activeToday: 0,
    averageProgress: 0,
    totalHoursThisWeek: 0
  })
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockStudents: Student[] = [
      {
        id: "1",
        name: "Raj Kumar",
        email: "raj.kumar@school.edu",
        class: "10th A",
        totalHours: 24,
        completedCourses: 2,
        currentStreak: 7,
        lastActive: "2 hours ago",
        progress: 78
      },
      {
        id: "2",
        name: "Priya Singh",
        email: "priya.singh@school.edu",
        class: "10th A",
        totalHours: 18,
        completedCourses: 1,
        currentStreak: 5,
        lastActive: "1 day ago",
        progress: 65
      },
      {
        id: "3",
        name: "Amit Patel",
        email: "amit.patel@school.edu",
        class: "10th B",
        totalHours: 32,
        completedCourses: 3,
        currentStreak: 12,
        lastActive: "30 minutes ago",
        progress: 85
      },
      {
        id: "4",
        name: "Sunita Devi",
        email: "sunita.devi@school.edu",
        class: "10th B",
        totalHours: 15,
        completedCourses: 1,
        currentStreak: 3,
        lastActive: "3 days ago",
        progress: 45
      },
      {
        id: "5",
        name: "Vikram Sharma",
        email: "vikram.sharma@school.edu",
        class: "10th A",
        totalHours: 28,
        completedCourses: 2,
        currentStreak: 8,
        lastActive: "1 hour ago",
        progress: 72
      }
    ]

    const mockCourseStats: CourseStats[] = [
      {
        id: "1",
        title: "Computer Basics",
        totalStudents: 45,
        averageProgress: 68,
        completionRate: 35,
        activeStudents: 32
      },
      {
        id: "2",
        title: "Internet Safety",
        totalStudents: 38,
        averageProgress: 45,
        completionRate: 20,
        activeStudents: 28
      },
      {
        id: "3",
        title: "Microsoft Office",
        totalStudents: 25,
        averageProgress: 32,
        completionRate: 12,
        activeStudents: 18
      }
    ]

    const mockClassOverview: ClassOverview = {
      totalStudents: 52,
      activeToday: 18,
      averageProgress: 61,
      totalHoursThisWeek: 124
    }

    setStudents(mockStudents)
    setCourseStats(mockCourseStats)
    setClassOverview(mockClassOverview)
  }, [])

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return "text-green-600"
    if (streak >= 3) return "text-yellow-600"
    return "text-red-600"
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

  const handleDetailsClick = (courseId: string) => {
    setSelectedCourseId(courseId)
    setShowAnalytics(true)
  }

  const handleBackFromAnalytics = () => {
    setShowAnalytics(false)
    setSelectedCourseId(null)
  }

  // Show analytics if a course is selected
  if (showAnalytics && selectedCourseId) {
    return <CourseAnalytics courseId={selectedCourseId} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>← Back</Button>
              <h1 className="text-xl font-bold text-gray-900">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">T</span>
                </div>
                <span className="text-sm font-medium">Teacher</span>
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
        {/* Class Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.totalStudents}</div>
              <p className="text-xs text-muted-foreground">{classOverview.activeToday} active today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.averageProgress}%</div>
              <Progress value={classOverview.averageProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classOverview.totalHoursThisWeek}h</div>
              <p className="text-xs text-muted-foreground">Total learning time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(courseStats.reduce((acc, course) => acc + course.completionRate, 0) / courseStats.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Average completion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="create">Create Content</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
                <CardDescription>
                  Monitor individual student progress and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Streak</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={student.progress} className="w-16" />
                            <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                              {student.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{student.totalHours}h</TableCell>
                        <TableCell>{student.completedCourses}</TableCell>
                        <TableCell>
                          <span className={`text-sm font-medium ${getStreakColor(student.currentStreak)}`}>
                            {student.currentStreak} days
                          </span>
                        </TableCell>
                        <TableCell>{student.lastActive}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courseStats.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {course.title}
                      <Badge variant="outline">{course.totalStudents} students</Badge>
                    </CardTitle>
                    <CardDescription>
                      Course performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Progress</span>
                        <span>{course.averageProgress}%</span>
                      </div>
                      <Progress value={course.averageProgress} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Completion Rate</span>
                        <span>{course.completionRate}%</span>
                      </div>
                      <Progress value={course.completionRate} />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          {course.activeStudents} active students
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDetailsClick(course.id)}>
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Performance</CardTitle>
                  <CardDescription>
                    Overall class metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Analytics charts would be displayed here
                      </p>
                      <p className="text-sm text-gray-500">
                        Showing progress trends, engagement metrics, and completion rates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>
                    Students with highest engagement and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students
                      .sort((a, b) => b.progress - a.progress)
                      .slice(0, 5)
                      .map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.class}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{student.progress}%</div>
                            <div className="text-sm text-gray-500">{student.totalHours}h</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>New Course</span>
                  </CardTitle>
                  <CardDescription>
                    Create a new course with lessons and quizzes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Create Course</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>New Lesson</span>
                  </CardTitle>
                  <CardDescription>
                    Add interactive lessons to existing courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Create Lesson</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Import Content</span>
                  </CardTitle>
                  <CardDescription>
                    Import existing learning materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Import Content</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest student activities and course updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">5 students completed "Computer Basics"</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">New enrollment in "Internet Safety"</div>
                      <div className="text-xs text-gray-500">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Course "Microsoft Office" updated</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
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