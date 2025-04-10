import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import Loader from "../../../components/Loader/Loader";

const Skills = () => {
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/skills`);
      setSkill(response.data.skills);
    } catch (error) {
      console.error("Error Fetch Skills:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full ml-3 mt-2 p-5 flex-grow dark:border-white border border-2 border-black rounded-xl">
      <h1 className="p-3 text-xl font-bold dark:text-white text-black text-center">Skills</h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skill.map((skillData, index) => (
            <div
              key={index}
              className="p-2 h-24 flex filter grayscale hover:filter-none justify-between items-center border border-2 border-black dark:border-white shadow-md rounded-xl shadow-gray-500 hover:shadow-2xl hover:shadow-black hover:scale-105 duration-300"
            >
              <div>
                <p className="text-base dark:text-white font-semibold">{skillData.skill}</p>
                <p className="text-xs">{skillData.description}</p>
              </div>
              <div>
                <img
                  src={`${API_URL}/storage/${skillData.image}`}
                  alt="Skill Image"
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
