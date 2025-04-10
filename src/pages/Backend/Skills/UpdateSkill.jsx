import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";

const UpdateSkill = ({ isOpen, onClose, skillData, updateSkillData }) => {
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [weblink, setLink] = useState("");
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const inputFile = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (skillData) {
      setSkill(skillData.skill);
      setDescription(skillData.description);
      setImage(skillData.image ? `${skillData.image}` : "");
      setPreviewUrl(
        skillData.image ? `${API_URL}/storage/${skillData.image}` : ""
      );
    }
  }, [skillData]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewUrl(URL.createObjectURL(selectedImage));
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("skill", skill);
    formData.append("description", description);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/skill/${skillData.id}`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        }
      );

      setToastMessage("Skill updated successfully");
      setShowToast(true);
      onClose();
      updateSkillData();
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("An error occurred");
      setShowToast(true);
    }
  };

  return (
    <>
      <RockModal isOpen={isOpen} onClose={onClose} type="solid">
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
                onChange={(e) => setSkill(e.target.value)}
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
                id="skill"
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
                onChange={handleImageChange}
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

export default UpdateSkill;
