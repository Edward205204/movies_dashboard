import { useRoutes } from 'react-router';
import { ProtectedRoute, RejectedRoute } from './route_guard';
import path from '@/constants/path';
import MainLayout from '@/layouts/main_layout';

import RegisterLayout from '@/layouts/login_layout';
import HomePage from '@/pages/home_page';
import ErrorPage from '@/pages/error_page';
import LoginPage from '@/pages/login_page';
import MoviePage from '@/pages/movie_page';
import MovieDetailPage from '@/pages/movie_detail';

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
              <HomePage />
            </MainLayout>
          )
        },
        {
          path: path.movies,
          element: (
            <MainLayout>
              <MoviePage />
            </MainLayout>
          )
        },
        {
          path: path.movies,
          element: (
            <MainLayout>
              <MoviePage />
            </MainLayout>
          )
        },
        {
          path: path.movie_detail,
          element: (
            <MainLayout>
              <MovieDetailPage />
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
