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
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	productCreate: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	productDetail: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	productDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	productFind: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	tierList: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
			let { user } = req.session;
			let tiers = await Tier.findAll({
				order: [["tier_id", "ASC"]],
			});
			res.status(200).json({
				status: status,
				tiers: tiers,
			});
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				status: 400,
				error: error,
			});
		}
	},
	universeList: async (req, res) => {
		let validationResults = validationResult(req);
		let status = res.statusCode;
		try {
			let { user } = req.session;
			let universe = await Universe.findAll({
				order: [["universe_id", "ASC"]],
			});
			res.status(200).json({
				status: status,
				universe: universe,
			});
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
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
	universeCreate: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
			let { user } = req.session;
		} catch (error) {}
	},
};

module.exports = controller;
