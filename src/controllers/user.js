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
const formattedDateDb = require("../middlewares/other/formattedDateDb");
const consoleLogError = require("../middlewares/other/consoleLogError");
const CartConstructor = require("../middlewares/utilities/cartConstructor");

let verifyEmpty = (isEmpty, oldData) => {
  if (isEmpty === "" || isEmpty === " ") {
    return (isEmpty = oldData);
  } else {
    return isEmpty;
  }
};

let ss = 1000;
let mn = 60 * ss;
let hs = 60 * mn;
let DD = 24 * hs;
let month = 31 * DD;
let year = 365 * DD;

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
    console.clear();

    // If the user exists, then it will modify for safe save in session and cookie
    let userModify = (anyUser) => {
      // anyUser.password = passwordResponses[random()];
      let user = {
        user_id: anyUser.user_id,
        user_name: anyUser.user_name,
        image: anyUser.image,
      };

      return (anyUser = user);
    };

    try {
      if (validationResults.errors.length > 0) {
        return res.render("users/login.ejs", {
          errors: validationResults.mapped(),
          css: "forms",
          title: "Iniciar sesión - !",
          headerText: "Registrarse",
          headerLink: "/user/register",
          oldData: req.body,
        });
      } else {
        // Requiring Form Fields
        let { login_key, password } = req.body;

        // Verifying if includes @ (at)
        let includesAt = login_key.includes("@");

        if (!includesAt) {
          // Finding user if login_key is user_name
          let userToLog = await User.findOne({
            where: { user_name: login_key },
          });
          let isAdmin = userToLog.admin === true ? true : false;
          res.locals.admin = isAdmin;
          req.session.admin = isAdmin;

          // Creating the Cookie if it's neccesary
          if (req.body.rememberMe) {
            res.cookie("cookieUser", userToLog.user_id, { maxAge: mn * 15 });
          }

          // Deleting User Password before send Response
          let user = userModify(userToLog);
          console.log(user);
          req.session.user = user;

          res.redirect("/user");
        } else if (includesAt) {
          // Finding user if login_key is email
          let userToLog = await User.findOne({ where: { email: login_key } });

          let isAdmin = userToLog.admin === true ? true : false;
          res.locals.admin = isAdmin;
          req.session.admin = isAdmin;

          // Creating the Cookie if it's neccesary
          if (req.body.rememberMe) {
            res.cookie("cookieUser", userToLog.user_id, { maxAge: mn * 15 });
          }

          // Deleting User Password before send Response
          let user = userModify(userToLog);
          console.log(user);
          req.session.user = user;

          res.redirect("/user");
        } else {
          return res.render("users/login.ejs", {
            errors: validationResults.mapped(),
            css: "forms",
            title: "Iniciar sesión - !",
            headerText: "Registrarse",
            headerLink: "/user/register",
            oldData: req.body,
          });
        }
      }
    } catch (error) {
      consoleLogError(error);
      return res.render("users/login.ejs", {
        errors: validationResults.mapped(),
        css: "forms",
        title: "Iniciar sesión - !",
        headerText: "Registrarse",
        headerLink: "/user/register",
        oldData: req.body,
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
        let image;
        req.file ? (image = req.file.filename) : (image = "default.png");
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
        oldData: req.body,
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie("connect.sid");
    res.clearCookie("cookieUser");
    req.session.destroy();
    res.redirect("/");
  },
  userDelete: (req, res) => {
    res.render("users/userDelete.ejs", {
      css: "forms",
      title: "Borrar usuario.",
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
        });
      } else {
        let { user_name } = req.body;

        // Updating the 'deleted' column
        await User.update(
          {
            updated_at: formattedDateDb,
            deleted: 1,
          },
          {
            where: { user_name: user_name },
          }
        );
        res.clearCookie("cookieUser");
        req.session.destroy();

        console.log("Usuario Eliminado");
        res.redirect("/user/logout");
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
        let image;
        req.file ? (image = req.file.filename) : user.image;

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
  cartAdd: async (req, res) => {
    try {
      // Getting the product id
      let id = req.params.id;

      // Calling the constructor
      let cart = new CartConstructor(req.session.cart ? req.session.cart : {});

      // Getting the product
      let productToAdd = Product.findOne({
        where: { product_id: id },
      });

      // Modifying the cart
      cart.add(productToAdd, productToAdd.product_id);
      res.cookie("cartDhaunters", cart);
      req.session.cart = cart;

      // Verifying cart and sending response
      console.log(req.session.cart);
      res.redirect("/store");
    } catch (error) {
      consoleLogError(error);
      res.redirect("/");
    }
  },
  cartDelete: async (req, res) => {},
  cartPage: async (req, res) => {
    res.render("users/cart", {
      title: "Carrito",
      css: "cart",
      products: req.session.cart,
    });
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
  profile: async (req, res) => {
    console.log(req.session.user);
    res.render("users/userProfile.ejs", {
      title: "Iniciar sesión",
    });
  },
};

module.exports = controller;
