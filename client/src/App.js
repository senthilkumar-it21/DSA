import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { MusicPlayerProvider } from "./components/MusicPlayerContext";
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config/firebase.config";
import { getAllSongs, validateUser } from "./api";
import {
  Dashboard,
  DashboardNewSong,
  Home,
  Loader,
  Login,
  MusicPlayer,
  UserProfile,
} from "./components";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";
import Playlists from "./components/Playlists";
import SongDetails from "./components/SongDetails";
import ApiPage from "./components/ApiPage";
import ApiSongDetails from "./components/ApiSongDetails";
import LandingPage from "./components/LandingPage";
import DashBoardHome from "./components/DashBoardHome";
import Browse from "./components/Browse";
import SongPage from "./components/SongPage";
import ApiMusicPlayer from "./components/ApiMusicPlayer";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    <MusicPlayerProvider>
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading || (!user && (
          <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
            <Loader />
          </div>
        ))}
        
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="home" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/dashboardhome/*" element={<DashBoardHome />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/apipage" element={<ApiPage />} />
          <Route path="/songs/:id" element={<SongPage />} />
          <Route path="/browsesongs" element={<Browse />} />
          <Route path="/*" element={<LandingPage />} />
          
          <Route path="songupload" element={<DashboardNewSong />} />
          <Route path="/api-song-details/:id" element={<ApiSongDetails user={user} />} />
          <Route path="/song/:id" element={<SongDetails />} />
        </Routes>

        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
    </MusicPlayerProvider>
  );
}

export default App;
