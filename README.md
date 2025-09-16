🌐 Nabha Digital Learning Platform  

## 📖 About  

**Nabha Digital Learning Platform** is a comprehensive educational solution designed for rural students in Punjab, India. Our mission is to bridge the digital divide by providing accessible, multilingual education with offline capabilities — ensuring quality education reaches every corner of rural India.

### 🌟 Vision  
Empower rural communities with digital literacy and modern education, creating a generation of digitally competent students and teachers who can thrive in the 21st century.

### 🎯 Mission  
- **Accessibility:** Provide education for students with limited internet connectivity  
- **Language Inclusion:** Support Punjabi (ਪੰਜਾਬੀ), Hindi (हिंदी), and English  
- **Digital Literacy:** Build skills from basics to advanced  
- **Teacher Empowerment:** Equip teachers with modern digital teaching tools  
- **Rural Focus:** Address unique challenges of rural education  

---

## ✨ Features  

### 👨‍🎓 For Students  
- **Multilingual Interface**: Seamlessly switch between Punjabi, Hindi, and English  
- **Course Progress Tracking**: Visual learning advancement indicators  
- **Offline Learning**: Download content for offline access  
- **Interactive Lessons**: Video, text, and interactive content  
- **Personalized Dashboard**: Tailored learning experience  

**Digital Literacy Program:**  
Computer Fundamentals • Internet Safety • Mobile Skills • Information Literacy • Digital Communication • Document Processing  

**Engagement & Assessment:**  
Monthly Quizzes • Badges & Certificates • Class Leaderboards • Progress Streaks • Performance Analytics  

---

### 👩‍🏫 For Teachers  
**Classroom Management:**  
Student Overview • Real-time Analytics • Course Management • Attendance Tracking • Individual Support  

**Advanced Analytics:**  
Course Performance • Student Progress • Engagement Metrics • Comparative & Trend Analysis  

**Content Management:**  
Course Creation • Resource Management • Assessment Tools • Built-in Messaging • Progress Reports  

---

## 🛠 Technology Stack  

### Frontend  
- **Framework:** Next.js 15 (App Router)  
- **Language:** TypeScript 5  
- **Styling:** Tailwind CSS 4  
- **Components:** shadcn/ui  
- **Icons:** Lucide React  
- **State Management:** Zustand  
- **Server State:** TanStack Query  

### Backend  
- **API:** Next.js API Routes  
- **Database:** SQLite + Prisma ORM  
- **Auth:** NextAuth.js  
- **Real-time:** Socket.io  
- **File Storage:** Local storage (cloud-ready)  

### Development Tools  
- **Package Manager:** npm  
- **Linting:** ESLint (Next.js rules)  
- **Type Checking:** TypeScript strict mode  
- **Testing:** Jest & React Testing Library  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js 18+  
- npm or yarn  
- SQLite (bundled with Prisma)  

### Installation  

```bash
git clone https://github.com/your-username/nabha-digital-learning.git
cd nabha-digital-learning
npm install
````

### Database Setup

```bash
npm run db:push
```

### Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma client
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
# Add API keys if needed
```

---

## 📁 Project Structure

```
nabha-digital-learning/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── auth-modal.tsx
│   │   ├── course-analytics.tsx
│   │   ├── course-viewer.tsx
│   │   ├── digital-literacy-module.tsx
│   │   ├── language-selector.tsx
│   │   ├── lesson-viewer.tsx
│   │   ├── student-dashboard.tsx
│   │   ├── teacher-dashboard.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.tsx
│   └── lib/                    # Utilities
│       ├── db.ts
│       ├── language-context.tsx
│       ├── performance-optimizations.ts
│       ├── socket.ts
│       └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── logo.svg
│   ├── manifest.json
│   └── sw.js
├── components.json
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔄 User Workflow

### Student Journey

1. Landing Page → Language Selection
2. Choose "Student" role
3. Simple login
4. Dashboard: Progress & Courses
5. Access lessons & assessments
6. Earn badges, view rankings

### Teacher Journey

1. Landing Page → Language Selection
2. Choose "Teacher" role
3. Login
4. Dashboard: Class metrics
5. Manage students & courses
6. Generate reports & analytics

---


Made with ❤️ for Rural Education
⭐ **Star this repository if you find it helpful!**

</div>


