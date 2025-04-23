import { proxy } from 'valtio';

const globalState = proxy({
  projects:[],
  teams:[],
  
});

export default globalState;