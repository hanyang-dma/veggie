import { GoogleGenAI, Type } from "@google/genai";
import { Vegetable, Language, AIVeggieDetails } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchVegetableDetails = async (
  vegetableName: string,
  language: Language
): Promise<AIVeggieDetails | null> => {
  const client = getClient();
  if (!client) return null;

  // Prompt engineering for the new "Swiss Style / Editorial" persona
  const prompt = `
    Role: You are an avant-garde food editor for a high-end design magazine.
    Task: Analyze the vegetable "${vegetableName}".
    Language: ${language === 'en' ? 'English' : 'Simplified Chinese'}.
    
    Output requirements (JSON):
    1. funFact: A surprising, scientific, or historical fact. Keep it short, factual, and interesting. No exclamations.
    2. nutrition: The single most critical nutritional data point (e.g., "High concentration of Vitamin K").
    3. cookingTip: A modern, minimalist preparation method (e.g., "Sous-vide at 85°C" or "Raw shaving").
    
    Tone: Professional, minimal, edgy, objective. Avoid words like "yummy", "love", "kids".
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            funFact: { type: Type.STRING },
            nutrition: { type: Type.STRING },
            cookingTip: { type: Type.STRING },
          },
          required: ['funFact', 'nutrition', 'cookingTip'],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AIVeggieDetails;
  } catch (error) {
    console.error("Error fetching vegetable details:", error);
    return null;
  }
};