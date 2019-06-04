const Booking = require("../models/Booking");
const Rental = require("../models/Rental");
const User = require("../models/User");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require("moment");
exports.createBooking = (req, res, next) => {
  const user = res.locals.user;
  const { startAt, endAt, totalPrice, days, guests, rental } = req.body;
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    days,
    guests
  });
  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).json({
          errors: normalizeErrors(err.errors)
        });
      }
      if (foundRental.user._id === user._id) {
        return res.status(422).json({
          errors: [
            {
              title: "Invalid user",
              detail: "Cannot create booking on your Rental"
            }
          ]
        });
      }
      if (isValidBooking(booking, foundRental)) {
        booking.user = user._id;
        booking.rental = foundRental.user._id;
        foundRental.bookings.push(booking);
        booking.save(err => {
          if (err) {
            return res.status(422).json({
              errors: normalizeErrors(err.errors)
            });
          }
          foundRental.save();
          User.updateOne(
            { _id: user._id },
            { $push: { bookings: booking } },
            function() {}
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).json({
          errors: [
            {
              title: "Invalid booking",
              detail: "Choosen dates are already taken"
            }
          ]
        });
      }
    });
};

isValidBooking = (purposedBooking, rental) => {
  let isValid = true;
  let { bookings } = rental;
  if (bookings && bookings.length > 0) {
    isValid = bookings.every(booking => {
      const purposedStart = moment(purposedBooking.startAt);
      const purposedEnd = moment(purposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);
      return (
        (purposedStart < actualStart && purposedEnd < actualStart) ||
        (purposedStart > actualEnd && purposedEnd > actualEnd)
      );
    });
  }
  return isValid;
};
