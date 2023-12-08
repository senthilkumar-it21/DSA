// MusicPlayerContext.js

import React, { createContext, useContext, useState } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext);
};

export const MusicPlayerProvider = ({ children }) => {
  const [songUrl, setSongUrl] = useState(null);
  const [songName, setSongName] = useState('');
  const [songImage, setSongImage] = useState('');
  const [miniPlayer, setMiniPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <MusicPlayerContext.Provider
      value={{
        songUrl,
        setSongUrl,
        songName,
        setSongName,
        songImage,
        setSongImage,
        miniPlayer,
        setMiniPlayer,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
