import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Photobooth.css";
import frame from "./images/frame.png";
import rightImg from "./images/right-img.png";

const Photobooth = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const retake = () => {
    setCapturedImage(null);
  };

  const save = () => {
    if (capturedImage) {
      const link = document.createElement("a");
      link.href = capturedImage;
      link.download = "captured.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="photobooth">
        <span className="home-button">
          <i className="fas fa-home"></i> Home
        </span>
        <div className="camera-container">
          {!capturedImage ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
          ) : (
            <img src={capturedImage} alt="Captured" className="webcam" />
          )}
          <img src={frame} alt="Frame" className="frame" />
        </div>
 <div>
 <img src={rightImg} alt="Frame" className="right-img" />
 </div>
        <div className="buttons-left">
          <button onClick={capture}>Capture</button>
          <button onClick={retake}>Retake</button>
          <button onClick={save}>Save</button>
          <button>Post</button>
        </div>
      </div>
    </>
  );
};

export default Photobooth;
