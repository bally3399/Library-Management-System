import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userId } = useParams();

    const baseUrl = 'http://api.fortunaelibrary-api.com';

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/Borrowing/borrowedBooks?userId=${userId}`);
                setBorrowedBooks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBorrowedBooks();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Borrowed Books</h1>
            <ul>
                {borrowedBooks.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowedBooks;