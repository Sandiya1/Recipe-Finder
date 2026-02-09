import React, { useState } from "react";
import RecipeDetails from "../components/RecipeDetails";
import RecipeCard from "../components/RecipeCard";
import FloatingIcons from "../components/FloatingIcons";
import "./FavoritesPage.css";

export default function FavoritesPage({
  favorites,
  setFavorites,
  ratings,
  setRatings,
}) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  
  

  return (
    <div className="favorites-page">
      <FloatingIcons />
      <div className="favorites-bg" />

      <div className="favorites-content">
        <h2 className="favorites-title">Your Favorites</h2>

        {favorites.length === 0 && (
          <div className="empty-state">
            <p>No favorites yet 💔</p>
            <span>Save recipes you love and they’ll appear here</span>
          </div>
        )}

        {/* FAVORITE CARDS */}
        <div className="favorites-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>

        {/* DETAILS */}
        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            favorites={favorites}
            ratings={ratings}
            setRating={setRatings}
            addToFavorites={() => {}}
            onBack={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </div>
  );
}

