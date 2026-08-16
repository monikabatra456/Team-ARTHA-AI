# ArthaAI MSME Scheme & Opportunity Engine

An AI-powered Opportunity Matching & Document Verification Engine for Indian MSMEs built with React, Vite, Express, and Google Gemini 3.7 / 3.6 Flash.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- npm or bun

### Setup & Launch

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create or edit the `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   GEMINI_API_KEY="your_google_gemini_api_key_here"

   # Firebase Credentials
   VITE_FIREBASE_API_KEY="AIzaSyAB0m4xGKYwPgHnCmDW2zwIT3_zs4cson4"
   VITE_FIREBASE_AUTH_DOMAIN="artha-ai-3a610.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="artha-ai-3a610"
   VITE_FIREBASE_STORAGE_BUCKET="artha-ai-3a610.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID="789198408235"
   VITE_FIREBASE_APP_ID="1:789198408235:web:7955186132607f6b46786e"
   VITE_FIREBASE_MEASUREMENT_ID="G-BXCB7V6G2Z"
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Preview Locally**:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying to Render

This repository includes a `render.yaml` blueprint configuration for easy deployment on Render.

### Option 1: Blueprint Deployment (Recommended)
1. Push this project to your GitHub / GitLab repository.
2. Go to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprint**.
4. Connect your repository. Render will automatically detect `render.yaml`.
5. Under Environment Variables in the Render dashboard, set `GEMINI_API_KEY` to your Gemini API Key.
6. Click **Apply**.

### Option 2: Manual Web Service Setup
If creating a Web Service manually on Render:
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `GEMINI_API_KEY`: `<Your Gemini API Key>`
  - (Add `VITE_FIREBASE_*` variables if using custom Firebase settings)

---

## 🔒 Security Architecture
- **Backend API Keys**: `GEMINI_API_KEY` is strictly managed and consumed on the Node/Express backend (`server.ts`). It is **never** sent to or accessible by client-side browser code.
