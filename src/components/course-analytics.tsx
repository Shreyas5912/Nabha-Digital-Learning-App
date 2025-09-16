"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award,
  Calendar,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AnalyticsData {
  courseTitle: string
  totalStudents: number
  averageAttendance: number
  averageProgress: number
  completionRate: number
  recentExamScores: {
    examName: string
    averageScore: number
    highestScore: number
    lowestScore: number
    date: string
  }[]
  weeklyAttendance: {
    week: string
    attendance: number
  }[]
  studentPerformance: {
    id: string
    name: string
    class: string
    attendance: number
    progress: number
    lastExamScore: number
  }[]
  courseProgress: {
    completedLessons: number
    totalLessons: number
    remainingLessons: number
    estimatedCompletionDate: string
  }
}

export default function CourseAnalytics({ courseId }: { courseId: string }) {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    // Mock analytics data based on course ID
    const mockAnalytics: AnalyticsData = {
      courseTitle: courseId === "1" ? "Computer Basics" : courseId === "2" ? "Internet Safety" : "Microsoft Office",
      totalStudents: courseId === "1" ? 45 : courseId === "2" ? 38 : 25,
      averageAttendance: courseId === "1" ? 87 : courseId === "2" ? 78 : 82,
      averageProgress: courseId === "1" ? 68 : courseId === "2" ? 45 : 32,
      completionRate: courseId === "1" ? 35 : courseId === "2" ? 20 : 12,
      recentExamScores: [
        {
          examName: "Mid-term Assessment",
          averageScore: courseId === "1" ? 78 : courseId === "2" ? 72 : 75,
          highestScore: 95,
          lowestScore: 45,
          date: "2024-02-15"
        },
        {
          examName: "Quiz 1",
          averageScore: courseId === "1" ? 85 : courseId === "2" ? 80 : 82,
          highestScore: 100,
          lowestScore: 60,
          date: "2024-01-28"
        }
      ],
      weeklyAttendance: [
        { week: "Week 1", attendance: 92 },
        { week: "Week 2", attendance: 88 },
        { week: "Week 3", attendance: 85 },
        { week: "Week 4", attendance: 87 },
        { week: "Week 5", attendance: 83 }
      ],
      studentPerformance: [
        {
          id: "1",
          name: "Raj Kumar",
          class: "10th A",
          attendance: 95,
          progress: 78,
          lastExamScore: 85
        },
        {
          id: "2",
          name: "Priya Singh",
          class: "10th A",
          attendance: 82,
          progress: 65,
          lastExamScore: 72
        },
        {
          id: "3",
          name: "Amit Patel",
          class: "10th B",
          attendance: 90,
          progress: 85,
          lastExamScore: 92
        },
        {
          id: "4",
          name: "Sunita Devi",
          class: "10th B",
          attendance: 75,
          progress: 45,
          lastExamScore: 58
        },
        {
          id: "5",
          name: "Vikram Sharma",
          class: "10th A",
          attendance: 88,
          progress: 72,
          lastExamScore: 78
        }
      ],
      courseProgress: {
        completedLessons: courseId === "1" ? 8 : courseId === "2" ? 6 : 4,
        totalLessons: courseId === "1" ? 12 : courseId === "2" ? 8 : 15,
        remainingLessons: courseId === "1" ? 4 : courseId === "2" ? 2 : 11,
        estimatedCompletionDate: "2024-03-30"
      }
    }

    setAnalytics(mockAnalytics)
  }, [courseId])

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Course Analytics - {analytics.courseTitle}</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled in course</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getAttendanceColor(analytics.averageAttendance)}`}>
                {analytics.averageAttendance}%
              </div>
              <Progress value={analytics.averageAttendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageProgress}%</div>
              <Progress value={analytics.averageProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.completionRate}%</div>
              <Progress value={analytics.completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="progress">Course Progress</TabsTrigger>
            <TabsTrigger value="exams">Exam Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Attendance Trend</CardTitle>
                  <CardDescription>
                    Attendance percentage over the past 5 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.weeklyAttendance.map((week, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{week.week}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={week.attendance} className="w-24" />
                          <span className={`text-sm font-medium ${getAttendanceColor(week.attendance)}`}>
                            {week.attendance}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Attendance Details</CardTitle>
                  <CardDescription>
                    Individual student attendance records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {analytics.studentPerformance.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.class}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </div>
                          <div className="text-sm text-gray-500">Attendance</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Overview</CardTitle>
                <CardDescription>
                  Detailed performance metrics for all students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Last Exam Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.studentPerformance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="font-medium">{student.name}</div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={student.attendance} className="w-16" />
                            <span className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={student.progress} className="w-16" />
                            <span className="text-sm font-medium">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getScoreColor(student.lastExamScore)}`}>
                            {student.lastExamScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          {student.attendance >= 80 && student.progress >= 70 ? (
                            <Badge variant="outline" className="text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Good
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-yellow-600">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Needs Attention
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Completion Status</CardTitle>
                  <CardDescription>
                    Overall progress and remaining content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed Lessons</span>
                      <span>{analytics.courseProgress.completedLessons}/{analytics.courseProgress.totalLessons}</span>
                    </div>
                    <Progress 
                      value={(analytics.courseProgress.completedLessons / analytics.courseProgress.totalLessons) * 100} 
                      className="mb-4" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.courseProgress.completedLessons}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {analytics.courseProgress.remainingLessons}
                      </div>
                      <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <div className="text-sm text-gray-600">Estimated Completion</div>
                    <div className="font-medium">{analytics.courseProgress.estimatedCompletionDate}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress Distribution</CardTitle>
                  <CardDescription>
                    Student progress breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ahead of Schedule</span>
                      <Badge variant="outline" className="text-green-600">
                        {Math.round(analytics.studentPerformance.filter(s => s.progress >= 80).length / analytics.studentPerformance.length * 100)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">On Track</span>
                      <Badge variant="outline" className="text-blue-600">
                        {Math.round(analytics.studentPerformance.filter(s => s.progress >= 60 && s.progress < 80).length / analytics.studentPerformance.length * 100)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Behind Schedule</span>
                      <Badge variant="outline" className="text-red-600">
                        {Math.round(analytics.studentPerformance.filter(s => s.progress < 60).length / analytics.studentPerformance.length * 100)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Exam Results</CardTitle>
                  <CardDescription>
                    Performance in recent assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.recentExamScores.map((exam, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{exam.examName}</h4>
                          <Badge variant="outline">{exam.date}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className={`text-lg font-bold ${getScoreColor(exam.averageScore)}`}>
                              {exam.averageScore}%
                            </div>
                            <div className="text-sm text-gray-600">Average</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">
                              {exam.highestScore}%
                            </div>
                            <div className="text-sm text-gray-600">Highest</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">
                              {exam.lowestScore}%
                            </div>
                            <div className="text-sm text-gray-600">Lowest</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exam Performance Analysis</CardTitle>
                  <CardDescription>
                    Class performance trends in assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Detailed exam analytics would be displayed here
                      </p>
                      <p className="text-sm text-gray-500">
                        Including score distributions, improvement trends, and question-wise analysis
                      </p>
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