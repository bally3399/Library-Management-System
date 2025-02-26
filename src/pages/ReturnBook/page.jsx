import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
//import { jwtDecode } from 'jwt-decode';

const ReturnBookPage = () => {
    const [bookId, setBookId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [memberId, setMemberId] = useState('');
    const [borrowingId, setBorrowingId] = useState('');
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState('');
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get member ID from JWT token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Set the member ID from the token
                setMemberId(decodedToken.memberId || decodedToken.userId || decodedToken.sub);
                
                // If email is in the token, set it
                if (decodedToken.email) {
                    setUserEmail(decodedToken.email);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    // Fetch active borrowings when memberId is available
    useEffect(() => {
        if (memberId) {
            fetchBorrowedBooks();
        }
    }, [memberId]);

    const fetchBorrowedBooks = async () => {
        if (!memberId) return;
        
        setLoading(true);
        const base_url ='http://fortunaeapi-dev.eba-7p6g3tc2.us-east-1.elasticbeanstalk.com/';
        
        try {
            // Using the correct borrowedBooks endpoint with userId parameter
            const response = await fetch(`${base_url}/api/Borrowing/borrowedBooks?userId=${memberId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // Filter only active borrowings (books that haven't been returned yet)
                const activeBorrowings = data.filter(b => !b.returnDate);
                setBorrowings(activeBorrowings);
                
                // If a book ID is already entered, try to match it
                if (bookId) {
                    const matchingBorrowings = activeBorrowings.filter(b => 
                        (b.bookName && b.bookName.toLowerCase().includes(bookId.toLowerCase())) || 
                        b.bookId === bookId
                    );
                    
                    if (matchingBorrowings.length === 1) {
                        setBorrowingId(matchingBorrowings[0].borrowingId);
                    }
                }
            } else {
                console.error("Failed to fetch borrowed books");
            }
        } catch (error) {
            console.error("Error fetching borrowed books:", error);
        } finally {
            setLoading(false);
        }
    };

    // Alternative method using the /active endpoint (if needed)
    const fetchActiveBorrowings = async () => {
        if (!memberId) return;
        
        setLoading(true);
        const base_url = import.meta.env.VITE_API_BASE_URL || '';
        
        try {
            // Using the /active endpoint without parameters
            const response = await fetch(`${base_url}/api/Borrowing/active`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // Filter borrowings for the current user
                const userBorrowings = data.filter(b => b.memberId === memberId || b.userId === memberId);
                setBorrowings(userBorrowings);
                
                // If a book is specified, try to find it
                if (bookId) {
                    const matchingBorrowings = userBorrowings.filter(b => 
                        (b.bookName && b.bookName.toLowerCase().includes(bookId.toLowerCase())) || 
                        b.bookId === bookId
                    );
                    
                    if (matchingBorrowings.length === 1) {
                        setBorrowingId(matchingBorrowings[0].borrowingId);
                    }
                }
            } else {
                console.error("Failed to fetch active borrowings");
            }
        } catch (error) {
            console.error("Error fetching active borrowings:", error);
        } finally {
            setLoading(false);
        }
    };

    // When book name changes, filter the borrowings list
    useEffect(() => {
        if (bookId && borrowings.length > 0) {
            const matchingBorrowings = borrowings.filter(b => 
                (b.bookName && b.bookName.toLowerCase().includes(bookId.toLowerCase())) || 
                b.bookId === bookId
            );
            
            if (matchingBorrowings.length === 1) {
                setBorrowingId(matchingBorrowings[0].borrowingId);
            } else {
                setBorrowingId('');
            }
        }
    }, [bookId, borrowings]);

    const handleReturnBook = async (e) => { 
        e.preventDefault();
        
        if (!memberId) {
            alert("Unable to identify member. Please login again.");
            return;
        }
        
        if (!borrowingId) {
            alert("Please select a valid borrowing record to return");
            return;
        }
    
        console.log('Member ID:', memberId);
        console.log('Borrowing ID:', borrowingId);
        console.log('Comments:', comments);
        console.log("Rating Value:", rating);
    
        const base_url = import.meta.env.VITE_API_BASE_URL || '';

        try {
            // Using the correct URL format as specified in the API
            const response = await fetch(`${base_url}/api/Borrowing/${memberId}/return?borrowingId=${borrowingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    ratingValue: rating,
                    comment: comments,
                }),
            });
    
            if (response.ok) {
                alert('Book returned successfully');
                // Reset form fields
                setBookId('');
                setBorrowingId('');
                setComments('');
                setRating('');
                // Refresh the borrowings list
                fetchBorrowedBooks();
            } else {
                const errorData = await response.json();
                alert(`Failed to return book: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error returning book:", error);
            alert("An error occurred while returning the book.");
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Return Book</h1>
            {loading ? (
                <p>Loading your borrowed books...</p>
            ) : (
                <form onSubmit={handleReturnBook} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <div className="mb-4">
                        <label htmlFor="bookId" className="block text-gray-700 font-bold mb-2">Book Name/ID:</label>
                        <input
                            type="text"
                            id="bookId"
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            placeholder="Enter book name or ID"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    
                    {borrowings.length > 0 ? (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Select Borrowing:</label>
                            <select 
                                value={borrowingId}
                                onChange={(e) => setBorrowingId(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            >
                                <option value="">Select a borrowing record</option>
                                {borrowings
                                    .filter(b => !bookId || 
                                        (b.bookName && b.bookName.toLowerCase().includes(bookId.toLowerCase())) || 
                                        b.bookId === bookId
                                    )
                                    .map(b => (
                                        <option key={b.borrowingId} value={b.borrowingId}>
                                            {b.bookName || b.bookId} - Borrowed on {new Date(b.borrowDate).toLocaleDateString()}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    ) : (
                        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded">
                            {memberId ? "You don't have any active borrowings" : "Please log in to see your borrowings"}
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating (0-5):</label>
                        <input
                            type="number"
                            id="rating"
                            min="0"
                            max="5"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">Comments/Recommendations:</label>
                        <textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            rows="4"
                        ></textarea>
                    </div>
                    
                    <button 
                        style={{ background: "#a47a47"}} 
                        type="submit" 
                        className="w-full cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                        
                    >
                        Return Book
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReturnBookPage;
