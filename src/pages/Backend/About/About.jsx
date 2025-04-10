import React, { useEffect, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { TableContainer } from "gemilangtable";
import AddAbout from "./AddAbout";
import UpdateAbout from "./UpdateAbout";
import DeleteAbout from "./DeleteAbout";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";

const About = () => {
  const [abouts, setAboutFe] = useState([]);
  const [addAboutModal, setAddAboutModal] = useState(false);
  const [updateAboutModal, setUpdateAboutModal] = useState(false);
  const [deleteAboutModal, setDeleteAboutModal] = useState(false);
  const [updateAbout, setUpdateAbout] = useState(null);
  const [deleteAbout, setDeleteAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateAboutData();
  }, []);

  const updateAboutData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/abouts`);
      setAboutFe(response.data.abouts);
    } catch (error) {
      console.error("Error Update About Data", error.message);
    }
    setLoading(false);
  };

  const handleEdit = (about) => {
    setUpdateAbout(about);
    setUpdateAboutModal(true);
  };

  const handleDelete = (about) => {
    setDeleteAbout(about);
    setDeleteAboutModal(true);
  };

  const columns = [
    {
      header: "No",
      accessor: "sequenceNumber",
      width: "55px",
    },
    {
      header: "Title",
      accessor: "title",
      width: "250px",
    },
    {
      header: "Description",
      accessor: "description",
      width: "300",
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <div className="flex">
          <button
            onClick={() => handleEdit(item)}
            className="flex mr-1 px-2 py-1 text-xs bg-white border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600"
          >
            <FaPencilAlt />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="flex px-2 py-1 text-xs bg-white border border-red-600 text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <div className="py-5">
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-9">
          <div className="pb-3 flex items-center justify-between">
            <p className="text-lg font-semibold text-sky-600">Data About</p>
            <button
              onClick={() => setAddAboutModal(true)}
              className="flex text-sm px-2 py-1 rounded-md border text-white bg-sky-600 hover:bg-white hover:text-sky-600 hover:border-sky-600 duration-300"
            >
              <FaPlus className="mr-1 mt-1" />
              <span className="text-base">Tambah Data</span>
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <TableContainer
              data={abouts}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <AddAbout
        isOpen={addAboutModal}
        onClose={() => setAddAboutModal(false)}
        updateAboutData={updateAboutData}
      />
      {updateAbout && (
        <UpdateAbout
          isOpen={updateAboutModal}
          onClose={() => setUpdateAboutModal(false)}
          aboutData={updateAbout}
          updateAboutData={updateAboutData}
        />
      )}
      {deleteAbout && (
        <DeleteAbout
          isOpen={deleteAboutModal}
          onClose={() => setDeleteAboutModal(false)}
          aboutData={deleteAbout}
          updateAboutData={updateAboutData}
        />
      )}
    </div>
  );
};

export default About;
