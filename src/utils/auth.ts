export function setAccessTokenToLS(access: string) {
  return localStorage.setItem('access_token', access);
}

export function getAccessTokenFromLS() {
  return localStorage.getItem('access_token') || '';
}

export function removeLocalStorage() {
  localStorage.clear();
}
