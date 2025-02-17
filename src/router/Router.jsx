import Layout from "../components/layout/Layout";
import GetStarted from "../pages/home/getStarted/GetStarted";
import Login from "../pages/home/login/Login";

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





]