// Requiring Dependencies
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");

// Requiring Middlewares
const cookieLogged = require("./middlewares/other/cookieLogged");
const consoleLogs = require("./middlewares/other/consoleLogs");
const isAdmin = require("./middlewares/other/isAdmin");

// Setting APP and PORT
const app = express();
const PORT = process.env.PORT || 3030;

// Requiring Routes
const routesAddress = require("./routes/api/address");
const routesMain = require("./routes/main");
const routesStore = require("./routes/store");
const routesUser = require("./routes/user");

// Requiring Api Routes
const routesApiAddress = require("./routes/api/address");
const routesApiStore = require("./routes/api/store");
const routesApiUser = require("./routes/api/user");

const db = require("./database/models");

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session && Cookies
let ss = 1000;
let mn = 60 * ss;
let hs = 60 * mn;
let DD = 24 * hs;
let month = 31 * DD;
let year = 365 * DD;

app.use(cookies());

app.use(
  session({
    secret: "Aguante McLovin",
    resave: false,
    saveUninitialized: false,
  })
);

// General Middlewares
app.use(consoleLogs);
app.use(cookieLogged);
app.use(isAdmin);

// Routes
app.use("/", routesMain);
// app.use("/api/address", routesApiAddress);
app.use("/api/store", routesApiStore);
app.use("/api/user", routesApiUser);
// app.use("/address", routesAddress);
app.use("/store", routesStore);
app.use("/user", routesUser);
app.use((req, res, next) => {
  try {
    res.render("error.ejs", {
      title: "Página no encontrada",
    });
  } catch (error) {
    res.render("error.ejs", {
      errors: error,
      title: "Página no encontrada",
    });
    next();
  }
});

// Start Server
app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
