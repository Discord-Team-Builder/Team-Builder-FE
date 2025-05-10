
import { proxy } from 'valtio';

const globalState = proxy({
  isLoggedIn: false,
  user: {},
  guilds: [],
  projects: [],
  projectId: [],
  teams:[],
  isLoading: false,
});

export default globalState;