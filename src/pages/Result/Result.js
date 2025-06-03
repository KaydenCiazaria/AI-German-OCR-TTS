// src/pages/Result/Result.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./Result.css";

function Result() {
  const location = useLocation();
  const { text, imageUrl } = location.state || {};

  return (
    <div className="result-container">
      <header className="result-header">
        <h1>Extraction Results</h1>
      </header>

      <main className="result-main">
        <div className="result-card">
          <div className="image-section">
            <h2>Original Image</h2>
            <img src={imageUrl} alt="Uploaded content" />
          </div>

          <div className="text-section">
            <h2>Extracted Text</h2>
            <div className="extracted-text">
              {text || "No text was extracted"}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Result;