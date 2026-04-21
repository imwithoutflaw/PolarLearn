import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DecoderPage from "../pages/DecoderPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DecoderPage />,
  },
  {
    path: "/decoder",
    element: <DecoderPage />,
  },
]);