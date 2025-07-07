import React from "react";

const AlbumCard = ({ album, onClick }) => {
  return (
    <div
      onClick={() => onClick(album.id)}
      className="cursor-pointer shadow-md rounded-lg p-4 border hover:shadow-lg transition"
    >
      <img
        src={album.cover_medium}
        alt={album.title}
        className="w-full h-auto rounded-md"
      />
      <h3 className="mt-2 font-bold text-lg">{album.title}</h3>
      <p className="text-gray-600 text-sm">{album.artist.name}</p>
    </div>
  );
};

export default AlbumCard;
