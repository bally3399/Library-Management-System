import React, { useState } from "react";
import {TextField, Checkbox, FormControlLabel, Button, MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../getStarted/GetStarted.module.css";

const GetStarted = () => {
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profileSummary: "",
        agree: false,
        role: ""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (form.password !== form.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }
        if (!form.agree) {
            formErrors.agree = "You must agree to the terms and conditions";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const payload = {
                username: form.username,
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
                dateOfBirth: new Date(form.dateOfBirth).toISOString(),
                profileSummary: form.profileSummary,
            };

            const response = await axios.post(" http://fortunaeapi-dev.eba-7p6g3tc2.us-east-1.elasticbeanstalk.com/api/Auth/register", payload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log(response);
            if (response.data === "User registered successfully") {
                toast.success(`Welcome ${form.username}, you have signed up successfully!`);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("Sign up failed. Please try again.");
            }
        } catch (error) {
            toast.error("Sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.regContainer}>
            <div className={styles.backButton} onClick={() => navigate("/")}>
                <HiArrowLeft className="mr-2" /> Back
            </div>
            <div className={styles.regCard}>
                <h2 className={styles.regTitle}>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth
                               className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}
                    />
                    <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth
                               className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}/>
                    <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange}
                               fullWidth className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}/>
                    <TextField label="Password" name="password" type="password" value={form.password}
                               onChange={handleChange} fullWidth className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",

                    }}
                    />
                    <TextField label="Confirm Password" name="confirmPassword" type="password"
                               value={form.confirmPassword} onChange={handleChange} fullWidth
                               className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}
                    />
                    <TextField label="" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange}
                               fullWidth className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"}
                        },
                        marginBottom: "16px",

                    }}
                    />
                    <FormControl fullWidth className={styles.formField}
                          sx={{
                              "& label.Mui-focused": { color: "#a47a47" },
                              "& .MuiOutlinedInput-root": {
                                  "& fieldset": { borderColor: "black" },
                                  "&:hover fieldset": { borderColor: "#a47a47" },
                                  "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                              },
                              marginBottom: "16px",
                          }}
                    >
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={form.role}
                            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Member">Member</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="Profile Summary" name="profileSummary" value={form.profileSummary}
                               onChange={handleChange} fullWidth multiline rows={3} className={styles.formField}
                               sx={{
                                   "& label.Mui-focused": {color: "#a47a47"},
                                   "& .MuiOutlinedInput-root": {
                                       "& fieldset": {borderColor: "black"},
                                       "&:hover fieldset": {borderColor: "#a47a47"},
                                       "&.Mui-focused fieldset": {borderColor: "#a47a47"},

                                   },
                                   marginBottom: "16px",
                               }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                sx={{
                                    color: "#a47a47",
                                    "&.Mui-checked": {color: "#a47a47"}
                                }}
                            />
                        }
                        label="I agree to the terms and conditions"
                    />
                    {errors.agree && <p className={styles.errorText}>{errors.agree}</p>}

                    <Button type="submit" variant="contained" fullWidth disabled={isLoading}
                            className={styles.submitButton}>
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <div className={styles.loginRedirect}>
                        <p>
                            Already signed in?{" "}
                            <span onClick={() => navigate("/login")} className={styles.loginLink}>
                                Login
                            </span>
                        </p>
                    </div>

                </form>
                <ToastContainer position="top-right" autoClose={3000}/>
            </div>
        </div>
    );
};

export default GetStarted;
