// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../../controllers/api/store");
const adminHandler = require("../../middlewares/handlers/adminHandler");

const formattedDate = require("../../scripts/formattedDate");

// Setting Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(
			null,
			path.join(
				__dirname,
				"/../../../public/images/products/",
				req.body.universe,
				"/",
				req.body.tier
			)
		);
	},
	filename: (req, file, cb) => {
		const multerFileName = `${formattedDate}-${file.originalname}`;

		cb(null, multerFileName);
	},
});

// Router
const router = express.Router();

// Lists Products
router.get("/", controller.list);
router.get("/tier", controller.tierList);
router.get("/universe/", controller.universeList);

// Product Routes
router.post("/product/create", controller.productCreate);
router.get("/name", controller.productFind);
router.get("/:name/:tier", controller.productDetail);
router.post("/:name/delete", controller.productDelete);

// Universe Routes

router.get("/universe/:universe", controller.universeOne);
router.post("/universe/create", controller.universeCreate);

module.exports = router;
