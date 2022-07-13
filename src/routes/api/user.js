// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../../controllers/api/user");
const validationLogIn = require("../../middlewares/validations/user/logIn");
const validationRegister = require("../../middlewares/validations/user/register");
const validationUpdate = require("../../middlewares/validations/user/update");

const guestHandler = require("../../middlewares/handlers/guestHandler");
const loggedHandler = require("../../middlewares/handlers/loggedHandler");

const formattedDate = require("../../scripts/formattedDate");

// Setting Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "/../../../public/images/avatars"));
	},
	filename: (req, file, cb) => {
		const multerFileName = `${formattedDate}-${file.originalname}`;

		cb(null, multerFileName);
	},
});

// Router
const router = express.Router();

// User Main Routes
router.get("/", controller.list);
router.post("/login", validationLogIn, controller.login);
router.post("/register", validationRegister, controller.register);

// Update || Delete Routes
router.post("/update", validationUpdate, controller.userUpdate);
router.post("/delete", controller.userDelete);

// Favourites
router.get("/favourites", controller.favouritesList);
router.post("/favouriteAdd", controller.favouritesAdd);
router.post("/favouriteDelete", controller.favouritesDelete);

// User Collection
router.get("/collection", controller.collectionList);
router.post("/collectionAdd", controller.collectionAdd);
router.post("/collectionDelete", controller.collectionDelete);

module.exports = router;
