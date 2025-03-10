import { SECRET_KEY } from "./constants.js"

export async function getSecret() {
    return (await chorme.storage.local.get())[SECRET_KEY];
}
