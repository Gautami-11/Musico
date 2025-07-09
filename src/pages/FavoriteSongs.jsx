import React, { useState, useEffect } from "react";

const FavouriteSongs = () => {
  // Replace with your actual favorite songs array
  const [favouriteSongs, setFavouriteSongs] = useState([
    {
      id: "1",
      name: "Song One",
      preview_url: "https://p.scdn.co/mp3-preview/xxx", // replace with valid preview
      artist: "Artist A",
      image: "https://via.placeholder.com/100"
    },
    {
      id: "2",
      name: "Song Two",
      preview_url: "https://p.scdn.co/mp3-preview/yyy",
      artist: "Artist B",
      image: "https://via.placeholder.com/100"
    },
    {
      id: "3",
      name: "Song Three",
      preview_url: null,
      artist: "Artist C",
      image: "https://via.placeholder.com/100"
    },
  ]);

  const [audio, setAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const handlePlayPause = (track) => {
    if (!track.preview_url) {
      alert("No preview available for this track.");
      return;
    }

    if (playingId === track.id && audio) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(track.preview_url);
    newAudio.play()
      .then(() => {
        setAudio(newAudio);
        setPlayingId(track.id);
        newAudio.onended = () => setPlayingId(null);
      })
      .catch((err) => {
        console.error("Audio play error:", err);
      });
  };

  useEffect(() => {
    return () => {
      if (audio) audio.pause();
    };
  }, [audio]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">❤️ Favourite Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favouriteSongs.map((track) => (
          <div
            key={track.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={track.image}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-semibold">{track.name}</h3>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            </div>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
              disabled={!track.preview_url}
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
