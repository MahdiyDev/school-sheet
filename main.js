const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/sheet", function (req, res) {
  console.log(req.body);
  res.send("Hello World");
});

app.listen(2020);
