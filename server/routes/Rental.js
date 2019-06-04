const express = require("express");
const rentalCtl = require("../controllers/Rental");
const router = express.Router();

router.get("/", rentalCtl.getRentals);
router.get("/:id", rentalCtl.getRentalByID);
module.exports = router;
