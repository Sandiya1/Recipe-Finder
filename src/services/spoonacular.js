import axios from "axios";

const API_KEY = "9d6a58fd1af94236abe250982d94fc38";
const BASE_URL = "https://api.spoonacular.com/recipes";

// 🔍 Search recipes
export const searchRecipes = async ({
  ingredients,
  cuisine,
  maxCalories,
}) => {
  return axios.get(`${BASE_URL}/complexSearch`, {
    params: {
      apiKey: API_KEY,
      includeIngredients: ingredients,
      cuisine: cuisine || undefined,
      maxCalories: maxCalories || undefined,
      number: 10,
      addRecipeNutrition: true,
    },
  });
};

// 📖 Get recipe details
export const getRecipeDetails = async (id) => {
  return axios.get(`${BASE_URL}/${id}/information`, {
    params: {
      apiKey: API_KEY,
      includeNutrition: true,
    },
  });
};
