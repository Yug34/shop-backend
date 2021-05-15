let express = require("express");
let router = express.Router();
const multer = require("multer");
let productController = require("../controllers/productController");
const Product = require("../models/product");
const fs = require("fs");
let path = require("path");

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

router.get("/display", (req, res) => {
  Product.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send(`An error occurred: ${err}`);
    } else {
      res.render("imagesPage", { items: items });
    }
  });
});

router.post("/display", upload.single("image"), (req, res, next) => {
  let obj = {
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    image: {
      data: fs.readFileSync(
        path.join(
          path.resolve(__dirname, "..") + "/uploads/" + req.file.filename
        )
      ),
      contentType: "image/png",
    },
  };
  Product.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/catalog/display");
    }
  });
});

module.exports = router;
