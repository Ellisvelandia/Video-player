/* eslint-disable react/prop-types */
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdFullscreen } from "react-icons/md";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const VideoControls = ({
  duration,
  progress,
  isPlaying,
  volume,
  playbackRate,
  togglePlay,
  handleVolumeChange,
  handlePlaybackRateChange,
  toggleFullScreen,
  handleProgressChange,
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full p-4 flex items-center bg-black bg-opacity-75 ${
        isPlaying ? "hidden group-hover:flex" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <button className="text-white focus:outline-none" onClick={togglePlay}>
          {isPlaying ? <BsPauseFill size={24} /> : <BsFillPlayFill size={24} />}
        </button>
        <div className="flex items-center">
          <span className="text-white mr-2">{formatTime(progress)}</span>
          <div className="relative md:w-64 w-auto h-1.5 bg-gray-600 rounded-full mr-2">
            <input
              type="range"
              className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
              min="0"
              max={duration}
              step={1}
              value={progress}
              onChange={handleProgressChange}
            />
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
          </div>
          <span className="text-white mr-2">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            className="w-16 h-1.5 bg-gray-600 rounded-full mr-2"
            min="0"
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
          />
          <select
            name=""
            id=""
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            className="bg-black text-white focus:outline-none px-2 py-1 rounded-md"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
        <button
          className="text-white focus:outline-none"
          onClick={toggleFullScreen}
        >
          <MdFullscreen size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;
