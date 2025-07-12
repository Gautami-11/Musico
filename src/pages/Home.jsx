import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [albums, setAlbums] = useState([]);
  const [newReleaseError, setNewReleaseError] = useState("");

 

   // Fetch new releases
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/new-releases");
        setAlbums(response.data);
      } catch (err) {
        console.error("New releases error:", err);
        setNewReleaseError("Failed to load new releases");
      }
    };

    fetchNewReleases();
  }, []);



  return (
    

     
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">New Releases</h2>
        {newReleaseError && <p className="text-red-500">{newReleaseError}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-gray-900 p-3 rounded">
              <img
                src={album.images[0]?.url}
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
   
  );
};

export default Home;



