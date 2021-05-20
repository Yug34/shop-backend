const {Schema, model} = require("mongoose");

module.exports = model("Product", new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: {
    data: Buffer,
    contentType: String
  }
}));

export {};