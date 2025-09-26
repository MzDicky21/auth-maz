import SignPage from "../pages/auth/sign";
import ForgetPassword from "../pages/auth/forgot-password";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignPage />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    }
])

export default router