import React, { useEffect, useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import { TableContainer } from "gemilangtable";
import axios from "axios";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import UpdateSkill from "./UpdateSkill";
import AddSkill from "./AddSkill";
import DeleteSkill from "./DeleteSkill";
import Loader from "../../../components/Loader/Loader";

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [updateSkillModal, setUpdateSkillModal] = useState(false);
  const [deleteSkillModal, setDeleteSkillModal] = useState(false);
  const [updateSkill, setUpdateSkill] = useState(null);
  const [deleteSkill, setDeleteSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateSkillData();
  }, []);

  const updateSkillData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/skills`);
      setSkills(response.data.skills);
    } catch (error) {
      console.error("Error Update Skill Data", error.message);
    }
    setLoading(false);
  };

  const handleEdit = (skill) => {
    setUpdateSkill(skill);
    setUpdateSkillModal(true);
  };

  const handleDelete = (skill) => {
    setDeleteSkill(skill);
    setDeleteSkillModal(true);
  };

  const columns = [
    {
      header: "No",
      accessor: "sequenceNumber",
      width: "55px",
    },
    {
      header: "Skill",
      accessor: "skill",
      width: "250px",
    },
    {
      header: "Description",
      accessor: "description",
      width: "250px",
    },
    {
      header: "Image",
      accessor: (item) => item.image,
      render: (item) => (
        <img
          src={`${API_URL}/storage/${item.image}`}
          alt="Image Not Found"
          className="w-20 h-20"
        />
      ),
      width: "150px",
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <div className="flex">
          <button
            onClick={() => handleEdit(item)}
            className="flex mr-1 px-2 py-1 rounded-md text-xs border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 duration-300"
          >
            <FaPencilAlt className="icon" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="flex px-2 py-1 rounded-md text-xs border border-red-600 text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 duration-300"
          >
            <FaTrash className="icon" />
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
            <p className="text-lg font-semibold text-sky-600">Data Skills</p>
            <button
              onClick={() => setAddSkillModal(true)}
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
              data={skills}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
      <AddSkill
        isOpen={addSkillModal}
        onClose={() => setAddSkillModal(false)}
        updateSkillData={updateSkillData}
      />
      {updateSkill && (
        <UpdateSkill
          isOpen={updateSkillModal}
          onClose={() => setUpdateSkillModal(false)}
          skillData={updateSkill}
          updateSkillData={updateSkillData}
        />
      )}
      {deleteSkill && (
        <DeleteSkill
          isOpen={deleteSkillModal}
          onClose={() => setDeleteSkillModal(false)}
          skillData={deleteSkill}
          updateSkillData={updateSkillData}
        />
      )}
    </div>
  );
};

export default Skill;
