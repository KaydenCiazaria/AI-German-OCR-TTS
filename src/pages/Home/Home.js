import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config"; // Import from config
import "./Home.css";

function Home() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        `${API_BASE_URL}/extract-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = response.data.text || "No text detected";
      
      // Navigate to result page with the extracted text
      navigate('/result', { state: { text: extractedText, imageUrl: previewUrl } });
      
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to extract text. Please try again."
      );
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

      <main className="home-main">
        <div className="upload-card">
          <h2>Input Your Image Here</h2>

          {previewUrl ? (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          ) : (
            <div className="upload-placeholder">
              <p>No image selected</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="button-group">
            <button className="upload-btn" onClick={handleUploadClick}>
              {selectedImage ? "Change Image" : "Select Image"}
            </button>

            {selectedImage && (
              <button
                className="extract-btn"
                onClick={handleExtractText}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Extract Text"}
              </button>
            )}
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default Home;