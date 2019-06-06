import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalByID } from "../../../actions";
import RentalDetailInfo from "./RentalDetailInfo";
import { MapWithAMarker } from "../../map/GoogleMap";
class RentalDetail extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRentalByID(this.props.match.params.id));
  }
  render() {
    const { rental } = this.props;
    return (
      <React.Fragment>
        {rental._id ? (
          <section id="rentalDetails">
            <div className="upper-section">
              <div className="row">
                <div className="col-md-6">
                  <img src={rental.image} alt={rental.title} />
                </div>
                <div className="col-md-6">
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `405px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              </div>
            </div>
            <div className="details-section">
              <div className="row">
                <div className="col-md-8">
                  <RentalDetailInfo rental={rental} />
                </div>
                <div className="col-md-4"> BOOKING</div>
              </div>
            </div>
          </section>
        ) : (
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  rental: state.rental.data
});
export default connect(mapStateToProps)(RentalDetail);
