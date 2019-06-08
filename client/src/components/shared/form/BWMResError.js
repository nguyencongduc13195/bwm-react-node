import React from "react";
export const BwmResErrors = ({ errors }) => {
  return (
    errors.length > 0 && (
      <div className="alert alert-danger bwm-res-errors">
        {errors.map((err, index) => (
          <p key={index}>{err.detail}</p>
        ))}
      </div>
    )
  );
};
