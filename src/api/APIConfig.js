const APIConfig = {
  me: { route: '/api/v1/@me', method: 'get', type: 'none' },
  guilds:{ route: '/api/v1/guilds', method: 'get', type: 'none' },
  createProject: { route: '/api/v1/project/create', method:'post', type: 'body' },
  getAllProjects: {route: '/api/v1/project/all-projects', method:'get', type: 'none' },
  deleteProject: { route: '/api/v1/project/:id', method: 'delete', type: 'none' },
  login: { route: '/api/v1/auth/discord', method: 'get', type: 'none' },
  logout: { route: '/api/v1/auth/logout', method: 'post', type: 'none' },

  // Add other routes as needed...
};

export default APIConfig;