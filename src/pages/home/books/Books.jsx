"use strict";

import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import BooksNavbar from "../../../components/booksNavbar/BooksNavbar";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://fortunaeapi-dev.eba-7p6g3tc2.us-east-1.elasticbeanstalk.com/api/Books/getbooks";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [memberId, setMemberId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/Books/getbooks?pageNumber=1&pageSize=10`);
            console.log("Fetched books:", response?.data);
            setBooks(response.data);
        } catch (err) {
            setError("Failed to load books.");
        } finally {
            setLoading(false);
        }
    };

    const token = localStorage.getItem("token"); 
   
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
            userId = decodedToken?.UserId; 
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

        const response = await axios.post(
            `${API_URL}/Borrowing?userId=${userId}&bookId=${bookId}`, 
            null, 
            config 
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
  
    }, [location]); 

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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={`/books/${book.id}`}
                                >
                                    View Details
                                </Button>
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button>
{/* 
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button> */}



                                <Typography className={styles.bookDescription}>
                                    {book.description}
                                </Typography>
                                <div className={styles.submitButtonWrapper}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={styles.submitButton}
                                        onClick={() => navigate("/BorrowBook")}
                                    >
                                        Borrow Book
                                    </Button>
                                </div>
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
