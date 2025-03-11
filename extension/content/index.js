chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (!message) return;
    switch(message.action) {
        case "renderPopover":
            renderPopover(message.payload);
            break;
    }
});

document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    console.log(selection);
    if (selection.toString().trim()) {
        destroyPopover();
        chrome.runtime.sendMessage({
            action: "textSelected",
            payload: selection.toString(),
        });
    }
});
