
import { proxy } from 'valtio';

const globalState = proxy({
  isLoggedIn: false,
  user: {},
  guilds: [],
  projects: [],
  projectId: [],
  teams:[],
  activeApiCount: 0,
  isLoader: false 
});

export default globalState;