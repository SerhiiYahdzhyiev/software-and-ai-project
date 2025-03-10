import {request} from "./request.js"

export async function getPopoverInfo(code) {
    const data = await request("/info", code);
    return data;
}
