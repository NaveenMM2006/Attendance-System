import express from "express";
import cors from "cors";
import pool from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(result.rows);
    } catch (error) {
        res.status(500).send("DB Error");
    }
});

app.get( "/", (req, res) => {
    res.send("API Running");
})

export default app;