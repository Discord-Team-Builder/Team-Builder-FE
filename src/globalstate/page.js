import { proxy } from 'valtio';

const globalState = proxy({
  projects: [
    {
      id: "44591616",
      name: "Project Alpha",
      teams: [
        { id: "team1", name: "Frontend Team" },
        { id: "team2", name: "Backend Team" }
      ]
    },
    {
      id: "44781616",
      name: "Project Beta",
      teams: [
        { id: "team3", name: "Design Team" }
      ]
    }
  ],
  projectId: [44591616, 44781616],
  teams:[],
  
});

export default globalState;