import axios from "axios";
import express from "express";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.get("/user", (req, res) => {
  res.render("user.ejs");
});

app.get("/reviews", async (req, res) => {
  const result = await db.query("SELECT * FROM reviews ");

  res.render("reviews.ejs", { reviews: result.rows });
});

app.post("/reviews", async (req, res) => {
  const { isbn, title, date, rating, description } = req.body;

  const result = await db.query(
    "INSERT INTO reviews (isbn, title, date, rating, description) VALUES ($1, $2, $3, $4, $5)",
    [isbn, title, date, rating, description]
  );
  console.log(isbn, title, date, rating, description);
  res.redirect("/reviews");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
