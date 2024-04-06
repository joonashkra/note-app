import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import NotePage from './pages/NotePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/note/:id',
    element: <NotePage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
