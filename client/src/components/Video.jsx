import React, { useState } from 'react';
import axios from 'axios';

function UploadVideo() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('videoFile', file);

    try {
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Video uploaded successfully');
      setTitle('');
      setFile(null);
    } catch (err) {
      setError('Error uploading video. Please try again.');
      console.error('Upload error:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
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
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Video'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default UploadVideo;
