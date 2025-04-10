import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";

const AddAbout = ({ isOpen, onClose, updateAboutData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(`${API_URL}/api/about`, formData, {
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      });

      if (response.status === 200) {
        setToastMessage("Data Added Successfully");
        setShowToast(true);
        onClose();
        updateAboutData();
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <RockModal isOpen={isOpen} onClose={handleClose}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Add Data About</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="text-base text-white font-medium"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleTitle}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.title && (
                <div className="text-white text-sm mt-1">{errors.title}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="text-base text-white font-medium"
              >
                Description
              </label>
              <textarea
                rows={5}
                name="description"
                id="description"
                value={description}
                onChange={handleDescription}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.description && (
                <div className="text-white text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
              >
                <FaPlus className="mr-1" />
                Submit
              </button>
            </div>
          </form>
        </div>
      </RockModal>
      {showToast && (
        <RockToast
          message={toastMessage}
          duration={1500}
          onClose={() => setShowToast(false)}
          position="top-left"
        />
      )}
    </>
  );
};

export default AddAbout;
