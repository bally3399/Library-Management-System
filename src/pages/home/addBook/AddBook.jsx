import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import styles from "./AddBook.module.css";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const API_URL = "https://library-mangement-backend.onrender.com";

    const AddBook = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        image: null,
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const fileInputRef = React.createRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...bookData, image: e.target.files[0] });
    };

    const inputStyles = {
        "& label.Mui-focused": { color: "#a47a47" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "#a47a47" },
            "&.Mui-focused fieldset": { borderColor: "#a47a47" },
        },
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage("");

            const token = localStorage.getItem("token");
            console.log(token)
            if (!token) {
                setMessage("Unauthorized: No token found.");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken)
                if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "Admin") {
                    setMessage("Unauthorized: Only admins can add books.");
                    return;
                }
            } catch (error) {
                setMessage("Invalid token.");
                return;
            }

            const formData = new FormData();
            formData.append("title", bookData.title);
            formData.append("author", bookData.author);
            formData.append("genre", bookData.genre);
            formData.append("description", bookData.description);
            formData.append("isbn", bookData.isbn);
            formData.append("image", bookData.image);

            try {
                const response = await axios.post(
                    `${API_URL}/api/Books/AddBook`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                            Accept: "*/*",
                        },
                    }
                );
                console.log("Book added:", response.data);
                setMessage("Book added successfully!");

                setBookData({
                    title: "",
                    author: "",
                    genre: "",
                    description: "",
                    isbn: "",
                    image: null,
                });

                navigate("/books");
            } catch (error) {
                setMessage("Failed to add book. Try again.");
            }
        };
    return (
        <div className={styles.addBookContainer}>
            <h2>Add a New Book</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Author"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Genre"
                    name="genre"
                    value={bookData.genre}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="ISBN"
                    name="isbn"
                    value={bookData.isbn}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className={styles.fileInput}
                    ref={fileInputRef}
                />
                <div className={styles.submitButtonWrapper}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                        fullWidth
                    >
                        Add Book
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
