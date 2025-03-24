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
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input[type='text']"))
        .forEach((input) => input.disabled = true);

    const secretInput = document.getElementById("secret");
    const urlInput = document.getElementById("apiurl");
    await chrome.storage.local.set({"SECRET": secretInput.value});
    await chrome.storage.local.set({"API_URL": urlInput.value});

    e.target.disabled = true;
}

function handleEdit(e) {
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input[type='text']"))
        .forEach((input) => input.disabled = false);

    e.target.disabled = true;
}

chrome.storage.local.get().then(storage => {
    let secretValue = storage["SECRET"];
    let apiUrlValue = storage["API_URL"];

    if (!secretValue) {
        console.warn("No secret obtained from storage!");
        secretValue = "secret";
    }

    if (!apiUrlValue) {
        console.warn("No secret obtained from storage!");
        apiUrlValue = "http://localhost:4818";
    }

    const secretInput = document.getElementById("secret");
    const urlInput = document.getElementById("apiurl");

    secretInput.value = secretValue;
    urlInput.value = apiUrlValue;
});
