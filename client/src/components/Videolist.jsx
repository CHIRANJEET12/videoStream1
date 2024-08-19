import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const { data } = await axios.get('http://localhost:5000/videos');
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <video controls>
            <source src={`http://localhost:5000/video/${video.videoFile}`} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
