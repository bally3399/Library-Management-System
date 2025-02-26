
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Install using: npm install jwt-decode
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';    
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
//import styles from "../../home/books/Books.module.css";

const BorrowBookPage = () => {
     const [books, setBooks] = useState([]);
   //const [loading, setLoading] = useState(true);
       const [error, setError] = useState("");
       const navigate = useNavigate();
       
     const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [memberId, setMemberId] = useState('');
    //const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { bookId } = useParams();

    const base_url = 'http://api.fortunaelibrary-api.com';

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${base_url}/api/getbooks?pageNumber=1&pageSize=10`);
                setBooks(response.data);
            } catch (err) {
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;



    // Function to get memberId and bookId from the token

        // const token = localStorage.getItem('token'); // Retrieve token from local storage

        // if (token) {
        //     try {
        //         const decoded = jwtDecode(token); // Decode the token
        //         setMemberId(decoded.memberId); // Assuming memberId exists in token
        //      //   setBookId(decoded.bookId); // Assuming bookId exists in token
        //     } catch (error) {
        //         console.error('Invalid token:', error);
        //         setMessage('Session expired. Please log in again.');
        //     }
        // } else {
        //     setMessage('User not authenticated.');
        // }
    }, []);

    
    const handleBorrowBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
        console.log("nothing")
        } catch (error) {
            setMessage("Failed to borrow book.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
           <h2>All Books</h2>
                <div>
                    {books.map((book) => (
                        <Card key={book.id}>
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="200"
                                image={book.image || "default_image_url"}
                                title={book.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{book.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {book.author}
                                </Typography>
                                <Typography variant="body2">{book.genre}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={`/books/${book.id}`}
                                >
                                    View Details
                                </Button>
                                <Button
                                   onClick={navigate(`/borrow/${book.id}`)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
            <h1 className="text-3xl font-bold mb-8">Borrow Book</h1>
            <form onSubmit={handleBorrowBook} className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
                <button
                    type="submit"
                    style={{ background: "#a47a47" }}
                    className={`text-white py-2 px-4 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Borrow Book'}
                </button>
            </form>
            {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
    );
};

export default BorrowBookPage;
