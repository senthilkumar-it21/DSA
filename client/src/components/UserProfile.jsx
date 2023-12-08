import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const UserProfile = () => {
  // Initialize the playlist name state variable
  const [playlistName, setPlaylistName] = useState("");

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2>Create Playlist</h2>
        <input
          type="text"
          placeholder="Playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create</button>
      </div>
    </div>
  );
};

const handleCreatePlaylist = () => {
  // Get the playlist name from the state variable
  const playlistName = playlistName;

  // Send the request to the backend
  axios.post("/api/playlists/create", {
    playlistName,
  })
    .then((response) => {
      // Show a success message
      alert("Playlist created successfully");
    })
    .catch((error) => {
      // Show an error message
      alert(error);
    });
};

export default UserProfile;
