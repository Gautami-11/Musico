// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import axios from 'axios';
// import qs from 'qs';
// import cors from 'cors';

// const app = express();
// app.use(cors());

// const router = express.Router();


// const PORT = 5000;

// let accessToken = '';
// let tokenExpiresAt = 0;
// const getAccessToken = async () => {
//   try {
//     const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
//     const res = await axios.post(
//       'https://accounts.spotify.com/api/token',
//       qs.stringify({ grant_type: 'client_credentials' }),
//       {
//         headers: {
//           Authorization: `Basic ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     accessToken = res.data.access_token;
//     console.log("Access token fetched successfully");
//     return accessToken;
//   } catch (err) {
//     console.error("Access token error:", err.response?.data || err.message);
//     throw new Error("Failed to fetch access token");
//   }
// };


// //search track route
// app.get('/api/search/:query', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const result = await axios.get(`https://api.spotify.com/v1/search`, {
//       headers: { Authorization: `Bearer ${token}` },
//       params: { q: req.params.query, type: 'track', limit: 10 },
//     });
//     res.json(result.data.tracks.items);
//   } catch (err) {
//     console.error('Search error:', err.message);
//     res.status(500).json({ error: 'Spotify search failed' });
//   }
// });


// //trending tracks
// app.get('/api/trending/tracks', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const result = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const albums = result.data.albums.items;
//     const allTracks = [];

//     for (const album of albums) {
//       const albumDetail = await axios.get(`https://api.spotify.com/v1/albums/${album.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       allTracks.push(...albumDetail.data.tracks.items.map(track => ({
//         id: track.id,
//         name: track.name,
//         preview_url: track.preview_url,
//         album: {
//           image: albumDetail.data.images[0]?.url,
//           artists: albumDetail.data.artists,
//         }
//       })));
//     }

//     res.json(allTracks.slice(0, 10));
//   } catch (err) {
//     console.error("Trending tracks error:", err.message);
//     res.status(500).json({ error: "Failed to fetch trending tracks" });
//   }
// });


// //trending albums 
// app.get('/api/trending/albums', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const result = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     res.json(result.data.albums.items);
//   } catch (err) {
//     console.error("Trending albums error:", err.message);
//     res.status(500).json({ error: "Failed to fetch trending albums" });
//   }
// });


// //album by id
// app.get('/api/album/:id', async (req, res) => {
//   try {
//     const token = await getAccessToken();
//     const result = await axios.get(
//       `https://api.spotify.com/v1/albums/${req.params.id}?market=IN`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     res.json(result.data);
//   } catch (err) {
//     console.error("Album fetch error:", err.message);
//     res.status(500).json({ error: "Failed to fetch album details" });
//   }
// });
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// //indian albums 
//  const ids = [
//   "382ObEPsp2rxGrnsizN5TX",
//   "1A2GTWGtFfWp7KSQTwWOyo",
//   "2noRn2Aes5aoNVsU6iWThc",
// ];


// export const getAlbums = async () => {
//   const res = await fetch(
//     `https://api.spotify.com/v1/albums?ids=${ids.join(",")}&market=IN`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   const data = await res.json();
//   return data.albums;
// };


// //top 50 playlists in india 

// router.get("/tracks", async (req, res) => {
//   try {
//     if (!accessToken) await getAccessToken();

//     // Playlist: Top 50 – India (ID: 37i9dQZEVXbLZ52XmnySJg)
//     const topIndiaPlaylistId = "37i9dQZEVXbLZ52XmnySJg";

//     const apiRes = await fetch(
//       `https://api.spotify.com/v1/playlists/${topIndiaPlaylistId}/tracks`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     const data = await apiRes.json();
//     const tracks = data.items.map((item) => item.track);
//     res.json(tracks);
//   } catch (err) {
//     console.error("Trending tracks error:", err);
//     res.status(500).json({ error: "Failed to fetch tracks" });
//   }
// });

// module.exports = router;


// backend/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import qs from 'qs';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 5000;

let accessToken = '';
let tokenExpiresAt = 0;

const getAccessToken = async () => {
  try {
    const token = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

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

// 🎵 Search tracks
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

// 📈 Trending tracks
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

// 🎧 Trending albums
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

// 🎼 Get album by ID
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

// 📀 Get Indian albums (by fixed IDs)
app.get('/api/albums/indian', async (req, res) => {
  try {
    const ids = [
      "382ObEPsp2rxGrnsizN5TX",
      "1A2GTWGtFfWp7KSQTwWOyo",
      "2noRn2Aes5aoNVsU6iWThc",
      "4aawyAB9vmqN3uQ7FjRGTy"
    ];
    const token = await getAccessToken();
    const result = await axios.get(
      `https://api.spotify.com/v1/albums?ids=${ids.join(",")}&market=IN`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(result.data.albums);
  } catch (err) {
    console.error("Indian albums error:", err.message);
    res.status(500).json({ error: "Failed to fetch Indian albums" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


// //magico playlist
// const getPlaylistTracks = async () => {
//   const res = await fetch(
//     "https://api.spotify.com/v1/playlists/3C7pjC45otsVI99viTziVS",
//     {
//       headers: {
//         Authorization: `Bearer YOUR_ACCESS_TOKEN`,
//       },
//     }
//   );
//   const data = await res.json();
//   console.log(data.tracks.items); // contains tracks
// };


app.get('/api/playlists/:id', async (req, res) => {
  try {
    const token = await getAccessToken();
    const { id } = req.params;

    const result = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Send just the array of tracks for easier front‑end use
    res.json(result.data.tracks.items.map(i => i.track));
  } catch (err) {
    console.error('Playlist fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch playlist details' });
  }
});


//artist
app.get('/api/artist/:id/top-tracks', async (req, res) => {
  try {
    const token = await getAccessToken(); // your access token function
    const result = await axios.get(`https://api.spotify.com/v1/artists/${req.params.id}/top-tracks`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { market: 'IN' }, // Use appropriate market code
    });
    res.json(result.data.tracks);
  } catch (err) {
    console.error("Artist top tracks error:", err.message);
    res.status(500).json({ error: "Failed to fetch artist's songs" });
  }
});
