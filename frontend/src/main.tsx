import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import CreateNote from "./pages/CreateNote.tsx";
import DashboardContent from "./components/dashboard/DashboardContent.tsx";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import LandingContent from "./components/landing/LandingContent.tsx";
import About from "./pages/About.tsx";
import Overview from "./pages/Overview.tsx";
import CreateCollection from "./pages/CreateCollection.tsx";
import Connections from "./pages/Connections.tsx";
import Profile from "./pages/Profile.tsx";
import Settings from "./pages/Settings.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "/",
          element: <LandingContent />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/overview",
          element: <Overview />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <DashboardContent />,
        },
        {
          path: "/dashboard/createnote",
          element: <CreateNote />,
        },
        {
          path: "/dashboard/createcollection",
          element: <CreateCollection />,
        },
        {
          path: "/dashboard/connections",
          element: <Connections />,
        },
      ],
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  </StrictMode>,
);
