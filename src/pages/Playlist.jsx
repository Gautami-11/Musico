// import React, { useEffect ,useState } from 'react'


// const Playlist = () => {
 

//    const [playlist,setplayList] = useState([]);
//     useEffect(() =>{
        
//       fetch("http://localhost:/5000/api/playlists")
//       .then((res) => res.json())
//       .then(setplayList)
//       .catch((err) => console.error("Playlist fetch error", err));
//      }, []);


//   return (
//     <div>
//         {/* playlists */}
//        <h2 className="text-2xl font-bold mb-4">Playlists</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//         {tracks.map((playlist) => (
//           <div
//             key={playlist.id}
//             className="p-4 border rounded shadow flex justify-between items-center"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src={playlist.album?.image}
//                 className="w-12 h-12 rounded"
//                 alt={playlist.name}
//               />
//               <div>
//                 <h3 className="font-semibold">{playlist.name}</h3>
//                 <p className="text-sm text-gray-500">
//                   {playlist.album?.artists[0]?.name}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => handlePlayPause(track)}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               {playingId === playlist.id ? "Pause" : "Play"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Playlist

import React, { useEffect, useState } from "react";

const PLAYLIST_ID = "3C7pjC45otsVI99viTziVS"; // ⬅️ choose any playlist ID

const Playlist = () => {
  const [tracks, setTracks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  // fetch once on mount
  useEffect(() => {
    fetch(`http://localhost:5000/api/playlists/${PLAYLIST_ID}`)
      .then((res) => res.json())
      .then(setTracks)
      .catch((err) => console.error("Playlist fetch error:", err));
  }, []);

  // play / pause 30‑sec preview
  const handlePlayPause = (track) => {
    if (!track.preview_url) return alert("No preview available.");

    // same track → pause
    if (playingId === track.id && audio) {
      audio.pause();
      setPlayingId(null);
      return;
    }

    // different track → stop current, start new
    if (audio) audio.pause();

    const newAudio = new Audio(track.preview_url);
    newAudio.play().then(() => {
      setAudio(newAudio);
      setPlayingId(track.id);
      newAudio.onended = () => setPlayingId(null);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Playlist Tracks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between p-4 bg-gray-900 rounded shadow"
          >
            <div className="flex items-center gap-3">
              <img
                src={track.album?.images?.[0]?.url}
                alt={track.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-semibold text-white">{track.name}</h3>
                <p className="text-sm text-gray-400">
                  {track.artists?.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>

            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              {playingId === track.id ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
