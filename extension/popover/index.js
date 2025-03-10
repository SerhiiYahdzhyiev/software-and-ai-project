function renderPopover(info) {
    const position = getPopoverPosition();
    const element = createPopoverElement(info);

    const {height: popoverHeight} = element.getBoundingClientRect();

    element.style.left = px(position.x);
    element.style.top = px(popoverHeight + position.y)

    document.body.appendChild(element);

    const close = document.getElementById(CG_CLOSE_ID);
    close.addEventListener("click", (e) => {
        console.log(e);
        if (e.target === close) destroyPopover();
    });
}

function destroyPopover() {
    const popover = document.querySelector("." + CG_POPOVER_CONTAINER_CLASS);
    if (popover)
        document.body.removeChild(popover);
}

function createPopoverElement() {
    const el = document.createElement("div");

    el.innerHTML = `
        ${CG_CLOSE_HTML}
    `;

    el.classList.add(CG_POPOVER_CONTAINER_CLASS);
    return el;
}

function getPopoverPosition() {
    const selection = window.getSelection();

    const rect = selection.anchorNode.parentElement.getBoundingClientRect();
    const x = rect.x + window.scrollX;
    const y = rect.y 
        + window.scrollY
        + rect.height 
        + CG_POPOVER_MARGIN;

    return {x, y};
}
