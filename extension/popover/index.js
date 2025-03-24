function renderPopover(info) {
    const position = getPopoverPosition();
    const element = createPopoverElement(info);

    const popoverHeight = getPopoverHeight(element);

    element.style.left = px(position.x);
    element.style.top = px(popoverHeight + position.y)

    document.body.appendChild(element);

    const close = document.getElementById(CG_CLOSE_ID);
    const handleClose = (e) => {
        if (e.target === close) destroyPopover();
    }
    close.addEventListener("click", handleClose);
}

function getPopoverHeight(element) {
    const {height} = element.getBoundingClientRect();
    return height;
}

function destroyPopover() {
    const popover = document.getElementById(CG_CONTAINER_ID);
    if (popover)
        document.body.removeChild(popover);
}

function createPopoverElement(info) {
    const el = document.createElement("div");

    el.id = CG_CONTAINER_ID;
    el.innerHTML = `
        ${CG_CLOSE_HTML}
        ${renderGeneral(info.general)}
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

function renderGeneral(general) {
    let html = "";
    for (const key of Object.keys(general)) {
        // TODO: Is it really needed here since we can expect no
        //       nested objects from backend
        if (typeof general[key] === "object") {
            html += renderGeneral(general[key])
        } else {
            html += `
            <div class="${CG_ROW_CLASS}">
                <h4 class="${CG_TITLE_CLASS}">${camelToTitle(key)}</h4>
                <p class="${CG_VALUE_CLASS}">${general[key]}</p>
            </div>
            `;
        }
    }

    return html;
}

