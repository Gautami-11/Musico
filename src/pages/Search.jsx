
import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const { loadQueue } = useAudio();

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

  const playFromTrack = (clickedTrackId) => {
    const playable = results
      .filter((track) => track.preview_url)
      .map((track) => ({
        id: track.id,
        url: track.preview_url,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        img: track.album.images[0]?.url,
      }));

    const startIndex = playable.findIndex((track) => track.id === clickedTrackId);
    if (startIndex !== -1) {
      loadQueue(playable, startIndex);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white tektur min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Music Search
        </h1>
        <p className="text-gray-400 text-lg">Discover your next favorite track</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 pl-12 pr-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 shadow-lg"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-8 py-3 rounded-2xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-md hover:shadow-blue-100/25 transform hover:scale-105 font-medium"
      >
        Search
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      <div className="mt-8 space-y-4">
        {results.map((track, idx) => (
          <div
            key={track.id}
            onClick={() => playFromTrack(track.id)}
            className="group cursor-pointer p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-600/20 rounded-2xl hover:bg-gray-700/40 hover:border-green-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-6">
              {/* Album Art */}
              <div className="relative flex-shrink-0">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-20 h-20 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg text-white truncate group-hover:text-cyan-400 transition-colors duration-300">
                      {track.name}
                    </p>
                    <p className="text-gray-400 text-sm mt-1 truncate">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 truncate">
                      {track.album.name}
                    </p>
                  </div>
                  
                  {/* Play Button */}
                  <button className="text-cyan-500 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {results.length === 0 && !error && query && (
        <div className="mt-12 text-center">
          <div className="text-gray-500 text-6xl mb-4">🎵</div>
          
        </div>
      )}
    </div>
  );
};

export default Search;