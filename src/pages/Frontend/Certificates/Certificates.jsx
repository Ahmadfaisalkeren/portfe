import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import Loader from "../../../components/Loader/Loader";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/certificates`);
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error("Error Fetch Certificates:", error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full ml-3 mt-2 p-5 flex-grow dark:border-white border border-2 border-black rounded-xl">
      <h1 className="p-3 text-xl font-bold dark:text-white text-black text-center">
        Certificates
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="p-2 h-full w-full filter grayscale hover:filter-none border border-2 dark:border-white border-black shadow-md rounded-xl shadow-gray-500 hover:shadow-2xl hover:shadow-black hover:scale-105 duration-300"
            >
              <p className="text-center text-md dark:text-white font-semibold mb-3">
                {certificate.year}
              </p>
              <p className="text-center text-md dark:text-white font-semibold mb-3">
                {certificate.title}
              </p>
              <img
                src={`${API_URL}/storage/${certificate.image}`}
                alt="certificate"
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
