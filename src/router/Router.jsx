import Layout from "../components/layout/Layout";
import GetStarted from "../pages/home/getStarted/GetStarted";
import Login from "../pages/home/login/Login";
import Logout from "../pages/home/logout/Logout";
import Dashboard from "../pages/home/dashboard/Dashboard";
import UpdateProfile from "../pages/UpdateProfile/page";
import BorrowBookPage from "../pages/borrowBook/BorrowBook";
import ReturnBookPage from "../pages/ReturnBook/page";
import ViewHistory from "../pages/ViewHistory/page";
import AddBook from "../pages/home/addBook/AddBook";
import BookPage from "../pages/home/books/Books";


export const ROUTE =[
    {
        path: "/",
        element:<Layout/>,

    },

    {
        path: "/register",
        element:<GetStarted/>,

    },

    {
        path: "/login",
        element:<Login/>,

    },

    {
        path: "/logout",
        element:<Logout/>,

    },

    {
        path: "/dashboard",
        element:<Dashboard/>,
    },

    {
        path: "/addBook",
        element:<AddBook/>,
    },

    {
         path: "/borrowBook",
         element:<BorrowBookPage/>,
    },

    {
         path: "/returnBook",
         element:<ReturnBookPage/>,
    },

    {
       path: "/updateProfile",
         element:<UpdateProfile/>,
    },

    {
        path: "/viewHistory",
        element:<ViewHistory/>,
    },

    {
        path: "/books",
        element:<BookPage/>,
    },

    // {
    //     path: "/books/:bookId",
    //     element: <BookDetailsPage />
    // }






]