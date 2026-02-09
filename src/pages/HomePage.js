import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import FloatingIcons from "../components/FloatingIcons";
const dishes = [
  {
    id: 1,
    title: "Berry Yogurt Bowl",
    image: "/dishes/img1.jpg",
  },
  {
    id: 2,
    title: "Avocado Toast Deluxe",
    image: "/dishes/img2.jpg",
  },
  {
    id: 3,
    title: "Rainbow Veggie Salad",
    image: "/dishes/img3.jpg",
  },
  {
    id: 4,
    title: "Lemon Herb Grilled Chicken",
    image: "/dishes/img4.jpg",
  },
  {
    id: 5,
    title: "Tropical Smoothie Bowl",
    image: "/dishes/img5.jpg",
  },
  {
    id: 6,
    title: "Mediterranean Chickpea Bowl",
    image: "/dishes/img6.jpg",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeDish, setActiveDish] = useState(dishes[0]);

  const orbitDishes = dishes.filter((d) => d.id !== activeDish.id);
  const angleStep = 360 / orbitDishes.length;

  return (
    <div className="home">
      <FloatingIcons />
      <div className="curve-bg" />

      <div className="hero-wrapper">
        {/* LEFT WELCOME */}
        <div className="hero-text">
          <h1>
            Welcome.
            <br />
            Find food that fits you.
          </h1>

          <p>
            Explore recipes based on what you like, what you have,
            and how you want to eat. Simple, personal, and
            thoughtfully curated for you.
          </p>

          {/* 🔥 BUTTON */}
          <button
            className="explore-btn"
            onClick={() => navigate("/finder")}
          >
            Explore Recipes
          </button>
        </div>

        {/* RIGHT ORBIT */}
        <div className="hero-visual">
          <div className="orbit-circle" />

          <div className="hero-dish">
            <img src={activeDish.image} alt={activeDish.title} />
          </div>

          <div className="orbit-rotator">
            {orbitDishes.map((dish, index) => (
              <div
                key={dish.id}
                className="mini-dish"
                style={{ "--angle": angleStep * index }}
                onClick={() => setActiveDish(dish)}
              >
                <img src={dish.image} alt={dish.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
