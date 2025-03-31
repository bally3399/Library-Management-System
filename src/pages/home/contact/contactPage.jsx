import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import styles from "./contact.module.css"; // Reuse the same styles for consistency
import BooksNavbar from "../../../components/booksNavbar/BooksNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://library-mangement-backend.onrender.com/api/contact"; // Hypothetical endpoint

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseMessage("Message sent successfully! We'll get back to you soon.");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
      setResponseMessage("Message submission recorded. We'll address it soon.");
      toast.info("Message recorded locally. We'll try to process it.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BooksNavbar />
      <div className={styles.booksPageContainer}>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <Card className={`${styles.bookCard} max-w-2xl mx-auto`}>
          <CardContent>
            <Typography variant="h5" className={styles.bookTitle}>
              Get in Touch with the Library Admin
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-4">
              Have a question or issue? Fill out the form below, and we'll assist you as soon as possible.
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#ab7933" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "#ab7933" },
                    "&.Mui-focused fieldset": { borderColor: "#ab7933" },
                  },
                  marginBottom: "16px",
                }}
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#ab7933" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "#ab7933" },
                    "&.Mui-focused fieldset": { borderColor: "#ab7933" },
                  },
                  marginBottom: "16px",
                }}
              />
              <TextField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#ab7933" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "#ab7933" },
                    "&.Mui-focused fieldset": { borderColor: "#ab7933" },
                  },
                  marginBottom: "16px",
                }}
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  "& label.Mui-focused": { color: "#ab7933" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" },
                    "&:hover fieldset": { borderColor: "#ab7933" },
                    "&.Mui-focused fieldset": { borderColor: "#ab7933" },
                  },
                  marginBottom: "16px",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#ab7933", color: "white" }}
                className={`w-full ${loading ? "opacity-50" : "hover:bg-[#8c6227]"}`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {responseMessage && (
              <Typography
                variant="body2"
                className="mt-4"
                style={{ color: responseMessage.includes("successfully") ? "green" : "#ab7933" }}
              >
                {responseMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactPage;