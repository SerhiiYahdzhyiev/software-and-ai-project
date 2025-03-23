import { config } from "dotenv";

import OpenAI from "openai";

config();

const _client = new OpenAI()

export const client = { 
    async getResponse(prompt) {
        const completion = await _client.chat.completions.create({
            model: "gpt-3.5-turbo",
            message: [{
                role: "user", 
                content: prompt,
            }],
        });

        console.log(completion);

        // TODO: Add more reliable unpacking of the response....
        return completion.choices[0].message.content;
    }
}
