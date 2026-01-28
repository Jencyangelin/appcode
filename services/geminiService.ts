
import { GoogleGenAI } from "@google/genai";

export async function enhanceBio(
  currentBio: string, 
  name: string, 
  job: string, 
  industry?: string, 
  skills?: string
): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional brand consultant. Improve the following professional bio for a digital business card. 
      
      CONTEXT:
      - Name: ${name || 'A Professional'}
      - Job Title: ${job || 'Expert'}
      - Industry: ${industry || 'General Business'}
      - Key Skills to Emphasize: ${skills || 'Not specified'}
      - Current Bio: ${currentBio}
      
      REFINEMENT GOALS:
      - Tailor the tone to be highly effective within the "${industry || 'specified'}" industry.
      - Seamlessly weave in the following skills: ${skills || 'relevant professional expertise'}.
      - Make it punchy, engaging, and networking-focused.
      - STRICT LIMIT: Maximum 160 characters.
      
      OUTPUT RULES:
      - Return ONLY the final bio text.
      - No quotes, no conversational preamble, no "Here is your bio".`,
    });

    return response.text?.trim() || currentBio;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return currentBio;
  }
}
