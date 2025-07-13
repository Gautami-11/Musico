# 🎵 Musico - Music App

An elegant music discovery and player web app built with **React**, **Tailwind CSS**, and a **Node.js backend** using the **Spotify API** via **NoCodeAPI**. It features new releases, a featured playlist with expandable track view, and an integrated audio player.

---

## 🚀 Features

👉 **Spotify New Releases** – Browse the latest music from Spotify
👉 **Audio Player** – Play, pause, shuffle, repeat, volume control, seek bar
👉 **Track Queue** – View and select songs in the queue
👉 **Playback Speed Control**
👉 **Responsive UI** using TailwindCSS

⚠️ Note: Spotify API only provides 30-second preview clips for most tracks. Full track playback is not available via the public API.

---

## 🛠️ Tech Stack

| Frontend            | Backend      | API Layer             |
| ------------------- | ------------ | --------------------- |
| React (Vite)        | Express.js   | Spotify via NoCodeAPI |
| Tailwind CSS        | Axios        | REST endpoints        |
| Context API (Audio) | dotenv, cors | Playlist & Search     |

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Gautami-11/Musico.git
cd Musico
```

---

### 2️⃣ Backend Setup

Navigate to the `server/` folder or project root (where your `index.js` or `server.js` file exists).

#### Install dependencies:

```bash
npm install express axios cors dotenv
```

#### Create a `.env` file:

```env
VITE_NOCODEAPI_USERNAME=your_username
VITE_NOCODEAPI_TOKEN=your_token
```

> 💡 You can get the username and token by creating a **Spotify API endpoint** using [NoCodeAPI](https://nocodeapi.com/). Copy them from your generated endpoint URL.

#### Start the backend server:

```bash
node index.js
# or, if using nodemon
npx nodemon index.js
```

> 🛠️ **Note:** You can modify the endpoints inside `index.js` based on your NoCodeAPI Spotify setup. Refer to the official [NoCodeAPI Spotify Docs](https://nocodeapi.com/spotify-api/) for available routes like `artists`, `albums`, `tracks`, etc.

---

### 3️⃣ Frontend Setup

#### Install frontend dependencies:

```bash
npm install
```

#### Start the frontend dev server:

```bash
npm run dev
```

---

## 📸 Preview

### 🎧 Home Page
<img src="https://github.com/user-attachments/assets/1a9cfa74-80e1-4274-aa91-c27c4ff967ad" width="100%" />

### 🔍 Search Page
<img src="https://github.com/user-attachments/assets/d6924ea5-5391-41d8-9620-dbab5a2742eb" width="100%" />

### Responsive Design 
<img src="https://github.com/user-attachments/assets/8101f21d-103b-496a-97d2-2528e6cd7463" width="100%" />

### 📱User's Playlists
<img src="https://github.com/user-attachments/assets/3a9b1828-7194-476b-a929-d62ad5d11b8d" width="100%" />

