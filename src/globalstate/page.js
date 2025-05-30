
import { isBot } from 'next/dist/server/web/spec-extension/user-agent';
import { proxy } from 'valtio';

const globalState = proxy({
  isLoggedIn: false,
  user: {
    _id: null,
    username: '',
    globalName: '',
    avatar: '',
    email: '',
    discordId: '',
    projects: [],
    bio: "",
    skills: [],
    github:  "",
    hashnode:  "",
    pearlist: "",
  },
  guilds: [],
  projects: [],
  projectId: [],
  teams:[],
  activeApiCount: 0,
  isLoader: false ,
  installLink: '',
  isBotInstalled: true,
  isBotInstalledGuilds: [],
});

export default globalState;