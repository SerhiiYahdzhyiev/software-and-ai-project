import {isCode} from "./api/is-code.js";
import {getPopoverInfo} from "./api/get-popover-info.js";

let active = false;

(async () => {
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        console.log(message, sender);
        try {
            switch (message.action) {
                case "getActive":
                    console.log("active: ", active);
                    await sendResponse(active);
                    break;
                case "setActive":
                    active = message.active;
                    break;
                case "textSelected":
                    if (!active) return;
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
