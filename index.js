import axios from "axios";
import express from "express";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.send("Test");
});

app.get("/reviews", async (req, res) => {
  const result = await db.query("SELECT * FROM reviews ");

  res.render("reviews.ejs", { reviews: result.rows });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
