let express = require("express");
let router = express.Router();
const multer = require("multer");
let productController = require("../controllers/productController");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

router.get("/list", productController.list_products);

router.get("/list/:id", productController.product);

router.get("/display", productController.display_get);

router.post("/display", upload.single("image"), productController.display_post);

//TODO:


module.exports = router;
