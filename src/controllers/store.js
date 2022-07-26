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
const formattedDateDb = require("../middlewares/other/formattedDateDb");
const consoleLogError = require("../middlewares/other/consoleLogError");

// Defining Controller
const controller = {
  store: async (req, res) => {
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
    res.render("products/productCreate.ejs", {
      title: "Crea un nuevo producto",
      css: "forms",
      css2: "stylesForms",
      tiers,
      universes,
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
    let product = Product.findOne({
      where: {
        product_id: req.params.name,
      },
    });
    res.render("", {
      css: "",
      title: "",
    });
  },
  productDelete: async (req, res) => {
    let { name } = req.params;
    try {
      Product.update(
        {
          updated_at: formattedDateDb,
          deleted: 0,
        },
        {
          where: { name: name },
        }
      );
      res.redirect("/store");
    } catch (error) {
      console.log(error);
      res.redirect(`/store/${name}`);
    }
  },
  productSearch: async (req, res) => {
    try {
      let productName = req.query.search || undefined;

      let products = await Product.query();

      res.render("products/store", {
        title: `Resultados para ${search}`,
        products: products,
      });
    } catch (error) {
      res.render("products/store", {
        title: `Resultados - !`,
        error: error,
      });
    }
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
  universeCreate: async (req, res) => {
    res.render("products/universeCreate", {
      title: "Crea un universo",
      css: "forms",
      css2: "stylesForms",
    });
  },
  universeCreated: async (req, res) => {
    let validationResults = validationResult(req);
    try {
      if (validationResults.errors.length > 0) {
        return res.render("products/universeCreate", {
          errors: validationResults.mapped(),
          css: "stylesForms",
          css2: "forms",
          title: "Error en la creación",
        });
      } else {
        let { universe } = req.body;
        await Universe.create({
          universe: universe,
        });
        res.redirect("/store/universe");
      }
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  universeOne: async (req, res) => {
    try {
      let { universe } = req.params;
      let getId = await Universe.findOne({
        where: {
          universe: universe,
        },
      });
      if (getId != undefined) {
        let products = await Product.findAll({
          where: { universe_id: getId.universe_id },
        });
        if (!products) {
          res.render("products/store.ejs", {
            css: "stylesHome",
            title: `Universo ${universe}`,
            errors: {
              notFound: { msg: "No se encontraron productos" },
            },
          });
        } else {
          res.render("products/store.ejs", {
            css: "stylesHome",
            title: `Universo ${universe}`,
            products,
          });
        }
      } else {
        res.render("products/store.ejs", {
          css: "stylesHome",
          title: `Universo ${universe}`,
        });
      }
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
};

module.exports = controller;
