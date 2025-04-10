import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../../components/ConfigAPI/ConfigAPI";
import { RockModal } from "rockmodal";
import { RockToast } from "rocktoast";
import { FaTrash } from "react-icons/fa";

const DeleteCertificate = ({ isOpen, onClose, certificateData, updateCertificateData }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/certificate/${certificateData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        }
      );
      setToastMessage("Certificate deleted successfully");
      setShowToast(true);
      onClose();
      updateCertificateData();
    } catch (error) {
      console.error("Error deleting Certificate:", error);
    }
  };

  return (
    <>
      <RockModal isOpen={isOpen} onClose={onClose} type="solid">
        <div className="p-4 text-center">
          <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Delete Certificate</h2>
            <p className="font-semibold">
              Are you sure you want to delete this Certificate?
            </p>
            <p className="font-light">Deleted data cannot be restored.</p>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={handleDelete}
              className="bg-black hover:bg-white hover:text-black hover:border hover:border-black flex duration-300 shadow-lg text-white px-2 py-1 rounded mr-2"
            >
              <FaTrash size={20}/>
              <span className="ml-1">Confirm Delete</span>
            </button>
          </div>
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

export default DeleteCertificate;
