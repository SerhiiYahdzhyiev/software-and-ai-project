const HEADERS = {
    "Content-Type": "text/plain"
}

async function request(path, payload) {
    const base = "http://localhost:4242"
    const secret = (await chrome.storage.local.get())["SECRET"];
    const response = await fetch(base + path, {
        method: "POST",
        body: payload,
        headers: {
            ...HEADERS,
            "Authorization": "Bearer " + secret,
        }
    });

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
}

async function test() {
    const result = await request("/echo", "Hello!");
    console.log(result);
}

async function isCode(str) {
    const data = await request("/isCode", str);
    return data.isCode;
}

async function getPopoverInfo(code) {
    // TODO: Realize
    return {
        general: {
            language: "C"
        }
    }
}
