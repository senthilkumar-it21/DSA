import React, { useEffect, useState } from 'react';
import Header from './Header';

const BrowseSongs = () => {
  const [artistsData, setArtistsData] = useState({
    tamil: [],
    hindi: [],
    telugu: [],
    english: [],
    malayalam: [],
  });

  useEffect(() => {
    // Define the languages and their corresponding query parameters
    const languages = ['tamil', 'hindi', 'telugu', 'english', 'malayalam'];

    // Fetch artist data for each language and update the state
    const fetchArtistData = async () => {
      for (const language of languages) {
        try {
          const response = await fetch(`https://saavn.me/modules?language=${language}`);
          const data = await response.json();
          if (data && data.data && data.data.albums) {
            setArtistsData((prevData) => ({
              ...prevData,
              [language]: data.data.albums,
            }));
          }
        } catch (error) {
          console.error(`Error fetching ${language} artists:`, error);
        }
      }
    };

    // Call the fetchArtistData function
    fetchArtistData();
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      {/* Display artist sections for each language */}
      {Object.keys(artistsData).map((language, index) => (
        <div key={index} className="w-full h-auto mt-4">
          <h2 className="text-2xl text-textColor font-semibold mb-2">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {artistsData[language].map((artist, artistIndex) => (
              <div key={artistIndex} className="w-full">
                <div className="bg-white p-2 rounded-md shadow-lg">
                  <div
                    className="w-full h-40 bg-cover bg-center rounded-t-md cursor-pointer"
                    style={{
                      backgroundImage: `url(${artist.image.find((img) => img.quality === '500x500').link})`,
                    }}
                    onClick={() => {
                      // Add your click event handler here
                    }}
                  >
                    <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-lg font-semibold">{artist.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseSongs;
