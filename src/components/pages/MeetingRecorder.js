// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../animation/navbar';
import ParticleRing from '../animation/ParticleRing';
import PropTypes from 'prop-types';

function MeetingRecorder({ meetingLink }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [, setRecordedChunks] = useState([]);
  const [isVerified] = useState(false);
  const [detectionResult] = useState('');
  const mediaRecorderRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (isVerified) {
      window.open(meetingLink, '_blank');
    }
  }, [isVerified, meetingLink]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setMediaStream(stream);
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        createDownloadLink(videoBlob);
        setRecordedChunks([]);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop recording automatically after 10 seconds
      setTimeout(() => {
        stopRecording();
      }, 10000);
    }).catch((err) => {
      console.error('Error accessing webcam:', err);
      alert('Failed to access webcam.');
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const createDownloadLink = (videoBlob) => {
    const url = URL.createObjectURL(videoBlob);
    setDownloadUrl(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <ParticleRing />
      </div>
      <div className="absolute top-4 right-4">
        <Navbar />
      </div>
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => navigate('/App')} 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
        >
          Go to Main
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-6">Meeting Recorder & Face Detection</h1>
      <p className="mb-4">Meeting Link: {meetingLink}</p>

      <button
        onClick={startRecording}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
        disabled={isRecording}
      >
        Start Verification & Face Detection
      </button>

      <button
        onClick={stopRecording}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md mt-4"
        disabled={!isRecording}
      >
        Stop Verification & Face Detection
      </button>

      <video ref={videoRef} autoPlay className="mt-4 w-96" />

      <p className="mt-4 text-lg font-semibold">
        Detection Result: <span className="text-red-500">{detectionResult}</span>
      </p>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="recorded-video.mp4"
          className="mt-4 text-lg font-semibold text-blue-500"
        >
          Download Recorded Video
        </a>
      )}
    </div>
  );
}
MeetingRecorder.propTypes = {
  meetingLink: PropTypes.string.isRequired,  // 'meetingLink' should be a string
};
export default MeetingRecorder;
