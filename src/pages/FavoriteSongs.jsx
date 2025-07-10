import React, { useEffect, useState } from "react";

const FavouriteSongs= ({ artistId }) => {
  const [tracks, setTracks] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (!artistId) return;

    fetch(`http://localhost:5000/api/artist/${artistId}/top-tracks`)
      .then((res) => res.json())
      .then(setTracks)
      .catch((err) => console.error("Fetch error:", err));
  }, [artistId]);

  const handlePlayPause = (track) => {
    if (playingId === track.id) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (audio) audio.pause();
      const newAudio = new Audio(track.preview_url);
      newAudio.play();
      setAudio(newAudio);
      setPlayingId(track.id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🎶 Artist Top Tracks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="p-3 border rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-semibold">{track.name}</h3>
                <p className="text-sm text-gray-500">{track.artists[0]?.name}</p>
              </div>
            </div>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              {playingId === track.id ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteSongs;
