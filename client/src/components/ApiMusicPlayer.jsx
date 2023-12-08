import React, { useEffect, useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FaMinus, FaDownload } from 'react-icons/fa';

const ApiMusicPlayer = ({ songUrl, songNameFromAPI, songImageFromAPI, albumNameFromAPI, artistName }) => {
  const [{ miniPlayer }] = useStateValue();
  const [showDetails, setShowDetails] = useState(true);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    
  }, [songUrl, songNameFromAPI, albumNameFromAPI, artistName]);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleDownload = () => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = songUrl;
    link.download = `${songNameFromAPI}.mp3`; // You can set a custom download filename here
    link.target = "_blank"; // To open the download in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`fixed bottom-0 w-full bg-white p-4 z-10 ${
        miniPlayer ? 'top-40' : ''
      } ${minimized ? 'h-16 justify-center' : ''}`}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
      }}
    >
      <div className={`flex items-center gap-3 ${minimized ? 'justify-center' : ''}`}>
        <img
          src={songImageFromAPI}
          className={`w-20 h-20 object-cover rounded-md ${
            minimized ? 'hidden' : ''
          }`}
          alt=""
        />
        <div className={`flex items-center w-full gap-3 ${minimized ? 'hidden' : ''}`}>
          <div>
            <p className="text-xl text-headingColor font-semibold">
              {songNameFromAPI}
            </p>
            <span className="text-base ml-2 text-gray-500">{albumNameFromAPI}</span>
            <p className="text-textColor text-sm font-semibold">
              {artistName}
            </p>
          </div>
          <div className="flex-1">
            <AudioPlayer
              src={songUrl}
              autoPlay={true}
              showSkipControls={true}
            />
          </div>
        </div>
      </div>
      {minimized ? (
        <div className="flex items-center justify-center gap-3 mt-4">
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add play icon here */}</motion.i>
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add pause icon here */}</motion.i>
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add next icon here */}</motion.i>
          <button
            className="text-black-500 hover:underline cursor-pointer"
            onClick={toggleMinimize}
          >
            Expand
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 mt-4">
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add your close icon here */}</motion.i>
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add your arrow icon here */}</motion.i>
          <motion.i whileTap={{ scale: 0.8 }}>{/* Add volume icon here */}</motion.i>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={toggleMinimize}
            className="text-blue-500 cursor-pointer"
          >
            <FaMinus /> {/* Add the minimize icon here */}
          </motion.i>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={handleDownload}
            className="text-blue-500 cursor-pointer"
          >
            <FaDownload /> {/* Add the download icon here */}
          </motion.i>
        </div>
      )}
    </div>
  );
};

export default ApiMusicPlayer;
