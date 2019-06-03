const express = require("express");
const userCtl = require("../controllers/User");
const router = express.Router();

router.post("/auth", userCtl.auth);
router.post("/register", userCtl.register);
module.exports = router;
