import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ApiMusicPlayer from "./ApiMusicPlayer";
import { Link } from "react-router-dom";

const SongPage = () => {
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  const { id } = useParams();
  let isMounted = true;

  const [selectedSongUrl, setSelectedSongUrl] = useState(null);
  const [songNameFromAPI, setSongNameFromAPI] = useState("");
  const [songImageFromAPI, setSongImageFromAPI] = useState("");
  const [albumNameFromAPI, setAlbumNameFromAPI] = useState("");
  const [artistName, setArtistName] = useState("");

  const openMusicPlayer = (song) => {
    setSelectedSongUrl(song.downloadUrl320kbps);
    setSongNameFromAPI(song.name || "");
    setSongImageFromAPI(song.image || "");
    setAlbumNameFromAPI(song.albumName || "");
    setArtistName(song.primaryArtists || "");
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("playlist");
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="w-96 bg-base-100 shadow-xl mx-auto p-4 mt-8">
        <figure>
          <img
            src={playlist.playlistImage}
            alt={playlist.playlistName}
            className="w-full h-auto text-black"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">
            {playlist.playlistName}
          </h2>
        </div>
      </div>

      <div className="flex mt-4"> {/* Use flex to create two columns */}
        <div className="w-1/2"> {/* Left column */}
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {playlist.songs
              .slice(0, Math.ceil(playlist.songs.length / 2)) // Split songs into left column
              .map((song, index) => (
                <li key={index} className="py-2 sm:py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={song.image}
                        alt={`Song ${index + 1}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => openMusicPlayer(song)}>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                          {song.name}
                        </p>
                      </button>
                      <p className="text-sm text-gray-500 truncate dark:text-black-400">
                        {song.primaryArtists}
                      </p>
                      <Link to={`/songdetails/${song.id}`}>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                          Details
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-1/2"> {/* Right column */}
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {playlist.songs
              .slice(Math.ceil(playlist.songs.length / 2)) // Split songs into right column
              .map((song, index) => (
                <li key={index} className="py-2 sm:py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={song.image}
                        alt={`Song ${index + 1}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => openMusicPlayer(song)}>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                          {song.name}
                        </p>
                      </button>
                      <p className="text-sm text-gray-500 truncate dark:text-black-400">
                        {song.primaryArtists}
                      </p>
                      <Link to={`/songdetails/${song.id}`}>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                          Details
                        </p>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {selectedSongUrl && (
        <ApiMusicPlayer
          songUrl={selectedSongUrl}
          songNameFromAPI={songNameFromAPI}
          songImageFromAPI={songImageFromAPI}
          albumNameFromAPI={albumNameFromAPI}
          artistName={artistName}
        />
      )}
    </div>
  );
};

export default SongPage;
