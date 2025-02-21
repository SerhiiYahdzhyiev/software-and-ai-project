(async () => {
    let secretValue = (await chrome.storage.local.get())["SECRET"];

    if (!secretValue) {
        console.warn("No secret obtained from storage!");
        secretValue = "secret";
    }

    const input = document.getElementById("secret");

    input.value = secretValue;

    input.addEventListener("change", async (e) => {
        await chrome.storage.local.set({"SECRET": e.target.value});
    })
})();
