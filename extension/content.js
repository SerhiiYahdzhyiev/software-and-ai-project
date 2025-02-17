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

function renderPopover(info) {
    const element = createPopoverElement(info);

    document.body.appendChild(element);
}

function destroyPopover() {
    const popover = document.querySelector("." + CG_POPOVER_CONTAINER_CLASS);
    if (popover)
        document.body.removeChild(popover);
}

function createPopoverElement() {
    const position = getPopoverPosition();
    console.log(position);

    const close = document.createElement("span")
    const el = document.createElement("div");

    close.role = "button"
    close.ariaLabel = "Close"
    close.textContent = "x"

    close.addEventListener("click", (e) => {
        console.log(e);
        if (e.target === close) destroyPopover();
    });

    el.classList.add(CG_POPOVER_CONTAINER_CLASS);

    el.style.left = position.x + "px";
    el.style.top = el.getBoundingClientRect().height + position.y + "px";

    el.appendChild(close);

    return el;
}

function getPopoverPosition() {
    const selection = window.getSelection();

    const rect = selection.anchorNode.parentElement.getBoundingClientRect();
    console.log(rect);

    const x = rect.x + window.scrollX;
    const y = rect.y 
        + window.scrollY
        + rect.height 
        + CG_POPOVER_MARGIN;

    return {x, y};
}
