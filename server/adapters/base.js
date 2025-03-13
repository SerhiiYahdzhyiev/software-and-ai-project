xport class Adapter {
    isCodeSchema = '{ "isCode": boolean }'
    constructor(client, options) {
        this.client = client
        this.maxAttempts = options.maxAttempts;
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

    async getResponse(prompt) {
        let attempt = 0;
        let success = false;
        let parsed = null;

        while (attempt < this.maxAttempts && !success) {
            const modelResponse = await this.client.getResponse(prompt);
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
