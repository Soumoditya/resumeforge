"use client";

import { useState, useCallback } from "react";
import { useResume } from "@/context/ResumeContext";
import { STEPS, EMPTY_EXPERIENCE, EMPTY_EDUCATION, SKILL_CATEGORIES } from "@/lib/constants";
import { renderResumeHTML } from "@/lib/resume-templates";
import {
  User, Briefcase, GraduationCap, Wrench, Eye,
  Plus, Trash2, ChevronLeft, ChevronRight, Download,
  Sparkles, Loader2, ArrowLeft, ArrowRight, X,
} from "lucide-react";

const ICON_MAP = { User, Briefcase, GraduationCap, Wrench, Eye };

export default function CreatePage() {
  const { resume, dispatch } = useResume();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleAIEnhance = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: resume, targetRole }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.summary) {
        dispatch({ type: "SET_PERSONAL", payload: { summary: data.summary } });
      }
      if (data.experience) {
        data.experience.forEach((exp) => {
          const match = resume.experience.find(
            (e) => e.company.toLowerCase() === exp.company.toLowerCase()
          );
          if (match) {
            dispatch({
              type: "UPDATE_EXPERIENCE",
              payload: { id: match.id, bullets: exp.bullets },
            });
          }
        });
      }
      if (data.skills) {
        dispatch({ type: "SET_SKILLS", payload: data.skills });
      }
    } catch (err) {
      console.error("AI enhance error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const html = renderResumeHTML(resume, resume.selectedTemplate);
    const blob = new Blob([html], { type: "text/html" });
    const printWindow = window.open("", "_blank");
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="section-container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Build Your Resume</h1>
          <p className="text-surface-200/50">
            Fill in your details and let AI help craft the perfect resume.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const Icon = ICON_MAP[s.icon];
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary-500/15 text-primary-300 border border-primary-500/30"
                    : isCompleted
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-white/3 text-surface-200/40 border border-white/5 hover:border-white/10"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6">
              {step === 1 && <PersonalInfoStep resume={resume} dispatch={dispatch} />}
              {step === 2 && <ExperienceStep resume={resume} dispatch={dispatch} />}
              {step === 3 && <EducationStep resume={resume} dispatch={dispatch} />}
              {step === 4 && <SkillsStep resume={resume} dispatch={dispatch} />}
              {step === 5 && (
                <PreviewStep
                  resume={resume}
                  dispatch={dispatch}
                  onDownload={handleDownload}
                  onAIEnhance={handleAIEnhance}
                  isGenerating={isGenerating}
                  targetRole={targetRole}
                  setTargetRole={setTargetRole}
                />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                {step < 5 ? (
                  <button onClick={nextStep} className="btn-primary">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={handleDownload} className="btn-primary">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-surface-200/50">Live Preview</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden btn-secondary text-xs py-1.5 px-3"
                >
                  {showPreview ? "Hide" : "Show"} Preview
                </button>
              </div>
              <div className={`${showPreview ? "block" : "hidden"} lg:block`}>
                <div className="glass-card overflow-hidden" style={{ aspectRatio: "8.5/11" }}>
                  <iframe
                    srcDoc={renderResumeHTML(resume, resume.selectedTemplate)}
                    className="w-full h-full border-0 bg-white rounded-2xl"
                    title="Resume Preview"
                    style={{ transform: "scale(1)", transformOrigin: "top left" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== STEP COMPONENTS ==================== */

function PersonalInfoStep({ resume, dispatch }) {
  const update = (field, value) =>
    dispatch({ type: "SET_PERSONAL", payload: { [field]: value } });

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">Personal Information</h2>
      <p className="text-sm text-surface-200/40 mb-6">Add your contact details and professional summary.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={resume.personal.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="John Doe"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Email *</label>
          <input
            type="email"
            value={resume.personal.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@example.com"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Phone</label>
          <input
            type="tel"
            value={resume.personal.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Location</label>
          <input
            type="text"
            value={resume.personal.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="San Francisco, CA"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">LinkedIn</label>
          <input
            type="url"
            value={resume.personal.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">GitHub</label>
          <input
            type="url"
            value={resume.personal.github}
            onChange={(e) => update("github", e.target.value)}
            placeholder="github.com/johndoe"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Portfolio</label>
          <input
            type="url"
            value={resume.personal.portfolio}
            onChange={(e) => update("portfolio", e.target.value)}
            placeholder="johndoe.dev"
            className="input-field"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-surface-200/70 mb-1.5">Professional Summary</label>
          <textarea
            value={resume.personal.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="Results-driven software developer with 3+ years of experience building scalable web applications..."
            rows={4}
            className="input-field resize-none"
          />
          <p className="text-xs text-surface-200/30 mt-1.5">2-3 sentences highlighting your key strengths and target role.</p>
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({ resume, dispatch }) {
  const addExperience = () =>
    dispatch({ type: "ADD_EXPERIENCE", payload: { ...EMPTY_EXPERIENCE } });

  const updateExp = (id, field, value) =>
    dispatch({ type: "UPDATE_EXPERIENCE", payload: { id, [field]: value } });

  const updateBullet = (expId, index, value) => {
    const exp = resume.experience.find((e) => e.id === expId);
    const bullets = [...exp.bullets];
    bullets[index] = value;
    dispatch({ type: "UPDATE_EXPERIENCE", payload: { id: expId, bullets } });
  };

  const addBullet = (expId) => {
    const exp = resume.experience.find((e) => e.id === expId);
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { id: expId, bullets: [...exp.bullets, ""] },
    });
  };

  const removeBullet = (expId, index) => {
    const exp = resume.experience.find((e) => e.id === expId);
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { id: expId, bullets: exp.bullets.filter((_, i) => i !== index) },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Work Experience</h2>
          <p className="text-sm text-surface-200/40">Add your work history, most recent first.</p>
        </div>
        <button onClick={addExperience} className="btn-secondary text-sm">
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {resume.experience.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <Briefcase className="w-10 h-10 text-surface-200/20 mx-auto mb-3" />
          <p className="text-surface-200/40 text-sm">No experience added yet</p>
          <button onClick={addExperience} className="btn-primary text-sm mt-4">
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {resume.experience.map((exp, idx) => (
            <div key={exp.id} className="p-5 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded">
                  Position {idx + 1}
                </span>
                <button
                  onClick={() => dispatch({ type: "REMOVE_EXPERIENCE", payload: exp.id })}
                  className="text-red-400/60 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Job Title *</label>
                  <input
                    value={exp.title}
                    onChange={(e) => updateExp(exp.id, "title", e.target.value)}
                    placeholder="Software Engineer"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Company *</label>
                  <input
                    value={exp.company}
                    onChange={(e) => updateExp(exp.id, "company", e.target.value)}
                    placeholder="Acme Inc."
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Location</label>
                  <input
                    value={exp.location}
                    onChange={(e) => updateExp(exp.id, "location", e.target.value)}
                    placeholder="Remote"
                    className="input-field text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-surface-200/50 mb-1">Start</label>
                    <input
                      value={exp.startDate}
                      onChange={(e) => updateExp(exp.id, "startDate", e.target.value)}
                      placeholder="Jan 2023"
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-surface-200/50 mb-1">End</label>
                    <input
                      value={exp.current ? "Present" : exp.endDate}
                      onChange={(e) => updateExp(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                      placeholder="Present"
                      className="input-field text-sm disabled:opacity-40"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 mt-3 text-sm text-surface-200/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExp(exp.id, "current", e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-primary-500"
                />
                Currently working here
              </label>

              <div className="mt-4">
                <label className="block text-xs font-medium text-surface-200/50 mb-2">
                  Bullet Points — Focus on impact, use action verbs, include metrics
                </label>
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 mb-2">
                    <span className="text-surface-200/20 text-xs mt-3">•</span>
                    <textarea
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                      placeholder="Built a scalable REST API serving 10K+ daily requests using Node.js and PostgreSQL"
                      rows={2}
                      className="input-field text-sm flex-1 resize-none"
                    />
                    {exp.bullets.length > 1 && (
                      <button
                        onClick={() => removeBullet(exp.id, bIdx)}
                        className="text-red-400/40 hover:text-red-400 p-1 mt-2"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addBullet(exp.id)} className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 mt-1">
                  <Plus className="w-3 h-3" />
                  Add bullet point
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationStep({ resume, dispatch }) {
  const addEducation = () =>
    dispatch({ type: "ADD_EDUCATION", payload: { ...EMPTY_EDUCATION } });

  const updateEdu = (id, field, value) =>
    dispatch({ type: "UPDATE_EDUCATION", payload: { id, [field]: value } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Education</h2>
          <p className="text-sm text-surface-200/40">Add your educational background.</p>
        </div>
        <button onClick={addEducation} className="btn-secondary text-sm">
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {resume.education.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <GraduationCap className="w-10 h-10 text-surface-200/20 mx-auto mb-3" />
          <p className="text-surface-200/40 text-sm">No education added yet</p>
          <button onClick={addEducation} className="btn-primary text-sm mt-4">
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {resume.education.map((edu, idx) => (
            <div key={edu.id} className="p-5 rounded-xl border border-white/5 bg-white/2">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Education {idx + 1}
                </span>
                <button
                  onClick={() => dispatch({ type: "REMOVE_EDUCATION", payload: edu.id })}
                  className="text-red-400/60 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">School / University *</label>
                  <input
                    value={edu.school}
                    onChange={(e) => updateEdu(edu.id, "school", e.target.value)}
                    placeholder="Stanford University"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Degree *</label>
                  <input
                    value={edu.degree}
                    onChange={(e) => updateEdu(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor of Computer Applications"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Field of Study</label>
                  <input
                    value={edu.field}
                    onChange={(e) => updateEdu(edu.id, "field", e.target.value)}
                    placeholder="Computer Science"
                    className="input-field text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-surface-200/50 mb-1">Start</label>
                    <input
                      value={edu.startDate}
                      onChange={(e) => updateEdu(edu.id, "startDate", e.target.value)}
                      placeholder="Aug 2020"
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-surface-200/50 mb-1">End</label>
                    <input
                      value={edu.endDate}
                      onChange={(e) => updateEdu(edu.id, "endDate", e.target.value)}
                      placeholder="May 2024"
                      className="input-field text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">GPA (optional)</label>
                  <input
                    value={edu.gpa}
                    onChange={(e) => updateEdu(edu.id, "gpa", e.target.value)}
                    placeholder="3.8 / 4.0"
                    className="input-field text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-surface-200/50 mb-1">Relevant Coursework</label>
                  <input
                    value={edu.coursework}
                    onChange={(e) => updateEdu(edu.id, "coursework", e.target.value)}
                    placeholder="Data Structures, Algorithms, Web Development, Database Systems"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsStep({ resume, dispatch }) {
  const [inputValues, setInputValues] = useState({});

  const addSkill = (category, value) => {
    if (!value.trim()) return;
    const current = resume.skills[category] || [];
    if (!current.includes(value.trim())) {
      dispatch({
        type: "SET_SKILLS",
        payload: { [category]: [...current, value.trim()] },
      });
    }
    setInputValues((prev) => ({ ...prev, [category]: "" }));
  };

  const removeSkill = (category, skill) => {
    dispatch({
      type: "SET_SKILLS",
      payload: { [category]: resume.skills[category].filter((s) => s !== skill) },
    });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(category, inputValues[category] || "");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">Technical Skills</h2>
      <p className="text-sm text-surface-200/40 mb-6">
        Type a skill and press Enter or comma to add it.
      </p>

      <div className="space-y-5">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <label className="block text-sm font-medium text-surface-200/60 mb-2">
              {cat.label}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(resume.skills[cat.key] || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary-500/10 text-primary-300 text-sm border border-primary-500/20"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(cat.key, skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={inputValues[cat.key] || ""}
              onChange={(e) =>
                setInputValues((prev) => ({ ...prev, [cat.key]: e.target.value }))
              }
              onKeyDown={(e) => handleKeyDown(e, cat.key)}
              placeholder={cat.placeholder}
              className="input-field text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewStep({ resume, dispatch, onDownload, onAIEnhance, isGenerating, targetRole, setTargetRole }) {
  const templates = ["professional", "modern", "minimal", "executive"];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">Preview & Finalize</h2>
      <p className="text-sm text-surface-200/40 mb-6">
        Choose a template, enhance with AI, and download your resume.
      </p>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-surface-200/60 mb-3">Select Template</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => dispatch({ type: "SET_TEMPLATE", payload: t })}
              className={`p-3 rounded-xl text-sm font-medium capitalize transition-all ${
                resume.selectedTemplate === t
                  ? "bg-primary-500/15 text-primary-300 border-2 border-primary-500/40"
                  : "bg-white/3 text-surface-200/50 border-2 border-transparent hover:border-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* AI Enhancement */}
      <div className="p-5 rounded-xl border border-primary-500/20 bg-primary-500/5 mb-6">
        <h3 className="text-sm font-semibold text-primary-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          AI Enhancement
        </h3>
        <div className="mb-3">
          <label className="block text-xs font-medium text-surface-200/50 mb-1">Target Role (optional)</label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Frontend Developer, Full-Stack Engineer"
            className="input-field text-sm"
          />
        </div>
        <button
          onClick={onAIEnhance}
          disabled={isGenerating}
          className="btn-primary text-sm w-full justify-center"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enhancing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Enhance Resume with AI
            </>
          )}
        </button>
        <p className="text-xs text-surface-200/30 mt-2 text-center">
          AI will improve your bullet points, add metrics, and optimize for ATS.
        </p>
      </div>

      {/* Download */}
      <button onClick={onDownload} className="btn-primary w-full justify-center text-base py-3.5">
        <Download className="w-5 h-5" />
        Download as PDF
      </button>
      <p className="text-xs text-surface-200/30 mt-2 text-center">
        Opens print dialog — select &quot;Save as PDF&quot; to download.
      </p>
    </div>
  );
}
