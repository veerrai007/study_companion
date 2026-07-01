# StudyCompanion — AI-Powered Study Assistant

A full-stack web application that accelerates learning and enhances retention. Users upload study materials (PDF, Word, or plain text), and the app automatically extracts content, summarizes key concepts, and generates interactive quizzes powered by Gemini AI.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Library | React 19.2 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB + Mongoose |
| Authentication | NextAuth.js |
| AI Integration | Google Gemini AI (`gemini-3-flash-preview`) |

---

## ✨ Features

### 📄 Document Upload & Processing
- Upload study materials in **PDF**, **Word (.docx)**, and **plain text (.txt)** formats
- Automatic text extraction using `pdf2json` (PDF), `mammoth` (DOCX), and native file reading (TXT)
- Stores document metadata and extracted content in MongoDB

### 🤖 AI-Powered Analysis
- Generates concise **summaries** of uploaded documents
- Extracts **key points and concepts** from study material
- Assigns a **difficulty rating** (Beginner / Intermediate / Advanced) to each document

### 📝 Custom Quiz Generation
- Dynamically generates quizzes based on your uploaded documents
- Flexible **question count** and **difficulty** settings
- Mixed question types: Multiple Choice (60%), True/False (20%), Fill in the Blank (20%)
- Instant grading with **explanations and feedback** for each answer

### 📊 Analytics Dashboard
- Tracks total quiz attempts
- Displays average scores and best performance
- Monitors study time across sessions

### 🔐 Authentication
- Complete registration and login system via **NextAuth.js**
- Secure session management

---

## 📁 Project Structure

```
study_companion/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (document)/
│   │   │   ├── document-detail/
│   │   │   └── documentPage/
│   │   ├── (quiz)/         
│   │   │   ├── quizzes/
│   │   │   ├── quiz-take/
│   │   │   └── quiz-results/
│   │   ├── api/            
│   │   │   ├── (documents)/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── quiz/
│   │   │   └── sign-up/
│   │   ├── dashboard/      
│   │   ├── globals.css     
│   │   ├── layout.tsx      
│   │   └── page.tsx       
│   ├── components/         
│   │   ├── ui/             
│   │   ├── Document.tsx    
│   │   ├── Form.tsx        
│   │   ├── Nav.tsx         
│   │   ├── QuizModal.tsx   
│   │   └── UplaodModal.tsx 
│   ├── context/            
│   │   ├── AuthProvider.tsx
│   │   └── quizContext.tsx
│   ├── lib/                
│   │   ├── DB.ts           
│   │   └── utils.ts        
│   ├── models/             
│   │   ├── Document.ts
│   │   ├── Quiz.ts
│   │   └── User.ts
│   ├── schema/             
│   │   ├── loginSchema.ts
│   │   ├── signupSchema.ts
│   │   └── UploadDocumentSchema.ts
│   ├── services/           # Core business logic / third-party services
│   │   ├── aiServices.ts        # Gemini AI quiz generation & document analysis
│   │   └── documentProcessor.ts # PDF, DOCX, and TXT parser
│   └── types/              
│       ├── ApiResponse.ts
│       └── next-auth.d.ts
├── .env.example           
├── components.json         
├── next.config.ts          
├── package.json            
├── postcss.config.mjs      
├── tsconfig.json           
└── README.md               
```

## ⚙️ Getting Started

### Prerequisites

- Node.js v20+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Gemini API Key](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/study-companion.git
cd study-companion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Gemini AI
GEMINI_API=your_gemini_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 🧠 Application Workflow

```
Upload PDF / DOCX / TXT
        ↓
DocumentProcessor extracts raw text
        ↓
Gemini AI analyzes content
        ↓
Summary + Key Points + Difficulty saved to MongoDB
        ↓
User views insights on Dashboard
        ↓
Generate dynamic quiz from document
        ↓
Take quiz → results + analytics saved to MongoDB
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/documents/upload` | Upload and process document |
| GET | `/api/documents` | Get all user documents |
| GET | `/api/documents/[id]` | Get single document |
| DELETE | `/api/documents/[id]` | Delete document |
| POST | `/api/quiz/generate` | Generate quiz from document |
| GET | `/api/quiz/[id]` | Get quiz by id |
| POST | `/api/quiz/[id]/attempt` | Submit quiz attempt |

---

## 📦 Key Dependencies

```json
{
  "next": "^16.2",
  "react": "^19.2",
  "mongoose": "^8",
  "next-auth": "^4",
  "@google/genai": "latest",
  "pdf2json": "^3",
  "mammoth": "^1",
  "tailwindcss": "^4"
}
```

Install all at once:

```bash
npm install mongoose next-auth @google/genai pdf2json mammoth
```

---

## 🔒 Environment Variables Reference

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption |
| `NEXTAUTH_URL` | Base URL of your app (e.g. `http://localhost:3000`) |
| `GEMINI_API` | Your Google Gemini API key |

---

## 🧠 Architecture Decisions

- **DocumentProcessor service** — Handles file type detection and text extraction separately from AI logic, keeping concerns isolated and making it easy to add new file formats
- **AI service layer** — All Gemini API interactions live in `aiServices.ts`, making it straightforward to swap AI providers without touching UI code
- **NextAuth.js** — Handles session management, JWT, and auth routes out of the box, reducing boilerplate
- **MongoDB with Mongoose** — Flexible schema fits the varied structure of AI-generated content (summaries, key points, quiz questions) without rigid table constraints
- **Mixed quiz question types** — 60/20/20 split between MCQ, True/False, and Fill in the Blank ensures varied, effective assessment rather than monotonous question formats

---

## 📄 License

This project is for educational use only.



