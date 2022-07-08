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
		let passwordVerify = (password, passwordDatabase) => {
			let compared = bcrypt.compareSync(password, passwordDatabase);
			return compared;
		};
		try {
			let { login_key, password } = req.body;
			let containsAt = login_key.includes("@");
			if (containsAt) {
				let userToLog = await User.findOne({ where: { email: login_key } });
				if (userToLog) {
					let passwordOk = passwordVerify(password, userToLog.password);
					if (passwordOk) {
						delete userToLog.password;
						res.json({
							status: status,
							user: userToLog,
						});
					}
				} else {
					res.status(400).json({
						status: 400,
						errors: validationResults.mapped(),
					});
				}
			} else if (!containsAt) {
				let userToLog = await User.findOne({ where: { user_name: login_key } });
				if (userToLog) {
					let passwordOk = passwordVerify(password, userToLog.password);
					if (passwordOk) {
						delete userToLog.password;
						res.json({
							status: status,
							user: userToLog,
						});
					}
				} else {
					res.status(400).json({
						status: 400,
						errors: validationResults.mapped(),
					});
				}
			} else {
				res.status(400).json({
					status: 400,
					errors: validationResults.mapped(),
				});
			}
		} catch (error) {}
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
				email_send,
			} = req.body;
			if (
				first_name != undefined &&
				last_name != undefined &&
				user_name != undefined &&
				email != undefined &&
				password != undefined &&
				terms_conditions != undefined &&
				email_send != undefined
			) {
				// Setting fields that doesn't came directly form the form
				image = req.file.filename || "/img/avatars/default.png";
				let created_at = formattedDateDb;
				let updated_at = formattedDateDb;
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
				});
				res.status(200).json({
					status: 200,
					newUser: user,
				});
			}
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				errors: validationResults(req).mapped,
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
