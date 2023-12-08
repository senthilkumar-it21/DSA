import React, { useEffect, useState } from 'react';
import Header from './Header';
import { IoSearch } from 'react-icons/io5';
import SongCard from './SongCard';
import ApiMusicPlayer from './ApiMusicPlayer';
import { FaTimes } from 'react-icons/fa';
import { useMusicPlayer } from './MusicPlayerContext';
import { IoMic } from 'react-icons/io5'; 
const ApiPage = () => {
  const [trendingTamilData, setTrendingTamilData] = useState([]);
  const [trendingEnglishData, setTrendingEnglishData] = useState([]);
  const [trendingHindiData, setTrendingHindiData] = useState([]);
  const [trendingMalayalamData,setTrendingMalayalamData] =useState([]);
  const [selectedSongUrl, setSelectedSongUrl] = useState(null);
  const [songNameFromAPI, setSongNameFromAPI] = useState('');
  const [songImageFromAPI, setSongImageFromAPI] = useState('');
  const [albumNameFromAPI, setalbumNameFromAPI] = useState('');
  const [artistName, setartistName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const { songUrl, setSongUrl, songName, setSongName, songImage, setSongImage, miniPlayer, setMiniPlayer, isPlaying, setIsPlaying } = useMusicPlayer();
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);


  


  useEffect(() => {
    const trendingTamilUrl = 'https://saavn.me/modules?language=tamil';
    const trendingEnglishUrl = 'https://saavn.me/modules?language=english';
    const trendingHindiUrl = 'https://saavn.me/modules?language=hindi';
    const trendingMalayalamUrl = 'https://saavn.me/modules?language=malayalam';
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSpeechRecognitionSupported(true);
    }
    // Fetch trending data for Tamil
    fetch(trendingTamilUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.albums) {
          setTrendingTamilData(data.data.albums);
        }
      })
      .catch((error) => {
        console.error('Error fetching trending data for Tamil:', error);
      });

      const restoreMusicPlayerState = () => {
        const savedSongUrl = localStorage.setItem('songUrl', selectedSongUrl);
        const savedSongName = localStorage.setItem('songName', songNameFromAPI);
        const savedSongImage = localStorage.setItem('songImage', songImageFromAPI);
        const savedIsPlaying = localStorage.setItem('isPlaying', true);
        
    
        if (savedSongUrl && savedSongName && savedSongImage && savedIsPlaying) {
          // Set the restored state in your context
          setSongUrl(savedSongUrl);
          setSongName(savedSongName);
          setSongImage(savedSongImage);
          setIsPlaying(savedIsPlaying === 'true'); // Convert string to boolean
        }
      };
      restoreMusicPlayerState();
  
    // Fetch trending data for English
    fetch(trendingEnglishUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.albums) {
          setTrendingEnglishData(data.data.albums);
        }
      })
      .catch((error) => {
        console.error('Error fetching trending data for English:', error);
      });

    // Fetch trending data for Hindi
    fetch(trendingHindiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.albums) {
          setTrendingHindiData(data.data.albums);
        }
      })
      .catch((error) => {
        console.error('Error fetching trending data for Hindi:', error);
      });
      fetch(trendingMalayalamUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.albums) {
          setTrendingMalayalamData(data.data.albums);
        }
      })
      .catch((error) => {
        console.error('Error fetching trending data for Malayalam:', error);
      });
  }, []);

  const handleSongCardClick = (downloadUrl, name, image, albumname, artistname) => {
    setSelectedSongUrl(downloadUrl);
    setSongNameFromAPI(name);
    setSongImageFromAPI(image);
    setalbumNameFromAPI(albumname);
    setartistName(artistname);
    setIsPlaying(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    if (searchQuery) {
      const searchUrl = `https://saavn.me/search/songs?query=${encodeURIComponent(searchQuery)}`;

      // Fetch search results
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.results) {
            const songResults = data.data.results;

            // Update the state with the search results
            setSearchResults(songResults);

            // Open the search results modal
            setSearchModalOpen(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleSearchResultClick = async (downloadUrl, name, image, albumname, artistname) => {
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
        const downloadLink320kbps = selectedSong.downloadUrl.find(
          (url) => url.quality === '320kbps'
        );

        if (downloadLink320kbps) {
          // Set the values in the state
          setSelectedSongUrl(downloadLink320kbps.link);
          setSongNameFromAPI(name);
          setSongImageFromAPI(image);
          setartistName(selectedSong.primaryArtists);
          setalbumNameFromAPI(selectedSong.album.name);

          // Find the image with "quality" property of "500x500"
          const image500x500 = selectedSong.image.find((img) => img.quality === '500x500');
          if (image500x500) {
            setSongImageFromAPI(image500x500.link);
          } else {
            console.log('500x500 quality image not found.');
          }
        } else {
          console.log('320kbps quality not found.');
        }
      } else {
        console.log('Song details not found.');
      }
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
    setSearchModalOpen(false);
  };
  const handleVoiceSearch = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Microphone access granted, continue with speech recognition
          const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          // Set up speech recognition
          // ...
  
          // Add an event listener for device changes
          navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    } else {
      alert('Your browser does not support microphone access for voice search.');
    }
  };
  
  const handleDeviceChange = (event) => {
    // Check if any media devices have been added or removed
    const audioInputs = event.target.inputs.filter((input) => input.kind === 'audioinput');
    if (audioInputs.length > 0) {
      // Headphones or microphones have been connected or disconnected
      console.log('Media devices changed:', audioInputs);
      
      // You can trigger voice search or take other actions here
    }
  };
  
  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      {/* SearchBar UI */}
      <div className="w-full my-4 h-16 bg-card flex items-center justify-center">
        <div className="w-full gap-4 p-4 md:w-2/3 bg-primary shadow-xl rounded-md flex items-center">
          <IoSearch className="text-2xl text-textColor" />
          <input
            type="text"
            className="w-full h-full bg-transparent text-lg text-textColor border-none outline-none"
            placeholder="Search here ...."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            className="neumorphism-button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={performSearch}
          >
            Search
          </button>
          {isSpeechRecognitionSupported && (
            <button
              className="neumorphism-button text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-4 py-2.5 text-center"
              onClick={handleVoiceSearch}
            >
              <IoMic size={24} /> {/* Microphone icon */}
            </button>
          )}
        </div>
      </div>
      {/* Display trending songs using SongCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Tamil Trending Songs */}
        {trendingTamilData.map((album, index) => (
          <SongCard
            key={album.id}
            data={{
              _id: album.id,
              imageURL: album.image.find((img) => img.quality === '500x500').link,
              name: album.name,
              artist: album.artists[0].name,
            }}
            index={index}
            onCardClick={handleSongCardClick}
          />
        ))}

        {/* English Trending Songs */}
        
        {/* Hindi Trending Songs */}
        {trendingHindiData.map((album, index) => (
          <SongCard
            key={album.id}
            data={{
              _id: album.id,
              imageURL: album.image.find((img) => img.quality === '500x500').link,
              name: album.name,
              artist: album.artists[0].name,
            }}
            index={index}
            onCardClick={handleSongCardClick}
          />
        ))}
        {trendingMalayalamData.map((album, index) => (
          <SongCard
            key={album.id}
            data={{
              _id: album.id,
              imageURL: album.image.find((img) => img.quality === '500x500').link,
              name: album.name,
              artist: album.artists[0].name,
            }}
            index={index}
            onCardClick={handleSongCardClick}
          />
        ))}
        {/* English Trending Songs */}
        {trendingEnglishData.map((album, index) => (
          <SongCard
            key={album.id}
            data={{
              _id: album.id,
              imageURL: album.image.find((img) => img.quality === '500x500').link,
              name: album.name,
              artist: album.artists[0].name,
            }}
            index={index}
            onCardClick={handleSongCardClick}
          />
        ))}

      </div>

      {/* Render the ApiMusicPlayer only when a song is selected */}
      {selectedSongUrl && (
        <ApiMusicPlayer
          songUrl={selectedSongUrl}
          songNameFromAPI={songNameFromAPI}
          songImageFromAPI={songImageFromAPI}
          albumNameFromAPI={albumNameFromAPI}
          artistName={artistName}
          onClose={() => setSelectedSongUrl(null)}
        />
      )}

      {/* Search results modal */}
      {isSearchModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-75 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-end">
              <button onClick={closeSearchModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="mb-4 cursor-pointer"
                onClick={() =>
                  handleSearchResultClick(
                    result.url,
                    result.name,
                    result.image,
                    result.albumname,
                    result.artistname
                  )
                }
              >
                <p>{result.name}</p>
                {/* Add more information as needed */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiPage;
