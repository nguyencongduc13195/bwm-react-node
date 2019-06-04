const express = require("express");
const userCtl = require("../controllers/User");
const bookingCtl = require("../controllers/Booking");
const router = express.Router();

router.post("", userCtl.authMiddleware, bookingCtl.createBooking);
module.exports = router;
