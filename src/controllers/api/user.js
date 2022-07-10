// Requiring Libraries
const db = require("../../database/models");
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
const formattedDateDb = require("../../scripts/formattedDateDb");
const consoleLogError = require("../../scripts/consoleLogError");

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
	list: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let users = await User.findAll();
			res.status(200).json({
				total: users.length,
				data: users,
				status: 200,
			});
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				errors: validationResults.mapped(),
			});
		}
	},
	login: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);

		try {
			// Requiring Form Fields
			let { login_key, password } = req.body;

			// Verifying if includes @ (at)
			let includesAt = login_key.includes("@");

			if (!includesAt) {
				// Finding user if login_key is user_name
				let user = await User.findOne({ where: { user_name: login_key } });

				// Deleting User Password before send Response
				user.password = passwordResponses[random()];
				res.json({
					status: status,
					user: user,
				});
			} else if (includesAt) {
				// Finding user if login_key is email
				let user = await User.findOne({ where: { email: login_key } });

				// Deleting User Password before send Response
				user.password = passwordResponses[random()];
				res.json({
					status: status,
					user: user,
				});
			} else {
				res.status(400).json({
					status: 400,
					errors: validationResults.mapped(),
					error: error,
				});
			}
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
				error: error,
			});
		}
	},
	register: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			// Requiring Form Fields
			let {
				first_name,
				last_name,
				user_name,
				email,
				password,
				terms_conditions,
			} = req.body;

			// Setting fields that doesn't came directly form the form
			image = "/img/avatars/default.png";
			if (req.file) {
				image = req.file.filename;
			}
			if (terms_conditions == "on") {
				terms_conditions = 1;
			}
			let created_at = formattedDateDb;
			let updated_at = formattedDateDb;
			let email_send = 0;
			let deleted = 0;
			if (req.body.email_send) {
				email_send = req.body.email_send;
			}
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

			// Deleting User Password before send Response
			user.password = passwordResponses[random()];
			res.status(200).json({
				status: 200,
				newUser: user,
			});
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults.mapped(),
				error: error,
			});
		}
	},
	userDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	userUpdate: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	collectionAdd: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	collectionDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	collectionList: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	favouritesAdd: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	favouritesDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	favouritesList: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
};

module.exports = controller;
