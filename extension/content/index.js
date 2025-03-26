chrome.runtime.onMessage.addListener(async (message) => {
    if (!message) return;
    switch(message.action) {
        case "renderPopover":
            destroyPopover();
            renderPopover(message.payload);
            break;
    }
});

document.addEventListener("mouseup", async () => {
    const selection = window.getSelection();
    const active = await chrome.runtime.sendMessage({
        action: "getActive"
    })
    if (active && selection.toString().trim()) {
        destroyPopover();
        renderPopover({general: {state: "Loading..."}});
        chrome.runtime.sendMessage({
            action: "textSelected",
            payload: selection.toString(),
        });
    }
});
