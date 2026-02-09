import React from "react";
import "./StarRating.css";

export default function StarRating({ rating, onRate }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : ""}`}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
