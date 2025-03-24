import {request} from "./request.js"

export async function isCode(str) {
    const data = await request("/isCode", str);
    return data;
}
