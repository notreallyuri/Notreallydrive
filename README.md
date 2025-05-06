# 📄 Project Resume: Drive Tutorial
### 🔹 Overview
Drive Tutorial is a personal project by Yuri (@notreallyuri), designed as a clone of Google Drive with a modern tech stack. Inspired by Theo’s T3 Stack tutorial, it serves as an educational tool to explore scalable full-stack development practices.

### 🔧 Tech Stack
**Frontend**: React, Next.js, Tailwind CSS  

**Backend**: Node.js, Drizzle ORM, PostgreSQL  

**Build Tools**: pnpm, TypeScript  

**CI/CD**: GitHub Actions  

**Deployment Target**: Vercel  

**Utilities**: PostHog (analytics), UploadThing (file uploads)
### 📁 Repository Highlights
`.github/workflows/ci.yaml`: Defines CI pipeline for type checking and linting.  

`src/`: Core application code.  

`drizzle.config.ts`: Drizzle ORM configuration for PostgreSQL.  

`.env.example`: Reference for required environment variables.  

`package.json`: Project scripts and dependencies.
### ✅ Current Status
- File actions (upload, delete, move, etc.) fully implemented
- Folder navigation via URL fully functional
- Folder actions mostly complete (deletion logic in progress to handle recursive deletion)
- UI nearly finalized
- OAuth implemented and operational
- Redis in use for session management
- All database keys designed and active
### 📌 Features
- Clean, scalable codebase structured around modern best practices.
- Type-safe ORM with Drizzle for database interactions.
### 🗂️ Project Management
All future development tasks and feature planning are tracked under the GitHub Projects tab.
