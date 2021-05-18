"use strict";
var express = require("express");
var router = express.Router();
var multer = require("multer");
var productController = require("../controllers/productController");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});
var upload = multer({ storage: storage });
router.get("/list", productController.list_products);
router.get("/list/:id", productController.product);
router.get("/display", productController.display_get);
router.post("/display", upload.single("image"), productController.display_post);
module.exports = router;
