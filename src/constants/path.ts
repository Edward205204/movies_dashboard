const path = {
  home: '/',
  login: '/login',
  movies: '/movies',
  movie_detail: '/movies/:id',
  users: '/users',
  notFound: '*',
  profile: '/profile'
} as const;

export default path;
