const express = require("express");
const userCtl = require("../controllers/User");
const router = express.Router();

router.get("/", userCtl.authMiddleware, (req, res) => {
  res.send("ok");
});
module.exports = router;
