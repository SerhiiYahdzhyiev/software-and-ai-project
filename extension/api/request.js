import {HEADERS} from "./constants.js"

import { API_URL_KEY } from "../storage/constants.js";
import { getSecret } from "../storage/get-secret.js";

export async function request(path, payload) {
    const base =
        (await chrome.storage.local.get())[API_URL_KEY]
        ?? "http://localhost:4818";
    const secret = await getSecret();
    const response = await fetch(base + path, {
        method: "POST",
        body: payload,
        headers: {
            ...HEADERS,
            "Authorization": "Bearer " + secret,
        }
    });

    if (response.status !== 200) {
        console.error(response);
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
}
