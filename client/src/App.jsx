import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CreateProfilePage from './pages/create-profile/Profile';
import MatchedJobsPage from './pages/matched-jobs/Jobs';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import useAuthStore from './actions/store';

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
      element: <MatchedJobsPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
