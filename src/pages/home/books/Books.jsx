import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";
import BooksNavbar from "../../../components/booksNavbar/BooksNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";


const API_URL = "https://library-mangement-backend.onrender.com/api/Books/getbooks";
const baseUrl = 'https://library-mangement-backend.onrender.com';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [memberId, setMemberId] = useState(null);
    
    


    const location = useLocation();
 

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetched books:", response?.data);
            setBooks(response.data);
        } catch (err) {
            setError("Failed to load books.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchBooks();
        
    }, []); // Ensure `useEffect` runs when `token` changes


    if (loading){
        <p>Loading...</p>;
    }    
    if (error){
      <p>{error}</p>;
    }

    const token = localStorage.getItem("token"); // Get token from local storage (or state)
   
       //const token = localStorage.getItem('token');
    //    const decodedToken = jwtDecode(token);
    //    console.log(token);
    //    //console.log(token.UserId);
    //    console.log(decodedToken);
    //   console.log(decodedToken.UserId);

    const handleBorrowBook = async (e, bookId) => { 
    e.preventDefault();
    console.log(bookId);
    setLoading(true);

    if (!token) {
        console.error("No authentication token found.");
        setMessage("User not authenticated.");
        setLoading(false);
        return;
    }

    try {
        let userId = null;

        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken?.UserId; // Extract userId directly
            console.log("UserId:", userId);
        } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setMessage("Invalid token.");
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // Use query parameters instead of body
        const response = await axios.post(
            `${baseUrl}/api/Borrowing?userId=${userId}&bookId=${bookId}`, 
            null, // No request body needed
            config // Headers
        );

        setMessage("Book borrowed successfully!");
        console.log("Borrow response:", response.data);
        toast.success("Book borrowed successfully!");
    } catch (error) {
        setMessage("Failed to borrow book.");
        console.error("Borrowing error:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                                image={book.bookImage || "default_image_url"}
                                title={book.title}
                                description={book.description}
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
                                <div className="flex justify-between">
                                <Button
                                    variant="contained"
                                    
                                    className="btn btn-[#ab7933] text-white"
                                    href={`/books/${book.id}`}
                                >
                                    View Details
                                </Button>
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    className="btn btn-[#ab7933] text-white"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button>
                                </div>
                                
{/* 
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BooksPage;