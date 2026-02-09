import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientInput from "../components/IngredientInput";
import CuisineSelect from "../components/CuisineSelect";
import CalorieSlider from "../components/CalorieSlider";
import FloatingIcons from "../components/FloatingIcons";
import "./FinderPage.css";

import { searchRecipes } from "../services/spoonacular";
import { parseIngredients } from "../utils/ingredientNLP";

export default function FinderPage() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxCalories, setMaxCalories] = useState(500);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // NLP parsing
  const parseInput = (input) => {
    const { include, exclude } = parseIngredients(input);
    return {
      include: include.join(","),
      exclude: exclude.join(","),
    };
  };

  // 🔍 Fetch recipes → go to Recipes page
  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setError("");

    try {
      const parsed = parseInput(ingredients);

      const res = await searchRecipes({
        ingredients: parsed.include,
        excludeIngredients: parsed.exclude,
        cuisine,
        maxCalories,
      });

      navigate("/recipes", {
        state: {
          recipes: res.data.results || [],
        },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes 😬");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finder-page">
      <FloatingIcons />
      <div className="finder-bg" />

      <div className="finder-content">
        <h2 className="finder-title">Find Your Perfect Recipe</h2>

        <div className="filter-card">
          <IngredientInput
            ingredients={ingredients}
            setIngredients={setIngredients}
          />

          <CuisineSelect
            cuisine={cuisine}
            setCuisine={setCuisine}
          />

          <CalorieSlider
            maxCalories={maxCalories}
            setMaxCalories={setMaxCalories}
          />

          <button
            className="find-btn"
            onClick={fetchRecipes}
            disabled={!ingredients.trim() || loading}
          >
            {loading ? "Searching..." : "Find Recipes"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
