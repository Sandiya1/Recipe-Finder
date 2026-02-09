import React from "react";

export default function CalorieSlider({ maxCalories, setMaxCalories }) {
  return (
    <div className="calorie-slider">
      <label>
        Max Calories: <strong>{maxCalories} kcal</strong>
      </label>

      <input
        type="range"
        min="100"
        max="1000"
        step="50"
        value={maxCalories}
        onChange={(e) => setMaxCalories(e.target.value)}
      />
    </div>
  );
}
