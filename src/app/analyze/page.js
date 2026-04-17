"use client";

import { useState, useRef } from "react";
import { scoreResume } from "@/lib/scoring";
import {
  Upload, FileText, BarChart3, AlertTriangle, CheckCircle2,
  ChevronDown, ChevronUp, Loader2, Sparkles, TrendingUp,
  Search, Star, X, ArrowRight,
} from "lucide-react";

export default function AnalyzePage() {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [localScore, setLocalScore] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (selectedFile) => {
    setFile(selectedFile);
    setError("");
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/parse", { method: "POST", body: formData });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setResumeText(data.text);
    } catch (err) {
      setError(err.message || "Failed to parse file");
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setError("");

    // Local scoring (instant)
    const local = scoreResume(resumeText);
    setLocalScore(local);

    // AI analysis
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAiAnalysis(data);
    } catch (err) {
      console.error("AI analysis failed:", err);
      // Local score still shows even if AI fails
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResumeText("");
    setFile(null);
    setLocalScore(null);
    setAiAnalysis(null);
    setError("");
  };

  const hasResults = localScore || aiAnalysis;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="section-container max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Resume Analyzer</h1>
          <p className="text-surface-200/50">
            Upload your resume and get an instant ATS score with AI-powered improvement suggestions.
          </p>
        </div>

        {!hasResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Zone */}
            <div
              className={`glass-card p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-all ${
                dragActive ? "border-primary-500/50 bg-primary-500/5" : ""
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
              />
              {isParsing ? (
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-primary-400 animate-spin mx-auto mb-3" />
                  <p className="text-surface-200/60">Parsing {file?.name}...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-primary-400/50 mb-4" />
                  <p className="text-white font-medium mb-1">
                    Drop your resume here or click to browse
                  </p>
                  <p className="text-sm text-surface-200/40">
                    Supports PDF, DOCX, and TXT files
                  </p>
                  {file && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Text Input */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-medium text-surface-200/60 mb-3">Or paste your resume text</h3>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your full resume text here..."
                rows={12}
                className="input-field text-sm resize-none mb-4"
              />
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <button
                onClick={handleAnalyze}
                disabled={!resumeText.trim() || isAnalyzing}
                className="btn-primary w-full justify-center"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                ) : (
                  <><BarChart3 className="w-4 h-4" /> Analyze Resume</>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={reset} className="btn-secondary text-sm mb-6">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Analyze Another Resume
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Card */}
              <div className="glass-card p-6 text-center">
                <h3 className="text-sm font-medium text-surface-200/50 mb-4">ATS Score</h3>
                <ScoreRing score={aiAnalysis?.overallScore || localScore?.overall || 0} />
                <p className="text-sm text-surface-200/40 mt-4">
                  {getScoreLabel(aiAnalysis?.overallScore || localScore?.overall || 0)}
                </p>
              </div>

              {/* Category Scores */}
              <div className="lg:col-span-2 glass-card p-6">
                <h3 className="text-sm font-medium text-surface-200/50 mb-4">Category Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "formatting", label: "Formatting", icon: FileText, color: "text-blue-400" },
                    { key: "content", label: "Content", icon: Star, color: "text-purple-400" },
                    { key: "keywords", label: "Keywords", icon: Search, color: "text-amber-400" },
                    { key: "impact", label: "Impact", icon: TrendingUp, color: "text-emerald-400" },
                  ].map((cat) => {
                    const score = aiAnalysis?.scores?.[cat.key] || localScore?.categories?.[cat.key]?.score || 0;
                    return (
                      <div key={cat.key} className="p-4 rounded-xl bg-white/3 border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <cat.icon className={`w-4 h-4 ${cat.color}`} />
                          <span className="text-sm font-medium text-surface-200/70">{cat.label}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{score}</div>
                        <div className="w-full h-1.5 rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${score}%`,
                              backgroundColor: score >= 80 ? "#10b981" : score >= 60 ? "#6366f1" : score >= 40 ? "#f59e0b" : "#ef4444",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AI Feedback */}
            {isAnalyzing && (
              <div className="glass-card p-8 mt-6 text-center">
                <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto mb-3" />
                <p className="text-surface-200/60">AI is analyzing your resume...</p>
                <p className="text-xs text-surface-200/30 mt-1">This may take 10-15 seconds</p>
              </div>
            )}

            {aiAnalysis && (
              <div className="mt-6 space-y-6">
                {/* Summary */}
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">AI Assessment</h3>
                  <p className="text-surface-200/60 leading-relaxed">{aiAnalysis.summary}</p>
                </div>

                {/* Strengths */}
                {aiAnalysis.strengths?.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {aiAnalysis.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-surface-200/60 flex items-start gap-2">
                          <span className="text-emerald-400/60 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {aiAnalysis.improvements?.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Improvements Needed
                    </h3>
                    <div className="space-y-3">
                      {aiAnalysis.improvements.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/3 border border-white/5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                              item.priority === "high" ? "bg-red-500/15 text-red-400" :
                              item.priority === "medium" ? "bg-amber-500/15 text-amber-400" :
                              "bg-blue-500/15 text-blue-400"
                            }`}>{item.priority}</span>
                            <span className="text-xs text-surface-200/30 uppercase">{item.category}</span>
                          </div>
                          <p className="text-sm text-surface-200/70 font-medium">{item.issue}</p>
                          <p className="text-sm text-surface-200/50 mt-1">{item.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bullet Analysis */}
                {aiAnalysis.bulletAnalysis?.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-primary-400 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Bullet Point Improvements
                    </h3>
                    <div className="space-y-4">
                      {aiAnalysis.bulletAnalysis.slice(0, 5).map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/3 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                              item.strength === "strong" ? "bg-emerald-500/15 text-emerald-400" :
                              item.strength === "medium" ? "bg-amber-500/15 text-amber-400" :
                              "bg-red-500/15 text-red-400"
                            }`}>{item.strength}</span>
                          </div>
                          <p className="text-sm text-red-300/60 line-through mb-1">{item.original}</p>
                          <p className="text-sm text-emerald-300/80">{item.improved}</p>
                          <p className="text-xs text-surface-200/30 mt-1">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreRing({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#6366f1" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="score-ring">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="75" cy="75" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <span className="absolute text-4xl font-bold text-white" style={{ fontFamily: "var(--font-mono)" }}>
        {score}
      </span>
    </div>
  );
}

function getScoreLabel(score) {
  if (score >= 85) return "Excellent — Your resume is highly competitive";
  if (score >= 70) return "Good — A few tweaks will make it stronger";
  if (score >= 50) return "Fair — Significant improvements recommended";
  return "Needs Work — Major revisions suggested";
}
