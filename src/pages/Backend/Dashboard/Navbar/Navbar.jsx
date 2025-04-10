import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaBars, FaBell, FaUser } from "react-icons/fa";
import { useAuth } from "../../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const bellRef = useRef(null);
  const userRef = useRef(null);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex">
      <div className="w-full bg-white p-2 h-[45px] shadow-md text-black rounded-xl text-xl">
        <div className="flex justify-between">
          <button onClick={toggleSidebar}>
            <FaBars size={25} />
          </button>
          <div className="flex relative">
            <div className="relative" ref={userRef}>
              <button onClick={() => setIsOpen(!isOpen)} className="mr-2">
                <FaUser size={25} />
              </button>
              {isOpen && (
                <ul className="text-sm font-medium bg-white rounded-lg shadow-lg p-1 absolute top-7 border border-black left-[-67px]">
                  <li className="">
                    <button
                      onClick={handleLogout} // Attach the handleLogout function to the button
                      className="flex items-center text-black rounded-lg hover:bg-sky-300 duration-300 p-2 w-full text-left"
                    >
                      <span className="flex mr-1">
                        <FaArrowLeft />
                      </span>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
