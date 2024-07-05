const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/coders");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongodb connection successful");
});

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  myfile: String,
  proname: String,
  url: String,
  appl: String,
  num: Number,
  git: String,
  prdesc: String,
  student: String,
  pro1: String,
  pro1pro: String,
  pro2: String,
  pro2pro: String,
});

const Users = mongoose.model("data", userSchema);

app.post("/mentor", async (req, res) => {
  const { email, name, myfile, proname, prodesc, url, appl } = req.body;
  const mentor = new Users({
    email,
    name,
    myfile,
    proname,
    prodesc,
    url,
    appl,
  });
  await mentor.save();
  console.log(mentor);
  res.sendFile(path.join(__dirname, "/templates/home.html"));
});

app.post("/mentee", async (req, res) => {
  const {
    email,
    name,
    myfile,
    num,
    git,
    student,
    pro1,
    pro1pro,
    pro2,
    pro2pro,
  } = req.body;
  const mentee = new Users({
    email,
    name,
    myfile,
    num,
    git,
    student,
    pro1,
    pro1pro,
    pro2,
    pro2pro,
  });
  await mentee.save();
  console.log(mentee);
  res.sendFile(path.join(__dirname, "/templates/home.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/home.html"));
});

app.get("/mentee", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/mentee.html"));
});

app.get("/mentor", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/mentor.html"));
});

app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/home.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/about.html"));
});

app.get("/projects.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/projects.html"));
});

app.get("/guidelines.html", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates/guidelines.html"));
});

app.listen(port, () => {
  console.log("server started");
});
