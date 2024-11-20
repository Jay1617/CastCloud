import React, { useEffect, useRef, useState } from "react";
import { PodcastData } from "../context/Podcast";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

const Player = () => {
  const {
    podcast,
    fetchSinglePodcast,
    selectedPodcast,
    isPlaying,
    setIsPlaying,
    nextPodcast,
    prevPodcast,
  } = PodcastData();

  useEffect(() => {
    fetchSinglePodcast();
  }, [selectedPodcast]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [podcast]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };
  return (
    <div>
      {podcast && (
        <div className="h-[12%] bg-neutral-800 shadow-lg flex justify-between items-center text-white p-4 rounded-lg space-x-4 transition-transform transform">
          <div className="flex items-center gap-4">
            <img
              src={podcast.thumbnail ? podcast.thumbnail.url : "https://via.placeholder.com/"}
              className="w-16 h-16 rounded-lg shadow-md object-cover"
              alt=""
            />
            <div className="hidden md:block">
              <p className="text-lg font-semibold text-white">{podcast.title}</p>
              <p className="text-sm text-gray-400">
                {podcast.description && podcast.description.slice(0, 30)}...
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {podcast && podcast.audio && (
              <>
                {isPlaying ? (
                  <audio ref={audioRef} src={podcast.audio.url} autoPlay />
                ) : (
                  <audio ref={audioRef} src={podcast.audio.url} />
                )}
              </>
            )}

            <div className="w-full flex items-center text-blue-600">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="progress-bar w-36 md:w-80 bg-blue-600 rounded-lg accent-blue-600 cursor-pointer"
                value={(progress / duration) * 100}
                onChange={handleProgressChange}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <button className="text-white text-2xl cursor-pointer hover:text-blue-600 transition duration-300" onClick={prevPodcast}>
                <GrChapterPrevious />
              </button>
              <button
                className="bg-blue-600 text-white rounded-full p-3 shadow-md hover:bg-blue-500 transition duration-300"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button className="text-white text-2xl cursor-pointer hover:text-blue-600 transition duration-300" onClick={nextPodcast}>
                <GrChapterNext />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32 accent-blue-600 rounded-lg cursor-pointer"
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
