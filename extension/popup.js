const editBtn = document.getElementById("edit");
const saveBtn = document.getElementById("save");
const activeInput = document.getElementById("active");

editBtn.addEventListener("click", handleEdit);
saveBtn.addEventListener("click", handleSave);
activeInput.addEventListener("change", handleChange);

chrome.runtime.sendMessage({action: "getActive"}).then(
    (active) => {
        activeInput.checked = active;
    }
);

async function handleChange(e) {
    await chrome.runtime.sendMessage(
        {action: "setActive", active: e.target.checked}
    );
}

async function handleSave(e) {
    // TODO: Refactor ?
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input[type='text']"))
        .forEach((input) => input.disabled = true);

    const input = document.getElementById("secret");
    await chrome.storage.local.set({"SECRET": input.value});

    e.target.disabled = true;
}

function handleEdit(e) {
    // TODO: Refactor ?
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input[type='text']"))
        .forEach((input) => input.disabled = false);

    e.target.disabled = true;
}

chrome.storage.local.get().then(storage => {
    const secretValue = storage["SECRET"];
    if (!secretValue) {
        console.warn("No secret obtained from storage!");
        secretValue = "secret";
    }
    const input = document.getElementById("secret");
    input.value = secretValue;
});
