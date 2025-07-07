import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/trending/tracks")
      .then((res) => res.json())
      .then(setTracks)
      .catch((err) => console.error("Track fetch error", err));

    fetch("http://localhost:5000/api/trending/albums")
      .then((res) => res.json())
      .then(setAlbums)
      .catch((err) => console.error("Album fetch error", err));
  }, []);

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={track.album?.image}
                className="w-12 h-12 rounded"
                alt={track.name}
              />
              <div>
                <h3 className="font-semibold">{track.name}</h3>
                <p className="text-sm text-gray-500">
                  {track.album?.artists[0]?.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {playingId === track.id ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">🎧 Trending Albums</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {albums.map((album) => (
         <div
  key={album.id}
  onClick={() => navigate(`/album/${album.id}`)}
  className="cursor-pointer p-3 border rounded shadow hover:scale-105 transition"
>
  <img src={album.images[0]?.url} alt={album.name} className="rounded" />
  <h3 className="mt-2 font-semibold">{album.name}</h3>
  <p className="text-sm text-gray-500">{album.artists[0]?.name}</p>
</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
