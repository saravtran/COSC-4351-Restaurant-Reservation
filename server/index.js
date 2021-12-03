const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const fs = require("fs");
const pool = require("./db");
const initializePassport = require("./passportConfig");
const { reset } = require("nodemon");

const app = express();
const PORT = process.env.PORT || 3000;
initializePassport(passport);

const dirname = __dirname + "/../client"
app.use(express.static(dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
      secret: "SESSION_SECRET",
      resave: false,
      saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', dirname);

app.listen(PORT, ()=>{
    console.log(`Server started on http://localhost:${PORT}`);
});

app.get('/index', (req, res) => {
  res.render(path.join(dirname + '/index.html'));
});

app.get('/', (req, res) => {
    res.render(path.join(dirname + '/index.html'));
});

app.get("/available_tables", async(req, res) => {
  const availableTables = await getAvailableTables(req.session.guests);
  console.log(availableTables);
  res.render(path.join(dirname + '/available_tables.html'), {availableTables:availableTables});
});

app.get('/redirect_page', (req, res) => {
  console.log(req.session)
  res.render(path.join(dirname + '/redirect_page.html'), {message: req.flash('error')});
})

app.get('/confirmation', (req, res) => {
  console.log(req.session);
  res.render(path.join(dirname + '/confirmation.html'), {availability: req.session.availability, table_num: req.session.table_num, table_size: req.session.table_size});
})

app.get('/signup', (req, res) => {
    res.render(path.join(dirname + '/signup.html'), {message: req.flash('error')});
})

app.get('/signin', (req, res) => {
    res.render(path.join(dirname + '/signin.html'), {message: req.flash('error')});
});

app.get('/dashboard', (req, res) => {
  res.render(path.join(dirname + '/dashboard.html'));
});

app.post("/index", async(req, res) => {
    let {name, phone, email, date, time, guests, search} = req.body;
    let errors = [];
    passed = true;
    // console.log(name, phone, email, date, time, guests, search);
    req.session.name = name;
    req.session.phone = phone;
    req.session.email = email;
    req.session.date = date;
    req.session.time = time;
    req.session.guests = guests;
    req.session.save(); 
    res.redirect("/available_tables");
    // if (!name || !phone || !email || !date || !time ||!guests) {
    //     passed = false;
    //     errors.push({message: "Please enter all fields"});}
      
    //     if (passed) {
    //       await pool.query(
    //         `INSERT INTO reservations (name, phone_num, email, date, time, guests)
    //             VALUES ($1, $2, $3, $4, $5, $6)`,
    //         [name, phone, email, date, time, guests],
    //         (err, results) => {
    //           if (err) {
    //             throw err;
    //           }
    //           console.log("Searching for Availibility");
    //           res.redirect("/index");
    //         }
    //       );
    //     }

});

// app.post("/signin", async(req, res) => {
//     let {your_name,  your_pass} = req.body;
//     let errors = [];
//     console.log(your_name, your_pass)
    
// });

app.post("/signin",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: true
  })
);

app.post("/available_tables", async(req, res) => {
//   res.json([{
//     table_num: req.body.table_num,
//     availability: req.body.availability,
//     table_size: req.body.table_size
//  }])
  req.session.availability = req.body.availability
  req.session.table_num = req.body.table_num;
  req.session.table_size = req.body.table_size;
  req.session.save() 
  // console.log(req.body.table_num);
  // console.log(req.session);
  // res.redirect("/redirect_page");
});

