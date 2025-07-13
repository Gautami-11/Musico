
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState([]);
  const [originalQueue, setOriginalQueue] = useState([]);
  const [shuffledQueue, setShuffledQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const audio = audioRef.current;

  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (isAutoplay) {
        next();
      } else {
        setIsPlaying(false);
      }
    };
    const handleError = () => {
      setIsLoading(false);
      if (isAutoplay) next();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [isRepeat, isAutoplay]);

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const loadQueue = (newQueue, startIndex = 0) => {
    setOriginalQueue(newQueue);
    setQueue(newQueue);
    if (isShuffle) {
      const shuffled = shuffleArray(newQueue);
      setShuffledQueue(shuffled);
      const currentTrack = newQueue[startIndex];
      const shuffledIndex = shuffled.findIndex(track => track.id === currentTrack.id);
      setCurrentIndex(shuffledIndex);
      playTrack(currentTrack);
    } else {
      setCurrentIndex(startIndex);
      playTrack(newQueue[startIndex]);
    }
  };

  const playTrack = (track) => {
    if (!track?.url) return;
    setIsLoading(true);
    audio.src = track.url;
    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = playbackSpeed;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Audio error:", err);
        setIsLoading(false);
      });
  };

  const play = () => {
    audio.play().then(() => setIsPlaying(true));
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => isPlaying ? pause() : play();

  const next = () => {
    const q = isShuffle ? shuffledQueue : queue;
    const nextIndex = currentIndex + 1;
    if (nextIndex < q.length) {
      setCurrentIndex(nextIndex);
      playTrack(q[nextIndex]);
    } else if (isRepeat && q.length > 0) {
      setCurrentIndex(0);
      playTrack(q[0]);
    }
  };

  const prev = () => {
    const q = isShuffle ? shuffledQueue : queue;
    if (currentTime > 3) {
      audio.currentTime = 0;
    } else {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        setCurrentIndex(prevIndex);
        playTrack(q[prevIndex]);
      }
    }
  };

  const seekTo = (time) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setPlayerVolume = (v) => {
    const newVol = Math.max(0, Math.min(1, v));
    audio.volume = isMuted ? 0 : newVol;
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audio.volume = previousVolume;
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const toggleShuffle = () => {
    const enableShuffle = !isShuffle;
    setIsShuffle(enableShuffle);
    if (enableShuffle) {
      const currentTrack = queue[currentIndex];
      const shuffled = shuffleArray(queue);
      setShuffledQueue(shuffled);
      setCurrentIndex(shuffled.findIndex(t => t.id === currentTrack.id));
    } else {
      const currentTrack = shuffledQueue[currentIndex];
      setCurrentIndex(originalQueue.findIndex(t => t.id === currentTrack.id));
    }
  };

  const changePlaybackSpeed = (speed) => {
    const newSpeed = Math.max(0.25, Math.min(2, speed));
    audio.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const skipTo = (index) => {
    const q = isShuffle ? shuffledQueue : queue;
    if (index >= 0 && index < q.length) {
      setCurrentIndex(index);
      playTrack(q[index]);
    }
  };

  const clearQueue = () => {
    pause();
    setQueue([]);
    setShuffledQueue([]);
    setOriginalQueue([]);
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getCurrentTrack = () => {
    const q = isShuffle ? shuffledQueue : queue;
    return q[currentIndex];
  };

  return (
    <AudioContext.Provider
      value={{
        queue,
        originalQueue,
        shuffledQueue,
        currentTrack: getCurrentTrack(),
        currentIndex,
        isPlaying,
        play,
        pause,
        next,
        prev,
        togglePlayPause,
        loadQueue,
        volume,
        setPlayerVolume,
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
        isAutoplay,
        setIsAutoplay,
        skipTo,
        clearQueue,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
