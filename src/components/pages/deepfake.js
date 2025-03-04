// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ParticleRing from '../animation/ParticleRing';
import Navbar from '../animation/navbar';
import MeetingRecorder from './MeetingRecorder'; // Import the new component

function Deepfake() {
  const [meetingLink, setMeetingLink] = useState('');
  const [, setIsHumanVerified] = useState(false); // State to track if the user is human
  const [showMeetingRecorder, setShowMeetingRecorder] = useState(false); // State to control navigation

  const handleVerify = async () => {
    if (meetingLink.trim() !== '') {
      // Send a request to verify the Google Meet link (you can enhance this with actual verification)
      const response = await fetch('http://localhost:8000/verify-meeting', {
        method: 'POST',
        body: JSON.stringify({ meetingLink }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.isValid) {
        setIsHumanVerified(true); // Set true if meeting is valid
        setShowMeetingRecorder(true); // Navigate to the MeetingRecorder component
      } else {
        alert('This meeting might not be valid or human.');
      }
    } else {
      alert('Please enter a valid Google Meet link.');
    }
  };

  if (showMeetingRecorder) {
    return <MeetingRecorder meetingLink={meetingLink} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <ParticleRing />
      </div>
      <div className="absolute top-4 right-4">
        <Navbar />
      </div>
      <h1 className="text-4xl font-bold mb-6">Deepfake Detection</h1>
      <input
        type="text"
        placeholder="Enter Google Meet Link"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
        className="px-4 py-2 text-black rounded-md w-80 mb-4"
      />
      <button
        onClick={handleVerify}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
      >
        Verify & Join Meeting
      </button>
    </div>
  );
}

export default Deepfake;
