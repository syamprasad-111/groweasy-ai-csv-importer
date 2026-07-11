import { ai } from "../config/gemini";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt";
import { AIResponse } from "../types/crm";

export const extractCRMRecords = async (
  rows: Record<string, unknown>[]
): Promise<AIResponse> => {
  const prompt = `
${SYSTEM_PROMPT}

Input Records:

${JSON.stringify(rows, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text;
    console.log("===== GEMINI RAW RESPONSE =====");
    console.log(text);
    console.log("===============================");
    if (!text) {
      throw new Error("Empty response from Gemini.");
    }

    // Remove markdown if Gemini returns it
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed: AIResponse = JSON.parse(cleaned);

    console.log(JSON.stringify(parsed, null, 2));

    return {
      records: parsed.records ?? [],
      skippedRecords: parsed.skippedRecords ?? [],
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown AI error";

    throw new Error(`Gemini extraction failed: ${message}`);
  }
}; 