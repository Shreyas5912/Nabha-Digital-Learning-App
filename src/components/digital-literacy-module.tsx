"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Computer, 
  Smartphone, 
  Shield, 
  Search, 
  MessageCircle, 
  FileText,
  Play,
  CheckCircle,
  Clock,
  Users,
  Award,
  Download,
  BookOpen,
  ArrowLeft,
  LogOut
} from "lucide-react"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

interface Module {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: number
  lessons: number
  completedLessons: number
  progress: number
  isCompleted: boolean
  skills: string[]
  prerequisites?: string[]
}

interface DigitalLiteracyModuleProps {
  onBack: () => void
}

export default function DigitalLiteracyModule({ onBack }: DigitalLiteracyModuleProps) {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [showModuleDetail, setShowModuleDetail] = useState(false)

  const modules: Module[] = [
    {
      id: "computer-basics",
      title: "Computer Fundamentals",
      description: "Master basic computer operations, hardware, software, and troubleshooting essentials for beginners.",
      icon: <Computer className="h-6 w-6" />,
      difficulty: "Beginner",
      duration: 180,
      lessons: 12,
      completedLessons: 8,
      progress: 67,
      isCompleted: false,
      skills: ["Hardware identification", "Software usage", "File management", "Basic troubleshooting"],
      prerequisites: []
    },
    {
      id: "internet-safety",
      title: "Internet Safety & Security",
      description: "Learn essential cybersecurity practices, password management, and safe browsing habits.",
      icon: <Shield className="h-6 w-6" />,
      difficulty: "Beginner",
      duration: 120,
      lessons: 8,
      completedLessons: 5,
      progress: 63,
      isCompleted: false,
      skills: ["Password security", "Phishing awareness", "Privacy protection", "Safe browsing"],
      prerequisites: ["computer-basics"]
    },
    {
      id: "mobile-devices",
      title: "Smartphone & Tablet Skills",
      description: "Navigate mobile devices, use apps, and leverage mobile technology for learning and communication.",
      icon: <Smartphone className="h-6 w-6" />,
      difficulty: "Beginner",
      duration: 90,
      lessons: 6,
      completedLessons: 3,
      progress: 50,
      isCompleted: false,
      skills: ["Touch interface", "App management", "Mobile internet", "Device settings"],
      prerequisites: ["computer-basics"]
    },
    {
      id: "information-literacy",
      title: "Information Literacy",
      description: "Find, evaluate, and use digital information effectively and responsibly.",
      icon: <Search className="h-6 w-6" />,
      difficulty: "Intermediate",
      duration: 150,
      lessons: 10,
      completedLessons: 2,
      progress: 20,
      isCompleted: false,
      skills: ["Search techniques", "Source evaluation", "Research skills", "Information ethics"],
      prerequisites: ["computer-basics", "internet-safety"]
    },
    {
      id: "digital-communication",
      title: "Digital Communication",
      description: "Use email, messaging apps, and social media responsibly for effective communication.",
      icon: <MessageCircle className="h-6 w-6" />,
      difficulty: "Intermediate",
      duration: 135,
      lessons: 9,
      completedLessons: 1,
      progress: 11,
      isCompleted: false,
      skills: ["Email etiquette", "Messaging apps", "Social media", "Online collaboration"],
      prerequisites: ["internet-safety", "mobile-devices"]
    },
    {
      id: "document-processing",
      title: "Document Processing",
      description: "Create, edit, and format documents using word processors and spreadsheet applications.",
      icon: <FileText className="h-6 w-6" />,
      difficulty: "Intermediate",
      duration: 200,
      lessons: 14,
      completedLessons: 0,
      progress: 0,
      isCompleted: false,
      skills: ["Word processing", "Spreadsheet basics", "Presentations", "Document sharing"],
      prerequisites: ["computer-basics"]
    }
  ]

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module)
    setShowModuleDetail(true)
  }

  const handleBackToModules = () => {
    setShowModuleDetail(false)
    setSelectedModule(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getModuleIcon = (moduleId: string) => {
    const mod = modules.find(m => m.id === moduleId)
    return mod ? mod.icon : <Computer className="h-6 w-6" />
  }

  const isModuleLocked = (mod: Module) => {
    if (!mod.prerequisites || mod.prerequisites.length === 0) {
      return false
    }
    return mod.prerequisites.some(prereq => {
      const prereqModule = modules.find(m => m.id === prereq)
      return !prereqModule?.isCompleted
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
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

  if (showModuleDetail && selectedModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleBackToModules}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Modules
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {selectedModule.icon}
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">{selectedModule.title}</h1>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Badge className={getDifficultyColor(selectedModule.difficulty)}>
                        {selectedModule.difficulty}
                      </Badge>
                      <span>{formatDuration(selectedModule.duration)}</span>
                      <span>{selectedModule.lessons} lessons</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <LanguageSelector />
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
                {selectedModule.isCompleted && (
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  {selectedModule.progress > 0 ? 'Continue' : 'Start'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Module Progress */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Module Progress</h2>
                <p className="text-gray-600">
                  {selectedModule.completedLessons} of {selectedModule.lessons} lessons completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{selectedModule.progress}%</div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(selectedModule.duration)} total</span>
                </div>
              </div>
            </div>
            <Progress value={selectedModule.progress} className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{selectedModule.lessons} Lessons</div>
                  <div className="text-sm text-gray-600">
                    {selectedModule.lessons - selectedModule.completedLessons} remaining
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">{selectedModule.completedLessons} Completed</div>
                  <div className="text-sm text-gray-600">
                    {Math.round((selectedModule.completedLessons / selectedModule.lessons) * 100)}% completion
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {selectedModule.isCompleted ? 'Certificate Earned' : 'In Progress'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedModule.progress}% complete
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Module</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {selectedModule.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">What you'll learn:</h4>
                          <ul className="space-y-1 text-gray-700">
                            {selectedModule.skills.map((skill, index) => (
                              <li key={index}>• {skill}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {selectedModule.prerequisites && selectedModule.prerequisites.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Prerequisites:</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedModule.prerequisites.map((prereq, index) => (
                                <Badge key={index} variant="outline" className="flex items-center space-x-1">
                                  {getModuleIcon(prereq)}
                                  <span>{modules.find(m => m.id === prereq)?.title}</span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold mb-2">Learning Path:</h4>
                          <p className="text-gray-700">
                            This module is part of a comprehensive digital literacy curriculum. 
                            Complete all modules to earn your Digital Literacy Certificate.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lessons">
                  <Card>
                    <CardHeader>
                      <CardTitle>Module Lessons</CardTitle>
                      <CardDescription>
                        Click on any lesson to start learning
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Array.from({ length: selectedModule.lessons }, (_, index) => {
                          const isCompleted = index < selectedModule.completedLessons
                          const isCurrent = index === selectedModule.completedLessons
                          
                          return (
                            <div 
                              key={index}
                              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                                isCompleted ? 'bg-green-50 border-green-200' : 
                                isCurrent ? 'bg-blue-50 border-blue-200' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  isCompleted ? 'bg-green-100 text-green-600' :
                                  isCurrent ? 'bg-blue-100 text-blue-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : 
                                   isCurrent ? <Play className="h-5 w-5" /> :
                                   <span className="font-medium">{index + 1}</span>}
                                </div>
                                <div>
                                  <div className="font-medium flex items-center space-x-2">
                                    <span>Lesson {index + 1}: {selectedModule.title}</span>
                                    {isCompleted && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {Math.round(selectedModule.duration / selectedModule.lessons)} minutes • {
                                      isCompleted ? 'Completed' :
                                      isCurrent ? 'In Progress' : 'Not started'
                                    }
                                  </div>
                                </div>
                              </div>
                              
                              <Button variant="outline" size="sm">
                                {isCompleted ? 'Review' : isCurrent ? 'Continue' : 'Start'}
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills You'll Gain</CardTitle>
                      <CardDescription>
                        Practical digital skills for everyday life and future opportunities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedModule.skills.map((skill, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Award className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{skill}</div>
                              <div className="text-sm text-gray-600">
                                {index < selectedModule.completedLessons ? 'Learned' : 'To be learned'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Module Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {selectedModule.progress > 0 ? 'Continue Learning' : 'Start Module'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download for Offline
                  </Button>
                  
                  {selectedModule.isCompleted && (
                    <Button variant="outline" className="w-full">
                      <Award className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Related Modules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {modules
                    .filter(m => m.id !== selectedModule.id)
                    .slice(0, 3)
                    .map((mod) => (
                      <div 
                        key={mod.id}
                        className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => handleModuleClick(mod)}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                          {mod.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{mod.title}</div>
                          <div className="text-xs text-gray-500">
                            {mod.difficulty} • {mod.lessons} lessons
                          </div>
                        </div>
                        {isModuleLocked(mod) && (
                          <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs text-gray-600">🔒</span>
                          </div>
                        )}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
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
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Digital Literacy Modules</h1>
                <p className="text-sm text-gray-600">Essential digital skills for the modern world</p>
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
        {/* Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Digital Literacy for Rural Students</h2>
            <p className="text-lg mb-6">
              Master essential digital skills that will help you succeed in school, work, and life. 
              Our comprehensive curriculum is designed specifically for students in rural areas with 
              limited access to technology.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{modules.length} Modules</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{modules.reduce((acc, m) => acc + m.lessons, 0)} Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{formatDuration(modules.reduce((acc, m) => acc + m.duration, 0))} Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Your Learning Path</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Card 
                key={mod.id} 
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  isModuleLocked(mod) ? 'opacity-60' : ''
                }`}
                onClick={() => !isModuleLocked(mod) && handleModuleClick(mod)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {mod.icon}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className={getDifficultyColor(mod.difficulty)}>
                        {mod.difficulty}
                      </Badge>
                      {isModuleLocked(mod) && (
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs text-gray-600">🔒</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{mod.progress}%</span>
                    </div>
                    <Progress value={mod.progress} />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{mod.lessons} lessons</span>
                    <span>{formatDuration(mod.duration)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {mod.isCompleted ? (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        {mod.completedLessons}/{mod.lessons} lessons
                      </Badge>
                    )}
                    <Button size="sm" disabled={isModuleLocked(mod)}>
                      {mod.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Digital Literacy Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {modules.filter(m => m.isCompleted).length}
                </div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {modules.reduce((acc, m) => acc + m.completedLessons, 0)}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)}%
                </div>
                <div className="text-sm text-gray-600">Average Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatDuration(modules.reduce((acc, m) => acc + m.duration * m.progress / 100, 0))}
                </div>
                <div className="text-sm text-gray-600">Time Invested</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}