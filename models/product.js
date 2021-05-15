let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
