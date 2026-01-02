import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/auth/app/dashboard";

import { AppLayout } from "./pages/auth/_layouts/app";
import { AuthLayout } from "./pages/auth/_layouts/auth";
import { SignIn } from "./pages/auth/app/auth/sign-in";
import { SignUp } from "./pages/auth/app/auth/sign-up";
import { Orders } from "./pages/auth/app/orders/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },

      { path: "/orders", element: <Orders /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);
