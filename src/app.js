// Requiring Libraries
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

// Setting APP and PORT
const app = express();
const PORT = process.env.PORT || 3030;

// Setting Routes
const routesAddress = require("./routes/address");
const routesStore = require("./routes/store");
const routesUser = require("./routes/user");

// Settings
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middlewares generales de la app
app.use((req, res, next) => {
	console.log(
		`In ${req.socket.remoteAddress}:${PORT}${req.url} used ${req.method}`
	);
	next();
});

// Routes
app.use("/address", routesAddress);
app.use("/store", routesStore);
app.use("/user", routesUser);
app.use((req, res, next) => {
	res.status(404).send("Error 404, page not found");
	next();
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
