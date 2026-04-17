import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short. Please provide more content." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResume(resumeText);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
