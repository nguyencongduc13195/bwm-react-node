import React from "react";
import Modal from "react-responsive-modal";
import {BwmResErrors} from "../shared/form/BWMResError";
const BookingModal = ({ open, closeModal, booking, confirmBooking, errors, totalPrice }) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      little
      classNames={{ modal: "booking-modal" }}
    >
      <h4 className="modal-title title">Confirm Booking </h4>
      <p className="dates">
        {booking.startAt} - {booking.endAt}
      </p>
      <div className="modal-body">
        <em>{booking.days}</em> nights / <em>{totalPrice}$</em>{" "}
        per Night
        <p>
          Guests: <em>{booking.guests}</em>
        </p>
        <p>
          Price: <em>{booking.totalPrice}$ </em>
        </p>
        <p>Do you confirm your booking for selected days?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-bwm" onClick={confirmBooking}>
          Confirm
        </button>
        <button type="button" onClick={closeModal} className="btn btn-bwm">
          Cancel
        </button>
      </div>
      <BwmResErrors errors={errors}/>
    </Modal>
  );
};

export default BookingModal;
