import React, { useState } from "react";
import {
  FaAddressCard,
  FaAward,
  FaClipboardList,
  FaRProject,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const menus = [
    {
      title: "About Me",
      icon: <FaUser />,
      link: "/about",
    },
    {
      title: "Skills",
      icon: <FaClipboardList />,
      link: "/skills",
    },
    {
      title: "My Projects",
      icon: <FaRProject />,
      link: "/projects",
    },
    {
      title: "Certificates",
      icon: <FaAward />,
      link: "/certificates",
    },
    {
      title: "Contact Me",
      icon: <FaAddressCard />,
      link: "/contacts",
    },
  ];

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`mt-5 ${
        isMinimized ? "w-[60px]" : "w-[160px]"
      } h-[300px] rounded-lg dark:bg-black dark:border-white border border-2 border-black flex-shrink-0 transition-all duration-300 relative`}
    >
      <div className="flex justify-end p-2 mb-5">
        <button
          onClick={toggleSidebar}
          className={`absolute transform -translate-y-1/2 top-[16px] bg-white rounded-full border-2 border-black transition-all duration-300 ${
            isMinimized ? "left-[42px]" : "left-[142px]"
          }`}
        >
          {isMinimized ? (
            <IoIosArrowForward size={25} />
          ) : (
            <IoIosArrowBack size={25} />
          )}
        </button>
      </div>
      {menus.map((menu, index) => (
        <div className="p-2 text-center dark:text-white" key={index}>
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-1 rounded-lg ${
                isActive ? "dark:bg-white dark:text-black bg-black text-white" : ""
              }`
            }
            to={menu.link}
          >
            <div className="flex items-center duration-300">
              <span className="mr-2 text-xl ml-[5px]">{menu.icon}</span>
              {!isMinimized && (
                <span className="text-base font-bold">{menu.title}</span>
              )}
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
