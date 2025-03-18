import {config} from "dotenv";
import express from "express";

import {client} from "./adapters/mock.js"
import {Adapter} from "./adapters/base.js";

config();

const requiredEnvs = [
    "PORT",
    "HOST",
    "SECRET",
];

for (const k of requiredEnvs) {
    if (!process.env[k]) {
        throw new Error("Missing required environment variable: " + k);
    }
}

const app = express();
const adapter = new Adapter(client, {
    // TODO: Realize mechanism to recieve setting object with the request
    //       from extension.
    maxAttempts: 2,
});

app.use(express.text());

app.use((req, res, next) => {
    if (req.headers?.authorization === "Bearer " + process.env.SECRET) {
        next();
        return;
    }
    res.status(401);
    res.send();
});

app.post("/isCode", async (req, res) => {
    try {
        const isCode = await adapter.isCode(req.body);
        res.json({isCode});
    } catch (error) {
        console.error(error);
        // TODO: Improve handling...
        res.status(500);
        res.json({ error: String(error)});
    }
});

app.post("/info", async (req, res) => {
    try {
        const info = await adapter.getSnippetInfo(req.body);
        res.json(info);
    } catch (error) {
        console.error(error);
        // TODO: Improve handling...
        res.status(500);
        res.json({ error: String(error)});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`[${process.env.HOST}:${process.env.PORT}]`,"Server is listening!");
})

