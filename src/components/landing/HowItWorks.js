"use client";

import { FileText, Cpu, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Input Your Details",
    description:
      "Fill in your experience, education, and skills — or upload an existing resume. Our guided form makes it effortless.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Optimizes Everything",
    description:
      "Our AI analyzes your content, rewrites weak bullets, adds missing keywords, and scores your ATS compatibility in real-time.",
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    icon: Download,
    title: "Download & Apply",
    description:
      "Choose a template, download your polished PDF, and start applying with confidence. Tailor it for each job with one click.",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Steps to a{" "}
            <span className="gradient-text">Perfect Resume</span>
          </h2>
          <p className="text-surface-200/50 max-w-xl mx-auto">
            From raw information to interview-ready resume in minutes, not hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center group">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                    style={{
                      boxShadow: `0 0 30px rgba(99, 102, 241, 0.15)`,
                    }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-primary-400 bg-surface-950 px-1.5 py-0.5 rounded-md border border-primary-500/20">
                    {item.step}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-surface-200/50 leading-relaxed max-w-sm mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
