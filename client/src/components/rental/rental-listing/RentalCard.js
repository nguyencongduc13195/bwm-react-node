import React from "react";
import { Link } from "react-router-dom";
import {isShared} from '../../../helpers';
const RentalCard = ({ colNum, rental }) => {
  return (
    <div className={colNum}>
      <Link className="rental-detail-link" to={`/rental/${rental._id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={rental.image} alt={rental.title} />
          <div className="card-block">
            <h6 className={`card-subtitle ${rental.category}`}>
              {isShared(rental.shared)} {rental.category} &#183;{" "}
              {rental.city}
            </h6>
            <h4 className="card-title">{rental.description}</h4>
            <p className="card-text">
              ${rental.dailyRate} per Night &#183; Free Cancelation
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default RentalCard;
