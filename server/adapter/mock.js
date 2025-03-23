export const client = {
    async getResponse(prompt) {
        if (prompt.includes("isCode")) {
            return true;
        }
        return {
            general:{
                language: "Rust",
                potentialBugsCount: 4,
                knownBugsCount: 1,
            },
        }
    }
}
