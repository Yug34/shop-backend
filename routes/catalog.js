var express = require("express");
var router = express.Router();
const multer = require("multer");
var productController = require("../controllers/productController");
const Product = require("../models/product");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.get("/list", productController.list_products);

router.get('/list/:id', productController.product);

router.get('/display', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send(`An error occurred: ${err}`);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.post('/display', upload.single('image'), (req, res, next) => {

    var obj = {
        name: "name!",
        description: "desc!",
        quantity: 10,
        price: 100,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Product.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
        }
    });
});

module.exports = router;