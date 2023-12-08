import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import axios from "axios";
import Header from "./Header";
const Playlists = () => {
  const [{ playlists }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("http://localhost:4000/api/playlists/getAll")
      .then(response => {
        dispatch({
          type: actionType.SET_PLAYLISTS,
          playlists: response.data.playlist
        });
      })
      .catch(error => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {playlists &&
          playlists.map((data, index) => (
            <PlaylistCard key={index} data={data} index={index} />
          ))}
      </div>
    </div>
  );
};
const PlaylistCard = ({ data, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const handleDelete = () => {
    setIsDeleted(true);
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handlePlaylistClick = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/playlists/${data._id}/songs`);
      setPlaylistSongs(response.data.songs);
    } catch (error) {
      console.error("Error fetching playlist songs:", error);
    }
  };

  return (
    <>
    <div>
      <Header />
      </div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        onClick={handlePlaylistClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <motion.div>
          <p className="text-base text-headingColor font-semibold my-2">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
          </p>
        </motion.div>
      </motion.div>
      {isHovered && (
        <div className="playlist-songs-box">
          <ul>
            {playlistSongs.map((song) => (
              <li key={song._id}>{song.name}</li>
            ))}
          </ul>
        </div>
      )}
      </>
  );
};



export default Playlists;
