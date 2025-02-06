import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import CreateNote from "./pages/dashboard/CreateNote.tsx";
import DashboardContent from "./components/dashboard/DashboardContent.tsx";
import Landing from "./pages/landing/Landing.tsx";
import Login from "./pages/landing/Login.tsx";
import Signup from "./pages/landing/Signup.tsx";
import CreateCollection from "./pages/dashboard/CreateCollection.tsx";
import Connections from "./pages/dashboard/Connections.tsx";
import Profile from "./pages/dashboard/Profile.tsx";
import Settings from "./pages/dashboard/Settings.tsx";
import AuthProvider from "./components/auth/AuthProvider.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import Note from "./pages/dashboard/Note.tsx";
import Fallback from "./pages/Fallback.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateNote from "./pages/dashboard/UpdateNote.tsx";
import Home from "./pages/landing/Home.tsx";
import Collection from "./pages/dashboard/Collection.tsx";
import "react-tooltip/dist/react-tooltip.css";
import UpdateCollection from "./pages/dashboard/UpdateCollection.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
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
          path: "/dashboard/notes/new",
          element: <CreateNote />,
        },
        {
          path: "/dashboard/collections/new",
          element: <CreateCollection />,
        },
        {
          path: "/dashboard/connections",
          element: <Connections />,
        },
        {
          path: "/dashboard/notes/:id",
          element: <Note />,
        },
        {
          path: "/dashboard/notes/:id/update",
          element: <UpdateNote />,
        },
        {
          path: "/dashboard/collections/:id",
          element: <Collection />,
        },
        {
          path: "/dashboard/collections/:id/update",
          element: <UpdateCollection />,
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
    {
      path: "*",
      element: <Fallback />,
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

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
