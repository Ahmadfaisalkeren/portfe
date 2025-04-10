import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsJournalBookmark } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { TbCategory } from "react-icons/tb";
import { RiPresentationLine } from "react-icons/ri";
import { IoMdArrowDropleft, IoMdArrowDropup } from "react-icons/io";
import { useAuth } from "../../../Auth/AuthContext";
import { PiUsersThree } from "react-icons/pi";

const Sidebar = ({ isMinimized }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    {
      title: "Dashboard",
      link: "/dashboard/home",
      icon: <AiOutlineHome />,
    },
    {
      title: "About",
      link: "/dashboard/about",
      icon: <TbCategory />,
    },
    {
      title: "Certificates",
      link: "/dashboard/certificates",
      icon: <RiPresentationLine />,
    },
    {
      title: "Contacts",
      link: "/dashboard/contacts",
      icon: <PiUsersThree />,
    },
    {
      title: "Projects",
      link: "/dashboard/projects",
      icon: <PiUsersThree />,
    },
    {
      title: "Skills",
      link: "/dashboard/skills",
      icon: <PiUsersThree />,
    },
  ];

  const handleSetActiveMenu = (menuLink) => {
    setActiveMenu(menuLink);
  };

  return (
    <div
      className={`min-h-screen bg-white text-white transition-all duration-300 ${
        isMinimized ? "w-[78px]" : "w-32"
      } shadow-2xl`}
      style={{ minWidth: isMinimized ? "78px" : "14rem" }}
    >
      <div
        className={`px-6 text-black text-xl font-semibold justify-center h-16 flex items-center ${
          isMinimized && "justify-center"
        }`}
      >
        {!isMinimized && (
          <button>
            NggaweDWCuy
          </button>
        )}
      </div>
      <nav className="mt-1">
        <ul>
          {adminMenu.map((menu, index) => (
            <div key={index}>
              <li className="duration-300 mb-2 px-3">
                <NavLink
                  to={menu.link}
                  exact="true"
                  className={({ isActive }) =>
                    `flex items-center hover:bg-black rounded-lg py-2 pl-4 duration-300 ${
                      isActive
                        ? "bg-black text-white"
                        : "text-black hover:text-white"
                    }`
                  }
                  onClick={() => handleSetActiveMenu(menu.link)}
                >
                  <span className="text-xl font-base mr-2 flex">
                    {menu.icon}
                  </span>
                  {!isMinimized && (
                    <span className="text-base font-medium">{menu.title}</span>
                  )}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
