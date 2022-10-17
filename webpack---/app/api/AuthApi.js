function loadUser(apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/sessions/current`;
  return apiClient.get(route);
}

function login({ username, password, destination }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/sessions`;
  return apiClient.post(route, { username, password, destination });
}

export default {
  loadUser,
  login
};
