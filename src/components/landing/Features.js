"use client";

import {
  PenLine,
  BarChart3,
  Target,
  LayoutTemplate,
  Shield,
  Download,
} from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "AI Resume Builder",
    description:
      "Step-by-step guided builder with AI-powered content suggestions. Generates impact-driven bullet points automatically.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: BarChart3,
    title: "Smart Analyzer",
    description:
      "Upload your resume and get an instant ATS compatibility score with section-by-section feedback and improvement tips.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Target,
    title: "Job Tailoring",
    description:
      "Paste any job description and our AI rewrites your resume to match, highlighting keyword gaps and optimization opportunities.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: LayoutTemplate,
    title: "ATS-Proven Templates",
    description:
      "Four professionally designed templates that are tested to pass ATS systems while looking polished to human recruiters.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description:
      "Your data never leaves your browser. No accounts, no databases, no tracking. Everything processes in-session and is gone when you close the tab.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    description:
      "Download your polished resume as a clean, print-ready PDF. Perfectly formatted every time, ready for submission.",
    color: "from-rose-500 to-red-500",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative" id="features">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Land Interviews</span>
          </h2>
          <p className="text-surface-200/50 max-w-2xl mx-auto">
            A complete toolkit designed around how modern recruiters and ATS
            systems actually evaluate resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-200/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
