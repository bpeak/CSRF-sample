const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid/v1");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const user = {
  user_id: "k",
  user_pw: "123"
};

app.get("/", (req, res) => {
  fs.readFile("main.html", (err, data) => {
    res.send(data.toString());
  });
});

app.post("/login", (req, res) => {
  // db check ( select )
  if (req.body.user_id === user.user_id && req.body.user_pw === user.user_pw) {
    console.log("login success");
    console.log("create cookie");
    const secret = uuid();
    // db insert token
    user.secret = secret;
    res.cookie("secret", secret);
    res.redirect("/");
  } else {
    res.send("fail");
  }
});

app.get("/profile", (req, res) => {
  fs.readFile("profile.html", (err, data) => {
    res.send(data.toString());
  });
});

app.get("/change_pw", (req, res) => {
  console.log(req.cookies);
  if (req.cookies.secret === user.secret) {
    user.user_pw = req.query.user_pw;
    console.log(user);
    res.send("success");
  } else {
    res.send("please login");
  }
});

app.listen(80, () => {
  console.log("ok");
});
