import React from "react";
import Layout from "../Layout";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="dark:bg-black dark:border-white p-2 md:p-4 lg:p-6">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default Home;
