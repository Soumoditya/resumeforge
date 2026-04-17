import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ResumeProvider } from "@/context/ResumeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "ResumeForge — AI-Powered Resume Builder & Analyzer",
  description:
    "Craft ATS-optimized resumes with AI. Generate, analyze, and tailor your resume to land more interviews. Privacy-first, no data stored.",
  keywords: [
    "resume builder",
    "ATS resume",
    "resume analyzer",
    "AI resume",
    "job application",
    "career tools",
    "resume score",
    "resume templates",
  ],
  authors: [{ name: "ResumeForge" }],
  openGraph: {
    title: "ResumeForge — AI-Powered Resume Builder & Analyzer",
    description:
      "Craft ATS-optimized resumes with AI. Generate, analyze, and tailor your resume to land more interviews.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge — AI-Powered Resume Builder & Analyzer",
    description:
      "Craft ATS-optimized resumes with AI. Generate, analyze, and tailor your resume to land more interviews.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <ResumeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ResumeProvider>
      </body>
    </html>
  );
}
