"use client";

import { useRouter } from "next/navigation";
import { useResume } from "@/context/ResumeContext";
import { getTemplateList } from "@/lib/resume-templates";
import { Check, ArrowRight } from "lucide-react";

const previewColors = {
  professional: {
    accent: "#2563eb",
    headerBg: "transparent",
    lines: ["w-24", "w-32", "w-20"],
  },
  modern: {
    accent: "#6366f1",
    headerBg: "#1e293b",
    lines: ["w-28", "w-20", "w-24"],
  },
  minimal: {
    accent: "#374151",
    headerBg: "transparent",
    lines: ["w-20", "w-28", "w-16"],
  },
  executive: {
    accent: "#0f172a",
    headerBg: "#0f172a",
    lines: ["w-26", "w-22", "w-30"],
  },
};

export default function TemplatesPage() {
  const router = useRouter();
  const { resume, dispatch } = useResume();
  const templates = getTemplateList();

  const selectTemplate = (id) => {
    dispatch({ type: "SET_TEMPLATE", payload: id });
  };

  const useTemplate = (id) => {
    dispatch({ type: "SET_TEMPLATE", payload: id });
    router.push("/create");
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="section-container max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Resume Templates</h1>
          <p className="text-surface-200/50 max-w-lg mx-auto">
            All templates are ATS-tested and recruiter-approved. Choose one and start
            building your resume.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {templates.map((template) => {
            const isSelected = resume.selectedTemplate === template.id;
            const colors = previewColors[template.id];

            return (
              <div
                key={template.id}
                className={`glass-card overflow-hidden transition-all cursor-pointer group ${
                  isSelected ? "border-primary-500/40 ring-1 ring-primary-500/20" : ""
                }`}
                onClick={() => selectTemplate(template.id)}
              >
                {/* Mini Preview */}
                <div className="p-6 pb-0">
                  <div className="bg-white rounded-t-lg p-4 aspect-[8.5/6] flex flex-col">
                    {/* Header */}
                    <div
                      className="rounded-md px-3 py-2 mb-3 text-center"
                      style={{
                        backgroundColor: colors.headerBg !== "transparent" ? colors.headerBg : "transparent",
                        borderBottom: colors.headerBg === "transparent" ? `2px solid ${colors.accent}` : "none",
                      }}
                    >
                      <div
                        className="h-3 rounded w-28 mx-auto mb-1"
                        style={{
                          backgroundColor: colors.headerBg !== "transparent" ? "rgba(255,255,255,0.8)" : colors.accent,
                        }}
                      />
                      <div className="flex justify-center gap-2">
                        <div className="h-1.5 rounded w-12" style={{ backgroundColor: colors.headerBg !== "transparent" ? "rgba(255,255,255,0.4)" : "#d1d5db" }} />
                        <div className="h-1.5 rounded w-10" style={{ backgroundColor: colors.headerBg !== "transparent" ? "rgba(255,255,255,0.4)" : "#d1d5db" }} />
                        <div className="h-1.5 rounded w-14" style={{ backgroundColor: colors.headerBg !== "transparent" ? "rgba(255,255,255,0.4)" : "#d1d5db" }} />
                      </div>
                    </div>

                    {/* Section */}
                    <div className="mb-2">
                      <div className="h-2 rounded w-16 mb-2" style={{ backgroundColor: colors.accent, opacity: 0.7 }} />
                      <div className="space-y-1.5 pl-2">
                        <div className="h-1.5 rounded bg-gray-200 w-full" />
                        <div className="h-1.5 rounded bg-gray-200 w-5/6" />
                        <div className="h-1.5 rounded bg-gray-200 w-4/6" />
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <div className="h-2 rounded w-20 mb-2" style={{ backgroundColor: colors.accent, opacity: 0.7 }} />
                      <div className="space-y-1.5 pl-2">
                        <div className="h-1.5 rounded bg-gray-200 w-full" />
                        <div className="h-1.5 rounded bg-gray-200 w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary-300 bg-primary-500/15 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-surface-200/50 mb-4">{template.description}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); useTemplate(template.id); }}
                    className="btn-primary text-sm w-full justify-center"
                  >
                    Use Template
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
