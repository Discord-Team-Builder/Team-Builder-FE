import { proxy } from 'valtio';

const globalState = proxy({
  projects:[],
  projectId: 44591616,
  teams:[],
  
});

export default globalState;