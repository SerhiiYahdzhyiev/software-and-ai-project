import { config } from "dotenv";

const { GoogleGenerativeAI } = require("@google/generative-ai");

config();

const key = process.env.GEMINI_API_KEY;

const _client = new GoogleGenerativeAI(key);
const _model = _client.getGenerativeModel({ model: "gemini-2.0-flash"});

export const client = { 
    async getModelResponse(prompt) {
        const res = await _model.generateContent(prompt);
        return res.response.text;
    }
}
