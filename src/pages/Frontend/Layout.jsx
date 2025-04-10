import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="container dark:bg-black dark:border-white mx-auto p-2 md:p-4 lg:p-7 border border-2 border-black shadow-xl rounded-xl shadow-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-3">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
