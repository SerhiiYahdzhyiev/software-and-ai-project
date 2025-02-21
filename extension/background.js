importScripts("./api.js");

(async () => {
    const res = await test();
    console.log(res);
    chrome.runtime.onMessage.addListener(async (message, sender) => {
        console.log(message, sender);
        try {
            switch (message.action) {
                case "textSelected":
                    if (await isCode(message.payload)) {
                        const popoverInfo =
                            await getPopoverInfo(message.payload);

                        await chrome.tabs.sendMessage(sender.tab.id, {
                            action: "renderPopover",
                            payload: popoverInfo,
                        });
                    }
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    });
})();
