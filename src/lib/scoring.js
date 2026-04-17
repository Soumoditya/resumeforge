import { TECH_KEYWORDS, ACTION_VERBS } from "./constants";

export function scoreResume(resumeText) {
  const text = resumeText.toLowerCase();
  const lines = resumeText.split("\n").filter((l) => l.trim());

  const formatting = scoreFormatting(resumeText, lines);
  const content = scoreContent(resumeText, lines);
  const keywords = scoreKeywords(text);
  const impact = scoreImpact(resumeText, lines);

  const overall = Math.round(
    formatting.score * 0.2 +
    content.score * 0.3 +
    keywords.score * 0.25 +
    impact.score * 0.25
  );

  return {
    overall,
    categories: { formatting, content, keywords, impact },
  };
}

function scoreFormatting(text, lines) {
  let score = 100;
  const issues = [];

  const wordCount = text.split(/\s+/).length;
  if (wordCount > 800) {
    score -= 15;
    issues.push("Resume is too long. Aim for 400-600 words for a 1-page resume.");
  } else if (wordCount < 150) {
    score -= 20;
    issues.push("Resume is too short. Add more detail to your experience and skills.");
  }

  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /[\d\s()+-]{10,}/.test(text);
  if (!hasEmail) {
    score -= 10;
    issues.push("No email address detected. Add your professional email.");
  }
  if (!hasPhone) {
    score -= 5;
    issues.push("No phone number detected. Consider adding one.");
  }

  const standardSections = ["experience", "education", "skills", "projects"];
  const foundSections = standardSections.filter((s) =>
    text.toLowerCase().includes(s)
  );
  if (foundSections.length < 3) {
    score -= 15;
    issues.push(`Only found ${foundSections.length}/4 standard sections. Include: Experience, Education, Skills, Projects.`);
  }

  const longLines = lines.filter((l) => l.length > 120);
  if (longLines.length > 3) {
    score -= 10;
    issues.push("Some lines are very long. Keep bullet points concise (under 120 characters).");
  }

  return { score: Math.max(0, Math.min(100, score)), issues };
}

function scoreContent(text, lines) {
  let score = 100;
  const issues = [];

  const bulletLines = lines.filter(
    (l) => l.trim().startsWith("•") || l.trim().startsWith("-") || l.trim().startsWith("–")
  );

  if (bulletLines.length < 5) {
    score -= 20;
    issues.push("Too few bullet points. Add detailed bullets under each experience.");
  }

  const weakPhrases = [
    "responsible for",
    "duties included",
    "helped with",
    "worked on",
    "assisted in",
    "participated in",
    "was involved in",
  ];

  const weakFound = weakPhrases.filter((p) => text.toLowerCase().includes(p));
  if (weakFound.length > 0) {
    score -= weakFound.length * 5;
    issues.push(
      `Found weak phrases: "${weakFound.join('", "')}". Replace with strong action verbs.`
    );
  }

  const hasLinkedin = /linkedin\.com/i.test(text);
  const hasGithub = /github\.com/i.test(text);
  if (!hasLinkedin) {
    score -= 5;
    issues.push("Add your LinkedIn profile URL.");
  }
  if (!hasGithub) {
    score -= 5;
    issues.push("Add your GitHub profile URL for technical roles.");
  }

  return { score: Math.max(0, Math.min(100, score)), issues };
}

function scoreKeywords(text) {
  let score = 50;
  const issues = [];

  const foundKeywords = TECH_KEYWORDS.filter((kw) => text.includes(kw));
  const keywordRatio = foundKeywords.length / 15;

  score = Math.min(100, 50 + Math.round(keywordRatio * 50));

  if (foundKeywords.length < 5) {
    issues.push(
      "Very few technical keywords found. Add relevant technologies to your Skills section."
    );
  } else if (foundKeywords.length < 10) {
    issues.push(
      "Consider adding more industry keywords. Match them to the job descriptions you're targeting."
    );
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    issues,
    found: foundKeywords,
  };
}

function scoreImpact(text, lines) {
  let score = 50;
  const issues = [];

  const numberPattern = /\d+%|\d+x|\$[\d,]+|\d+\+?\s*(users|customers|clients|projects|teams|members|endpoints|requests)/gi;
  const metrics = text.match(numberPattern) || [];

  if (metrics.length === 0) {
    score -= 20;
    issues.push(
      "No quantifiable metrics found. Add numbers to show impact (e.g., 'Improved performance by 40%')."
    );
  } else if (metrics.length < 3) {
    score += 10;
    issues.push(
      "Some metrics found, but add more. Aim for at least 3-5 quantified achievements."
    );
  } else {
    score += 30;
  }

  const bulletLines = lines.filter(
    (l) => l.trim().startsWith("•") || l.trim().startsWith("-") || l.trim().startsWith("–")
  );

  let actionVerbCount = 0;
  bulletLines.forEach((bullet) => {
    const firstWord = bullet.replace(/^[•\-–]\s*/, "").split(/\s/)[0].toLowerCase();
    if (ACTION_VERBS.includes(firstWord)) {
      actionVerbCount++;
    }
  });

  if (bulletLines.length > 0) {
    const ratio = actionVerbCount / bulletLines.length;
    if (ratio < 0.3) {
      score -= 10;
      issues.push(
        "Most bullets don't start with action verbs. Use verbs like: Built, Designed, Implemented, Optimized."
      );
    } else if (ratio > 0.7) {
      score += 15;
    }
  }

  return { score: Math.max(0, Math.min(100, score)), issues };
}
