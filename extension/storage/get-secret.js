import { SECRET_KEY } from "./constants.js"

export async function getSecret() {
    return (await chrome.storage.local.get())[SECRET_KEY];
}
