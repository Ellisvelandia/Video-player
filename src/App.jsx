import VideoPlayer from "./components/VideoPlayer";
import video from "./assets/video.mp4"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2">
      <VideoPlayer src={video} />
    </div>
  );
};

export default App;
