import express from "express";
import SSR from "./ssr";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(SSR);
});
app.get("/user", (req, res) => {
  res.send("Hello World! user" + req.query["userid"]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
