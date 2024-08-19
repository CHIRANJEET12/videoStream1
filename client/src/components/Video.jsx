import React, { useState } from 'react';
import axios from 'axios';

function UploadVideo() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoFile', file);

    await axios.post('http://localhost:5000/upload', formData);
    alert('Video uploaded successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload Video</button>
    </form>
  );
}

export default UploadVideo;
