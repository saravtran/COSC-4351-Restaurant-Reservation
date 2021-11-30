const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const fs = require("fs");
const pool = require("./db");
const initializePassport = require("./passportConfig");
const { reset } = require("nodemon");

const app = express();
const PORT = process.env.PORT || 9000;
// initializePassport(passport);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', dirname);

app.get('/index', (req, res) => {
  res.render(path.join(dirname + '/index.html'), {message:req.flash('error')});
});