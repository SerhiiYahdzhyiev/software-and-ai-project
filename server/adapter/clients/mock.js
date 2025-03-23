export const client = {
    async getResponse(prompt) {
        console.log("Mock client generating response...");
        if (prompt.includes("isCode")) {
            return JSON.stringify({isCode: true});
        }
        return JSON.stringify({
            general:{
                language: "Rust",
                potentialBugsCount: 4,
                knownBugsCount: 1,
            },
        });
    }
}
