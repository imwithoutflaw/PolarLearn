import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DecoderPage from "../pages/DecoderPage.jsx";
import MaskPage from "../pages/MaskPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MaskPage />,
  },
  {
    path: "/mask",
    element: <MaskPage />,
  },
  {
    path: "/decoder",
    element: <DecoderPage />,
  },
]);