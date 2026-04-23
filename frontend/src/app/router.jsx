import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import MaskPage from "../pages/MaskPage.jsx";
import EncoderPage from "../pages/EncoderPage.jsx";
import DecoderPage from "../pages/DecoderPage.jsx";
import BerPage from "../pages/BerPage.jsx";
import PolarizationPage from "../pages/PolarizationPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/HomePage",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mask",
    element: (
      <ProtectedRoute>
        <MaskPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/encoder",
    element: (
      <ProtectedRoute>
        <EncoderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/decoder",
    element: (
      <ProtectedRoute>
        <DecoderPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ber",
    element: (
      <ProtectedRoute>
        <BerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/polarization",
    element: (
      <ProtectedRoute>
        <PolarizationPage />
      </ProtectedRoute>
    ),
  },
]);