const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userschema.js");
const Product = require("../models/productschema.js");

const update_product_value = async (productId, quantity) => {
  console.log(productId, quantity);
  const item = await Product.findById(productId);
  if (quantity > item.quantity) {
    throw new Error("You are odering more than the Quantity");
  } else {
    const result = await (item.quantity = item.quantity - quantity);
    await item.save();

    if (!result) throw new Error("Error in processing");
    console.log(result);
  }
};

const update_cart_value = async (userid, quantity, totalPrice) => {
  console.log(userid, quantity, totalPrice);

  const user = await User.findById(userid);
  let result = await (user.cart_value = user.cart_value + totalPrice);
  console.log(result);

  if (!result) throw new Error("Error in processing");
  result = await (user.oders_inCart = user.oders_inCart + quantity);
  console.log(result);
  await user.save();

  return;
};

const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity, price } = req.body;
  const userid = req.user.id;
  let user = await User.findById(userid);
  const newitem = {
    product: productId,
    quantity: quantity,
    totalPrice: quantity * price,
  };
  if (user) {
    let result = await update_product_value(productId, quantity);
    result = await update_cart_value(userid, quantity, newitem.totalPrice);
    user.cart.push(newitem);
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Retry Item not added to Cart");
  }
});

const placeOrder = expressAsyncHandler(async (req, res) => {});

const removeFromCart = expressAsyncHandler(async (req, res) => {});

const cancelOrder = expressAsyncHandler(async (req, res) => {});

module.exports = { addToCart, placeOrder, removeFromCart, cancelOrder };
