import React from "react";
import "./IngredientInput.css";

export default function IngredientInput({ ingredients, setIngredients }) {
  return (
    <div className="input-group">
      <label className="input-label">
        Ingredients
      </label>

      <input
        type="text"
        className="ingredient-input"
        placeholder="e.g. tomato, cheese, basil"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
    </div>
  );
}
