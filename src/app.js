// Requiring Libraries
const fs = require("fs/promises");
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");

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

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// General Middlewares
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(async (req, res, next) => {
	let dateNow = new Date();
	let hh = dateNow.getHours();
	let mn = dateNow.getMinutes();
	let ss = dateNow.getSeconds();
	let ms = dateNow.getMilliseconds();

	hh < 10 ? (hh = "0" + hh) : hh;
	mn < 10 ? (mn = "0" + mn) : mn;
	ss < 10 ? (ss = "0" + ss) : ss;
	ms < 10 ? (ms = "0" + ms) : ms;
	ms < 100 ? (ms = "0" + ms) : ms;

	let time = "[" + hh + ":" + mn + ":" + ss + "." + ms + "]";

	await fs.appendFile(
		path.join(__dirname, "/logs/console.txt"),
		`${time} In ${req.socket.remoteAddress}:${PORT}${req.url} used ${req.method}`
	);
	console.log(
		`${time} In ${req.socket.remoteAddress}:${PORT}${req.url} used ${req.method}`
	);

	next();
});

// Routes
app.use("/", routesMain);
app.use("/api/address", routesApiAddress);
app.use("/api/store", routesApiStore);
app.use("/api/user", routesApiUser);
app.use("/address", routesAddress);
app.use("/store", routesStore);
app.use("/user", routesUser);
app.use((req, res, next) => {
	res.status(404).send("Error 404, page not found");
	next();
});

// Start Server
app.listen(PORT, () => {
	console.clear();
	console.log(`Server is running on port ${PORT}`);
});
