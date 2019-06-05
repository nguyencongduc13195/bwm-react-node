import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalByID } from "../../../actions";
class RentalDetail extends Component {
  // constructor(props){
  //     super(props);
  // }
  componentWillMount() {
    this.props.dispatch(fetchRentalByID(this.props.match.params.id));
  }
  render() {
    const { rental } = this.props;
    return (
      <React.Fragment>
        {rental.id ? (
          <div>
            <h1>{rental.title}</h1>
            <h1>{rental.city}</h1>
            <h1>{rental.street}</h1>
            <h1>{rental.description}</h1>
          </div>
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
