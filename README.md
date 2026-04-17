# ResumeForge

> AI-Powered Resume Builder & Analyzer — Craft ATS-optimized resumes that land interviews.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-2.0-purple?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

## About

ResumeForge is a full-stack SaaS platform that helps job seekers create, analyze, and optimize their resumes using AI. Built with a privacy-first architecture — your data never leaves your browser session.

## Features

### Resume Builder
- Step-by-step guided form with live preview
- 4 ATS-tested professional templates
- AI-powered bullet point enhancement
- One-click PDF export

### Resume Analyzer
- Upload PDF, DOCX, or TXT files
- Instant ATS compatibility score (0-100)
- Section-by-section feedback (Formatting, Content, Keywords, Impact)
- AI-powered improvement suggestions with priority levels
- Bullet point strength analysis with rewritten alternatives

### Job Tailoring
- Side-by-side resume and job description comparison
- AI rewrites resume to match job requirements
- Keyword gap detection with matched/missing analysis
- Change tracking with before/after comparison

### Privacy-First
- No accounts required
- No server-side data storage
- All processing happens in-session
- Data cleared when you close the tab

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **Tailwind CSS v4** | Utility-first styling |
| **Google Gemini AI** | Resume analysis and content generation |
| **pdf-parse** | Server-side PDF text extraction |
| **mammoth** | Server-side DOCX text extraction |
| **Lucide React** | Icon system |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resumeforge.git
cd resumeforge

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |

## Project Structure

```
src/
├── app/
│   ├── page.js              # Landing page
│   ├── create/page.js       # Resume builder
│   ├── analyze/page.js      # Resume analyzer
│   ├── tailor/page.js       # Job tailoring
│   ├── templates/page.js    # Template gallery
│   └── api/                 # Serverless API routes
├── components/
│   ├── landing/             # Landing page sections
│   ├── layout/              # Navbar & Footer
│   └── ui/                  # Reusable components
├── context/                 # React context (state management)
└── lib/                     # Utilities, AI client, scoring
```

## Architecture

- **Frontend**: Server-rendered landing page with client-side interactive tools
- **API Layer**: Next.js API routes for AI processing and file parsing
- **State Management**: React Context + useReducer with localStorage persistence
- **AI Integration**: Google Gemini 2.0 Flash for analysis, generation, and tailoring
- **Scoring**: Dual scoring system — instant client-side ATS scoring + deep AI analysis

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy your own:

1. Push code to GitHub
2. Import repository on Vercel
3. Add `GEMINI_API_KEY` environment variable
4. Deploy

## Screenshots

> Screenshots will be added after deployment.

## License

MIT License — see [LICENSE](LICENSE) for details.
