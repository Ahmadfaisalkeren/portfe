import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsBrowserEdge } from "react-icons/bs";
import Loader from "../../../components/Loader/Loader";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";

const Projects = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProject(response.data.projects);
    } catch (error) {
      console.error("Error Fetch Projects:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full ml-3 mt-2 p-5 flex-grow dark:border-white border border-2 border-black rounded-xl">
      <h1 className="p-3 text-xl font-bold dark:text-white text-black text-center">
        Projects
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {project.map((project, index) => (
            <div
              key={index}
              className="relative p-2 h-full border border-2 border-black shadow-md rounded-xl shadow-gray-500 hover:shadow-2xl hover:shadow-black hover:scale-105 duration-300 overflow-hidden group"
            >
              <img
                src={`${API_URL}/storage/${project.image}`}
                alt="Invalid Image"
                className="rounded-md duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-gradient-to-t from-black via-black to-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                <p className="text-base md:text-lg lg:text-lg font-semibold mb-2">{project.title}</p>
                <p className="text-[8px] md:text-sm lg:text-sm text-center font-normal mb-4">
                  {project.description}
                </p>
                <a
                  href={project.weblink}
                  className="text-xl md:text-3xl lg:text-3xl"
                  target="_blank"
                  title="Visit Website"
                >
                  <BsBrowserEdge />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
