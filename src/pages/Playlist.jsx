import React, { useEffect } from 'react'

const Playlist = () => {
 

      const [playlist,setplayList] = useState([]);
    useEffect(() =>{
        
      fetch("http://localhost:/5000/api/playlists/3C7pjC45otsVI99viTziVS")
      .then((res) => res.json())
      .then(setplayList)
      .catch((err) => console.error("Playlist fetch error", err));
     }, []);


  return (
    <div>
        {/* playlists */}
       <h2 className="text-2xl font-bold mb-4">Playlists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {tracks.map((playlist) => (
          <div
            key={playlist.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={playlist.album?.image}
                className="w-12 h-12 rounded"
                alt={playlist.name}
              />
              <div>
                <h3 className="font-semibold">{playlist.name}</h3>
                <p className="text-sm text-gray-500">
                  {playlist.album?.artists[0]?.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {playingId === playlist.id ? "Pause" : "Play"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlist
