// Requiring Libraries
const express = require("express");
const multer = require("multer");

// Requiring Controller, Middlewares & Scripts
const controller = require("../../controllers/api/address");
const validationAddress = require("../../middlewares/validations/user/address");

const guestHandler = require("../../middlewares/handlers/guestHandler");
const loggedHandler = require("../../middlewares/handlers/loggedHandler");

// Router
const router = express.Router();

// Address routes
router.post("/create", controller.create);
router.post("/:id/update", controller.update);
router.post("/:id/delete", controller.delete);

module.exports = router;
