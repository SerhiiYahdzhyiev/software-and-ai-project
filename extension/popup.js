const editBtn = document.getElementById("edit");
const saveBtn = document.getElementById("save");

editBtn.addEventListener("click", handleEdit);
saveBtn.addEventListener("click", handleSave);

async function handleSave(e) {
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input"))
        .forEach((input) => input.disabled = true);

    const input = document.getElementById("secret");
    await chrome.storage.local.set({"SECRET": input.value});

    e.target.disabled = true;
}

function handleEdit(e) {
    Array.from(document.querySelectorAll("footer button"))
        .forEach((button) => button.disabled = false);
    Array.from(document.querySelectorAll("input"))
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


