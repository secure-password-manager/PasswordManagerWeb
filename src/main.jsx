import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routers/Home.jsx";
import ErrorPage from "./routers/ErrorPage.jsx";
import AccountManagerPage from "./routers/AccountManagerPage.jsx";
import AccountPage from "./routers/AccountPage.jsx";
import CollectionsPage from "./routers/CollectionsPage.jsx";
import VaultItemPage from "./routers/VaultItemPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login-signup/",
    element: <AccountManagerPage />,
  },
  {
    path: "account/",
    element: <AccountPage />,
    children: [
      {
        path: "collections/:collectionsId",
        element: <CollectionsPage />,
        children: [{ path: "vaultItem/:vaultId", element: <VaultItemPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
