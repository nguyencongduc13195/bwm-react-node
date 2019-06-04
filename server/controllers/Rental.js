const Rental = require("../models/Rental");
const { normalizeErrors } = require("../helpers/mongoose");

exports.getRentals = (req, res) => {
  Rental.find()
    .select("-bookings")
    .exec((err, rentals) => {
      if (err) {
        return res.status(422).json({
          errors: normalizeErrors(err.errors)
        });
      }
      res.json(rentals);
    });
};
exports.getRentalByID = (req, res) => {
  Rental.findById(req.params.id)
    .populate('bookings', 'startAt endAt -_id')
    .populate('user', 'username -_id')
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).json({
          errors: normalizeErrors(err.errors)
        });
      }
      res.json(foundRental);
    });
};
