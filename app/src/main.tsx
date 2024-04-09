import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import NotePage from './pages/NotePage'
import CreatePage from './pages/CreatePage'
import NavBarWrapper from './components/NavBarWrapper'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarWrapper />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/note/:id',
        element: <NotePage />
      },
      {
        path: '/create',
        element: <CreatePage />
      },
    ],
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <RouterProvider router={router} />
  </div>
)
