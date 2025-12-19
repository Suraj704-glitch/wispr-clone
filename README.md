# Wispr Flow Clone 🎙️

A high-performance, cross-platform voice-to-text desktop application built with **Tauri**, **React**, and **Deepgram**.

This project was developed as a technical assignment to demonstrate real-time audio streaming, native desktop capabilities, and clean architectural patterns.

## ⚡ Features

* **Push-to-Talk:** Intuitive recording control with visual feedback (breathing glow animation).
* **Real-Time Transcription:** Low-latency speech-to-text using Deepgram's Nova-2 model.
* **Cross-Platform Desktop App:** Built using Tauri for a native lightweight experience (Windows/macOS/Linux).
* **Clipboard Integration:** One-click copy functionality to insert text anywhere.
* **Glassmorphic UI:** Modern, translucent interface designed to act as an unobtrusive desktop widget.
* **Robust Error Handling:** Graceful management of microphone permissions and network states.

## 🛠️ Tech Stack & Architectural Decisions

According to the assignment requirements, I chose the following stack to optimize for performance and maintainability:

### 1. Framework: Tauri (vs Electron)
* **Decision:** I chose **Tauri** over Electron to ensure a smaller bundle size and better memory usage.
* **Benefit:** Tauri uses the underlying OS's webview (WebView2 on Windows, WebKit on macOS), resulting in a significantly lighter application footprint compared to bundling an entire Chromium instance.

### 2. Speech Engine: Deepgram API
* **Decision:** Used Deepgram's WebSocket API for streaming audio.
* **Benefit:** Provides the lowest latency possible (critical for a "Flow" like experience) compared to REST-based alternatives like OpenAI Whisper.

### 3. Frontend: React + Vite
* **Decision:** React provides a component-based architecture perfect for managing the UI state (Recording vs Idle, Text updates).
* **Architecture:** I followed a **Separation of Concerns** pattern:
    * **UI Layer:** (`TranscriptBox.jsx`, `Controls.jsx`) Handles only the display and user interaction.
    * **Service Layer:** (`deepgramService.js`) Encapsulates the complex WebSocket logic, audio buffering, and API communication.
    * **State Management:** utilized `useRef` for mutable non-rendering data (socket connections) and `useState` for UI feedback.

## 🚀 How to Run Locally

### Prerequisites
* Node.js installed.
* Rust (required for Tauri builds).
* A free API Key from [Deepgram Console](https://console.deepgram.com/).

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Suraj704-glitch/wispr-clone.git](https://github.com/Suraj704-glitch/wispr-clone.git)
    cd wispr-clone
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your key:
    ```env
    VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
    ```

4.  **Run the App:**
    To run as a native desktop application:
    ```bash
    npm run tauri dev
    ```
    *(Or run in browser mode for quick UI testing: `npm run dev`)*

## 📝 Known Limitations & Assumptions
* **Internet Connection:** The app relies on Deepgram's cloud API, so an active internet connection is required.
* **Language:** Currently hardcoded to English (US) for optimization.
* **Audio Input:** Assumes the default system microphone is the desired input source.
 ---
*Submitted by "Suraj Kumar Yadav"*
