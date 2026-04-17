import { NextResponse } from "next/server";
import { tailorResume } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short." },
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description is too short. Please paste the full job posting." },
        { status: 400 }
      );
    }

    const result = await tailorResume(resumeText, jobDescription);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Tailoring error:", error);
    return NextResponse.json(
      { error: "Failed to tailor resume. Please try again." },
      { status: 500 }
    );
  }
}
