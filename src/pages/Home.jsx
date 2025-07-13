import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedPlaylist from "../components/FeaturedPlaylist";
import { useAudio } from "../context/AudioContext";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [error, setError] = useState({ newReleases: "", playlist: "" });

  const { loadQueue } = useAudio();

  const PLAYLIST_ID = "37i9dQZF1DX0ieekvzt1Ic"; 

  // Fetch new releases
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/new-releases");
        setAlbums(response.data);
      } catch (err) {
        console.error("New releases error:", err);
        setError((prev) => ({ ...prev, newReleases: "Failed to load new releases" }));
      }
    };

    fetchNewReleases();
  }, []);

  // Fetch playlist
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/playlist?id=${PLAYLIST_ID}`);
        setPlaylist(response.data);

        const tracks = response.data.tracks.items
          .map((item) => item.track)
          .filter((track) => track?.preview_url)
          .map((track) => ({
            id: track.id,
            title: track.name,
            artist: track.artists.map((a) => a.name).join(", "),
            url: track.preview_url,
            img: track.album.images?.[0]?.url || "",
          }));

        setPlaylistTracks(tracks);
      } catch (err) {
        console.error("Playlist fetch error:", err);
        setError((prev) => ({ ...prev, playlist: "Failed to load playlist" }));
      }
    };

    fetchPlaylist();
  }, [PLAYLIST_ID]);

  const handlePlayPlaylist = () => {
    if (playlistTracks.length) {
      loadQueue(playlistTracks, 0);
    }
  };

  return (
    <div className="px-4 py-8 text-white">

 <FeaturedPlaylist
        playlist={playlist}
        playlistTracks={playlistTracks}
        error={error}
        handlePlayPlaylist={handlePlayPlaylist}
      />


      {/* New Releases Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        {error.newReleases && <p className="text-red-500">{error.newReleases}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-gray-900 p-3 rounded">
              <img
                src={album.images?.[0]?.url}
                alt={album.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{album.name}</h3>
              <p className="text-sm text-gray-400">
                {album.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
