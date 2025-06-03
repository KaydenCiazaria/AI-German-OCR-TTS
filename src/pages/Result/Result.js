import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // Import from config
import "./Result.css";

function Result() {
  const location = useLocation();
  const { text: extractedText } = location.state || {};
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerateAudio = async (textToConvert) => {
    if (!textToConvert) {
      setError("Please enter some text");
      return;
    }

    setIsLoading(true);
    setError("");
    setAudioUrl("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate-audio`,
        { text: textToConvert },
        { responseType: "blob" }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate audio");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
    <header className="header">
        <h1>AI German</h1>
      </header>
    <div className="result-container">
      <header className="result-header">
        <h1>Extraction Results</h1>
      </header>

      <main className="result-main">
        <div className="result-card">
          <div className="text-section">
            <h2>Extracted Text</h2>
            <div className="extracted-text">
              {extractedText || "No text was extracted"}
            </div>

            <div className="text-input-section">
              <h3>Custom Text Input</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to convert to speech"
                rows={4}
              />
            </div>

            <div className="button-group">
              <button
                onClick={() => handleGenerateAudio(inputText)}
                disabled={isLoading || !inputText}
                className="generate-btn"
              >
                {isLoading ? "Generating..." : "Generate Audio from Input"}
              </button>

              {extractedText && (
                <button
                  onClick={() => handleGenerateAudio(extractedText)}
                  disabled={isLoading}
                  className="generate-btn"
                >
                  {isLoading ? "Generating..." : "Generate Audio from Extracted Text"}
                </button>
              )}
            </div>

            {error && <p className="error-message">{error}</p>}

            {audioUrl && (
              <div className="audio-player">
                <h3>Generated Audio:</h3>
                <audio controls src={audioUrl}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      </main> 
      <div>
        <a href="/" className="back-link">Back to Home</a> 

      </div>
    </div>
    </div>
  );
}

export default Result;