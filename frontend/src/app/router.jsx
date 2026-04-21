import React from "react";
import { createBrowserRouter } from "react-router-dom";
import BerPage from "../pages/BerPage.jsx";
import DecoderPage from "../pages/DecoderPage.jsx";
import EncoderPage from "../pages/EncoderPage.jsx";
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
    path: "/encoder",
    element: <EncoderPage />,
  },
  {
    path: "/decoder",
    element: <DecoderPage />,
  },
  {
    path: "/ber",
    element: <BerPage />,
  },
]);