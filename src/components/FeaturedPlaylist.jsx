import React, { useState } from "react";

const FeaturedPlaylist = ({ playlist, playlistTracks, error, handlePlayPlaylist }) => {
  const [showTracks, setShowTracks] = useState(false);

  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4 text-white">🎧 Featured Playlist</h2>

      {error?.playlist && (
        <p className="text-red-400 bg-red-900/20 p-3 rounded-md mb-4 border border-red-600 w-fit">
          {error.playlist}
        </p>
      )}

      {playlist && (
        <div
          onClick={() => setShowTracks((prev) => !prev)}
          className="cursor-pointer bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-700 hover:bg-gray-700/50 transition"
        >
          {/* Playlist Card */}
          <div className="flex items-center space-x-6">
            <img
              src={playlist.images?.[0]?.url}
              alt={playlist.name}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold text-green-400">{playlist.name}</h3>
              <p className="text-gray-400 mt-1 line-clamp-2">{playlist.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPlaylist();
                }}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
              >
                ▶️ Play Playlist
              </button>
            </div>
          </div>

          {/* Show Track List Only After Click */}
          {showTracks && (
            <div className="mt-6 border-t border-gray-600 pt-4 space-y-2 max-h-[300px] overflow-y-auto">
              {playlistTracks.map((track, idx) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-3 bg-gray-700/40 hover:bg-gray-700/60 p-2 rounded-lg"
                >
                  <img src={track.img} alt={track.title} className="w-10 h-10 rounded" />
                  <div>
                    <div className="text-sm font-semibold text-white truncate">{track.title}</div>
                    <div className="text-xs text-gray-400">{track.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedPlaylist;
