const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const fs = require("fs");
// const pool = require("./db");
// const initializePassport = require("./passportConfig");
const { reset } = require("nodemon");

const dirname = __dirname + "/../client"
const app = express();
const PORT = 3000;
// initializePassport(passport);
app.use(express.static(dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', dirname);

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    console.log(dirname)
});

app.get('/index', (req, res) => {
  res.render(path.join(dirname + '/index.html'));
});

app.get('/', (req, res) => {
    res.render(path.join(dirname + '/index.html'));
});

app.get('/signup', (req, res) => {
    res.render(path.join(dirname + '/signup.html'));
});

app.get('/register', (req, res) => {
    res.render(path.join(dirname + '/register.html'));
});



app.post("/index", async(req, res) => {
    let {name, phone, email, date, time, guests, search} = req.body;
    let errors = [];
    console.log(name, phone, email, date, time, guests, search)

});

app.post("/register", async(req, res) => {
    let {your_name,  your_pass} = req.body;
    let errors = [];
    console.log(your_name, your_pass)

    });

app.post("/signup", async(req, res) => {
    let {name, email, pass, re_pass} = req.body;
    let errors = [];
    console.log(name, email, pass, re_pass)
  
    });