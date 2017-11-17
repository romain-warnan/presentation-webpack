import express from "express";
const cors = require("cors");
const path = require("path");
import * as fs from "fs";

const readJsonFileSync = (filepath, encoding) => {
  if (typeof encoding == "undefined") {
    encoding = "utf8";
  }
  try {
    const file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
  } catch (e) {
    return null;
  }
};

const app = express();
app.use(cors());

app.get("/:niveau", (request, res) => {
  const niveau = request.params.niveau;
  const json = readJsonFileSync(`${__dirname}/notes/${niveau}.json`);
  res.send(json);
});

app.get("/:niveau/:code", (request, res) => {
  const code = request.params.code;
  const niveau = request.params.niveau;
  const json = readJsonFileSync(`${__dirname}/notes/${code}.json`);
  if (json) {
    res.send(json);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(1010);
