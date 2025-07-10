// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAlbums } from "../../backend/index";

// const Home = () => {
//   const [tracks, setTracks] = useState([]);
//   const [albums, setAlbums] = useState([]);
//   const [audio, setAudio] = useState(null);
//   const [playingId, setPlayingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:5000/api/trending/tracks")
//       .then((res) => res.json())
//       .then(setTracks)
//       .catch((err) => console.error("Track fetch error", err));

//     fetch("http://localhost:5000/api/trending/albums")
//       .then((res) => res.json())
//       .then(setAlbums)
//       .catch((err) => console.error("Album fetch error", err));

//        getAlbums()
//       .then(setAlbums)
//       .catch((err) => console.error("Failed to fetch albums:", err));
  
//   }, []);

//   // const handlePlayPause = (track) => {
//   //   if (playingId === track.id) {
//   //     audio.pause();
//   //     setPlayingId(null);
//   //   } else {
//   //     if (audio) audio.pause();
//   //     const newAudio = new Audio(track.preview_url);
//   //     newAudio.play();
//   //     setAudio(newAudio);
//   //     setPlayingId(track.id);
//   //   }
//   // };

//   const handlePlayPause = (track) => {
//   if (!track.preview_url) {
//     alert("No preview available for this track.");
//     return;
//   }

//   // Pause if same track is playing
//   if (playingId === track.id && audio) {
//     audio.pause();
//     setPlayingId(null);
//     return;
//   }

//   // Pause any currently playing audio
//   if (audio) {
//     audio.pause();
//   }

//   const newAudio = new Audio(track.preview_url);

//   newAudio.play()
//     .then(() => {
//       setAudio(newAudio);
//       setPlayingId(track.id);

//       // Optional: Stop state when audio ends
//       newAudio.onended = () => {
//         setPlayingId(null);
//       };
//     })
//     .catch((err) => {
//       console.error("Audio play error:", err);
//     });
// };


//   return (
//     <div className="p-6">
//       <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Trending Albums in India</h1>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {albums.map((album) => (
//           <div key={album.id} className="bg-gray-900 text-white rounded shadow p-2">
//             <img src={album.images[0]?.url} alt={album.name} className="rounded" />
//             <h2 className="mt-2 text-lg font-semibold">{album.name}</h2>
//             <p className="text-sm text-gray-300">
//               {album.artists.map((artist) => artist.name).join(", ")}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//       <h2 className="text-2xl font-bold mb-4">🔥 Trending Tracks</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//         {tracks.map((track) => (
//           <div
//             key={track.id}
//             className="p-4 border rounded shadow flex justify-between items-center"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src={track.album?.image}
//                 className="w-12 h-12 rounded"
//                 alt={track.name}
//               />
//               <div>
//                 <h3 className="font-semibold">{track.name}</h3>
//                 <p className="text-sm text-gray-500">
//                   {track.album?.artists[0]?.name}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => handlePlayPause(track)}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               {playingId === track.id ? "Pause" : "Play"}
//             </button>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-2xl font-bold mb-4">🎧 Trending Albums</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {albums.map((album) => (
//          <div
//   key={album.id}
//   onClick={() => navigate(`/album/${album.id}`)}
//   className="cursor-pointer p-3 border rounded shadow hover:scale-105 transition"
// >
//   <img src={album.images[0]?.url} alt={album.name} className="rounded" />
//   <h3 className="mt-2 font-semibold">{album.name}</h3>
//   <p className="text-sm text-gray-500">{album.artists[0]?.name}</p>
// </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [indianAlbums, setIndianAlbums] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Trending Tracks
    fetch("http://localhost:5000/api/trending/tracks")
      .then((res) => res.json())
      .then(setTracks)
      .catch((err) => console.error("Track fetch error", err));

    // Trending Albums
    fetch("http://localhost:5000/api/trending/albums")
      .then((res) => res.json())
      .then(setTrendingAlbums)
      .catch((err) => console.error("Trending albums fetch error", err));

    // Indian Albums
    fetch("http://localhost:5000/api/albums/indian")
      .then((res) => res.json())
      .then(setIndianAlbums)
      .catch((err) => console.error("Indian albums fetch error", err));


  }, []);

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

  return (
    <div className="p-6 tektur" >
      {/* Indian Albums Section */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4"> Indian Albums</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {indianAlbums.map((album) => (
            <div key={album.id} className="bg-gray-900 text-white rounded shadow p-2">
              <img src={album.images[0]?.url} alt={album.name} className="rounded" />
              <h2 className="mt-2 text-lg font-semibold">{album.name}</h2>
              <p className="text-sm text-gray-300">
                {album.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

    


      {/* Trending Tracks Section */}
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

      {/* Trending Albums Section */}
      <h2 className="text-2xl font-bold mb-4">🎧 Trending Albums</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {trendingAlbums.map((album) => (
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

