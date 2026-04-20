import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DecoderPage from "../pages/DecoderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/decoder",
    element: <DecoderPage />,
  },
]);