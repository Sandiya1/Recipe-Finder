// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FinderPage from "./pages/FinderPage";
import RecipesPage from "./pages/RecipesPage";
import FavoritesPage from "./pages/FavoritesPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [ratings, setRatings] = useState({});

  // Load from localStorage
  useEffect(() => {
    const f = localStorage.getItem("favorites");
    const h = localStorage.getItem("history");
    const r = localStorage.getItem("ratings");

    if (f) setFavorites(JSON.parse(f));
    if (h) setHistory(JSON.parse(h));
    if (r) setRatings(JSON.parse(r));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/finder" element={<FinderPage />} />

        <Route
          path="/recipes"
          element={
            <RecipesPage
              favorites={favorites}
              setFavorites={setFavorites}
              ratings={ratings}
              setRatings={setRatings}
              history={history}
              setHistory={setHistory}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              setFavorites={setFavorites}
              ratings={ratings}
              setRatings={setRatings}
            />
          }
        />

        <Route
          path="/history"
          element={<HistoryPage history={history} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
