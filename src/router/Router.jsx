import Layout from "../components/layout/Layout";
import GetStarted from "../pages/home/getStarted/GetStarted";
import Login from "../pages/home/login/Login";
import Logout from "../pages/home/logout/Logout";
import Dashboard from "../pages/home/dashboard/Dashboard";

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








]