// Requiring Libraries
const db = require("../../database/models");
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

// Defining Controller
const controller = {
	list: async (req, res) => {
		let validationResults = validationResult(req);
		let resStatus = res.statusCode;
		try {
			// Making the queries
			let products = await Product.findAll({
				order: [
					['product_id', 'ASC'],
					['name', 'ASC']
				]
			});
			let tiers = await Tier.findAll({
				order: [
					['tier_id', 'ASC']
				]
			});
			let universes = await Universe.findAll({
				order: [
					['universe', 'ASC']
				]
			});

			// Sending response
			res.status(resStatus).json({
				totals: {
					'products': products.length,
					'tiers': tiers.length,
					'universes': universes.length,
				},
				data: {
					'products': products,
					'tiers': tiers,
					'universes': universes,
				},
				status: resStatus,
			})
		} catch (error) {
			consoleLogError(error);
			res.status(400).json({
				errors: validationResults.mapped(),
			});
		}
	},
	productCreate: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	productDetail: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	productDelete: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	productFind: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
	tierList: async (req, res) => {
		let status = res.statusCode;
		let validationResults = validationResult(req);
		try {
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
		} catch (error) {}
	},
	universeCreate: async (req, res) => {
		let validationResults = validationResult(req);
		try {
			let {} = req.body;
		} catch (error) {}
	},
};

module.exports = controller;
