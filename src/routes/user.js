// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/user");
const validationLogIn = require("../middlewares/user/validationsLogIn");
const validationRegister = require("../middlewares/user/validationsRegister");

const guestHandler = require("../middlewares/user/guestHandler");
const loggedHandler = require("../middlewares/user/loggedHandler");

const formattedDate = require("../scripts/formattedDate");

// Setting Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "/../../public/images/avatars"));
	},
	filename: (req, file, cb) => {
		const multerFileName = `${formattedDate}-${file.originalname}`;

		cb(null, multerFileName);
	},
});

// Router
const router = express.Router();

// User Main Routes
// router.get("/", controller.list);
router.post("/login", controller.login);
router.post("/register", controller.register);
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
