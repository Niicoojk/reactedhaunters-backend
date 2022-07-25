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
    try {
      let products = await Product.findAll();
      res.render("products/store.ejs", {
        css: "stylesHome",
        title: "Store",
        products,
      });
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  productCreate: async (req, res) => {
    let tiers = await Tier.findAll({
      order: [["tier_id", "ASC"]],
    });
    let universes = await Universe.findAll({
      order: [["universe", "ASC"]],
    });
    res.render("products/createProduct.ejs", {
      title: "Crea un nuevo producto",
      css: "forms",
      css2: "stylesForms",
      tiers,
      universes,
      user: req.session.user,
    });
  },
  productCreated: async (req, res) => {
    let validationResults = validationResult(req);
    let tiers = await Tier.findAll({
      order: [["tier_id", "ASC"]],
    });
    let universes = await Universe.findAll({
      order: [["universe", "ASC"]],
    });
    try {
      if (validationResults.errors.length > 0) {
        return res.render("products/createProduct.ejs", {
          errors: validationResults.mapped(),
          title: "Crea un nuevo producto",
          css: "forms",
          css2: "stylesForms",
          tiers,
          universes,
          user: req.session.user,
          oldData: req.body,
        });
      } else {
        // Requiring form fields
        let { name, price, shortDesc, longDesc, tier, universe } = req.body;

        // Setting fields that doesn't came directly form the form
        let image = "default.png";
        if (req.file) {
          return (image = tier + "/" + req.file.filename);
        }

        let created_at = formattedDateDb;
        let updated_at = formattedDateDb;
        let deleted = 0;

        // Creating Product
        let newProduct = await Product.create({
          universe_id: universe,
          tier_id: tier,
          name: name,
          short_desc: shortDesc,
          long_desc: longDesc,
          price: price,
          image: image,
          created_at: created_at,
          updated_at: updated_at,
          deleted: deleted,
        });

        // Sending Response
        res.redirect("/store");
      }
    } catch (error) {
      consoleLogError(error);
      res.render("products/createProduct.ejs", {
        errors: validationResults.mapped(),
        title: "Crea un nuevo producto",
        css: "forms",
        css2: "stylesForms",
        tiers,
        universes,
        user: req.session.user,
        oldData: req.body,
      });
    }
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
