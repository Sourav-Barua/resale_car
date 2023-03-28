import DashBoardLayout from "../Layout/DashBoardLayout";
import Blogs from "../Pages/Blogs/Blogs";
import Category from "../Pages/Category/Category";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import Allbuyer from "../Pages/DashBoard/Allbuyer/Allbuyer";
import Allseller from "../Pages/DashBoard/Allseller/Allseller";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import Payment from "../Pages/DashBoard/Payment/Payment";
import ReportedItem from "../Pages/DashBoard/ReportedItam/ReportedItem";
import Home from "../Pages/Home/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignIn/SignUp";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "signIn",
                element: <SignIn></SignIn>
            },
            {
                path: "blog",
                element: <Blogs></Blogs>
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "home",
                element: <Home></Home>
            },
            {
                path: "category/:category",
                element: <Category></Category>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.category}`)
            },

        ]
    },
    {
        path: "/dashBoard",
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [

            {
                path: "add-product",
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: "my-product",
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: "my-orders",
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: "all-buyer",
                element: <AdminRoute><Allbuyer></Allbuyer></AdminRoute>
            },
            {
                path: "payment/:id",
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/payment/${params.id}`)

            },
            {
                path: "all-seller",
                element: <AdminRoute><Allseller></Allseller></AdminRoute>
            },
            {
                path: "reported-items",
                element: <AdminRoute><ReportedItem></ReportedItem></AdminRoute>
            },

        ]
    }
])