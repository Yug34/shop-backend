var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer  = require('multer')

// var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
const Product = require("./models/product");

let mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
let mongoDB = "mongodb+srv://verti:yug123@cluster0.o2mor.mongodb.net/kabra-shop?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
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

app.post('/', upload.single('image'), (req, res, next) => {

  var obj = {
    // name: {type: String, required: true},
    // description: {type: String, required: true},
    // quantity: {type: Number, required: true},
    // price: {type: Number, required: true},
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(
//     cors({
//       credentials: true,
//       origin: true,
//       methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
//     })
// );
// app.set("trust proxy", 1);

module.exports = app;
