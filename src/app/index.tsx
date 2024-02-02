import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from 'pages/main';
import './global.scss';
import { Auth } from 'pages/auth';
import Header from '../components/header';
import Cabinet from 'pages/cabinet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/cabinet',
    element: <Cabinet />,
  },
]);

export const App = () => (
  <div>
    <RouterProvider router={router} />
  </div>
);

//роутинги, сделать страницу авторизации на отдельном компоненте
