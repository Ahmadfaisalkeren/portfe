import axios from "axios";
import React, { useRef, useState } from "react";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import { FaPlus } from "react-icons/fa";

const AddSkill = ({ onClose, isOpen, updateSkillData }) => {
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const inputFile = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSkill = (e) => {
    setSkill(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("skill", skill);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_URL}/api/skill`, formData, {
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      });

      if (response.status === 200) {
        setToastMessage("Skill added successfully");
        setShowToast(true);
        onClose();
        updateSkillData();
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
    setSkill("");
    setDescription("");
    setImage(null);
    setPreviewUrl("");
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <RockModal onClose={handleClose} isOpen={isOpen} type="solid">
        <div className="p-4">
          <div className="text-xl font-bold mb-4 text-black">Add Skill</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="skill"
                className="text-base text-black font-medium"
              >
                Skill
              </label>
              <input
                type="text"
                id="skill"
                name="skill"
                value={skill}
                onChange={handleSkill}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.skill && (
                <div className="text-red text-sm mt-1">{errors.skill}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="text-base text-black font-medium"
              >
                Description
              </label>
              <textarea
                rows={5}
                id="description"
                name="description"
                value={description}
                onChange={handleDescription}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.description && (
                <div className="text-red text-sm mt-1">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="text-base text-black font-medium"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImage}
                ref={inputFile}
                className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100 mt-1"
              />
              {errors.image && (
                <div className="text-red text-sm mt-1">{errors.image}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="imagePreview"
                className="text-base text-white font-medium"
              >
                Image Preview
              </label>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  className="mt-2 flex"
                  width="150px"
                />
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaPlus className="mr-1 mt-1" />
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
          position="top-right"
        />
      )}
    </>
  );
};

export default AddSkill;
