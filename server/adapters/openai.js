class OpenAICGAdapter {
    async isCode(text) {
        console.log(text);
        // TODO: Reallize...
        return true;
    }

    async getSnippetInfo(code) {
        console.log(code);
        return {general:{language: "C"}}
    }
} 

export default OpenAICGAdapter;
