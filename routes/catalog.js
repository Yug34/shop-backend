var express = require("express");
var router = express.Router();

// Require controller modules.
var productController = require("../controllers/productController");

router.get("/", productController.index);

// router.get('/:id', function(req, res, next) {
//     res.json({title: req.params.id});
// });

module.exports = router;