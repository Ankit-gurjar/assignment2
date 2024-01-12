const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productschema");

const registerProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const seller = req.user.id;

  if (!name || !price || !quantity || !description) {
    res.status(400);
    throw new Error("Provide All Details");
  }

  try {
    const item = await Product.create({
      name,
      price,
      quantity,
      description,
      seller,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400);
    throw new Error("Item not Registered");
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {});

module.exports = { registerProduct, deleteProduct };
