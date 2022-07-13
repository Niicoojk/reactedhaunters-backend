// Requiring Libraries
const db = require("../database/models");
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
	productCreate: async (req, res) => {
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
	productDetail: async (req, res) => {
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
	productDelete: async (req, res) => {
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
	productFind: async (req, res) => {
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
	universeList: async (req, res) => {
		let validationResults = validationResult(req);
		let status = res.statusCode;
		try {
			if (validationResults.errors.length > 0) {
				return res.render("", {
					errors: validationResults.mapped(),
					css: "",
					title: "",
				});
			} else {
				let universe = await Universe.findAll({
					order: [["universe_id", "ASC"]],
				});
				res.status(200).json({
					status: status,
					universe: universe,
				});
			}
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				error: error,
			});
		}
	},
	universeOne: async (req, res) => {
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
	universeCreate: async (req, res) => {
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
