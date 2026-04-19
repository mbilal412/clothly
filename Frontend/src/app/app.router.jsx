import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/register";
import Login from "../features/auth/pages/login"
import AddProduct from "../features/products/pages/AddProduct";
import Dashboard from "../features/products/pages/Dashboard";
import ViewProduct from "../features/products/pages/ViewProduct";
import Protected from "../features/auth/components/Protected";
import DetailProduct from "../features/products/pages/detailProduct";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/add-product",
        element: <Protected role="seller"><AddProduct /></Protected>,
    },
    {
        path: "/view-products",
        element: <Protected role="seller"><ViewProduct /></Protected>,
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/product/:id",
        element: <DetailProduct />,
    }
])

export default router