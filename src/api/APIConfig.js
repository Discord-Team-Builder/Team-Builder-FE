const APIConfig = {
  status: { route: '/api/v1/status', method: 'get', type: 'none' },
  me: { route: '/api/v1/@me', method: 'get', type: 'none' },
  updateProfile: { route: '/api/v1/user/update-profile', method:'put', type: 'body'},
  guilds:{ route: '/api/v1/guilds', method: 'get', type: 'none' },
  createProject: { route: '/api/v1/project/create', method:'post', type: 'body' },
  getAllProjects: {route: '/api/v1/project/all-projects', method:'get', type: 'none' },
  deleteProject: { route: '/api/v1/project/:id', method: 'delete', type: 'none' },
  createTeam: { route: '/api/v1/team/create', method: 'post', type: 'body' },
  acceptTeamInvite: { route: '/api/v1/team/accept', method: 'get', type: 'query' },
  isValidToken: {route: '/api/v1/team/isValidToken', method: 'get', type: 'query'},
  botConnect: { route: 'api/v1/GuildBot/:guildId/botConnect', method: 'post', type: 'none' },
  login: { route: '/api/v1/auth/discord', method: 'get', type: 'none' },
  logout: { route: '/api/v1/auth/logout', method: 'post', type: 'none' },

  // Add other routes as needed...
};

export default APIConfig;