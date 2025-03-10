import {HEADERS} from "./constants.js"

import { getSecret } from "../storage/get-secret.js";

export async function request(path, payload) {
    // TODO: Make this configurable through popup...
    const base = "http://localhost:4242"
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
