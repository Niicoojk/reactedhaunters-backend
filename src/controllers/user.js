// Requiring Libraries
const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Placing abbreviations of Models
const Address = db.Address;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Product = db.Product;
const Tier = db.Tier;
const Universe = db.Universe;
const User = db.User;
const UserAddress = db.UserAddress;

// Requiring Scripts & Declaring Variables
const formattedDateDb = require("../scripts/formattedDateDb");
const consoleLogError = require("../scripts/consoleLogError");

let verifyEmpty = (isEmpty, oldData) => {
	if (isEmpty === "" || isEmpty === " ") {
		return (isEmpty = oldData);
	} else {
		return isEmpty;
	}
};

// Troll Responses at Password
let random = () => {
	let rand = Math.random() * passwordResponses.length;
	rand = Math.floor(rand);
	return rand;
};
let passwordResponses = [
	"You almost get it;)",
	"Better luck next time",
	"The password is... I won't tell you, why keep reading?",
	"Keep trying, maybe sometime you'll get it",
	"Soon you'll get it",
	"Trust on yourself and you'll get it",
	"Obviously I'm trolling you, I would never serve a password that easily",
];

// Defining Controller
const controller = {
	signIn: (req, res) => {
		res.render("users/login.ejs", {
			css: "forms",
			title: "Iniciar sesión",
			headerText: "Registrarse",
			headerLink: "/user/register",
		});
	},
	login: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);

		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "forms",
					title: "Iniciar sesión - !",
					headerText: "Registrarse",
					headerLink: "/user/register",
				});
			} else {
				// Requiring Form Fields
				let { login_key, password } = req.body;

				// Verifying if includes @ (at)
				let includesAt = login_key.includes("@");

				if (!includesAt) {
					// Finding user if login_key is user_name
					let user = await User.findOne({ where: { user_name: login_key } });

					// Deleting User Password before send Response
					user.password = passwordResponses[random()];
					req.session.user = user;
					res.redirect("/user");
				} else if (includesAt) {
					// Finding user if login_key is email
					let user = await User.findOne({ where: { email: login_key } });

					// Deleting User Password before send Response
					user.password = passwordResponses[random()];
					req.session.user = user;
					res.redirect("/user");
				} else {
					return res.render("", {
						errors: validationResults.mapped(),
						css: "forms",
						title: "Iniciar sesión - !",
						headerText: "Registrarse",
						headerLink: "/user/register",
					});
				}
			}
		} catch (error) {
			consoleLogError(error);
			return res.render("", {
				errors: validationResults.mapped(),
				css: "",
				title: "",
			});
		}
	},
	signUp: (req, res) => {
		res.render("users/register.ejs", {
			css: "forms",
			title: "Registrarse",
			headerText: "Iniciar sesión",
			headerLink: "/user/login",
		});
	},
	register: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("user/register.ejs", {
					errors: validationResults.mapped(),
					css: "forms",
					title: "Registrarse - !",
					headerText: "Iniciar sesión",
					headerLink: "/user/login",
					old: req.body,
				});
			} else {
				// Requiring Form Fields
				let { first_name, last_name, user_name, email, password } = req.body;

				// Setting fields that doesn't came directly form the form
				req.file
					? (image = "/img/avatars/default.png")
					: (image = "/img/avatars/" + req.file.filename);
				let terms_conditions = 1;
				let created_at = formattedDateDb;
				let updated_at = formattedDateDb;
				let email_send;
				req.body.email_send == "on" ? (email_send = 1) : (email_send = 0);
				password = bcrypt.hashSync(password, 10);

				// Creating User
				let user = await User.create({
					first_name: first_name,
					last_name: last_name,
					user_name: user_name,
					email: email,
					password: password,
					image: image,
					created_at: created_at,
					updated_at: updated_at,
					terms_conditions: terms_conditions,
					email_send: email_send,
					deleted: deleted,
				});

				// Sending Response
				res.redirect("/user/login");
			}
		} catch (error) {
			return res.render("user/register.ejs", {
				errors: validationResults.mapped(),
				css: "forms",
				title: "Registrarse - !",
				headerText: "Iniciar sesión",
				headerLink: "/user/login",
			});
		}
	},
	userDelete: (req, res) => {
		res.render("users/userDelete.ejs", {
			css: "forms",
			title: "Borrar usuario.",
			user: req.session.user,
			headerText: "Volver al perfil",
			headerLink: "/user/",
		});
	},
	userDeleted: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("users/userDelete.ejs", {
					errors: validationResults.mapped(),
					css: "forms",
					title: "Borrar usuario - !",
					headerText: "Volver al perfil",
					headerLink: "/user/",
					errors: validationResults.mapped(),
				});
			} else {
				let { user } = req.session;

				// Updating the 'deleted' column
				await User.update(
					{
						updated_at: formattedDateDb,
						deleted: 1,
					},
					{
						where: { user_id: user.id },
					}
				);
			}
		} catch (error) {
			res.render("users/userDelete.ejs", {
				css: "forms",
				title: "Borrar usuario - !",
				user: req.session.user,
				headerText: "Volver al perfil",
				headerLink: "/user/",
				error: error,
				errors: validationResults.mapped(),
			});
		}
	},
	userUpdate: async (req, res) => {
		res.render("users/userUpdate.ejs", {
			css: "forms",
			title: "Edita tu perfil",
			user: req.session.user,
			headerText: "Volver al perfil",
			headerLink: "/user/",
		});
	},
	userUpdated: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("users/userUpdate.ejs", {
					css: "forms",
					title: "Edita tu perfil",
					user: req.session.user,
					headerText: "Volver al perfil",
					headerLink: "/user/",
					errors: validationResults.mapped(),
				});
			} else {
				// Requiring user in session and the body of the form.
				let { first_name, last_name, email } = req.body;
				let { user } = req.session;

				// Checking if the fields come empty
				first_name = verifyEmpty(first_name, user.first_name);
				last_name = verifyEmpty(last_name, user.last_name);
				email = verifyEmpty(email, user.email);
				req.file ? (image = "/img/avatars" + req.file.filename) : user.image;

				// Updating the User
				await User.update(
					{
						first_name: first_name,
						last_name: last_name,
						email: email,
						image: image,
						updated_at: formattedDateDb,
					},
					{ where: { user_id: user.id } }
				);
				console.log(`El usuario se actualizó correctamente`);
				res.redirect("/user/");
			}
		} catch (error) {
			console.log(error);
			res.render("users/userUpdate.ejs", {
				css: "forms",
				title: "Edita tu perfil",
				user: req.session.user,
				headerText: "Volver al perfil",
				headerLink: "/user/",
				errors: validationResults.mapped(),
			});
		}
	},
	collectionAdd: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
	collectionDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
	collectionList: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
	favouritesAdd: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
	favouritesDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
	favouritesList: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let {} = req.body;
			}
		} catch (error) {}
	},
};

module.exports = controller;
