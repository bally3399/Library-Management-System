// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { Button } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";


// const BorrowedBooks = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [memberId, setMemberId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [ratingValue, setRatingValue] = useState(5);
//   const [comment, setComment] = useState("I love the book");


//   const baseUrl = "http://api.fortunaelibrary-api.com"
//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     if (!token) {
//       console.error("No token found!")
//       setError("Unauthorized: No token provided.")
//       setLoading(false)
//       return
//     }

//     try {
//       const decodedToken = jwtDecode(token)
//       setMemberId(decodedToken.UserId)
//     } catch (error) {
//       console.error("Invalid token:", error)
//       setError("Unauthorized: Invalid token.")
//       setLoading(false)
//       return
//     }
//   }, [token])

//   useEffect(() => {
//     if (!memberId) return

//     const fetchBorrowedBooks = async () => {
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//         }

//         const response = await axios.get(`${baseUrl}/api/Borrowing/borrowedBooks?userId=${memberId}`, config)
//         setBorrowedBooks(response.data)
//       } catch (err) {
//         console.error("Error fetching books:", err.response?.data || err.message)
//         setError(err.response?.data?.message || "Failed to fetch borrowed books.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBorrowedBooks()
//   }, [memberId, token]) // Added token to dependencies


//   const handleReturnBook = async (e, bookId, borrowingId) => { 
//     e.preventDefault();
//     console.log(bookId);
//     setLoading(true);

//     if (!token) {
//         console.error("No authentication token found.");
//         setMessage("User not authenticated.");
//         setLoading(false);
//         return;
//     }

//     try {
//         let userId = null;

//         try {
//             const decodedToken = jwtDecode(token);
//             userId = decodedToken?.UserId; // Extract userId directly
//             console.log("UserId:", userId);
//         } catch (decodeError) {
//             console.error("Error decoding token:", decodeError);
//             setMessage("Invalid token.");
//             setLoading(false);
//             return;
//         }

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         };

//         // Use query parameters instead of body
//         const response = await axios.put(
//             `${baseUrl}/api/Borrowing/${memberId}/return?borrowingId=${borrowingId}`, 
//             { 
//                 "ratingValue": `${ratingValue}`,
//                 "comment": `${comment}`
//             }, // No request body needed
//             config // Headers
//         );

//         setMessage("Book returned successfully!");
//         console.log("Returned response:", response.data);
//         toast.success("Book Returned successfully!");
//     } catch (error) {
//         setMessage("Failed to return book.");
//         console.error("Returning error:", error.response?.data || error.message);
//     } finally {
//         setLoading(false);
//     }
// };


//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     )

//   if (error)
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm my-4">
//         <p className="font-medium">Error</p>
//         <p>{error}</p>
//       </div>
//     )

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Borrowed Books</h1>

//       {borrowedBooks.length === 0 ? (
//         <div className="text-center py-10 bg-gray-50 rounded-lg">
//           <p className="text-gray-600">You don't have any borrowed books at the moment.</p>
//         </div>
//       ) : (
//         <ul className="flex  gap-6">
//           {borrowedBooks.map((book) => (
//             <li
//               key={book.id}
//               className="bg-white w-1/2 border border-red-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
//             >
//               <div className="relative w-10 h-10 overflow-hidden">
//                 <img
//                   src="/jefffinleyunsplash.jpg"
//                   alt={`Cover of ${book.bookTitle}`}
//                   className="w-10 h-10 object-cover"
//                 />
//               </div>
//               <div className="p-5">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{book.bookTitle}</h2>

//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <span className="font-medium mr-2">Borrowed:</span>
//                     {new Date(book.borrowedAt).toLocaleDateString()}
//                   </p>
//                   <p className="flex items-center">
//                     <span className="font-medium mr-2">Return by:</span>
//                     {new Date(book.expectedReturnDate).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div className="mt-4">
//                   {book.isOverdue ? (
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
//                       Overdue ❌
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                       On Time ✅
//                     </span>
//                   )}
//                 </div>
//                 <Button onClick={(e) => handleReturnBook(e, book.bookId, book.id)}>Return book</Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       <ToastContainer  />
//     </div>
//   )
// }

// export default BorrowedBooks



"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button, Modal, Box, Typography, TextField, MenuItem } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState("");

  const baseUrl = "http://api.fortunaelibrary.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found!");
      setError("Unauthorized: No token provided.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setMemberId(decodedToken.UserId);
    } catch (error) {
      console.error("Invalid token:", error);
      setError("Unauthorized: Invalid token.");
      setLoading(false);
      return;
    }
  }, [token]);

  useEffect(() => {
    if (!memberId) return;

    const fetchBorrowedBooks = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          `${baseUrl}/api/Borrowing/borrowedBooks?userId=${memberId}`,
          config
        );
        setBorrowedBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch borrowed books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [memberId, token]);

  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRatingValue(5);
    setComment("");
  };

  const handleReturnBook = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;
    setLoading(true);

    if (!token) {
      console.error("No authentication token found.");
      toast.error("User not authenticated.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `${baseUrl}/api/Borrowing/${memberId}/return?borrowingId=${selectedBook.id}`,
        { ratingValue, comment },
        config
      );

      toast.success("Book returned successfully!");
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
      closeModal();
    } catch (error) {
      toast.error("Failed to return book.");
      console.error("Returning error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm my-4">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Borrowed Books</h1>

      {borrowedBooks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You don't have any borrowed books at the moment.</p>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <li
              key={book.id}
              className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-5"
            >
              <img
                src="/jefffinleyunsplash.jpg"
                alt={`Cover of ${book.bookTitle}`}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-3 line-clamp-2">
                {book.bookTitle}
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Borrowed:</span>{" "}
                  {new Date(book.borrowedAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Return by:</span>{" "}
                  {new Date(book.expectedReturnDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4">
                {book.isOverdue ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Overdue ❌
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    On Time ✅
                  </span>
                )}
              </div>
              <Button variant="contained" color="primary" onClick={() => openModal(book)} className="mt-3">
                Return book
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for rating and comment input */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          sx={{ outline: "none" }}
        >
          <Typography variant="h6">Rate and Review</Typography>
          <TextField
            select
            fullWidth
            label="Rating"
            value={ratingValue}
            onChange={(e) => setRatingValue(Number(e.target.value))}
            className="mt-3"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Comment"
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-3"
          />
          <Button variant="contained" color="primary" onClick={(e) => handleReturnBook(e)}  className="mt-4">
            Submit
          </Button>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default BorrowedBooks;
