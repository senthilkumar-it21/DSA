import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoPlayCircle } from 'react-icons/io5'; // Import the play button icon

const SongCard = ({ data, index, onCardClick }) => {
  // Extract relevant details from the API data
  const { name, imageURL, artist, _id,albumName } = data;
  const [isHovered, setIsHovered] = useState(false);
  const handleSongCardClick = async () => {
    try {
      // Encode the song name to be included in the query URL
      const encodedSongName = encodeURIComponent(name);
  
      // Fetch song details using the encoded song name
      const response = await fetch(`https://saavn.me/search/songs?query=${encodedSongName}`);
      const responseData = await response.json();
  
      // Check if the API response contains the "quality": "320kbps" parameter
      if (
        responseData &&
        responseData.data &&
        responseData.data.results &&
        responseData.data.results.length > 0
      ) {
        const selectedSong = responseData.data.results[0];
        const downloadUrl = selectedSong.downloadUrl.find(
          (url) => url.quality === '320kbps'
        );
  
        if (downloadUrl) {
          const songNameFromAPI = selectedSong.name; // Get the song name from the API
          const songImageFromAPI = selectedSong.image.find(
            (img) => img.quality === '500x500'
          ).link; // Get the song image URL from the API
          const albumNameFromAPI = selectedSong.album.name; 
          const artistName = selectedSong.primaryArtists;
  
          // Truncate the song name if it's too long
          const truncatedSongName =
            songNameFromAPI.length > 25 ? `${songNameFromAPI.slice(0, 25)}...` : songNameFromAPI;
  
          console.log(`Song name: ${songNameFromAPI}`);
          console.log(`Song image URL: ${songImageFromAPI}`);
          console.log(`Album name: ${albumNameFromAPI}`);
          console.log(`Artist Name : ${artistName}`);
  
          // Send the song link, truncated song name, song image URL, and album name to the parent component's callback function
          onCardClick(downloadUrl.link, truncatedSongName, songImageFromAPI, albumNameFromAPI);
        } else {
          console.log('320kbps quality not found.');
        }
      } else {
        console.log('Song details not found.');
      }
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
  };
  
  
  return (
    <motion.div
    key={_id}
    whileTap={{ scale: 0.8 }}
    initial={{ opacity: 0, translateX: -50 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    onClick={handleSongCardClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      transform: isHovered ? 'rotateX(10deg) rotateY(10deg)' : 'none', // Apply the transform on hover
      transition: 'transform 0.3s ease', // Transition on hover
    }}
  >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={imageURL}
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-opacity duration-300">
            <IoPlayCircle className="text-white text-4xl cursor-pointer" />
          </div>
        )}
      </div>

      <p className="text-base text-headingColor font-semibold my-2">
        {name.length > 25 ? `${name.slice(0, 25)}` : name}
        <span className="block text-sm text-gray-400 my-1">{artist}</span>
      </p>
      <Link to={`/api-song-details/${_id}`} state={{ song: data }}>
        <button className="text-blue-500 hover:underline cursor-pointer">
          Song Details
        </button>
      </Link>
    </motion.div>
  );
};
export default SongCard;
