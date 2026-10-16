<p align="center">
  <img width="427" height="240" alt="German-OCR-Demo-Gif" src="https://github.com/user-attachments/assets/52454615-0b7b-49e1-aa61-98596e504902" />
</p>
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
3. **Flask Microservice Processing:** A Flask server running inside the notebook captures the request, handles file stream buffering, coordinates the local PaddleOCR pipelines, and pipes the resulting audio payload back down the open network connection.

### 🚀 Getting Started

### Prerequisites

- A Google account (for Google Colab)
- [Node.js](https://nodejs.org/) and npm
- An IDE or terminal of your choice
- An [ngrok](https://ngrok.com/) account and auth token

### 1. Clone the repository

```bash
git clone https://github.com/KaydenCiazaria/AI-German-OCR-TTS.git
cd <your-repo>
```

### 2. Start the backend (Google Colab)

1. Open the backend notebook (`GermanAI_BackEnd_API.ipynb.ipynb`) in [Google Colab](https://colab.research.google.com/).
2. Follow the instructions inside the notebook to install dependencies and start the Flask server.
3. Copy the public ngrok URL printed in the output. The frontend needs it to reach the backend.

> **Note:** Keep the Colab runtime running while you use the app. If it disconnects, re-run the notebook and update the ngrok URL.

### 3. Start the frontend

Install dependencies and start the development server:

```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 💡 Usage

1. Drag and drop an image with German text into the upload area.
2. Wait while the backend extracts the text and generates audio.
3. Play the audio result in the browser.
