const express = require("express");
const {
  addToCart,
  placeOrder,
  removeFromCart,
  cancelOrder,
} = require("../controlers/ordercontroler");
const { protect } = require("../middleware/authorization");
const router = express.Router();

// addtocart placeorder removefromcart cancelorder
router.route("/addtocart").post(protect, addToCart);
router.route("/placeorder").post(protect, placeOrder);
router.route("/removefromcart").put(protect, removeFromCart);
router.route("/cancelorder").post(protect, cancelOrder);

module.exports = router;
