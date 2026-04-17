import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-surface-950 to-purple-900/20" />
      <div className="glow-orb w-[400px] h-[400px] bg-primary-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="section-container relative z-10 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          Ready to Land Your Next{" "}
          <span className="gradient-text">Interview?</span>
        </h2>
        <p className="text-lg text-surface-200/50 max-w-xl mx-auto mb-10">
          Join thousands of job seekers who craft better resumes with
          ResumeForge. Free, private, and instant.
        </p>
        <Link
          href="/create"
          className="btn-primary text-lg px-10 py-4 inline-flex"
        >
          Build Your Resume Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
