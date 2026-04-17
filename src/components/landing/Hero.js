"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="glow-orb w-[500px] h-[500px] bg-primary-500 top-[-10%] left-[-10%]" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-500 bottom-[-5%] right-[-5%]" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500 top-[40%] right-[20%] opacity-[0.08]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10 text-center max-w-4xl mx-auto py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Resume Platform
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
          <span className="text-white">Craft Resumes</span>
          <br />
          <span className="gradient-text">That Get Interviews</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-surface-200/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100" style={{ animationFillMode: "backwards" }}>
          Build ATS-optimized resumes, get instant AI feedback, and tailor your
          resume to any job description — all while keeping your data completely
          private.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up delay-200" style={{ animationFillMode: "backwards" }}>
          <Link href="/create" className="btn-primary text-base px-8 py-3.5">
            Start Building Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/analyze" className="btn-secondary text-base px-8 py-3.5">
            Analyze My Resume
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-surface-200/40 animate-fade-in delay-300" style={{ animationFillMode: "backwards" }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400/60" />
            <span>Privacy-First</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400/60" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-400/60" />
            <span>ATS-Optimized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
