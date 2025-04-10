import axios from "axios";
import React, { useEffect, useState } from "react";
import { RockModal } from "rockmodal";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import { RockToast } from "rocktoast";
import { FaPlus } from "react-icons/fa";

const UpdateAbout = ({ isOpen, onClose, aboutData, updateAboutData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (aboutData) {
      setTitle(aboutData.title);
      setDescription(aboutData.description);
    }
  }, [aboutData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `${API_URL}/api/about/${aboutData.id}`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        }
      );

      setToastMessage("About updated successfully");
      setShowToast(true);
      onClose();
      updateAboutData();
    } catch (error) {
      console.error("Error:", error);
      setToastMessage(error.response.data.error);
      setShowToast(true);
    }
  };

  return (
    <>
      <RockModal isOpen={isOpen} onClose={onClose} type="solid">
        <div className="p-4">
          <div className="text-xl font-bold mb-4 text-black">Update About</div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="text-base text-black font-medium"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.title && (
                <div className="text-red text-sm mt-1">{errors.title}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="text-base text-black font-medium"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.description && (
                <div className="text-red text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaPlus className="mr-1 mt-1" />
                Update
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
          position="top-right"
        />
      )}
    </>
  );
};

export default UpdateAbout;
