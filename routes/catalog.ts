const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

router.get("/list", productController.list_products);

router.get("/list/:id", productController.product);

router.get("/display", productController.display_get);

router.post("/display", upload.single("image"), productController.display_post);

router.delete("/display/:id", productController.product_delete);

module.exports = router;
