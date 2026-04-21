import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MaskPage from "../pages/MaskPage.jsx";
import EncoderPage from "../pages/EncoderPage.jsx"; // 👈 ДОДАЙ ЦЕ

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
    path: "/encoder",
    element: <EncoderPage />,
  },
]);