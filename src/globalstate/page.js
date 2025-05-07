
import { proxy } from 'valtio';

const globalState = proxy({
  user: {},
  guilds: [],
  projects: [],
  projectId: [],
  teams:[],
  isLoading: false,
});

export default globalState;