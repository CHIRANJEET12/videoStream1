import React from 'react';
import UploadVideo from './components/Video';
import VideoList from './components/Videolist';

function App() {
  return (
    <div>
      <h1>Video Streaming Platform</h1>
      <UploadVideo />
      <VideoList />
    </div>
  );
}

export default App;
