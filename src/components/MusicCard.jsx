const MusicCard = ({ track }) => {
  return (
    <div className="bg-gray-800 rounded p-3 shadow text-white">
      <img src={track.album.cover_medium} alt={track.title} className="rounded w-full" />
      <h3 className="mt-2 text-lg font-semibold truncate">{track.title}</h3>
      <p className="text-sm text-gray-400">{track.artist.name}</p>
      <audio controls className="w-full mt-2">
        <source src={track.preview} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicCard;
