// Requiring Libraries
const db = require("../database/models");

// Placing abbreviations of Models
const Product = db.Product;
const User = db.User;

// Defining Controller
const controller = {
	home: async (req, res) => {
		try {
			let { user } = req.session;
			let products = await User.findAll({
				where: { deleted: 0 },
			});

			if (user) {
				res.render("home.ejs", {
					title: "",
					user: user,
					products: "",
				});
			} else {
				res.render("home.ejs", {
					title: "",
					products: "",
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = controller;
