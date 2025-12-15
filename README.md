# EduPlus

EduPlus is a modern EdTech web application that enables **educators to create structured courses and lessons**, while **students can explore and learn through curated content enhanced with AI-generated summaries**.

The platform focuses on clean UX, role-based access, and practical full-stack implementation.

---

## Features

### Authentication & Roles
- Secure authentication using **NextAuth (Credentials)**
- Role-based access:
  - **Educator** – create, edit, delete courses and lessons
  - **Student** – browse courses and view lessons

### Courses & Lessons (Full CRUD)
- Create, update, delete courses
- Add, edit, delete lessons under each course
- Text-based lesson content with optional reference links
- Relational data handled via Prisma & PostgreSQL

### AI-Powered Course Summary
- Generates a concise summary using **Google Gemini AI**
- Uses course title, description, and lesson content
- Gracefully handles missing AI quota

### UI & UX
- Clean dashboard with role-based content
- Consistent top bar and sidebar layout
- Responsive, production-style UI using **Tailwind CSS & shadcn/ui**

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel

---

## Demo Credentials

Use the following credentials to explore the platform:

### Educator
- **Email:** educator@eduplus.com  
- **Password:** EduPlus@123  

### Student
- **Email:** student@eduplus.com  
- **Password:** EduPlus@123  

---

## Environment Variables

The following environment variables are required:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GEMINI_API_KEY=

---

## Project Highlights

- Full-stack application built using **Next.js App Router**
- Role-based dashboards with **educator and student permissions**
- Real-world **CRUD operations** implemented using **Prisma ORM**
- **AI-powered course summaries** with graceful fallback handling
- Clean, minimal, and evaluator-friendly UI design

---

## Notes

- AI summaries depend on an external AI API quota.
- If the AI quota is unavailable, the application displays a fallback message without breaking core functionality.

---

## Author

**Mohd Zaid**  
Full Stack Developer
https://www.linkedin.com/in/mohd-zaid-5730a4248/