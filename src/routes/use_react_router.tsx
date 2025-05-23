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
import UserPage from '@/pages/user_page';
import ProfileLayout from '@/layouts/profile_layout';
import ProfilePage from '@/pages/profile_page';
import SettingPage from '@/pages/setting_page';

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
        },
        {
          path: path.users,
          element: (
            <MainLayout>
              <UserPage />
            </MainLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <ProfileLayout>
              <ProfilePage />
            </ProfileLayout>
          )
        },
        {
          path: path.profile + '/setting',
          element: (
            <ProfileLayout>
              <SettingPage />
            </ProfileLayout>
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
