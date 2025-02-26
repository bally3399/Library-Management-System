import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://api.fortunaelibrary-api.com/api/Auth/login",
                form,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log(response.data.token);
            if (response.status === 200) {
                toast.success(`Welcome ${form.username}, you have logged in successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            } else {
                setErrors({ username: "Invalid username or password" });
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.backButtonWrapper}>
                <button onClick={() => navigate("/register")} className={styles.backButton}>
                    <HiArrowLeft className={styles.backIcon} /> Back
                </button>
            </div>
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputField}>
                            <TextField
                                label="Username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                fullWidth
                                className={styles.formField}
                                sx={{
                                    "& label.Mui-focused": { color: "#a47a47" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "#a47a47" },
                                        "&.Mui-focused fieldset": { borderColor: "#a47a47" },

                                    },
                                    marginBottom: "16px",
                                }}
                            />
                        </div>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            className={styles.formField}
                            sx={{
                                "& label.Mui-focused": { color: "#a47a47" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "black" },
                                    "&:hover fieldset": { borderColor: "#a47a47" },
                                    "&.Mui-focused fieldset": { borderColor: "#a47a47" },

                                },
                                marginBottom: "16px",
                            }}
                        />
                        <div className={styles.submitButtonWrapper}>
                            <Button type="submit" variant="contained" fullWidth disabled={isLoading}
                                    className={styles.submitButton}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                            <div className={styles.loginRedirect}>
                                <p>
                                    Don't have an account? {" "}
                                    <span onClick={() => navigate("/register")} className={styles.loginLink}>
                                register
                            </span>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;
