

import React, { useState } from "react";
import { useAudio } from "../context/AudioContext";

const PlayerControls = () => {
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    next,
    prev,
    volume,
    setPlayerVolume,
    togglePlayPause,
    isMuted,
    toggleMute,
    currentTime,
    duration,
    seekTo,
    isLoading,
    isRepeat,
    toggleRepeat,
    isShuffle,
    toggleShuffle,
    playbackSpeed,
    changePlaybackSpeed,
    formatTime,
    queue,
    currentIndex,
  } = useAudio();

  const [showQueue, setShowQueue] = useState(false);
  const [showSpeedControls, setShowSpeedControls] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (!currentTrack) return null;

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "🔇";
    if (volume < 0.3) return "🔈";
    if (volume < 0.7) return "🔉";
    return "🔊";
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickTime = (clickX / width) * duration;
    seekTo(clickTime);
  };

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl z-50 border-t border-gray-700">
      {/* Progress Bar */}
      <div 
        className="h-1 bg-gray-700 cursor-pointer hover:h-2 transition-all duration-200"
        onClick={handleSeek}
      >
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-400 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="relative">
              <img 
                src={currentTrack.img} 
                alt="cover" 
                className="w-16 h-16 rounded-lg shadow-lg"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="font-bold text-lg truncate hover:text-green-400 transition-colors">
                {currentTrack.title}
              </div>
              <div className="text-sm text-gray-400 truncate">
                {currentTrack.artist}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-gray-600">/</span>
                <span className="text-xs text-gray-500">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col items-center space-y-2 mx-8">
            {/* Secondary Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleShuffle}
                className={`text-sm p-2 rounded-lg transition-all ${
                  isShuffle 
                    ? 'text-green-400 bg-green-400/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                title="Shuffle"
              >
                🔀
              </button>

              <button
                onClick={toggleRepeat}
                className={`text-sm p-2 rounded-lg transition-all ${
                  isRepeat 
                    ? 'text-green-400 bg-green-400/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                title="Repeat"
              >
                🔁
              </button>

              {/* Speed Control */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedControls(!showSpeedControls)}
                  className="text-sm p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>
                
                {showSpeedControls && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-2 shadow-xl border border-gray-600">
                    <div className="grid grid-cols-4 gap-1">
                      {speedOptions.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            changePlaybackSpeed(speed);
                            setShowSpeedControls(false);
                          }}
                          className={`px-2 py-1 text-xs rounded ${
                            playbackSpeed === speed
                              ? 'bg-green-500 text-white'
                              : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Controls */}
            <div className="flex items-center space-x-6">
              <button
                onClick={prev}
                className="p-3 rounded-full hover:bg-gray-700 transition-all transform hover:scale-110"
                title="Previous"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>

              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition-all transform hover:scale-110 disabled:opacity-50"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <button
                onClick={next}
                className="p-3 rounded-full hover:bg-gray-700 transition-all transform hover:scale-110"
                title="Next"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Volume and Queue Controls */}
          <div className="flex items-center space-x-4 flex-1 justify-end min-w-0">
            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-gray-700 transition-all"
                title={isMuted ? "Unmute" : "Mute"}
              >
                <span className="text-lg">{getVolumeIcon()}</span>
              </button>

              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setPlayerVolume(parseFloat(e.target.value))}
                  className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {/* Queue Button */}
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-all relative"
              title="Queue"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
              </svg>
              {queue.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {queue.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Queue Display */}
        {showQueue && (
          <div className="mt-4 bg-gray-800/50 rounded-lg p-4 max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Queue ({queue.length})</h3>
              <button
                onClick={() => setShowQueue(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {queue.map((track, index) => (
                <div
                  key={`${track.id}-${index}`}
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                    index === currentIndex
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'hover:bg-gray-700/50'
                  }`}
                  onClick={() => {
                    // Skip to track functionality would go here
                   onClick=() => skipTo(index);

                  }}
                >
                  <div className="text-sm text-gray-400 w-6">
                    {index === currentIndex ? '▶️' : index + 1}
                  </div>
                  <img
                    src={track.img}
                    alt={track.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate text-sm">
                      {track.title}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {track.artist}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-webkit-slider-track {
          background: #374151;
          border-radius: 4px;
        }
        
        .slider::-moz-range-track {
          background: #374151;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default PlayerControls;