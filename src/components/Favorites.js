// src/components/Favorites.js
import React from "react";

export default function Favorites({ favorites = [], onViewDetails, removeFromFavorites, ratings = {}, setRating }) {
  return (
    <div className="favorites">
      <h3>⭐ Favorites</h3>
      {favorites.length === 0 && <p>No favorites yet</p>}
      {favorites.map(f => (
        <div key={f.id} className="fav-item">
          <img src={f.image} alt={f.title} width="60" />
          <div style={{ display: "inline-block", marginLeft: 8 }}>
            <div style={{ fontWeight: "bold" }}>{f.title}</div>
            <div>
              <button onClick={() => onViewDetails(f.id)}>View</button>
              <button onClick={() => removeFromFavorites(f.id)} style={{ marginLeft: 6 }}>Remove</button>
            </div>
            <div>Rating: {ratings[f.id] || "—"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
