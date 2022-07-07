// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/address");
const validationAddress = require("../middlewares/user/validationsAddress");

const guestHandler = require("../middlewares/user/guestHandler");
const loggedHandler = require("../middlewares/user/loggedHandler");

// Router
const router = express.Router();

// Address routes
router.post("/create", controller.create);
router.post("/:id/update", controller.update);
router.post("/:id/delete", controller.delete);

module.exports = router;
