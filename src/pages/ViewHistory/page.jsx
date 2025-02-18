import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewHistory = ({ memberId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`/api/members/${memberId}/history`);
                setHistory(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [memberId]);

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Borrowing History</h1>
            {history.length === 0 ? (
                <p className="text-gray-500">No borrowing history found for this member.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((record) => (
                        <li key={record.id} className="p-4 border rounded-lg shadow-md">
                            <p className="font-semibold">Book Title: <span className="font-normal">{record.bookTitle}</span></p>
                            <p className="font-semibold">Borrowed On: <span className="font-normal">{new Date(record.borrowedOn).toLocaleDateString()}</span></p>
                            <p className="font-semibold">Returned On: <span className="font-normal">{record.returnedOn ? new Date(record.returnedOn).toLocaleDateString() : 'Not returned yet'}</span></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewHistory;