import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";
import BooksNavbar from "../../../components/booksNavbar/BooksNavbar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://library-mangement-backend.onrender.com/api/Books/getbooks";
const baseUrl = "https://library-mangement-backend.onrender.com";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const defaultBooks = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      bookImage: "/milestonehardcover.webp", // Placeholder image
      description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      bookImage: "/StudyBooks.webp",
      description: "A tale of racial injustice and the loss of innocence in a small Southern town.",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      bookImage: "/YourOwnbook.webp",
      description: "A chilling depiction of a totalitarian future where freedom is suppressed.",
    },
  ];

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched books:", response?.data);
      setBooks(response.data.length > 0 ? response.data : defaultBooks);
    } catch (err) {
      console.error("Failed to load books:", err);
      setBooks(defaultBooks);
      setError("Using default book list due to server issue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        setMessage("Session expired. Please log in again.");
      }
    }
  }, []);

  const handleBorrowBook = async (e, bookId) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      setMessage("User not authenticated.");
      toast.error("Please log in to borrow a book.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.UserId;
      if (!userId) throw new Error("User ID not found in token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseUrl}/api/Borrowing?userId=${userId}&bookId=${bookId}`,
        null,
        config
      );

      setMessage("Book borrowed successfully!");
      console.log("Borrow response:", response.data);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      setMessage("Failed to borrow book.");
      console.error("Borrowing error:", error.response?.data || error.message);
      toast.error("Failed to borrow book.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <BooksNavbar />
      <div className={styles.booksPageContainer}>
        <h2>All Books</h2>
        <div className={styles.booksList}>
          {books.map((book) => (
            <Card key={book.id} className={styles.bookCard}>
              <CardMedia
                component="img"
                alt={book.title}
                height="200"
                image={book.bookImage || "https://via.placeholder.com/150"}
                title={book.title}
                className={styles.bookImage}
              />
              <CardContent>
                <Typography className={styles.bookTitle} variant="h6">
                  {book.title}
                </Typography>
                <Typography className={styles.bookAuthor} variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body2">{book.genre}</Typography>
                  <Button
                    style={{ background: "#a47a47", margin: "5px", color: "white",  }}
                    className="btn bg-[#ab7933] text-white"
                    onClick={(e) => handleBorrowBook(e, book.id)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Borrow Book"}
                  </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {message && <p className="mt-4 text-red-600">{message}</p>}
        {error && <p className="mt-4 text-gray-500">{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksPage;