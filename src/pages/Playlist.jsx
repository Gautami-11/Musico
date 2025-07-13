
import React, { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";

const Playlist = ({ playlistId = "3C7pjC45otsVI99viTziVS" }) => {
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadQueue } = useAudio();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/playlist?id=${playlistId}`
        );
        const data = await res.json();
        setPlaylistData(data);
      } catch (err) {
        console.error("Failed to fetch playlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const convertToQueue = (tracks) => {
    return tracks.map((item, index) => ({
      id: item.track.id || `${item.track.name}-${index}`,
      title: item.track.name,
      artist: item.track.artists.map(a => a.name).join(", "),
      img: item.track.album?.images?.[0]?.url || "",
      url: item.track.preview_url, // Only preview available via Spotify API
    }));
  };

  const handlePlayAll = () => {
    if (playlistData?.tracks?.items?.length) {
      const queue = convertToQueue(playlistData.tracks.items);
      loadQueue(queue);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (!playlistData) return <div className="text-red-500">Playlist not found</div>;

  return (
    <div className="p-4 text-white">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={playlistData.images[0]?.url}
          alt="Playlist cover"
          className="w-32 h-32 rounded shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{playlistData.name}</h2>
          <p className="text-gray-400">{playlistData.description}</p>
          <button
            onClick={handlePlayAll}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            ▶ Play All
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {playlistData.tracks.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded">
            <img
              src={item.track.album?.images?.[0]?.url}
              alt={item.track.name}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1">
              <div className="font-medium">{item.track.name}</div>
              <div className="text-sm text-gray-400">
                {item.track.artists.map((a) => a.name).join(", ")}
              </div>
            </div>
            {!item.track.preview_url && (
              <span className="text-xs text-red-400">No Preview</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
