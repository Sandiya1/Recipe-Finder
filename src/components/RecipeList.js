import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

export default function RecipeList({ recipes, onViewDetails }) {
  if (!recipes.length) return null;

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
