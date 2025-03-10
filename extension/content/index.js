chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (!message) return;
    switch(message.action) {
        case "echo":
            return sendResponse(message);
        case "renderPopover":
            renderPopover(message.payload);
            break;
    }
});

document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (selection.toString().trim()) {
        destroyPopover();
        chrome.runtime.sendMessage({
            action: "textSelected",
            payload: selection.toString(),
        });
    }
});
