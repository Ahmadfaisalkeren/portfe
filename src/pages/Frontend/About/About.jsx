import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import Loader from "../../../components/Loader/Loader";

const About = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/abouts`);
      setAbout(response.data.abouts);
    } catch (error) {
      console.error("Error Fetch About:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full ml-3 mt-2 p-5 dark:bg-black dark:border-white flex-grow border border-2 border-black rounded-xl">
      <h1 className="p-3 text-xl font-bold text-black text-center dark:text-white">About Me</h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        about.map((abott, index) => (
          <div key={index}>
            <h2 className="mt-5 flex justify-center font-semibold dark:text-white text-2xl text-black text-justify">
              {abott.title}
            </h2>
            <p className="mt-5 font-semibold text-base dark:text-white text-black text-justify">
              {abott.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default About;
