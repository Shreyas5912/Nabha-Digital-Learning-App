"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Monitor, Users, Download, Star } from "lucide-react"
import StudentDashboard from "@/components/student-dashboard"
import TeacherDashboard from "@/components/teacher-dashboard"
import LanguageSelector from "@/components/language-selector"
import AuthModal from "@/components/auth-modal"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const features = [
    {
      icon: <Download className="h-6 w-6" />,
      title: t('landing.features.offline'),
      description: t('landing.features.offline.desc')
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('landing.features.interactive'),
      description: t('landing.features.interactive.desc')
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: t('landing.features.literacy'),
      description: t('landing.features.literacy.desc')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('landing.features.progress'),
      description: t('landing.features.progress.desc')
    }
  ]

  const handleLogin = (userType: 'student' | 'teacher', credentials: any) => {
    // Dummy authentication - in real app, this would call an API
    console.log('Login attempt:', userType, credentials)
    setUserType(userType)
    setShowAuth(false)
    setShowDashboard(true)
  }

  const handleUserTypeSelect = (type: "student" | "teacher") => {
    setUserType(type)
    setShowAuth(true)
  }

  const courses = [
    {
      title: "Computer Basics",
      category: "Digital Literacy",
      difficulty: "Beginner",
      language: "ਪੰਜਾਬੀ",
      intro: "Learn fundamental computer operations, hardware components, and basic software usage. Perfect for beginners starting their digital journey."
    },
    {
      title: "Internet Safety",
      category: "Digital Literacy",
      difficulty: "Beginner",
      language: "हिंदी",
      intro: "Master online safety practices, learn about password security, phishing protection, and safe browsing habits for secure internet usage."
    },
    {
      title: "Microsoft Office",
      category: "Computer Skills",
      difficulty: "Intermediate",
      language: "English",
      intro: "Develop proficiency in Word, Excel, and PowerPoint. Create professional documents, spreadsheets, and presentations for academic and professional success."
    }
  ]

  // Show student dashboard if user selected student and clicked get started
  if (showDashboard && userType === "student") {
    return <StudentDashboard />
  }

  // Show teacher dashboard if user selected teacher and clicked get started
  if (showDashboard && userType === "teacher") {
    return <TeacherDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">Nabha Digital Learning</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Nabha Digital Learning Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive educational platform designed for both students and teachers to enhance learning experiences in rural communities
          </p>
          
          {/* User Type Selection */}
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              variant={userType === "student" ? "default" : "outline"}
              size="lg"
              onClick={() => handleUserTypeSelect("student")}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <GraduationCap className="h-5 w-5" />
              <span>{t('nav.student')}</span>
            </Button>
            <Button
              variant={userType === "teacher" ? "default" : "outline"}
              size="lg"
              onClick={() => handleUserTypeSelect("teacher")}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Users className="h-5 w-5" />
              <span>{t('nav.teacher')}</span>
            </Button>
          </div>

          {userType && !showAuth && (
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">
                Welcome {userType === "student" ? t('nav.student') : t('nav.teacher')}!
              </h3>
              <p className="text-gray-600 mb-4">
                {userType === "student" 
                  ? "Begin your educational journey with interactive courses, track your progress, and develop essential digital skills for your future."
                  : "Empower your teaching with digital tools, monitor student progress, and create engaging learning content for your classroom."
                }
              </p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowAuth(true)}
              >
                {t('common.start')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Educational Purpose</h3>
            <p className="text-lg text-gray-600">
              Empowering students and teachers with comprehensive digital learning tools for quality education in rural communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Learning for All Classes</h3>
            <p className="text-lg text-gray-600">
              Supporting education from primary to senior secondary levels with complete subject coverage including Mathematics, Science, Social Studies, Languages, and Digital Literacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>
                    {course.difficulty} • {course.language}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{course.intro}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-green-400" />
                <h4 className="text-lg font-semibold">Nabha Digital Learning</h4>
              </div>
              <p className="text-gray-400">
                Empowering rural students with digital education for a brighter future.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Courses</a></li>
                <li><a href="#" className="hover:text-white">For Teachers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <p className="text-gray-400 mb-2">
                Government of Punjab<br />
                Department of Higher Education
              </p>
              <p className="text-gray-400">
                Supported by Smart Education Initiative
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Nabha Digital Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}