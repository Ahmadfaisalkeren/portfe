import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";

const UpdateCertificate = ({
  isOpen,
  onClose,
  certificateData,
  updateCertificateData,
}) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const inputFile = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (certificateData) {
      setTitle(certificateData.title);
      setYear(certificateData.year);
      setImage(certificateData.image ? `${certificateData.image}` : "");
      setPreviewUrl(certificateData.image ? `${API_URL}/storage/${certificateData.image}` : "");
    }
  }, [certificateData]);

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
    formData.append("title", title);
    formData.append("year", year);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/certificate/${certificateData.id}`,
        formData,
        {
          headers: {
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        }
      );

      setToastMessage("Certificate updated successfully");
      setShowToast(true);
      onClose();
      updateCertificateData();
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
          <div className="text-xl font-bold mb-4 text-black">
            Update Certificate
          </div>
          <form onSubmit={handleSubmit}>
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
                htmlFor="year"
                className="text-base text-black font-medium"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1 px-3 py-2 border rounded-md w-full"
              />
              {errors.year && (
                <div className="text-red text-sm mt-1">{errors.year}</div>
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

export default UpdateCertificate;
