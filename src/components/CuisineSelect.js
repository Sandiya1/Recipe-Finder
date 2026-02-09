import React from "react";
import "./CuisineSelect.css";

const cuisines = [
  "",
  "Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Thai",
  "Japanese",
  "French",
  "Mediterranean",
  "American",
];

export default function CuisineSelect({ cuisine, setCuisine }) {
  return (
    <div className="select-group">
      <label className="select-label">
        Cuisine
      </label>

      <select
        className="cuisine-select"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      >
        {cuisines.map((c) => (
          <option key={c} value={c}>
            {c === "" ? "Any cuisine" : c}
          </option>
        ))}
      </select>
    </div>
  );
}
