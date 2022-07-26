// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/store");
const adminHandler = require("../middlewares/handlers/adminHandler");

const formattedDate = require("../middlewares/other/formattedDate");

// Setting Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "/../../public/images/products/", req.body.tier, "/")
    );
  },
  filename: (req, file, cb) => {
    const multerFileName = `${formattedDate}-${file.originalname}`;

    cb(null, multerFileName);
  },
});
const uploadFile = multer({ storage });

// Router
const router = express.Router();

// Lists Products
router.get("/", controller.store);

// Universe Routes
router.get("/universe", adminHandler, controller.universeList);
router.get("/universe/create", adminHandler, controller.universeCreate);
router.post("/universe/create", adminHandler, controller.universeCreated);
router.get("/universe/:universe", adminHandler, controller.universeOne);

// Product Routes
router.get("/product/create", adminHandler, controller.productCreate);
router.post(
  "/product/create",
  uploadFile.single("image"),
  controller.productCreated
);
// router.get("/search", controller.productSearch);
router.get("/:name/", controller.productDetail);
router.post("/:name/delete", adminHandler, controller.productDelete);

module.exports = router;
