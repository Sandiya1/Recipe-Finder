// src/components/History.js
import React from "react";

export default function History({ history = [], onViewDetails }) {
  return (
    <div className="history">
      <h3>📜 Viewed History</h3>
      {history.length === 0 && <p>No history yet</p>}
      {history.map((h, idx) => (
        <div key={h.id + idx} className="hist-item">
          <img src={h.image} alt={h.title} width="50" />
          <div style={{ display: "inline-block", marginLeft: 8 }}>
            <div>{h.title}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{new Date(h.viewedAt).toLocaleString()}</div>
            <div><button onClick={() => onViewDetails(h.id)}>View Again</button></div>
          </div>
        </div>
      ))}
    </div>
  );
}
