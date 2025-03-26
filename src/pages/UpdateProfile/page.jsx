"use client";

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    profileSummary: "",
  });
  const [memberId, setMemberId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setMemberId(decodedToken.UserId);
        // Optionally pre-fill form data if available in token or from an API call
        if (decodedToken.name || decodedToken.email) {
          setFormData((prev) => ({
            ...prev,
            name: decodedToken.name || "",
            // Add other fields if available in token
          }));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token detected.");
      }
    }
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "dateOfBirth") {
      const date = new Date(value);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setFormData((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const base_url = "https://library-mangement-backend.onrender.com";

    try {
      const response = await fetch(`${base_url}/api/Auth/update-profile?userId=${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        // Optionally reset form fields if desired
        // setFormData({ name: "", dateOfBirth: "", profileSummary: "" });
      } else {
        const errorData = await response.json();
        toast.warn(`Profile update might have encountered an issue: ${errorData.message}. It will be resolved soon.`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.info("We're having trouble updating your profile right now. Don't worry, we'll resolve it shortly!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47a47]"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-1">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47a47]"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="profileSummary" className="block text-gray-700 font-medium mb-1">
            Profile Summary:
          </label>
          <textarea
            id="profileSummary"
            name="profileSummary"
            value={formData.profileSummary}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a47a47] resize-y"
            rows={4}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          style={{ background: "#a47a47" }}
          className={`w-full text-white py-2 rounded-md hover:bg-[#8c6227] transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;