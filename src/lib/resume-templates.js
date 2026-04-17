export const TEMPLATES = {
  professional: {
    id: "professional",
    name: "Professional",
    description: "Classic and clean. Perfect for corporate and enterprise roles.",
    preview: "professional",
    styles: {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      headerBg: "transparent",
      headerColor: "#1a1a2e",
      accentColor: "#2563eb",
      borderStyle: "2px solid #2563eb",
      sectionDivider: "border-bottom: 1px solid #d1d5db",
      bulletStyle: "disc",
      nameSize: "28px",
      sectionTitleSize: "14px",
      bodySize: "11px",
    },
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with color accents. Great for startups and tech roles.",
    preview: "modern",
    styles: {
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      headerBg: "#1e293b",
      headerColor: "#ffffff",
      accentColor: "#6366f1",
      borderStyle: "none",
      sectionDivider: "border-bottom: 2px solid #6366f1",
      bulletStyle: "none",
      nameSize: "32px",
      sectionTitleSize: "13px",
      bodySize: "11px",
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Ultra-clean with maximum whitespace. Ideal for design and creative roles.",
    preview: "minimal",
    styles: {
      fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
      headerBg: "transparent",
      headerColor: "#111827",
      accentColor: "#374151",
      borderStyle: "none",
      sectionDivider: "border-bottom: 1px solid #e5e7eb",
      bulletStyle: "none",
      nameSize: "26px",
      sectionTitleSize: "11px",
      bodySize: "10.5px",
    },
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Bold and authoritative. Best for senior and leadership positions.",
    preview: "executive",
    styles: {
      fontFamily: "'Cambria', 'Georgia', serif",
      headerBg: "#0f172a",
      headerColor: "#ffffff",
      accentColor: "#0f172a",
      borderStyle: "3px solid #0f172a",
      sectionDivider: "border-bottom: 2px solid #0f172a",
      bulletStyle: "square",
      nameSize: "30px",
      sectionTitleSize: "14px",
      bodySize: "11px",
    },
  },
};

export function getTemplate(id) {
  return TEMPLATES[id] || TEMPLATES.professional;
}

export function getTemplateList() {
  return Object.values(TEMPLATES);
}

export function renderResumeHTML(data, templateId = "professional") {
  const template = getTemplate(templateId);
  const s = template.styles;

  const contactParts = [
    data.personal?.email,
    data.personal?.phone,
    data.personal?.location,
  ].filter(Boolean);

  const linkParts = [
    data.personal?.linkedin ? `LinkedIn: ${data.personal.linkedin}` : null,
    data.personal?.github ? `GitHub: ${data.personal.github}` : null,
    data.personal?.portfolio ? `Portfolio: ${data.personal.portfolio}` : null,
  ].filter(Boolean);

  const hasExperience = data.experience?.length > 0;
  const hasEducation = data.education?.length > 0;
  const hasSkills = Object.values(data.skills || {}).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );

  return `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${s.fontFamily};
    font-size: ${s.bodySize};
    line-height: 1.45;
    color: #1f2937;
    max-width: 8.5in;
    margin: 0 auto;
    padding: 0.5in 0.6in;
    background: white;
  }
  .header {
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 12px;
    ${s.headerBg !== "transparent" ? `background: ${s.headerBg}; color: ${s.headerColor}; margin: -0.5in -0.6in 12px; padding: 20px 0.6in 14px;` : `border-bottom: ${s.borderStyle};`}
  }
  .name {
    font-size: ${s.nameSize};
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
    ${s.headerBg !== "transparent" ? `color: ${s.headerColor};` : `color: ${s.accentColor};`}
  }
  .contact {
    font-size: 10px;
    color: ${s.headerBg !== "transparent" ? "rgba(255,255,255,0.85)" : "#6b7280"};
  }
  .contact-divider { margin: 0 6px; }
  .section {
    margin-bottom: 12px;
  }
  .section-title {
    font-size: ${s.sectionTitleSize};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${s.accentColor};
    padding-bottom: 3px;
    margin-bottom: 8px;
    ${s.sectionDivider};
  }
  .entry {
    margin-bottom: 8px;
  }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2px;
  }
  .entry-title {
    font-weight: 700;
    font-size: 12px;
  }
  .entry-subtitle {
    font-style: italic;
    color: #4b5563;
    font-size: 11px;
  }
  .entry-date {
    color: #6b7280;
    font-size: 10px;
    white-space: nowrap;
    margin-left: 12px;
  }
  .bullets {
    list-style-type: ${s.bulletStyle === "none" ? "none" : s.bulletStyle};
    padding-left: ${s.bulletStyle === "none" ? "0" : "18px"};
    margin-top: 3px;
  }
  .bullets li {
    margin-bottom: 2px;
    ${s.bulletStyle === "none" ? 'padding-left: 12px; position: relative;' : ''}
  }
  ${s.bulletStyle === "none" ? `.bullets li::before { content: "–"; position: absolute; left: 0; color: ${s.accentColor}; }` : ""}
  .skills-grid {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 3px 12px;
    font-size: 11px;
  }
  .skill-label {
    font-weight: 600;
    color: ${s.accentColor};
  }
  .summary {
    font-size: 11px;
    color: #374151;
    line-height: 1.5;
    margin-bottom: 2px;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="name">${data.personal?.fullName || "Your Name"}</div>
    <div class="contact">
      ${contactParts.join('<span class="contact-divider">|</span>')}
    </div>
    ${linkParts.length > 0 ? `<div class="contact" style="margin-top:2px">${linkParts.join('<span class="contact-divider">|</span>')}</div>` : ""}
  </div>

  ${data.personal?.summary ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary">${data.personal.summary}</p>
  </div>` : ""}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${data.experience.map((exp) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${exp.title || "Role"}</span>
          <span class="entry-subtitle"> — ${exp.company || "Company"}</span>
          ${exp.location ? `<span class="entry-subtitle">, ${exp.location}</span>` : ""}
        </div>
        <span class="entry-date">${exp.startDate || ""}${exp.startDate ? " – " : ""}${exp.current ? "Present" : exp.endDate || ""}</span>
      </div>
      ${exp.bullets?.filter(Boolean).length > 0 ? `
      <ul class="bullets">
        ${exp.bullets.filter(Boolean).map((b) => `<li>${b}</li>`).join("")}
      </ul>` : ""}
    </div>`).join("")}
  </div>` : ""}

  ${hasEducation ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${data.education.map((edu) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${edu.degree || "Degree"}${edu.field ? ` in ${edu.field}` : ""}</span>
          <span class="entry-subtitle"> — ${edu.school || "School"}</span>
        </div>
        <span class="entry-date">${edu.startDate || ""}${edu.startDate ? " – " : ""}${edu.endDate || ""}</span>
      </div>
      ${edu.gpa ? `<div style="font-size:10px;color:#6b7280">GPA: ${edu.gpa}</div>` : ""}
      ${edu.coursework ? `<div style="font-size:10px;color:#6b7280">Relevant Coursework: ${edu.coursework}</div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      ${data.skills.languages?.length > 0 ? `<div class="skill-label">Languages</div><div>${data.skills.languages.join(", ")}</div>` : ""}
      ${data.skills.frameworks?.length > 0 ? `<div class="skill-label">Frameworks</div><div>${data.skills.frameworks.join(", ")}</div>` : ""}
      ${data.skills.tools?.length > 0 ? `<div class="skill-label">Tools</div><div>${data.skills.tools.join(", ")}</div>` : ""}
      ${data.skills.databases?.length > 0 ? `<div class="skill-label">Databases</div><div>${data.skills.databases.join(", ")}</div>` : ""}
      ${data.skills.other?.length > 0 ? `<div class="skill-label">Other</div><div>${data.skills.other.join(", ")}</div>` : ""}
    </div>
  </div>` : ""}
</body>
</html>`;
}
