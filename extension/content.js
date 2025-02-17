chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (!message) return;
    switch(message.action) {
        case "echo":
            return sendResponse(message);
    }
});
