# InsightSync-AI-Business-Dashboard
**InsightSync** is a business dashboard that combines real-time inventory tracking with Google Gemini AI to generate useful business insights and turn raw data into clear, visual analysis.

---

# 🚀 InsightSync - AI Business Dashboard

## 🌐 Live Demo
[View Live Project](https://insight-sync-dashboard.netlify.app/)

---

## 🌟 Key Features

- **🤖 Gemini AI Integration**: A dedicated "AI Consultant" that analyzes your live inventory and sales data to provide strategic growth advice.
- **📈 Data Visualization**: Interactive and responsive sales performance charts powered by **Chart.js**.
- **⚡ Real-time Database**: Seamless data synchronization using **Supabase** for reliable inventory tracking.
- **🔍 Advanced Search & Filter**: Instant search functionality and tab-based navigation between Inventory and Sales Analysis views.
- **📱 Smart Responsive Design**: Optimized for both Desktop and Mobile, featuring conditional logic to simplify complex data on smaller screens.
- **🛠️ Tech Stack**: Built with Vanilla JavaScript, Supabase, Gemini AI API, and Chart.js.

---

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Backend/DB**: Supabase (SQL)
- **AI Model**: Google Gemini Pro API

---

## ⚙️ How to Run Locally
1. Clone the repository.
2. Get your own API Key from [Google AI Studio](https://aistudio.google.com/).
3. Open `ai-engine.js` and replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual key.
4. Open `index.html` in your browser.

---

## 📂 Project Structure

```text
insightsync-dashboard/
├── index.html       # Dashboard layout and structure
├── style.css        # Custom CSS with professional UI components
├── app.js           # Main application logic and Chart initialization
├── database.js      # Supabase connection and SQL queries
├── ai-engine.js     # Gemini AI API integration and prompt logic

