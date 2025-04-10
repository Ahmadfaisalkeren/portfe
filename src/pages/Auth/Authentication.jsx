import React, { useState } from "react";
import "./Style.css";
import { useAuth } from "./AuthContext";
import Loader from "../../components/Loader/Loader";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await loginUser(formData);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container mt-10">
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold mb-4 text-sky-300 text-center">
            Login Form
          </h2>
          {error && (
            <div className="text-red-600 mb-4 text-center">{error}</div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-sky-300 hover:bg-sky-500 duration-300 text-white py-2 rounded flex justify-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
