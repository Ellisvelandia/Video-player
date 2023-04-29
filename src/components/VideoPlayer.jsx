import { useRef, useState, useEffect, useCallback } from "react";
import VideoControls from "./VideoControls";

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => setProgress(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = e.target.value;

    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  }, []);

  const handlePlaybackRateChange = useCallback((e) => {
    const newPlaybackRate = e.target.value;

    videoRef.current.playbackRate = newPlaybackRate;
    setPlaybackRate(newPlaybackRate);
  }, []);

  const toggleFullScreen = useCallback(() => {
    const video = videoRef.current;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msRequestFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleProgressChange = useCallback((e) => {
    const newProgress = e.target.value;

    videoRef.current.currentTime = newProgress;
    setProgress(newProgress);
  }, []);

  return (
    <div className="relative border shadow-2xl shadow-black rounded-md overflow-hidden w-[900px] drop-shadow-sm group">
      <video
        src={src}
        className="w-full h-full object-fill"
        ref={videoRef}
        onClick={togglePlay}
      ></video>
      <VideoControls
        progress={progress}
        duration={duration}
        isPlaying={isPlaying}
        volume={volume}
        playbackRate={playbackRate}
        togglePlay={togglePlay}
        handleVolumeChange={handleVolumeChange}
        handlePlaybackRateChange={handlePlaybackRateChange}
        toggleFullScreen={toggleFullScreen}
        handleProgressChange={handleProgressChange}
      />
    </div>
  );
};

export default VideoPlayer;
