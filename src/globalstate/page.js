import { proxy } from 'valtio';

const globalState = proxy({
  projects:[],
  projectId:56464446,
  teams:[],
  
});

export default globalState;