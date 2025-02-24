import {config} from "dotenv";
import express from "express";

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

app.post("/isCode", (req, res) => {
    console.log(req.body);
    // TODO: Realize
    const isCode = false;
    res.json({isCode});
});

app.listen(process.env.PORT, () => {
    console.log(`[${process.env.HOST}:${process.env.PORT}]`,"Server is listening!");
})

