import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the SDK. Next.js automatically loads variables from .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function normalizeProducts(scrapedProducts: any[]) {
    if (!scrapedProducts.length) return [];

    // We use gemini-3.5-flash because it is built for fast, high-volume tasks
    const model = genAI.getGenerativeModel({
        model: 'gemini-3.5-flash',
        generationConfig: {
            responseMimeType: "application/json", // This forces the AI to reply in valid JSON, not conversational text
        }
    });

    const prompt = `
        You are a product data normalization engine.
        I will provide a JSON array of messy scraped e-commerce products.
        
        Your task: Extract the brand, core model name, and color/variant from the messy titles.
        Return a JSON array of objects with the exact following keys:
        - brand (e.g., "boAt", "Sony", "Apple")
        - model (e.g., "Rockerz 480", "WH-1000XM5". Ignore fluff words like "Wireless", "Over-Ear", "Newly Launched")
        - color (e.g., "Black", "Pearl Beige", or null if not mentioned)
        - original_title (Keep exactly as provided)
        - price (Keep exactly as provided)
        - platform (Keep exactly as provided)
        - link (Keep exactly as provided)

        Input Data:
        ${JSON.stringify(scrapedProducts)}
    `;

    try {
        const result = await model.generateContent(prompt);
        const aiResponseText = result.response.text();
        
        // Parse the AI's string response back into a JavaScript array
        return JSON.parse(aiResponseText);
    } catch (error) {
        console.error("AI Normalization failed:", error);
        // If the AI fails (e.g., rate limit), safely fallback to the raw unparsed data
        return scrapedProducts; 
    }
}