// Requiring Libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

// Requiring Controller, Middlewares & Scripts
const controller = require("../controllers/store");
const adminHandler = require("../middlewares/handlers/adminHandler");

const formattedDate = require("../scripts/formattedDate");

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
router.get("/", controller.list);
router.get("/universe/", adminHandler, controller.universeList);

// Product Routes
router.get("/product/create", adminHandler, controller.productCreate);
router.post(
  "/product/create",
  uploadFile.single("image"),
  controller.productCreated
);
router.get("/name", adminHandler, controller.productFind);
router.get("/:id/", adminHandler, controller.productDetail);
router.post("/:id/delete", adminHandler, controller.productDelete);

// Universe Routes
router.get("/universe/:universe", adminHandler, controller.universeOne);
router.post("/universe/create", adminHandler, controller.universeCreate);

module.exports = router;
