class OpenAICGAdapter {
    async isCode(text) {
        console.log(text);
        // TODO: Realize...
        return true;
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
