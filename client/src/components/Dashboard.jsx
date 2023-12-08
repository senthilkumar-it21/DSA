import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import Header from "./Header";
import DashboardPlaylist from "./DashboardPlaylist";
import DashboardNewSong from "./DashboardNewSong";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Make an API request to fetch the user's role
    fetch("http://localhost:4000/api/users/getUsers")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response includes the user's role
        const userRole = data.role;

        // Set isAdmin based on the user's role
        setIsAdmin(userRole === "admin");
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />

      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/home"}>
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }>
          {isAdmin ? "Users" : null}
        </NavLink>
        {/* prettier-ignore */}
        <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Songs </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Artist </NavLink>

        {/* prettier-ignore */}
        <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Albums </NavLink>

        <NavLink to={"/dashboard/Playlists"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }> Playlists </NavLink>
      </div>

      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashBoardHome />} />
          <Route path="/user" element={isAdmin ? <DashboardUser /> : null} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbum />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
          <Route path="/playlists" element={<DashboardPlaylist />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
