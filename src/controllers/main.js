// Requiring Libraries
const db = require("../database/models");

// Placing abbreviations of Models
const Product = db.Product;
const User = db.User;

// Defining Controller
const controller = {
  home: async (req, res) => {
    try {
      let products = await Product.findAll({
        where: { deleted: 0 },
      });
      if (req.cookies.cookieUser) {
        console.log(req.cookies.cookieUser);
      }
      res.render("home", {
        title: "Bienvenido a DHaunters",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = controller;
