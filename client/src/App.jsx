import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfilePage from "./pages/create-profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useEffect } from "react";
import useAuthStore from "./zustand/authStore";
import Jobs from "./pages/matched-jobs/Jobs";
import Courses from "./pages/courses/Courses";

function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create-profile",
      element: (
        <ProtectedRoute>
          <CreateProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/matched-jobs",
      element: (
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/matched-courses",
      element: (
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      ),
    },
    {
      path: "/resume",
      element: (
        <ProtectedRoute>
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
