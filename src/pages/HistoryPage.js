import React, { useState } from "react";
import RecipeDetails from "../components/RecipeDetails";
import RecipeCard from "../components/RecipeCard";
import FloatingIcons from "../components/FloatingIcons";
import { getRecipeDetails } from "../services/spoonacular";
import "./HistoryPage.css";

export default function HistoryPage({ history }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewDetails = async (id) => {
    setLoading(true);
    try {
      const res = await getRecipeDetails(id);
      setSelectedRecipe(res.data);
    } catch (err) {
      console.error("Failed to load recipe details", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <FloatingIcons />
      <div className="history-bg" />

      <div className="history-content">
        <h2 className="history-title">Recently Viewed</h2>

        {history.length === 0 && (
          <div className="empty-state">
            <p>No history yet 🕰️</p>
            <span>Start exploring recipes and they’ll appear here</span>
          </div>
        )}

        {/* HISTORY CARDS */}
        <div className="history-grid">
          {history.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={() => viewDetails(recipe.id)}
            />
          ))}
        </div>

        {loading && <p style={{ textAlign: "center" }}>Loading recipe… 🍳</p>}

        {/* FULL DETAILS */}
        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            favorites={[]}
            ratings={{}}
            setRating={() => {}}
            addToFavorites={() => {}}
          />
        )}
      </div>
    </div>
  );
}
