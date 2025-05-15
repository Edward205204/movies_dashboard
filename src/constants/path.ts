const path = {
  home: '/',
  login: '/login',
  movies: '/movies',
  movie_detail: '/movies/:id',
  users: '/users',
  notFound: '*'
} as const;

export default path;
