const path = {
  home: '/',
  login: '/login',
  movies: '/movies',
  movie_detail: '/movies/:id',
  notFound: '*'
} as const;

export default path;
