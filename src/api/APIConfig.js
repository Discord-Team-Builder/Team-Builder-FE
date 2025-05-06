const APIConfig = {
  me: { route: '/api/v1/@me', method: 'get', type: 'none' },
  login: { route: '/api/v1/auth/discord', method: 'get', type: 'none' },
  logout: { route: '/api/v1/auth/logout', method: 'post', type: 'none' },

  // Add other routes as needed...
};

export default APIConfig;