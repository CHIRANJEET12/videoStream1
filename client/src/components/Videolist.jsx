import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:3000/api');
        if (Array.isArray(response.data)) {
          setVideos(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setVideos([]); // Set to an empty array if the response is unexpected
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]); // Set to an empty array on error
      }
    }
    fetchVideos();
  }, []);

  return (
    <div>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id}>
            <h3>{video.title}</h3>
            <video controls>
              <source src={`http://localhost:3000/api/${video.videoFile}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
}

export default VideoList;
