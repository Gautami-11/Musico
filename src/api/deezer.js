import axios from "axios";

const BASE_URL = "https://deezerdevs-deezer.p.rapidapi.com";

const options = {
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
  },
};

// Search tracks
export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`, options);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};

export const fetchAlbums = async () => {
  const res = await fetch("http://localhost:5000/api/chart/albums");
  return res.json();
};

export const fetchAlbumById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/album/${id}`);
  return res.json();
};


// // Get single track by ID
// export const getTrack = async (id) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/track/${id}`, options);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching track:", error);
//     return null;
//   }
// };

// Get album info
export const searchAlbums = async (query) => {
  try {
    const response = await axios.get(`https://api.deezer.com/search/album?q=${query}`);
    return response.data.data;
  } catch (error) {
    console.error('Deezer Album API Error:', error.message);
    return [];
  }
};


// // Get artist info
// export const getArtist = async (id) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/artist/${id}`, options);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching artist:", error);
//     return null;
//   }
// };