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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const frameImg = new Image();

      const frameWidth = 600;
      const frameHeight = 800;

      canvas.width = frameWidth;
      canvas.height = frameHeight;

      img.src = capturedImage;
      frameImg.src = frame;

      img.onload = () => {
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, frameWidth, frameHeight);

          const imageAspectRatio = img.width / img.height;
          const frameAspectRatio = frameWidth / frameHeight;

          let drawWidth = frameWidth;
          let drawHeight = frameHeight;
          let drawX = 0;
          let drawY = 0;

          if (imageAspectRatio > frameAspectRatio) {
            drawWidth = frameWidth;
            drawHeight = frameWidth / imageAspectRatio;
            drawY = (frameHeight - drawHeight) / 2;
          } else {
            drawHeight = frameHeight;
            drawWidth = frameHeight * imageAspectRatio;
            drawX = (frameWidth - drawWidth) / 2;
          }

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "captured_with_frame.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      };
    }
  };

  return (
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
        <img src={rightImg} alt="rightImg" className="right-img" />
      </div>
      <div className="buttons-left">
        <button className="box" onClick={capture}>
          <p className="text-button">CAPTURE</p>
        </button>
        <div className="horizontal-line"></div>
        <button className="box" onClick={retake}>
          <p className="text-button">RETAKE</p>
        </button>
        <button className="box" onClick={save}>
          <p className="text-button">SAVE</p>
        </button>
        <button className="box ">
          <p className="text-button">POST</p>
        </button>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Photobooth;
