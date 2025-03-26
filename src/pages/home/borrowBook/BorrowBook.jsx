import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

const BorrowBookPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const base_url = 'https://library-mangement-backend.onrender.com';

  // Default fallback books data
  const defaultBooks = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      image: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      image: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${base_url}/api/getbooks?pageNumber=1&pageSize=10`);
        setBooks(response.data.length > 0 ? response.data : defaultBooks); // Use API data or fallback
      } catch (err) {
        console.error("Failed to load books:", err);
        setBooks(defaultBooks); // Fallback to default books on error
        setError("Using default book list due to server issue.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    // Decode token to get memberId
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setMemberId(decoded.memberId || ''); // Ensure memberId exists in token
      } catch (error) {
        console.error('Invalid token:', error);
        setMessage('Session expired. Please log in again.');
      }
    } else {
      setMessage('User not authenticated.');
    }
  }, []);

  const handleBorrowBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add your borrow book logic here (e.g., POST request to API)
      console.log("Borrowing book with:", { memberId, bookId, borrowDate, returnDate });
      setMessage("Book borrowed successfully!");
    } catch (error) {
      setMessage("Failed to borrow book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={book.title}
                height="200"
                image={book.image || "https://via.placeholder.com/150"}
                title={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2">{book.genre}</Typography>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/borrow/${book.id}`)}
                  >
                    Borrow Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 mt-8">Borrow Book</h1>
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
      {error && <p className="mt-4 text-gray-500">{error}</p>} {/* Optional: Show fallback notice */}
    </div>
  );
};

export default BorrowBookPage;