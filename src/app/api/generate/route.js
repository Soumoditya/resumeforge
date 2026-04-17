import { NextResponse } from "next/server";
import { generateResumeContent } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { resumeData, targetRole } = await request.json();

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required." },
        { status: 400 }
      );
    }

    const result = await generateResumeContent(resumeData, targetRole);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
