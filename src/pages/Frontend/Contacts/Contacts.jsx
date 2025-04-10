import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import Loader from "../../../components/Loader/Loader";

const Contacts = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/contacts`);
      setContact(response.data.contacts);
    } catch (error) {
      console.error("Error Fetch Contact:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full ml-3 mt-2 p-5 flex-grow dark:border-white border border-2 border-black rounded-[8px]">
      <h1 className="p-3 text-xl font-bold dark:text-white text-black text-center">
        Contact Me
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contact.map((contact, index) => (
            <div
              key={index}
              className="h-[150px] dark:border-white border border-black filter grayscale hover:filter-none rounded-md shadow-lg dark:shadow-white dark:shadow-md hover:scale-105 hover:shadow-xl hover:shadow-black duration-300"
            >
              <p className="text-center dark:text-white p-2">{contact.title}</p>
              <a
                target="_blank"
                title="Open in new tab"
                className="flex justify-center"
                href={contact.link}
              >
                <img
                  src={`${API_URL}/storage/${contact.image}`}
                  alt="Image Invalid"
                  className="w-20 h-20"
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
