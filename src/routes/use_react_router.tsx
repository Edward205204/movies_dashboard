import { useRoutes } from 'react-router';
import { ProtectedRoute, RejectedRoute } from './route_guard';
import path from '@/constants/path';
import MainLayout from '@/layouts/main_layout';

import RegisterLayout from '@/layouts/login_layout';
import Home from '@/pages/home';
import ErrorPage from '@/pages/error';
import LoginPage from '@/pages/login';

export default function UseReactRouter() {
  const routes = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <LoginPage />
            </RegisterLayout>
          )
        }
      ]
    },

    {
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return routes;
}
