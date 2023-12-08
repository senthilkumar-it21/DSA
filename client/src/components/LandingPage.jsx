import React from 'react';
import { bg } from '../assets/video';
const LandingPage = () => {
  const handleMusicPlayerClick = () => {
    // Redirect to the Music Player page
    window.location.href = '/apipage';
  };

  const handleSongDistributionClick = () => {
    // Redirect to the Song Distribution page
    window.location.href = '/songupload';
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary relative">
      {/* Video container */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Video element */}
        <video
        src={bg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
  style={{ filter: "blur(10px)" }}
></video>
      </div>

      <h1 className="text-7xl text-white font-semibold tracking-wide  z-10">Akatsuki Player</h1>
      <br></br>
      <div className="button-container z-10">
      <button
  className="neumorphism-button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  onClick={handleMusicPlayerClick}
>
  Music Player
</button>
        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleSongDistributionClick}>
          Song Distribution
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
