import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/log", async (req, res) => {

    const { url } = req.query;
    if (!url) {
        return res.status(400).send("Missing 'url' parameter");
    }

    try {
        const r = await fetch(url);
        const text = await r.text();
        res.set("Access-Control-Allow-Origin", "*");
        res.set("text/plain").send(text);
    } catch(err) {
        res.status(500).send("Error fetching remote log");
    }
});

app.listen(4000);