app.post("/confirmation", async(req, res) => {
  passed = true;
  let errors = [];
  console.log(req.session);
    if (!req.session.name || !req.session.phone || !req.session.email || !req.session.date || !req.session.time ||!req.session.guests) {
    passed = false;
    errors.push({message: "Please enter all fields"});}
  
    if (passed) {
      await pool.query(
        `INSERT INTO reservations (name, phone_num, email, date, time, guests)
            VALUES ($1, $2, $3, $4, $5, $6)`,
        [req.session.name, req.session.phone, req.session.email, req.session.date, req.session.time, req.session.guests],
        (err, results) => {
          if (err) {
            throw err;
          }
          // console.log("Searching for Availibility");
          // res.redirect("/index");
        }
      );
    }

    var table_nums = ""
    if( req.session.table_num.indexOf(',') != -1 ){
      
      table_nums = req.session.table_num.split(', ');
      
    }
    if (table_nums.length == 0) {
      await pool.query(
        `UPDATE tables
        SET available = 'false'
        WHERE table_id = '${req.session.table_num}';`,
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("Searching for Availibility");
          // res.redirect("/index");
        }
      );
    }

    if (table_nums.length >= 1) {
      // console.log(typeof table_nums[0]);
      // console.log(typeof req.session.table_num);
      // results = await updateTables(table_nums[0]);
      // result = await updateTables(table_nums[1]);
      // results = await updateCombiTables(req.session.table_num);

      await pool.query(
        `UPDATE tables
        SET available = 'false'
        WHERE table_id = '${table_nums[0]}' OR table_id ='${table_nums[1]}';`,
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("Searching for Availibility");
          // res.redirect("/index");
        }
      );

      await pool.query(
        `UPDATE table_combinations
        SET available = 'false'
        WHERE table_id ='${req.session.table_num}';`,
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log("Searching for Availibility");
          // res.redirect("/index");
        }
      );
    }

    
res.redirect("/index");
});

app.post("/signup", async(req, res) => {
    let {name, email, username, pass, re_pass} = req.body;
    let errors = [];
    console.log(req.body['agree-term'])

    if (!name || !email || !pass || !username || !re_pass) {
      errors.push({message: " Please enter all fields"});}
    if (pass !== re_pass) {
      errors.push({message: " Passwords do not match"});}
    if (req.body['agree-term'] != "on") {
      errors.push({message: " Please review our terms and conditions."});}
    
    if (errors.length > 0) {
      req.flash('error', errors[0].message);
      res.redirect("/signup");
    }

    else {
      hashedPassword = await bcrypt.hash(pass, 10);
      console.log(hashedPassword);
      var passed = true;
      var check;
      if (passed) {
        check = await checkUser(username);
        if (check.length > 0) {
          console.log("User already exists.")
          res.render('signup', { message: req.flash('User already exists') });
          passed = false;
        }
      }
      if (passed) {
        check = await checkEmail(email);
        if (check.length > 0) {
          req.flash('error', "Email already registered.");
          passed = false;
        }
      }
      new_user_id = await createUserID() 
      new_user_id = new_user_id[0].count
      if (passed) {
        await pool.query(
          `INSERT INTO users (user_id, username, name, email, password)
              VALUES ($1, $2, $3, $4, $5)`,
          [new_user_id, username, name, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            // req.flash('error', "You are now registered. Please log in to complete your profile.");
            res.redirect("/signin");
          }
        );
      }
      if (!passed) {
        res.redirect("/index");
      }
    }
  
});


const createUserID = async() => {
  var response = await pool.query(
    `SELECT COUNT (*) FROM users`,
  );
  return response.rows;
}

const checkUser = async(username) => {
  var response = await pool.query(
    `SELECT * FROM users
      WHERE username = $1`,
    [username]
  );
  return response.rows;
}

const checkEmail = async(email) => {
  var response = await pool.query(
    `SELECT * FROM users
      WHERE email = $1`,
    [email]
  );
  return response.rows;
}

const getAvailableTables = async(guests) => {
  var response = await pool.query(
    `SELECT * FROM tables
      WHERE available = TRUE AND seats = ${guests}`,
  );

  target = guests;
  console.log(response.rows.length);
  if (response.rows.length == 0) {
    var response = await pool.query(
      `SELECT *
       FROM table_combinations 
      WHERE available = TRUE AND seats = ${guests}`,
    );
    
    if (response.rows.length == 0) {
      remainder = guests % 2;
      if (remainder == 0) {
        target = parseInt(target) + 2;
      }
      else {
        target = parseInt(target) + 1;
      }
      console.log(target);
      var response = await pool.query(
        `SELECT * FROM tables
          WHERE available = TRUE AND seats = ${target}`,
      );
    }
    
  }
  return response.rows;
}

const updateTables = async(table_id) => {
  var response = await pool.query(
    `UPDATE tables
    SET available = FALSE WHERE table_id = ${table_id}`,
  );
  return response.rows;
}

const updateCombiTables = async(table_id) => {
  var response = await pool.query(
    `UPDATE table_combinations
    SET available = FALSE WHERE table_id = ${table_id}`,
  );
  return response.rows;
}