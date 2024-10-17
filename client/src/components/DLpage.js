import React, { useState } from 'react';
import axios from 'axios';

const DLPage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [actualClass, setActualClass] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setImageUrl(event.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      console.error('Invalid file type. Please select an image.');
      setImageUrl(null); 
    }
  };

  const handlePredict = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://127.0.0.1:5002/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data.predicted_class);
      setActualClass(response.data.actual_class);
    } catch (error) {
      console.log('There was an error predicting the file!', error);
    }
  };

  return (
    <div className="prediction-container">
      <h1 style={{ marginBottom: '10px' }}>Medical Image Captioning</h1>
      <h2 style={{ marginBottom: '10px' }}>Prediction using DL Model</h2>
      <div className="file-and-button-container">
        <input type="file" onChange={handleFileChange} />
        <button 
          style={{ backgroundColor: 'lightblue', color: 'black', padding: '15px 30px', fontSize: '20px', borderRadius: '5px', marginRight: '20px' }} 
          onClick={handlePredict}>
          Predict
        </button>
      </div>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded Image" className="uploaded-image" />
        </div>
      )}
      {prediction && (
        <div style={{ fontSize: '30px', marginRight: '20px' }}>
          <div>Predicted class: {prediction}</div>
          <div>Actual class: {actualClass}</div>
        </div>
      )}
    </div>
  );
};

export default DLPage;
