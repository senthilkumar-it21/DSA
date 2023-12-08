import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ApiSongCard from './ApiSongCard'; // Import the new card component
const ApiSongDetails = ( user) => {
  const location = useLocation();
  const { song } = location.state || {};
 
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary">
      <Header />
  
      <div className="flex flex-col items-center justify-center mt-4">
      {user &&  <ApiSongCard data={song} index={0}  user={user} />}
        {/* You can render more ApiSongCard components here if needed */}
      </div>
    </div>
  );
};

export default ApiSongDetails;
