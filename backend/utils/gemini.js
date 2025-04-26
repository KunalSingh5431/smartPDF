const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Summarise long text into bullet points using Google Gemini‑Pro.
 * Needs only process.env.GEMINI_API_KEY
 * @param {string} longText full text from the PDF
 * @returns {Promise<string>} summary markdown / plain text
 */

exports.summariseText = async (longText = "") => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing in .env");

  const input = longText.slice(0, 25_000); 

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Summarise the following PDF into 5‑8 concise bullet points:\n\n${input}`,
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.3, maxOutputTokens: 256 },
  };

  const { data } = await axios.post(`${GEMINI_URL}?key=${apiKey}`, body, {
    headers: { "Content-Type": "application/json" },
  });

  let geminiText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Gemini returned no summary";

  geminiText = geminiText
    .split("\n")
    .map((line) => {

      return line
        .replace(/^\s*[*\-]\s*/g, "")   
        .replace(/^([A-Za-z0-9\s]+)(:?)$/g, "")
        .trim();
    })
    .filter(Boolean)
    .join("\n");

  return geminiText || "No summary";
};
