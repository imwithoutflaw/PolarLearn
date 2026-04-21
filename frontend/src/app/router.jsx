import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MaskPage from "../pages/MaskPage.jsx";
import EncoderPage from "../pages/EncoderPage.jsx"; //
import DecoderPage from "../pages/DecoderPage.jsx";
import BerPage from "../pages/BerPage.jsx";

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