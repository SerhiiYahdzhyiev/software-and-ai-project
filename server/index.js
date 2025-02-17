import {config} from "dotenv";
import express from "express";

config();

const requiredEnvs = [
    "PORT",
    "HOST",
];

for (const k of requiredEnvs) {
    if (!process.env[k]) {
        throw new Error("Missing required environment variable: " + k);
    }
}

const app = express();

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`[${process.env.HOST}:${process.env.PORT}]`,"Server is listening!");
})

