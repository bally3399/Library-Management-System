import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ViewHistory = ({ memberId: propsMemberId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(propsMemberId || null);

    const base_url = 'https://library-mangement-backend.onrender.com';

    useEffect(() => {
        // Get user ID from JWT if not provided as prop
        if (!propsMemberId) {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserId(decodedToken.memberId || decodedToken.userId || decodedToken.sub);
                } catch (err) {
                    setError("Error decoding authentication token");
                    setLoading(false);
                    return;
                }
            } else {
                setError("Authentication token not found");
                setLoading(false);
                return;
            }
        }

        const fetchHistory = async () => {
            // Get the authentication token
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError("Authentication token not found");
                setLoading(false);
                return;
            }
        
            try {
                const response = await axios.post(`${base_url}/api/Borrowing/history`, 
                    { userId }, // Send userId in request body
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json' // Ensure JSON format
                        }
                    }
                );
                
                console.log(response);
                setHistory(response.data);
            } catch (err) {
                console.error("API Error:", err);
                setError(err.response?.data?.message || err.message || "Failed to fetch borrowing history");
            } finally {
                setLoading(false);
            }
        };
        
        if (userId || !propsMemberId) {
            fetchHistory();
        }
    }, [propsMemberId, userId, base_url]);

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error.status === 204) return <div className="text-center text-4xl mt-4 text-gray-500">No Borrowed Books Found</div>;
    if (error.status) return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Borrowing History</h1>
            {history.length === 0 ? (
                <p className="text-gray-500">No borrowing history found for this member.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((record) => (
                        <li key={record.id || record.borrowingId} className="p-4 border rounded-lg shadow-md">
                            <p className="font-semibold">Book Title: <span className="font-normal">{record.bookTitle || record.bookName}</span></p>
                            <p className="font-semibold">Borrowed On: <span className="font-normal">{new Date(record.borrowedOn || record.borrowDate).toLocaleDateString()}</span></p>
                            <p className="font-semibold">Returned On: <span className="font-normal">
                                {record.returnedOn || record.returnDate 
                                    ? new Date(record.returnedOn || record.returnDate).toLocaleDateString() 
                                    : 'Not returned yet'}
                            </span></p>
                            {record.rating && (
                                <p className="font-semibold">Rating: <span className="font-normal">{record.rating}/5</span></p>
                            )}
                            {record.comment && (
                                <p className="font-semibold">Comment: <span className="font-normal">{record.comment}</span></p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewHistory;