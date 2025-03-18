export class Adapter {
    isCodeSchema = '{ "isCode": boolean }';
    generalSchema = `{
        "language": string,
        "potentialBugsCount": number,
        "knownBugsCount": number,
    }
    `;

    constructor(client, options) {
        this.client = client
        this.maxAttempts = options.maxAttempts;
    }

    getGeneralPrompt(text) {
        return `
        Give the summary of the provided code snippet, identify the programming
        or markup language, count potential bugs, count known bugs.

        Give your answer in the valid json format with the following schema:
        ${this.generalSchema}

        ---
        ${text}
        ---
        `;
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
        return isCode;
    }

    async getSnippetInfo(code) {
        const prompt = this.getGeneralPrompt(code);
        const general = await this.getResponse(prompt);
        return {general};
    }
} 
