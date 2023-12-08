import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1); // Default opacity is 1 (fully opaque)

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
        // Calculate opacity based on scroll position (adjust as needed)
        const opacity = 1 - window.scrollY / 200; // You can change the 200 value to control when the opacity starts changing
        setScrollOpacity(opacity < 0 ? 0 : opacity); // Ensure opacity is not negative
      } else {
        setIsSticky(false);
        setScrollOpacity(1); // Reset to fully opaque when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
    className={`bg-black bg-opacity-${Math.floor(scrollOpacity * 100)} text-white flex items-center w-full p-4 md:py-2 md:px-6 ${
      isSticky ? "sticky top-0 z-10 shadow-lg" : ""
    }`}
    
    >
      <NavLink to={"/"}>
        <img src={Logo} className="w-16" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
  {/* prettier-ignore */}
  <li className="mx-5 text-lg">
    <NavLink to={'/apipage'} className="text-white">Home</NavLink>
  </li>
  {/* prettier-ignore */}
  <li className="mx-5 text-lg">
    <NavLink to={'/home'} className="text-white">User Songs</NavLink>
  </li>
  {/* prettier-ignore */}
  <li className="mx-5 text-lg">
    <NavLink to={'/browsesongs'} className="text-white">Playlists</NavLink>
  </li>
  {/* prettier-ignore */}
  <li className="mx-5 text-lg">
  <Link to="/piano"></Link>
  </li>
</ul>


      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member.{" "}
            <FaCrown className="text-xm -ml-1 text-yellow-500" />{" "}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favourites
            </p>
            <hr />
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
