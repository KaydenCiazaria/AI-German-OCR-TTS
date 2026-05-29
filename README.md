## 🛠️ Tech Stack

*   **Frontend Client:** React 18 (Functional Components, Hooks)
*   **API Client:** Axios (Multipart/form-data transport layer)

##  Systems Architecture
*   **Backend Engine:** Flask (Python micro-framework hosted on Google Colab)
*   **Network & Tunneling:** ngrok (Secure edge tunneling for local-to-cloud exposure)
*   **Media Processing:** PaddleOCR & Text-to-Speech (TTS) libraries

---

## 🏗️ Architectural Highlights & Cloud Routing

The system utilizes an asynchronous distributed architecture to bypass local computational constraints by leveraging cloud hardware:

1. **Client Payload Dispatch:** The React application intercepts user file drops and dispatches binary assets over HTTP using multipart formatting.
2. **ngrok Edge Routing:** Requests hit a secure public ngrok edge endpoint, directly into a live Google Colab runtime environment.
3. **Flask Microservice Processing:** A Flask server running inside the notebook captures the request, handles file stream buffering, coordinates the local Python OCR/TTS pipelines, and pipes the resulting audio payload back down the open network connection.
