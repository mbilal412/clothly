import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>hello</>,
    },
    {
        path: "/register",
        element: <Register />
    }
])

export default router