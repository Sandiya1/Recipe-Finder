import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ recipe, onViewDetails }) {
  const rating = recipe.spoonacularScore
    ? (recipe.spoonacularScore / 10).toFixed(1)
    : "4.5";

  return (
    <div className="food-card" onClick={() => onViewDetails(recipe.id)}>
      <div className="food-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div className="food-card-body">
        <div className="food-rating">
          ⭐ {rating}
        </div>

        <h4 className="food-title">{recipe.title}</h4>

        <div className="food-meta">
          <span>{recipe.readyInMinutes || 20} mins</span>
          <span>•</span>
          <span>{recipe.servings || 2} servings</span>
        </div>
      </div>
    </div>
  );
}
