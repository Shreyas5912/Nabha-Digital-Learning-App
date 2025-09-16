"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'pa' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Common
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.start': 'Start',
    'common.continue': 'Continue',
    'common.complete': 'Complete',
    'common.download': 'Download',
    'common.loading': 'Loading',
    
    // Navigation
    'nav.student': 'Student',
    'nav.teacher': 'Teacher',
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.profile': 'Profile',
    
    // Landing Page
    'landing.title': 'Digital Learning for Rural Students in Nabha',
    'landing.subtitle': 'Access quality education anytime, anywhere - even without internet',
    'landing.features.offline': 'Offline Learning',
    'landing.features.offline.desc': 'Download lessons and learn without internet connection',
    'landing.features.interactive': 'Interactive Lessons',
    'landing.features.interactive.desc': 'Engaging content with videos, quizzes, and activities',
    'landing.features.literacy': 'Digital Literacy',
    'landing.features.literacy.desc': 'Essential computer skills for the modern world',
    'landing.features.progress': 'Progress Tracking',
    'landing.features.progress.desc': 'Monitor learning progress for students and teachers',
    
    // Student Dashboard
    'student.title': 'Student Dashboard',
    'student.learningHours': 'Learning Hours',
    'student.totalTime': 'Total time spent',
    'student.coursesCompleted': 'Courses Completed',
    'student.outOf': 'Out of',
    'student.enrolled': 'enrolled',
    'student.currentStreak': 'Current Streak',
    'student.keepItUp': 'Keep it up!',
    'student.weeklyProgress': 'Weekly Progress',
    'student.myCourses': 'My Courses',
    'student.availableCourses': 'Available Courses',
    'student.offlineContent': 'Offline Content',
    'student.progress': 'Progress',
    'student.startLearning': 'Start Learning',
    'student.moreCourses': 'More Courses Coming Soon',
    'student.noOffline': 'No Offline Content',
    'student.downloadDesc': 'Download courses to access them without internet connection.',
    'student.browseCourses': 'Browse Courses',
    
    // Digital Literacy
    'literacy.title': 'Digital Literacy Modules',
    'literacy.subtitle': 'Essential digital skills for the modern world',
    'literacy.overview': 'Digital Literacy for Rural Students',
    'literacy.description': 'Master essential digital skills that will help you succeed in school, work, and life. Our comprehensive curriculum is designed specifically for students in rural areas with limited access to technology.',
    'literacy.modules': 'Modules',
    'literacy.lessons': 'Lessons',
    'literacy.total': 'Total',
    'literacy.learningPath': 'Your Learning Path',
    'literacy.computerBasics': 'Computer Fundamentals',
    'literacy.computerBasics.desc': 'Master basic computer operations, hardware, software, and troubleshooting essentials for beginners.',
    'literacy.internetSafety': 'Internet Safety & Security',
    'literacy.internetSafety.desc': 'Learn essential cybersecurity practices, password management, and safe browsing habits.',
    'literacy.mobileSkills': 'Smartphone & Tablet Skills',
    'literacy.mobileSkills.desc': 'Navigate mobile devices, use apps, and leverage mobile technology for learning and communication.',
    'literacy.informationLiteracy': 'Information Literacy',
    'literacy.informationLiteracy.desc': 'Find, evaluate, and use digital information effectively and responsibly.',
    'literacy.digitalCommunication': 'Digital Communication',
    'literacy.digitalCommunication.desc': 'Use email, messaging apps, and social media responsibly for effective communication.',
    'literacy.documentProcessing': 'Document Processing',
    'literacy.documentProcessing.desc': 'Create, edit, and format documents using word processors and spreadsheet applications.',
    
    // Teacher Dashboard
    'teacher.title': 'Teacher Dashboard',
    'teacher.totalStudents': 'Total Students',
    'teacher.activeToday': 'active today',
    'teacher.averageProgress': 'Average Progress',
    'teacher.hoursThisWeek': 'Hours This Week',
    'teacher.totalLearningTime': 'Total learning time',
    'teacher.completionRate': 'Average completion rate',
    'teacher.students': 'Students',
    'teacher.courses': 'Courses',
    'teacher.analytics': 'Analytics',
    'teacher.createContent': 'Create Content',
    'teacher.studentProgress': 'Student Progress Overview',
    'teacher.monitorProgress': 'Monitor individual student progress and engagement',
    'teacher.class': 'Class',
    'teacher.progress': 'Progress',
    'teacher.hours': 'Hours',
    'teacher.courses': 'Courses',
    'teacher.streak': 'Streak',
    'teacher.lastActive': 'Last Active',
    'teacher.actions': 'Actions',
    'teacher.view': 'View',
    'teacher.coursePerformance': 'Course Performance',
    'teacher.courseMetrics': 'Course performance metrics',
    'teacher.avgProgress': 'Average Progress',
    'teacher.completion': 'Completion Rate',
    'teacher.activeStudents': 'active students',
    'teacher.details': 'Details',
    'teacher.classPerformance': 'Class Performance',
    'teacher.classMetrics': 'Overall class metrics and trends',
    'teacher.topPerformers': 'Top Performers',
    'teacher.topDesc': 'Students with highest engagement and progress',
    'teacher.newCourse': 'New Course',
    'teacher.newCourseDesc': 'Create a new course with lessons and quizzes',
    'teacher.newLesson': 'New Lesson',
    'teacher.newLessonDesc': 'Add interactive lessons to existing courses',
    'teacher.importContent': 'Import Content',
    'teacher.importDesc': 'Import existing learning materials',
    'teacher.recentActivity': 'Recent Activity',
    'teacher.latestUpdates': 'Latest student activities and course updates',
    
    // Course Viewer
    'course.overview': 'About This Course',
    'course.whatYoullLearn': 'What you\'ll learn:',
    'course.requirements': 'Requirements:',
    'course.stats': 'Course Stats',
    'course.difficulty': 'Difficulty',
    'course.language': 'Language',
    'course.duration': 'Duration',
    'course.lessons': 'Lessons',
    'course.rating': 'Rating',
    'course.quickActions': 'Quick Actions',
    'course.continueLearning': 'Continue Learning',
    'course.downloadOffline': 'Download for Offline',
    'course.lessonsList': 'Course Lessons',
    'course.lessonsDesc': 'Click on any lesson to start learning',
    'course.resources': 'Course Resources',
    'course.resourcesDesc': 'Additional materials to support your learning',
    'course.courseGuide': 'Course Guide PDF',
    'course.overviewDesc': 'Complete course overview',
    'course.practiceVideos': 'Practice Videos',
    'course.videoTutorials': 'Video tutorials',
    'course.worksheets': 'Exercise Worksheets',
    'course.practiceActivities': 'Practice activities',
    'course.glossary': 'Glossary of Terms',
    'course.termsExplained': 'Technical terms explained',
    
    // Lesson Viewer
    'lesson.lessonProgress': 'Lesson Progress',
    'lesson.additionalResources': 'Additional Resources',
    'lesson.downloadMaterials': 'Download these materials to help with your learning',
    'lesson.previousLesson': 'Previous Lesson',
    'lesson.nextLesson': 'Next Lesson',
    'lesson.markComplete': 'Mark Complete',
    'lesson.videoTranscript': 'Video Transcript',
    'lesson.interactiveActivity': 'Interactive Activity',
    'lesson.tryYourself': 'Try it yourself:',
    'lesson.typeAnswer': 'Type your answer here...',
    'lesson.submitAnswer': 'Submit Answer',
    'lesson.greatJob': 'Great job!',
    'lesson.learningDesc': 'You\'re learning how to interact with digital content. This skill will help you use computers and websites more effectively.',
    'lesson.lessonQuiz': 'Lesson Quiz',
    'lesson.startQuiz': 'Start Quiz',
    'lesson.questions': 'questions',
    'lesson.progress': 'Progress',
    'lesson.question': 'Question',
    'lesson.of': 'of',
    'lesson.nextQuestion': 'Next Question',
    'lesson.finishQuiz': 'Finish Quiz',
    'lesson.quizCompleted': 'Quiz completed!',
    'lesson.scored': 'You scored',
    'lesson.outOf': 'out of',
  },
  
  pa: {
    // Common
    'common.back': 'ਪਿੱਛੇ',
    'common.next': 'ਅੱਗੇ',
    'common.previous': 'ਪਿਛਲਾ',
    'common.start': 'ਸ਼ੁਰੂ ਕਰੋ',
    'common.continue': 'ਜਾਰੀ ਰੱਖੋ',
    'common.complete': 'ਪੂਰਾ ਕਰੋ',
    'common.download': 'ਡਾਊਨਲੋਡ ਕਰੋ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
    
    // Navigation
    'nav.student': 'ਵਿਦਿਆਰਥੀ',
    'nav.teacher': 'ਅਧਿਆਪਕ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.courses': 'ਕੋਰਸ',
    'nav.profile': 'ਪ੍ਰੋਫਾਈਲ',
    
    // Landing Page
    'landing.title': 'ਨਾਭਾ ਦੇ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਿਜੀਟਲ ਲਰਨਿੰਗ',
    'landing.subtitle': 'ਕਿਤੇ ਵੀ, ਕਿਤੇ ਵੀ ਗੁਣਵੱਤਾ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕਰੋ - ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਤੋਂ ਵੀ',
    'landing.features.offline': 'ਆਫਲਾਈਨ ਲਰਨਿੰਗ',
    'landing.features.offline.desc': 'ਪਾਠ ਡਾਊਨਲੋਡ ਕਰੋ ਅਤੇ ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਦੇ ਸਿੱਖੋ',
    'landing.features.interactive': 'ਇੰਟਰਐਕਟਿਵ ਪਾਠ',
    'landing.features.interactive.desc': 'ਵੀਡੀਓ, ਕੁਇਜ਼, ਅਤੇ ਗਤੀਵਿਧੀਆਂ ਨਾਲ ਰੋਚਕ ਸਮੱਗਰੀ',
    'landing.features.literacy': 'ਡਿਜੀਟਲ ਸਾਖਰਤਾ',
    'landing.features.literacy.desc': 'ਆਧੁਨਿਕ ਦੁਨੀਆ ਲਈ ਜ਼ਰੂਰੀ ਕੰਪਿਊਟਰ ਹੁਨਰ',
    'landing.features.progress': 'ਪ੍ਰਗਤੀ ਟਰੈਕਿੰਗ',
    'landing.features.progress.desc': 'ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਲਈ ਸਿੱਖਿਆ ਪ੍ਰਗਤੀ ਦੀ ਨਿਗਰਾਨੀ',
    
    // Student Dashboard
    'student.title': 'ਵਿਦਿਆਰਥੀ ਡੈਸ਼ਬੋਰਡ',
    'student.learningHours': 'ਸਿੱਖਿਆ ਘੰਟੇ',
    'student.totalTime': 'ਕੁੱਲ ਸਮਾਂ',
    'student.coursesCompleted': 'ਪੂਰੇ ਹੋਏ ਕੋਰਸ',
    'student.outOf': 'ਵਿੱਚੋਂ',
    'student.enrolled': 'ਦਾਖਲ ਹੋਏ',
    'student.currentStreak': 'ਮੌਜੂਦਾ ਲਗਾਤਾਰ',
    'student.keepItUp': 'ਸ਼ਾਬਦ ਰੱਖੋ!',
    'student.weeklyProgress': 'ਹਫਤਾਵਾਰ ਪ੍ਰਗਤੀ',
    'student.myCourses': 'ਮੇਰੇ ਕੋਰਸ',
    'student.availableCourses': 'ਉਪਲਬਧ ਕੋਰਸ',
    'student.offlineContent': 'ਆਫਲਾਈਨ ਸਮੱਗਰੀ',
    'student.progress': 'ਪ੍ਰਗਤੀ',
    'student.startLearning': 'ਸਿੱਖਣਾ ਸ਼ੁਰੂ ਕਰੋ',
    'student.moreCourses': 'ਹੋਰ ਕੋਰਸ ਜਲਦ ਆ ਰਹੇ ਹਨ',
    'student.noOffline': 'ਕੋਈ ਆਫਲਾਈਨ ਸਮੱਗਰੀ ਨਹੀਂ',
    'student.downloadDesc': 'ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਦੇ ਪਹੁੰਚ ਲਈ ਕੋਰਸ ਡਾਊਨਲੋਡ ਕਰੋ।',
    'student.browseCourses': 'ਕੋਰਸ ਬ੍ਰਾਊਜ਼ ਕਰੋ',
    
    // Digital Literacy (Punjabi translations would be more extensive in a real app)
    'literacy.title': 'ਡਿਜੀਟਲ ਸਾਖਰਤਾ ਮਾਡਿਊਲ',
    'literacy.subtitle': 'ਆਧੁਨਿਕ ਦੁਨੀਆ ਲਈ ਜ਼ਰੂਰੀ ਡਿਜੀਟਲ ਹੁਨਰ',
    'literacy.overview': 'ਨਾਭਾ ਦੇ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਿਜੀਟਲ ਸਾਖਰਤਾ',
    'literacy.description': 'ਸਕੂਲ, ਕੰਮ, ਅਤੇ ਜੀਵਨ ਵਿੱਚ ਸਫਲਤਾ ਲਈ ਜ਼ਰੂਰੀ ਡਿਜੀਟਲ ਹੁਨਰ ਮਾਸਟਰ ਕਰੋ। ਸਾਡਾ ਵਿਆਪਕ ਪਾਠਕ੍ਰਮ ਖਾਸ ਤੌਰ ਤੇ ਉਨ੍ਹਾਂ ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤਾ ਗਿਆ ਹੈ ਜਿਨ੍ਹਾਂ ਨੂੰ ਤਕਨਾਲੋਜੀ ਤੱਕ ਸੀਮਿਤ ਪਹੁੰਚ ਹੈ।',
    'literacy.modules': 'ਮਾਡਿਊਲ',
    'literacy.lessons': 'ਪਾਠ',
    'literacy.total': 'ਕੁੱਲ',
    'literacy.learningPath': 'ਤੁਹਾਡਾ ਸਿੱਖਣ ਦਾ ਰਸਤਾ',
    'literacy.computerBasics': 'ਕੰਪਿਊਟਰ ਬੇਸਿਕਸ',
    'literacy.computerBasics.desc': 'ਸ਼ੁਰੂਆਤੀ ਲਈ ਬੁਨਿਆਦੀ ਕੰਪਿਊਟਰ ਓਪਰੇਸ਼ਨ, ਹਾਰਡਵੇਅਰ, ਸਾਫਟਵੇਅਰ, ਅਤੇ ਟ੍ਰਬਲਸ਼ੂਟਿੰਗ ਮਾਹਰ ਕਰੋ।',
    'literacy.internetSafety': 'ਇੰਟਰਨੈਟ ਸੁਰੱਖਿਆ ਅਤੇ ਸੁਰੱਖਿਆ',
    'literacy.internetSafety.desc': 'ਜ਼ਰੂਰੀ ਸਾਈਬਰ ਸੁਰੱਖਿਆ ਅਭਿਆਸ, ਪਾਸਵਰਡ ਪ੍ਰਬੰਧਨ, ਅਤੇ ਸੁਰੱਖਿਅਤ ਬ੍ਰਾਊਜ਼ਿੰਗ ਆਦਤਾਂ ਸਿੱਖੋ।',
    'literacy.mobileSkills': 'ਸਮਾਰਟਫੋਨ ਅਤੇ ਟੈਬਲੇਟ ਹੁਨਰ',
    'literacy.mobileSkills.desc': 'ਮੋਬਾਈਲ ਡਿਵਾਈਸਿਜ਼ ਨੈਵੀਗੇਟ ਕਰੋ, ਐਪਸ ਵਰਤੋ, ਅਤੇ ਸਿੱਖਿਆ ਅਤੇ ਸੰਚਾਰ ਲਈ ਮੋਬਾਈਲ ਤਕਨਾਲੋਜੀ ਦਾ ਲਾਭ ਚੁੱਕੋ।',
    'literacy.informationLiteracy': 'ਜਾਣਕਾਰੀ ਸਾਖਰਤਾ',
    'literacy.informationLiteracy.desc': 'ਡਿਜੀਟਲ ਜਾਣਕਾਰੀ ਨੂੰ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਅਤੇ ਜ਼ਿੰਮੇਦਾਰੀ ਨਾਲ ਲੱਭੋ, ਮੁਲਾਂਕਣ ਕਰੋ, ਅਤੇ ਵਰਤੋ।',
    'literacy.digitalCommunication': 'ਡਿਜੀਟਲ ਸੰਚਾਰ',
    'literacy.digitalCommunication.desc': 'ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸੰਚਾਰ ਲਈ ਈਮੇਲ, ਮੈਸੇਜਿੰਗ ਐਪਸ, ਅਤੇ ਸੋਸ਼ਲ ਮੀਡੀਆ ਨੂੰ ਜ਼ਿੰਮੇਦਾਰੀ ਨਾਲ ਵਰਤੋ।',
    'literacy.documentProcessing': 'ਦਸਤਾਵੇਜ਼ ਪ੍ਰੋਸੈਸਿੰਗ',
    'literacy.documentProcessing.desc': 'ਵਰਡ ਪ੍ਰੋਸੈਸਰ ਅਤੇ ਸਪ੍ਰੈਡਸ਼ੀਟ ਐਪਲੀਕੇਸ਼ਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਦਸਤਾਵੇਜ਼ ਬਣਾਓ, ਸੰਪਾਦੋ, ਅਤੇ ਫਾਰਮੈਟ ਕਰੋ।',
  },
  
  hi: {
    // Common
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.start': 'शुरू करें',
    'common.continue': 'जारी रखें',
    'common.complete': 'पूर्ण करें',
    'common.download': 'डाउनलोड करें',
    'common.loading': 'लोड हो रहा है',
    
    // Navigation
    'nav.student': 'छात्र',
    'nav.teacher': 'शिक्षक',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.courses': 'पाठ्यक्रम',
    'nav.profile': 'प्रोफ़ाइल',
    
    // Landing Page
    'landing.title': 'नाभा के ग्रामीण छात्रों के लिए डिजिटल लर्निंग',
    'landing.subtitle': 'कहीं भी, कभी भी गुणवत्तापूर्ण शिक्षा प्राप्त करें - इंटरनेट के बिना भी',
    'landing.features.offline': 'ऑफ़लाइन लर्निंग',
    'landing.features.offline.desc': 'पाठ डाउनलोड करें और बिना इंटरनेट के सीखें',
    'landing.features.interactive': 'इंटरैक्टिव पाठ',
    'landing.features.interactive.desc': 'वीडियो, क्विज़, और गतिविधियों के साथ रोचक सामग्री',
    'landing.features.literacy': 'डिजिटल साक्षरता',
    'landing.features.literacy.desc': 'आधुनिक दुनिया के लिए आवश्यक कंप्यूटर कौशल',
    'landing.features.progress': 'प्रगति ट्रैकिंग',
    'landing.features.progress.desc': 'छात्रों और शिक्षकों के लिए शिक्षा प्रगति की निगरानी',
    
    // Student Dashboard
    'student.title': 'छात्र डैशबोर्ड',
    'student.learningHours': 'सीखने के घंटे',
    'student.totalTime': 'कुल समय',
    'student.coursesCompleted': 'पूर्ण पाठ्यक्रम',
    'student.outOf': 'में से',
    'student.enrolled': 'नामांकित',
    'student.currentStreak': 'वर्तमान लगातार',
    'student.keepItUp': 'ऐसे ही जारी रखें!',
    'student.weeklyProgress': 'साप्ताहिक प्रगति',
    'student.myCourses': 'मेरे पाठ्यक्रम',
    'student.availableCourses': 'उपलब्ध पाठ्यक्रम',
    'student.offlineContent': 'ऑफ़लाइन सामग्री',
    'student.progress': 'प्रगति',
    'student.startLearning': 'सीखना शुरू करें',
    'student.moreCourses': 'और पाठ्यक्रम जल्द आ रहे हैं',
    'student.noOffline': 'कोई ऑफ़लाइन सामग्री नहीं',
    'student.downloadDesc': 'बिना इंटरनेट के पहुंच के लिए पाठ्यक्रम डाउनलोड करें।',
    'student.browseCourses': 'पाठ्यक्रम ब्राउज़ करें',
    
    // Digital Literacy (Hindi translations would be more extensive in a real app)
    'literacy.title': 'डिजिटल साक्षरता मॉड्यूल',
    'literacy.subtitle': 'आधुनिक दुनिया के लिए आवश्यक डिजिटल कौशल',
    'literacy.overview': 'नाभा के ग्रामीण छात्रों के लिए डिजिटल साक्षरता',
    'literacy.description': 'स्कूल, काम, और जीवन में सफलता के लिए आवश्यक डिजिटल कौशल में महारत हासिल करें। हमारा व्यापक पाठ्यक्रम विशेष रूप से उन ग्रामीण छात्रों के लिए डिज़ाइन किया गया है जिन्हें तकनीक तक सीमित पहुंच है।',
    'literacy.modules': 'मॉड्यूल',
    'literacy.lessons': 'पाठ',
    'literacy.total': 'कुल',
    'literacy.learningPath': 'आपका सीखने का मार्ग',
    'literacy.computerBasics': 'कंप्यूटर बेसिक्स',
    'literacy.computerBasics.desc': 'शुरुआती लोगों के लिए बुनियादी कंप्यूटर ऑपरेशन, हार्डवेयर, सॉफ्टवेयर, और ट्रबलशूटिंग में महारत हासिल करें।',
    'literacy.internetSafety': 'इंटरनेट सुरक्षा और सुरक्षा',
    'literacy.internetSafety.desc': 'आवश्यक साइबर सुरक्षा प्रथाएं, पासवर्ड प्रबंधन, और सुरक्षित ब्राउज़िंग आदतें सीखें।',
    'literacy.mobileSkills': 'स्मार्टफोन और टैबलेट कौशल',
    'literacy.mobileSkills.desc': 'मोबाइल डिवाइस नेविगेट करें, ऐप्स का उपयोग करें, और सीखने और संचार के लिए मोबाइल तकनीक का लाभ उठाएं।',
    'literacy.informationLiteracy': 'सूचना साक्षरता',
    'literacy.informationLiteracy.desc': 'डिजिटल जानकारी को प्रभावी रूप से और जिम्मेदारी से खोजें, मूल्यांकन करें, और उपयोग करें।',
    'literacy.digitalCommunication': 'डिजिटल संचार',
    'literacy.digitalCommunication.desc': 'प्रभावी संचार के लिए ईमेल, मैसेजिंग ऐप्स, और सोशल मीडिया का जिम्मेदारी से उपयोग करें।',
    'literacy.documentProcessing': 'दस्तावेज़ प्रसंस्करण',
    'literacy.documentProcessing.desc': 'वर्ड प्रोसेसर और स्प्रेडशीट एप्लिकेशन का उपयोग करके दस्तावेज़ बनाएं, संपादित करें, और फॉर्मेट करें।',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}