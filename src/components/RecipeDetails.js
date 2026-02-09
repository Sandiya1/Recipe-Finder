import React from "react";
import StarRating from "./StarRating";
import "./RecipeDetails.css";
import { useNavigate } from "react-router-dom";


export default function RecipeDetails({
  recipe,
  addToFavorites,
  favorites,
  ratings,
  setRating,
  onBack,
}) {
  const ingredients = recipe.extendedIngredients || [];
  const isFavorited = favorites?.some(
  (fav) => fav.id === recipe.id
);

  const steps =
    recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <div className="recipe-details-section">
      

      <div className="recipe-details-card">
        {/* IMAGE */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="details-image"
        />

        <div className="details-content">
          {/* TITLE */}
          <h2>{recipe.title}</h2>

          {/* META */}
          <div className="details-meta">
            <span>⏱ {recipe.readyInMinutes} mins</span>
            <span>🍽 {recipe.servings} servings</span>
          </div>

          {/* RATING */}
          <StarRating
            rating={ratings[recipe.id] || 0}
            onRate={(val) =>
              setRating({ ...ratings, [recipe.id]: val })
            }
          />

          {/* FAVORITE */}
          <button
            className={`fav-btn ${isFavorited ? "active" : ""}`}
            onClick={addToFavorites}
            disabled={isFavorited}
          >
            {isFavorited ? "❤️ Added to Favorites" : "🤍 Add to Favorites"}
          </button>


          {/* SUMMARY (optional intro) */}
          {recipe.summary && (
            <div
              className="summary"
              dangerouslySetInnerHTML={{
                __html: recipe.summary,
              }}
            />
          )}

          {/* INGREDIENTS */}
          <div className="section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {ingredients.map((item) => (
                <li key={item.id}>
                  {item.original}
                </li>
              ))}
            </ul>
          </div>

          {/* INSTRUCTIONS */}
          <div className="section">
            <h3>Instructions</h3>
            <ol className="steps-list">
              {steps.length ? (
                steps.map((step) => (
                  <li key={step.number}>
                    {step.step}
                  </li>
                ))
              ) : (
                <li>No instructions available.</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
