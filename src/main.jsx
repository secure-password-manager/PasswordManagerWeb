import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routers/Home.jsx";
import ErrorPage from "./routers/ErrorPage.jsx";
import LoginSignupPage from "./routers/LoginSignupPage.jsx";
import DashboardPage from "./routers/DashboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login-signup/",
    element: <LoginSignupPage />,
  },
  {
    path: "dashboard/",
    element: <DashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
