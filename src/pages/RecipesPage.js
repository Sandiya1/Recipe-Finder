import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import RecipeDetails from "../components/RecipeDetails";
import { getRecipeDetails } from "../services/spoonacular";
import "./RecipesPage.css";
import FloatingIcons from "../components/FloatingIcons";
export default function RecipesPage({
  favorites,
  setFavorites,
  ratings,
  setRatings,
  history,
  setHistory,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Recipes come from FinderPage via navigation state
  const recipes = location.state?.recipes || [];

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 If user refreshes or lands here directly
  if (!recipes.length) {
    return (
      <div className="recipes-page empty-state">
        <h2>No recipes found</h2>
        <p>Go back and search for recipes first 🍳</p>
        <button onClick={() => navigate("/finder")}>
          Back to Finder
        </button>
      </div>
    );
  }

  // 📖 Load recipe details
  const viewDetails = async (id) => {
    setLoading(true);
    setError("");

    try {
      const res = await getRecipeDetails(id);
      setSelectedRecipe(res.data);

      // save to history (latest first, max 10)
      setHistory((prev) =>
        [
          {
            id: res.data.id,
            title: res.data.title,
            image: res.data.image,
          },
          ...prev.filter((item) => item.id !== res.data.id),
        ].slice(0, 10)
      );

      // scroll to details smoothly
      setTimeout(() => {
        document
          .getElementById("recipe-details")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipe details 😕");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Add to favorites
  const addToFavorites = () => {
    setFavorites((prev) => {
      if (prev.some((r) => r.id === selectedRecipe.id)) return prev;
      return [...prev, selectedRecipe];
    });
  };

  return (
    <div className="recipes-page">
      <div className="recipes-bg" />
      <FloatingIcons />
      {/* PAGE TITLE */}
      <div className="details-top-bar">
  <button
    className="back-btn"
    onClick={() => navigate("/finder")}
  >
    ← Back to Finder
  </button>
</div>

      <div className="recipes-content">
      <h2 className="recipes-title">Recipes For You</h2>

      {/* CAROUSEL CARDS */}
      <RecipeList recipes={recipes} onViewDetails={viewDetails} />

      {/* STATES */}
      {loading && <p className="loading-text">Loading recipe… 🍲</p>}
      {error && <p className="error-text">{error}</p>}

      {/* DETAILS SECTION */}
      {selectedRecipe && (
        <div id="recipe-details">
          <RecipeDetails
            recipe={selectedRecipe}
            addToFavorites={addToFavorites}
            favorites={favorites}
            ratings={ratings}
            setRating={setRatings}
            onBack={() => {
              setSelectedRecipe(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
    </div>
    
  );
}
