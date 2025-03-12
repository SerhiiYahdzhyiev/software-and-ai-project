import { config } from "dotenv";

import OpenAI from "openai";

config();

class OpenAICGAdapter {
    isCodeSchema = '{ "isCode": boolean }'
    constructor(options) {
        this.client = new OpenAI();

        this.model = options.model;
        this.maxAttempts = options.maxAttempts;

        // TODO: Decide if there are any usecases to change this
        //       otherwise make it just static value inside getResponse
        //       method...
        this.role = "user";
    }

    getIsCodePrompt(text) {
        return `
        Identify if this text snippet is any type of programming code or
        markdown language.

        Give your answer in the valid json format with the following schema:
        ${this.isCodeSchema}

        ---
        ${text}
        ---
        `;
    }

    async getModelResponse(prompt) {
        const completion = await this.client.chat.completions.create({
            model: this.model,
            message: [{
                role: this.role, 
                content: prompt,
            }],
        });

        console.log(completion);

        // TODO: Add more reliable unpacking of the response....
        return completion.choices[0].message.content;
    }

    async getResponse(prompt) {
        let attempt = 0;
        let success = false;
        let parsed = null;

        while (attempt < this.maxAttempts && !success) {
            const modelResponse = await this.getModelResponse(prompt);
            try {
                // TODO: Add validations for schemas...
                parsed = JSON.parse(modelResponse);
                success = true;
            } catch {}
        }

        if (!success)
            throw new Error("Failed to get valid response from the model!");

        return parsed;
    }

    async isCode(text) {
        console.log(text);

        const prompt = this.getIsCodePrompt(text);
        const {isCode} = await this.getResponse(prompt);

        console.log(isCode);
        return isCode;
    }

    async getSnippetInfo(code) {
        console.log(code);
        // TODO: Realize...
        return {
            general:{
                language: "C",
                potentialBugsCount: 14,
                knownBugsCount: 0,
            },
        }
    }
} 

export default OpenAICGAdapter;
