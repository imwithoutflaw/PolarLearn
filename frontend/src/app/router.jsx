import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import MaskPage from "../pages/MaskPage.jsx";
import EncoderPage from "../pages/EncoderPage.jsx";
import DecoderPage from "../pages/DecoderPage.jsx";
import BerPage from "../pages/BerPage.jsx";
import PolarizationPage from "../pages/PolarizationPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/HomePage",
    element: <HomePage />,
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
  {
    path: "/polarization",
    element: <PolarizationPage />,
  },
]);