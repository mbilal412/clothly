import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/register";
import Login from "../features/auth/pages/login"
import AddProduct from "../features/products/pages/AddProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AddProduct />,
    },
    {
        path: "/add-product",
        element: <AddProduct />,
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router