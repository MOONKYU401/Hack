
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './App.css';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const captureWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);
    setShowWebcam(false);
  };

  const handleClassify = () => {
    // TODO: Add classification logic here
    console.log("Classifying image...");
  };

  return (
    <main className="container">
      <h1>♻️ SortSmart</h1>
      <p className="subtitle">Upload or capture an image to classify waste</p>
      
      <div className="card">
        <div className="input-controls">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="image-upload"
            className="file-input"
          />

          <button 
            className={`webcam-button ${showWebcam ? 'active' : ''}`}
            onClick={() => setShowWebcam(prev => !prev)}
          >
            {showWebcam ? 'Close Camera' : 'Open Camera'}
          </button>
        </div>

        <div className="preview-section">
          {showWebcam ? (
            <div className="webcam-container">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="video-preview"
              />
              <button className="webcam-button" onClick={captureWebcam}>
                Capture Photo
              </button>
            </div>
          ) : selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Selected waste" />
            </div>
          )}
        </div>

        {selectedImage && (
          <>
            <button 
              className="webcam-button"
              onClick={handleClassify}
            >
              Classify Waste
            </button>
            <div className="predictions">
              <div className="result-box recycle">
                <span className="emoji">♻️</span>
                <span>Recyclable</span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
