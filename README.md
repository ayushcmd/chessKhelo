<div align="center">

<img src="./assets/logo.png" alt="chessKhelo Logo" width="160" height="160" style="border-radius: 50%; box-shadow: 0 4px 20px rgba(82, 183, 136, 0.4);" />

# chessKhelo ♟️
### *Forest Edition · Premium Local & LAN Chess Experience*

[![React Native](https://img.shields.io/badge/React%20Native-0.85-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-56-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![Stockfish](https://img.shields.io/badge/Engine-Stockfish%2018-black?logo=lichess&logoColor=white)](https://stockfishchess.org/)
[![License](https://img.shields.io/badge/License-MIT-52b788.svg)](LICENSE)

---

</div>

## 🌲 About chessKhelo

**chessKhelo** is a refined chess application designed with a forest ambience aesthetic, deep emerald accents, and warm wood textures. Built with React Native and Expo SDK 56, it provides a distraction-free chess experience across web, tablets, and mobile devices without requiring any login or signup.

---

## ✨ Features & Game Modes

### 🤖 1. AI vs Local (Stockfish Engine)
- Integrated **Stockfish 18** chess engine running client-side with zero external latency.
- **3 Difficulty Tiers**: Easy, Medium, and Hard.
- Real-time engine thinking indicator and legal move analysis.

### 📶 2. Local vs Local via WiFi LAN System
- **Direct LAN Multiplayer**: Connect two devices (phones, tablets, or laptops) on the same WiFi network or mobile hotspot.
- **Instant Room Codes**: Host generates a 4-digit code (e.g., `4819`) with one-click copy.
- **Dual-Transport Engine**: Realtime synchronization over local WebSockets / Supabase broadcast channels + browser `BroadcastChannel` fallback.
- **Automated Board Flipping**: Board automatically orients for Black or White based on selected side.
- **Realtime Clocks & In-Game Actions**: Live timers, resignation notifications, and rematch requests over LAN.

### 👥 3. Pass & Play (Local vs Local on Same Device)
- Play with a friend on the same screen/device.
- Dual captured pieces advantage tracking and move history drawer.

---

## 🎨 Color Palette & Design System

| Element | Color Code | Preview |
| :--- | :--- | :--- |
| **Forest Primary** | `#060f07` | Dark Emerald Base |
| **Forest Secondary** | `#0b1f0e` | Deep Moss Green |
| **Emerald Accent** | `#52b788` | Active Highlights & Borders |
| **LAN Glow** | `#70e000` | WiFi Connection Indicator |
| **Wood Light** | `#f0d9b5` | Light Chess Squares |
| **Wood Dark** | `#8B5E3C` | Dark Chess Squares |
| **Gold Accent** | `#c49a6c` | Rims, Badges & Dividers |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ayushcmd/chessKhelo.git
cd chessKhelo

# Install dependencies
npm install
```

### Running Locally
```bash
# Run Web app on local development server
npm run web

# Start Expo dev server
npm start
```

Access the web app at `http://localhost:8081` in your browser.

---

## 📱 Tech Stack
- **Framework**: [Expo SDK 56](https://docs.expo.dev/) (React Native 0.85)
- **Navigation**: [Expo Router v56](https://docs.expo.dev/router/introduction/)
- **Chess Logic**: [`chess.js`](https://github.com/jhlywa/chess.js) & [`stockfish`](https://stockfishchess.org/)
- **Networking**: Supabase Realtime Broadcast & HTML5 `BroadcastChannel`
- **Styling**: React Native StyleSheet with custom Glassmorphism & Forest Theme
- **Icons**: [Lucide React Native](https://lucide.dev/)

---

<div align="center">
<sub>Crafted with passion by ayushcmd · chessKhelo Forest Edition</sub>
</div>
