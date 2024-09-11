const express = require("express");
const router = express.Router();
const {User} = require("../models/user");


// get all user ========================
router.get("/", async (req, res) => {
  const userlist = await User.find();
  if (!userlist) {
    res.status(500).json({ success: false }); //or use {error}
  }
  res.send(userlist);
});

module.exports = router;