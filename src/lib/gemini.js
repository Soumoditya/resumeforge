import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash-lite"];

async function callGemini(prompt, config = {}) {
  let lastError;
  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: config.temperature || 0.3,
          maxOutputTokens: config.maxOutputTokens || 4096,
        },
      });
      const text = response.text.trim();
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn(`Model ${model} failed: ${err.status || err.message}, trying next...`);
      lastError = err;
      continue;
    }
  }
  throw lastError;
}

export async function analyzeResume(resumeText) {
  const prompt = `You are an expert resume reviewer and career coach with 15+ years of recruiting experience at top companies.

Analyze the following resume text and provide a comprehensive evaluation. Be specific, actionable, and honest.

RESUME TEXT:
"""
${resumeText}
"""

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "overallScore": <number 0-100>,
  "scores": {
    "formatting": <number 0-100>,
    "content": <number 0-100>,
    "keywords": <number 0-100>,
    "impact": <number 0-100>
  },
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": [
    {
      "category": "<formatting|content|keywords|impact>",
      "issue": "<specific issue found>",
      "suggestion": "<actionable fix>",
      "priority": "<high|medium|low>"
    }
  ],
  "bulletAnalysis": [
    {
      "original": "<original bullet text>",
      "strength": "<weak|medium|strong>",
      "improved": "<rewritten version with metrics and action verbs>",
      "reason": "<why the improvement is better>"
    }
  ],
  "missingKeywords": ["<keyword 1>", "<keyword 2>"],
  "atsCompatibility": {
    "score": <number 0-100>,
    "issues": ["<issue 1>", "<issue 2>"],
    "suggestions": ["<suggestion 1>", "<suggestion 2>"]
  }
}`;

  return callGemini(prompt, { temperature: 0.3, maxOutputTokens: 4096 });
}

export async function generateResumeContent(resumeData, targetRole) {
  const prompt = `You are an expert resume writer who specializes in creating ATS-optimized, impact-driven resumes.

Given the following resume information and target role, generate polished, professional content.

TARGET ROLE: ${targetRole || "Software Developer"}

RESUME DATA:
"""
${JSON.stringify(resumeData, null, 2)}
"""

For each experience entry, rewrite the bullet points to:
1. Start with a strong action verb
2. Include quantifiable metrics where possible (estimate realistically if not provided)
3. Use the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"
4. Be concise (1-2 lines each)
5. Include relevant technical keywords for the target role

Also generate:
- A compelling professional summary (2-3 sentences, tailored to the target role)
- An optimized skills section organized by category

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "summary": "<professional summary>",
  "experience": [
    {
      "company": "<company>",
      "title": "<title>",
      "bullets": ["<improved bullet 1>", "<improved bullet 2>", "<improved bullet 3>"]
    }
  ],
  "skills": {
    "languages": ["<skill>"],
    "frameworks": ["<skill>"],
    "tools": ["<skill>"],
    "databases": ["<skill>"],
    "other": ["<skill>"]
  }
}`;

  return callGemini(prompt, { temperature: 0.5, maxOutputTokens: 3000 });
}

export async function tailorResume(resumeText, jobDescription) {
  const prompt = `You are a senior career strategist who specializes in tailoring resumes for specific job postings.

CURRENT RESUME:
"""
${resumeText}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

Analyze the job description and tailor the resume to match. You must:
1. Identify keywords from the JD that are missing from the resume
2. Rewrite bullet points to align with the JD requirements
3. Reorder skills to prioritize what the JD emphasizes
4. Adjust the professional summary to target this specific role
5. Maintain truthfulness — enhance presentation, don't fabricate experience

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "matchScore": <number 0-100 indicating how well resume matches JD>,
  "keywordAnalysis": {
    "matched": ["<keyword found in both>"],
    "missing": ["<keyword in JD but not resume>"],
    "suggestions": ["<how to incorporate missing keyword>"]
  },
  "tailoredResume": "<complete rewritten resume text, preserving clean ATS formatting with clear section headers>",
  "changes": [
    {
      "section": "<section name>",
      "original": "<original text snippet>",
      "revised": "<revised text snippet>",
      "reason": "<why this change helps>"
    }
  ],
  "additionalTips": ["<tip 1>", "<tip 2>"]
}`;

  return callGemini(prompt, { temperature: 0.4, maxOutputTokens: 4096 });
}
