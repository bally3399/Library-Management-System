import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const ReturnBookPage = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [memberId, setMemberId] = useState(null);


    console.log(memberId);
    const token = localStorage.getItem('token');
    console.log(token);
    useEffect(() => {

               if (token) {
                try {
                    // Decode the JWT to get user info including email
                    const decodedToken = jwtDecode(token);
                    // Assuming your JWT contains userId/memberId claim
                    setMemberId(decodedToken.UserId)
                    console.log(decodedToken);
                    console.log(decodedToken.UserId)
                }catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
            console.log(memberId)
        fetchBorrowedBooks();
    }, []);

    const baseUrl = "http://api.fortunaelibrary-api.com";

    const fetchBorrowedBooks = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Borrowing/borrowedBooks?userId=${memberId}`); // Update with your API endpoint
            setBorrowedBooks(response.data);
        } catch (err) {
            setError('Failed to fetch borrowed books');
        } finally {
            setLoading(false);
        }
    };

    const returnBook = async (bookId) => {
        try {
            await axios.post(`/api/return-book/${bookId}`);
            setBorrowedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (err) {
            alert('Failed to return the book. Please try again.');
        }
    };

    if (loading) return <p>Loading borrowed books...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Return Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
                <p>No books to return.</p>
            ) : (
                <ul>
                    {borrowedBooks.map(book => (
                        <li key={book.id}>
                            {book.title} by {book.author} 
                            <button onClick={() => returnBook(book.id)}>Return</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReturnBookPage;
