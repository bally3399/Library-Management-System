import React, { useState } from 'react';

const ReturnBookPage = () => {
    const [bookId, setBookId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [comments, setComments] = useState('');

    const handleReturnBook = (e) => {
        e.preventDefault();
        // Handle the book return logic here
        console.log('Book ID:', bookId);
        console.log('Member ID:', memberId);
        console.log('Comments:', comments);
        // Reset form fields
        setBookId('');
        setMemberId('');
        setComments('');
    };

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Return Book</h1>
            <form onSubmit={handleReturnBook} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="bookId" className="block text-gray-700 font-bold mb-2">Book ID:</label>
                    <input
                        type="text"
                        id="bookId"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="memberId" className="block text-gray-700 font-bold mb-2">Member ID:</label>
                    <input
                        type="text"
                        id="memberId"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4"></div>
                    <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">Comments/Recommendations:</label>
                    <textarea
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                <button style={{ background: "#a47a47"}} type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">Return Book</button>
            </form>
                </div>
        </>
    );
};

export default ReturnBookPage;