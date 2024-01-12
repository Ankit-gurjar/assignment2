const express = require("express");
const {
  registerProduct,
  deleteProduct,
} = require("../controlers/productcontroller");
const { protect } = require("../middleware/authorization");

const router = express.Router();

router.route("/registerproduct").post(protect, registerProduct);
router.route("/deleteproduct").delete(protect, deleteProduct);

module.exports = router;
