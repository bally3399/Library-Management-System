"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ViewHistory = ({ memberId: propsMemberId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(propsMemberId || null);

  const base_url = "https://library-mangement-backend.onrender.com";

  useEffect(() => {
    if (!propsMemberId) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.memberId || decodedToken.userId || decodedToken.sub);
        } catch (err) {
          console.error("Error decoding token:", err);
          setHistory([]); // Default to empty history on token error
          setLoading(false);
          return;
        }
      } else {
        console.error("No token found");
        setHistory([]); // Default to empty history if no token
        setLoading(false);
        return;
      }
    }

    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setHistory([]); // Default to empty history if no token
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${base_url}/api/Borrowing/history`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setHistory(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setHistory([]); // Default to empty history on API error
      } finally {
        setLoading(false);
      }
    };

    if (userId || !propsMemberId) {
      fetchHistory();
    }
  }, [propsMemberId, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 w-1/2 h-1/2">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
        Your Borrowing History
      </h1>

      {history.length === 0 ? (
        <div className="text-center py-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg max-w-2xl mx-auto animate-fade-in">
          <div className="relative mb-3">
            {/* <svg
              className="w-0.04 h-0.04 mx-auto text-indigo-300 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/10/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.9"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-indigo-500">
              0
            </span> */}
          </div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Your Library Adventure Awaits!
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            It looks like you haven’t borrowed any books yet. Dive into our collection and start your reading journey today!
          </p>
          <button
            onClick={() => window.location.href = "/books"} // Replace with your books page route
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Explore Books Now
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((record) => (
            <li
              key={record.id || record.borrowingId}
              className="p-5 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="space-y-2">
                <p className="text-lg font-semibold text-indigo-600">
                  {record.bookTitle || record.bookName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Borrowed:</span>{" "}
                  {new Date(record.borrowedOn || record.borrowDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Returned:</span>{" "}
                  {record.returnedOn || record.returnDate
                    ? new Date(record.returnedOn || record.returnDate).toLocaleDateString()
                    : "Not returned yet"}
                </p>
                {record.rating && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Rating:</span>{" "}
                    <span className="text-yellow-500">{record.rating}/5 ★</span>
                  </p>
                )}
                {record.comment && (
                  <p className="text-sm text-gray-600 italic">
                    <span className="font-medium">Comment:</span> "{record.comment}"
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewHistory;