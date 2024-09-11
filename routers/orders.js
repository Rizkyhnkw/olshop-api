const express = require("express");
const router = express.Router();
const {Order} = require("../models/order");


// get all order ========================
router.get("/", async (req, res) => {
  const orderlist = await Order.find();
  if (!orderlist) {
    res.status(500).json({ success: false }); //or use {error}
  }
  res.send(orderlist);
});

module.exports = router;