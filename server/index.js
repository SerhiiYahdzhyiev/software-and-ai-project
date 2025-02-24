import {config} from "dotenv";
import express from "express";

import Adapter from "./adapters/openai.js";


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
const adapter = new Adapter();

app.use(express.text());

app.use((req, res, next) => {
    if (req.headers?.authorization === "Bearer " + process.env.SECRET) {
        next();
        return;
    }
    res.status(401);
    res.send();
});

app.post("/echo", (req, res) => {
    res.json({payload: req.body});
});

app.post("/isCode", async (req, res) => {
    const isCode = await adapter.isCode(req.body);
    res.json({isCode});
});

app.post("/info", async (req, res) => {
    const info = await adapter.getSnippetInfo(req.body);
    res.json(info);
});

app.listen(process.env.PORT, () => {
    console.log(`[${process.env.HOST}:${process.env.PORT}]`,"Server is listening!");
})

