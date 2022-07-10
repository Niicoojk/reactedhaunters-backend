// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../../controllers/api/user");
const validationLogIn = require("../../middlewares/validations/user/validationsLogIn");
const validationRegister = require("../../middlewares/validations/user/validationsRegister");

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
router.post("/:id/update", controller.userUpdate);
router.post("/:id/delete", controller.userDelete);

// Favourites
router.get("/:id/favourites", controller.favouritesList);
router.post("/:id/favouriteAdd", controller.favouritesAdd);
router.post("/:id/favouriteDelete", controller.favouritesDelete);

// User Collection
router.get("/:id/collection", controller.collectionList);
router.post("/:id/collectionAdd", controller.collectionAdd);
router.post("/:id/collectionDelete", controller.collectionDelete);

module.exports = router;
