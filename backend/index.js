require('dotenv').config();
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;

let accessToken = '';
let tokenExpiresAt = 0;
const getAccessToken = async () => {
  try {
    const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = res.data.access_token;
    console.log("Access token fetched successfully");
    return accessToken;
  } catch (err) {
    console.error("Access token error:", err.response?.data || err.message);
    throw new Error("Failed to fetch access token");
  }
};


//search track route
app.get('/api/search/:query', async (req, res) => {
  try {
    const token = await getAccessToken();
    const result = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: req.params.query, type: 'track', limit: 10 },
    });
    res.json(result.data.tracks.items);
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Spotify search failed' });
  }
});


//trending tracks
app.get('/api/trending/tracks', async (req, res) => {
  try {
    const token = await getAccessToken();
    const result = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const albums = result.data.albums.items;
    const allTracks = [];

    for (const album of albums) {
      const albumDetail = await axios.get(`https://api.spotify.com/v1/albums/${album.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      allTracks.push(...albumDetail.data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        album: {
          image: albumDetail.data.images[0]?.url,
          artists: albumDetail.data.artists,
        }
      })));
    }

    res.json(allTracks.slice(0, 10));
  } catch (err) {
    console.error("Trending tracks error:", err.message);
    res.status(500).json({ error: "Failed to fetch trending tracks" });
  }
});


//trending albums 
app.get('/api/trending/albums', async (req, res) => {
  try {
    const token = await getAccessToken();
    const result = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(result.data.albums.items);
  } catch (err) {
    console.error("Trending albums error:", err.message);
    res.status(500).json({ error: "Failed to fetch trending albums" });
  }
});


//album by id
app.get('/api/album/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const result = await axios.get(
      `https://api.spotify.com/v1/albums/${req.params.id}?market=IN`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(result.data);
  } catch (err) {
    console.error("Album fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch album details" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
