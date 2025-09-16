"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userType: 'student' | 'teacher', credentials: any) => void
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student')
  const [formData, setFormData] = useState({
    student: { username: '', password: '' },
    teacher: { username: '', password: '' }
  })

  if (!isOpen) return null

  const handleSubmit = (userType: 'student' | 'teacher') => {
    const credentials = formData[userType]
    onLogin(userType, credentials)
  }

  const handleInputChange = (userType: 'student' | 'teacher', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [userType]: {
        ...prev[userType],
        [field]: value
      }
    }))
  }

  // Demo credentials
  const demoCredentials = {
    student: [
      { username: 'student1', password: 'student123' },
      { username: 'raj.kumar', password: 'student123' },
      { username: 'priya.singh', password: 'student123' }
    ],
    teacher: [
      { username: 'teacher1', password: 'teacher123' },
      { username: 'mr.sharma', password: 'teacher123' },
      { username: 'mrs.verma', password: 'teacher123' }
    ]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">Welcome to Nabha Digital Learning</CardTitle>
          <CardDescription>
            Sign in to access your personalized learning dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'student' | 'teacher')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{t('nav.student')}</span>
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>{t('nav.teacher')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-username">Username</Label>
                <Input
                  id="student-username"
                  placeholder="Enter your username"
                  value={formData.student.username}
                  onChange={(e) => handleInputChange('student', 'username', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <div className="relative">
                  <Input
                    id="student-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.student.password}
                    onChange={(e) => handleInputChange('student', 'password', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Demo Student Accounts:</p>
                <div className="space-y-1">
                  {demoCredentials.student.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                      <span>{cred.username}</span>
                      <Badge variant="outline">{cred.password}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleSubmit('student')}
              >
                Sign in as Student
              </Button>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacher-username">Username</Label>
                <Input
                  id="teacher-username"
                  placeholder="Enter your username"
                  value={formData.teacher.username}
                  onChange={(e) => handleInputChange('teacher', 'username', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teacher-password">Password</Label>
                <div className="relative">
                  <Input
                    id="teacher-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.teacher.password}
                    onChange={(e) => handleInputChange('teacher', 'password', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Demo Teacher Accounts:</p>
                <div className="space-y-1">
                  {demoCredentials.teacher.map((cred, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                      <span>{cred.username}</span>
                      <Badge variant="outline">{cred.password}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleSubmit('teacher')}
              >
                Sign in as Teacher
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}