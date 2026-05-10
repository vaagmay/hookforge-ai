import { NextResponse } from "next/server";

import { analyzeTranscript } from "@/services/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const transcript = body.transcript;

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript missing" },
        { status: 400 }
      );
    }

    const analysis =
      await analyzeTranscript(
        transcript
      );

    return NextResponse.json({
      analysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}