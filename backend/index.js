

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

const USERNAME = process.env.VITE_NOCODEAPI_USERNAME;
const TOKEN = process.env.VITE_NOCODEAPI_TOKEN;
const BASE_URL = `https://v1.nocodeapi.com/${USERNAME}/spotify/${TOKEN}`;

app.get("/api/search", async (req, res) => {
  const { q, type = "track", perPage = 10, page = 1 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query 'q'" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q,
        type,
        perPage,
        page,
      },
    });

    res.json(response.data); 
  } catch (error) {
    console.error("NoCodeAPI Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: error.response?.data?.info || "Spotify search failed" });
  }
});


// New Releases route
app.get("/api/new-releases", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/browse/new`);
    res.json(response.data.albums.items); 
  } catch (error) {
    console.error("Error fetching new releases:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
});


//playlist
app.get("/api/playlist", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing playlist ID" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/playlists`, {
      params: { id },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching playlist:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


