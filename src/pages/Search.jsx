import React, { useEffect, useState } from "react";
import axios from "axios";



  const Search = ()=>{
const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");


   const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get("http://localhost:5000/api/search", {
        params: {
          q: query,
          type: "track",
          perPage: 10,
          page: 1,
        },
      });

      const tracks = response.data.tracks?.items || [];
      setResults(tracks);
      setError("");
    } catch (err) {
      console.error("Frontend Axios error:", err);
      setError("Failed to fetch data");
    }
  };

    return(<div className="p-4 max-w-6xl mx-auto text-white">
      {/* Search Section */}
     

      <input
        type="text"
        placeholder="Search songs, artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-400 p-2 w-full rounded text-white"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4 space-y-4">
        {results.map((track) => (
          <div key={track.id} className="p-3 border rounded shadow-sm bg-gray-800">
            <div className="flex items-center space-x-4">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-16 h-16 rounded"
              />
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-400">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                {track.preview_url ? (
                  <audio controls src={track.preview_url} className="mt-1" />
                ) : (
                  <p className="text-xs text-red-400">No preview available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      )
  }

  export default Search;