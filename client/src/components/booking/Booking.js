import React, { createRef } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ToastContainer, toast } from "react-toastify";
import BookingModal from "./BookingModal";
import { getRangeOfDates } from "../../helpers";
import * as moment from "moment";
import * as actions from "../../actions";

export class Booking extends React.Component {
  constructor() {
    super();
    this.dataRef = createRef();
    this.bookedOutDates = [];
    this.state = {
      proposeBooking: {
        startAt: "",
        endAt: "",
        guests: 0,
        days: 0,
        totalPrice: 0,
        rental: {}
      },
      modal: {
        open: false
      },
      errors: []
    };
  }
  componentDidMount() {
    this.getBookedOutDates();
  }
  checkInvalidDates = date =>
    this.bookedOutDates.includes(date.format("YYYY/MM/DD")) ||
    date.diff(moment(), "days") < -1;
  getBookedOutDates() {
    const { bookings } = this.props.rental;
    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }
  handleApply = (event, datepicker) => {
    const startAt = datepicker.startDate.format("YYYY/MM/DD");
    const endAt = datepicker.endDate.format("YYYY/MM/DD");
    this.dataRef.current.value = `${startAt} to ${endAt}`;
    this.setState({
      proposeBooking: {
        ...this.state.proposeBooking,
        startAt,
        endAt
      }
    });
  };
  onHandleChange = e =>
    this.setState({
      proposeBooking: {
        ...this.state.proposeBooking,
        guests: parseInt(e.target.value)
      }
    });
  confirmProposeData = () => {
    const { startAt, endAt } = this.state.proposeBooking;
    const { rental } = this.props;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    this.setState({
      proposeBooking: {
        ...this.state.proposeBooking,
        days,
        rental,
        totalPrice: days * rental.dailyRate
      },
      modal: { open: true }
    });
  };
  // booking
  cancelConfirmation = () => this.setState({ modal: { open: false } });
  addNewBooking = booking => {
    const datesRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...datesRange);
  };
  handleBooking = () => {
    return actions
      .createBooking(this.state.proposeBooking)
      .then(data => {
        this.addNewBooking(data);
        this.resetData();
        toast.success("Booking has been successfully. Enjoy!");
      })
      .catch(errors => this.setState({ errors }));
  };
  resetData = () => {
    this.dataRef.current.value = "";
    this.setState({ proposeBooking: { guests: 0 } });
    this.cancelConfirmation();
  };
  render() {
    const { startAt, endAt, guests } = this.state.proposeBooking;
    const { rental } = this.props;
    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          ${rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr />
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            onApply={this.handleApply}
            isInvalidDate={this.checkInvalidDates}
            opens="left"
            containerStyles={{ display: "block" }}
          >
            <input
              autoComplete="off"
              ref={this.dataRef}
              id="dates"
              type="text"
              className="form-control"
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            onChange={this.onHandleChange}
            type="number"
            className="form-control"
            value={guests}
          />
        </div>
        <button
          disabled={!endAt || !startAt || !guests}
          className="btn btn-bwm btn-confirm btn-block"
          onClick={this.confirmProposeData}
        >
          Reserve place now
        </button>
        <hr />
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          errors={this.state.errors}
          confirmBooking={this.handleBooking}
          booking={this.state.proposeBooking}
          totalPrice={rental.dailyRate}
          open={this.state.modal.open}
          closeModal={this.cancelConfirmation}
        />
      </div>
    );
  }
}
