import { createBrowserRouter } from "react-router";
import SignPage from "../pages/auth/sign";
import ForgetPassword from "../pages/auth/forgot-password";

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/auth',
                element: <SignPage />
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />
            }
        ]
    }
])

export default router