"use client";

import { useState } from "react";
import {
  Target, Loader2, ArrowRight, CheckCircle2, AlertTriangle,
  Copy, Check, FileText, Sparkles,
} from "lucide-react";

export default function TailorPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTailor = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to tailor resume");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/parse", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResumeText(data.text);
    } catch (err) {
      setError(err.message || "Failed to parse file");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="section-container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Job Tailoring</h1>
          <p className="text-surface-200/50">
            Paste your resume and a job description — AI will optimize your resume to match.
          </p>
        </div>

        {!result ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resume Input */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-surface-200/60 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Your Resume
                  </h3>
                  <label className="btn-secondary text-xs py-1.5 px-3 cursor-pointer">
                    Upload File
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your full resume text here, or upload a file..."
                  rows={16}
                  className="input-field text-sm resize-none"
                />
              </div>

              {/* Job Description Input */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-surface-200/60 flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4" />
                  Job Description
                </h3>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={16}
                  className="input-field text-sm resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 mt-4">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleTailor}
                disabled={!resumeText.trim() || !jobDescription.trim() || isLoading}
                className="btn-primary text-base px-10 py-3.5"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Tailoring Resume...</>
                ) : (
                  <><Target className="w-5 h-5" /> Tailor My Resume</>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <button onClick={() => setResult(null)} className="btn-secondary text-sm">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Start Over
            </button>

            {/* Match Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <h3 className="text-sm text-surface-200/50 mb-2">Match Score</h3>
                <div className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                  {result.matchScore}
                  <span className="text-lg text-surface-200/30">%</span>
                </div>
                <p className="text-xs text-surface-200/40">
                  {result.matchScore >= 80 ? "Strong match" : result.matchScore >= 60 ? "Good match" : "Needs optimization"}
                </p>
              </div>

              {/* Keywords Matched */}
              <div className="glass-card p-6">
                <h3 className="text-sm text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Keywords Matched
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordAnalysis?.matched?.slice(0, 12).map((kw, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keywords Missing */}
              <div className="glass-card p-6">
                <h3 className="text-sm text-amber-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordAnalysis?.missing?.slice(0, 12).map((kw, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tailored Resume */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                  Tailored Resume
                </h3>
                <button
                  onClick={() => handleCopy(result.tailoredResume)}
                  className="btn-secondary text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 max-h-[500px] overflow-y-auto">
                <pre className="text-sm text-surface-200/70 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                  {result.tailoredResume}
                </pre>
              </div>
            </div>

            {/* Changes Made */}
            {result.changes?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-primary-400 mb-4">Changes Made</h3>
                <div className="space-y-4">
                  {result.changes.map((change, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/3 border border-white/5">
                      <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded mb-2 inline-block">
                        {change.section}
                      </span>
                      <div className="text-sm text-red-300/50 line-through mb-1">{change.original}</div>
                      <div className="text-sm text-emerald-300/70">{change.revised}</div>
                      <p className="text-xs text-surface-200/30 mt-1">{change.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {result.additionalTips?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-cyan-400 mb-3">Additional Tips</h3>
                <ul className="space-y-2">
                  {result.additionalTips.map((tip, i) => (
                    <li key={i} className="text-sm text-surface-200/60 flex items-start gap-2">
                      <span className="text-cyan-400/60 mt-0.5">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
