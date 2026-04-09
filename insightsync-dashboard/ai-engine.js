const GEMINI_API_KEY = "AIzaSyB4wLKU7w8q86mDzZzl3RmtBAeJd8Z4rtg";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function getAIAdvice(data) {
  // We simplify the data so the prompt isn't too long/messy
  const dataSummary = data
    .map((p) => `${p.name}: ${p.stock} in stock`)
    .join(", ");

  const prompt = `You are a friendly and expert Business Mentor. 
Analyze this inventory data: ${dataSummary}.

Talk to the business owner in a conversational, professional, and helpful tone. 
Instead of just listing orders, explain the situation simply. 
For example, if something is out of stock, mention the lost sales. 
If something is low, suggest a proactive approach.

Rules:
1. Use simple, human-like sentences.
2. Provide 3 clear suggestions with a brief "why".
3. NO asterisks (**), NO hashtags (#), and NO complex jargon.
4. Start with a brief greeting like "Based on your current stock, here is what I recommend:".
5. Keep it concise but meaningful.`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }], // 'prompt' ek string honi chahiye
          },
        ],
      }),
    });

    const result = await response.json();

    // Check if Gemini sent back an error
    if (result.error) {
      console.error("Gemini API Error:", result.error.message);
      return "AI Error: " + result.error.message;
    }

    // MOVE CLEANING LOGIC HERE (Outside the error block)
    const rawText = result.candidates[0].content.parts[0].text;

    // This line removes all asterisks and extra spaces
    // Saare asterisks (*) aur hashtags (#) hatao, aur bullet points ko clean karo
    const cleanText = rawText.replace(/\*/g, "").replace(/#/g, "").trim();

    // Dash (-) ko bullet point symbol (•) mein badlo professional look ke liye
    return cleanText.replace(/^- /gm, "• ").replace(/\n- /g, "\n• ");
  } catch (error) {
    console.error("Fetch Error:", error);
    return "System error: Unable to connect. Please check your internet or API Key.";
  }
}
