import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  const audio = new Audio();

  useEffect(() => {
    fetch(`http://localhost:5000/api/album/${id}`)
      .then((res) => res.json())
      .then(setAlbum)
      .catch((err) => console.error("Album fetch error", err));
  }, [id]);

  const handlePlayPause = (track) => {
    if (playingTrack?.id === track.id) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      audio.src = track.preview;
      audio.play();
      setPlayingTrack(track);
    }
  };

  if (!album) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{album.title}</h2>
      <img
        src={album.cover_medium}
        alt={album.title}
        className="mb-4 rounded-xl"
      />
      <ul>
        {album.tracks.data.map((track) => (
          <li
            key={track.id}
            className="flex justify-between items-center py-2 border-b"
          >
            <span>{track.title}</span>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {playingTrack?.id === track.id ? "Pause" : "Play"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetails;
