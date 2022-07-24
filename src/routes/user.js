// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/user");
const validationLogIn = require("../middlewares/validations/user/logIn");
const validationRegister = require("../middlewares/validations/user/register");

const guestHandler = require("../middlewares/handlers/guestHandler");
const loggedHandler = require("../middlewares/handlers/loggedHandler");

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
const uploadFile = multer({storage});

// Router
const router = express.Router();

// User Main Routes
router.get("/login", guestHandler, controller.signIn);
router.post("/login", validationLogIn, controller.login);
router.get("/register", uploadFile.single('image'), guestHandler, controller.signUp);
router.post("/register", validationRegister, controller.register);
router.get("/", loggedHandler, controller.profile)

// Update & Delete User Routes
router.get("/update", loggedHandler, controller.userUpdate);
router.post("/update", uploadFile.single('image'), controller.userUpdated);
router.get("/delete", loggedHandler, controller.userDelete);
router.post("/delete", controller.userDeleted);

// Favourites
router.get("/:id/favourites", controller.favouritesList);
router.post("/:id/favouriteAdd", controller.favouritesAdd);
router.post("/:id/favouriteDelete", controller.favouritesDelete);

// User Collection
router.get("/:id/collection", controller.collectionList);
router.post("/:id/collectionAdd", controller.collectionAdd);
router.post("/:id/collectionDelete", controller.collectionDelete);

module.exports = router;
