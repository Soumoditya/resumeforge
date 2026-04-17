import Link from "next/link";
import { Sparkles } from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-950">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Resume<span className="text-primary-400">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-surface-200/60 max-w-sm leading-relaxed">
              Craft ATS-optimized resumes with AI-powered analysis. Your data stays
              private — we never store your information.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link href="/tailor" className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">
                  Job Tailoring
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-surface-200/60 hover:text-white hover:border-primary-500/30 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-surface-200/60 hover:text-white hover:border-primary-500/30 transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-200/40">
            © {new Date().getFullYear()} ResumeForge. Built with precision.
          </p>
          <p className="text-xs text-surface-200/30">
            Privacy-first · No data stored · 100% client-side processing
          </p>
        </div>
      </div>
    </footer>
  );
}
