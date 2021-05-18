let {Schema, model} = require("mongoose");

module.exports = model("Cart", new Schema({
  cartItems: [
    { product: { type: Schema.Types.ObjectId, ref: "Product" } },
    { quantity: { type: Number, required: true } },
  ],
}));

export {};