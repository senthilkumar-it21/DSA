import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useMusicPlayer } from "./MusicPlayerContext";
const Card = ({ imageUrl, name, id, onCardClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    maxWidth: "14rem",
    borderRadius: "0.5rem",
    background: "white",
    boxShadow:
      "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "20px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const imageStyles = {
    width: "100%",
    height: "auto",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  };

  const hoverStyles = {
    transform: "scale(1.05)",
  };

  const textStyles = {
    fontSize: "1rem",
    color: "#6b7280",
  };

  const handleClick = () => {
    onCardClick(id);
  };

  return (
    <div style={cardStyles} onClick={handleClick}>
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <img src={imageUrl} alt="" style={{ ...imageStyles, ...(isHovered ? hoverStyles : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
      </div>
      <div className="p-6">
        <p style={textStyles}>{name}</p>
      </div>
    </div>
  );
};

const Browse = () => {
  const [browse, setBrowse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const languages = ["tamil", "english", "telugu", "hindi"];
  const { setBrowseSongUrl, setBrowseSongName, setBrowseSongImage } = useMusicPlayer();
  const fetchPlaylists = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://saavn.me/search/playlists?query=${query}`);
      console.log(response.data);
      setBrowse((prevBrowse) => [...prevBrowse, ...response.data.data.results || []]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    languages.forEach((language) => {
      fetchPlaylists(language);
    });
  }, []);

  const cardContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "16px",
  };

  const handleCardClick = async (cardId, playlist) => {
    try {
      const response = await axios.get(`https://saavn.me/playlists?id=${cardId}`);
      playlist = response.data.data;
  
      // Get the "500x500" image link for the playlist
      const playlistImage = playlist.image.find((image) => image.quality === "500x500");
      const playlistImageUrl = playlistImage ? playlistImage.link : '';
  
      // Add the playlist image and name to the playlist data
      playlist.playlistImage = playlistImageUrl;
      playlist.playlistName = playlist.name;
  
      // Loop through each song in the playlist and add the individual song image
      playlist.songs.forEach((song) => {
        // Get the "500x500" image link for the song
        const songImage = song.image.find((image) => image.quality === "500x500");
        const songImageUrl = songImage ? songImage.link : '';
  
        // Assign the song image link to the 'image' property of the song
        song.image = songImageUrl;
  
        // Add the song image and URL to the playlist data
        song.url = song.album.url;
  
        // Find and add the 320kbps download URL to the song data
        const downloadUrl320kbps = song.downloadUrl.find((urlObj) => urlObj.quality === "320kbps");
        if (downloadUrl320kbps) {
          song.downloadUrl320kbps = downloadUrl320kbps.link;
        }
  
        // Add primaryArtist name and song album name
        song.primaryArtist = playlist.primaryArtists; // Assuming there's only one primary artist
        song.albumName = song.album.name;
      });
  
      // Log the URLs of songs with quality "320kbps"
      console.log("Songs with quality 320kbps:");
      playlist.songs.forEach((song) => {
        if (song.downloadUrl320kbps) {
          console.log("Song Name:", song.name);
          console.log("Primary Artist:", song.primaryArtists);
          console.log("Album Name:", song.albumName);
          console.log("320kbps Song URL:", song.downloadUrl320kbps);
        }
      });
  
      // Navigate to the SongPage and pass the updated playlist data
      navigateToSongPage(cardId, playlist);
    } catch (err) {
      console.error("Error fetching playlist and songs:", err);
    }
  };
  
  
  
  
  const navigateToSongPage = (cardId, playlist) => {
    window.location.href = `/songs/${cardId}`;
    localStorage.setItem("playlist", JSON.stringify(playlist));
  };
  
  

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="trending-playlists">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div style={cardContainerStyles}>
          {browse.map((playlist, index) => (
            <Card
              key={playlist.id}
              imageUrl={playlist.image[2].link}
              name={playlist.name}
              id={playlist.id}
              onCardClick={handleCardClick}
              style={{ marginTop: index % 4 !== 0 ? "20px" : "0" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
