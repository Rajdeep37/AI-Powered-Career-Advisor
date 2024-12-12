import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CreateProfilePage from './pages/create-profile/Profile';
import MatchedJobsPage from './pages/matched-jobs/Jobs';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
       path: "/create-profile",
       element: <CreateProfilePage />,
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
