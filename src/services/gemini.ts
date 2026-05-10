export async function analyzeTranscript(
  transcript: string
) {
  const prompt = `
You are an AI ecommerce creative strategist.

Analyze this UGC ad transcript.

Return ONLY valid JSON.

Analyze:
- hook_type
- hook_strength
- primary_emotion
- visual_style
- cta_style
- script_flow
- improvement_suggestions

Transcript:
${transcript}

Return format:

{
  "hook_type": "",
  "hook_strength": 0,
  "primary_emotion": "",
  "visual_style": "",
  "cta_style": "",
  "script_flow": [],
  "improvement_suggestions": []
}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log(
    "OpenRouter Response:",
    data
  );

  const text =
    data?.choices?.[0]?.message?.content;

  if (!text) {
    return JSON.stringify({
      error: "No analysis returned",
      raw: data,
    });
  }

  return text;
}