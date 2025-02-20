import React, { useState } from 'react';

const BorrowBookPage = () => {
    const [memberId, setMemberId] = useState('');
    const [bookId, setBookId] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const handleBorrowBook = (e) => {
        e.preventDefault();
        // Logic to borrow the book
        console.log(`Member ${memberId} borrowed book ${bookId} on ${borrowDate} to return by ${returnDate}`);
        // Add your borrowing logic here
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Borrow Book</h1>
            <form onSubmit={handleBorrowBook} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Member ID:</label>
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Book ID:</label>
                    <input
                        type="text"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Borrow Date:</label>
                    <input
                        type="date"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Return Date:</label>
                    <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <button style={{ background: "#a47a47"}} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Borrow Book
                </button>
            </form>
        </div>
    );
};

export default BorrowBookPage;