import axios from 'axios';
import Cookies from 'js-cookie';
import APIConfig from './APIConfig';
import globalState from '@/globalstate/page';
import { data } from 'autoprefixer';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { getProjectsData } from '@/lib/getProjectsData';
import { decreaseLoader, increaseLoader } from '@/globalstate/loaderState';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://team-builder-be-8trjtbq8su.dcdeploy.cloud/'; // Set in .env

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For HTTP-only cookies (remove if token is not HTTP-only)
});

// Generic API call function
const apiCall = async (endpointKey, options = {}) => {
  const config = APIConfig[endpointKey];
  if (!config) {
    throw new Error(`API endpoint "${endpointKey}" not found in APIConfig`);
  }

  const { route, method, type } = config;

  // Fetch token from cookies (if not HTTP-only, otherwise withCredentials handles it)
  const token = Cookies.get('token') || options.token;

  // Replace route parameters with actual values
  let url = route;
  const paramMatches = route.match(/:\w+/g) || [];
  for (const param of paramMatches) {
    const paramName = param.slice(1); // Remove ':' (e.g., :id -> id)
    if (options.params?.[paramName]) {
    url = url.replace(param, encodeURIComponent(options.params[paramName]));
    }
    // Fallback to top-level options
    else if (options[paramName]) {
      url = url.replace(param, encodeURIComponent(options[paramName]));
    }
    else {
      throw new Error(`Missing value for URL parameter ${param} in ${endpointKey}`);
    }
  }

  // Prepare request config
  const requestConfig = {
    url,
    method: method.toUpperCase(),
    headers: {
      ...(token && !api.defaults.withCredentials && { Authorization: `Bearer ${token}` }), // Skip if HTTP-only
    },
  };

  // Handle body or query based on type
  if (type === 'body' && options.body) {
    requestConfig.data = options.body; // Send data in body
  } else if (type === 'query' && options.query) {
    requestConfig.params = options.query; // Send data as query params
  } else if (type !== 'none') {
    throw new Error(`Invalid or missing data for ${endpointKey} (type: ${type})`);
  }

  try {
    increaseLoader();
    const response = await api.request(requestConfig);
  
    if (!response || !response.data) {
      throw new Error('No data returned from API');
    }
  
    return response.data;
  }catch (error) {
  const errorData = error?.response?.data || {};
  const errorMessage = errorData.message || error?.message || 'API request failed';

  // Development mein hi log karo
  if (process.env.NODE_ENV === 'development') {
    console.log('[API Error]', { 
      endpoint: endpointKey,
      message: errorMessage,
      status: error?.response?.status 
    });
  }

  // 👇 Silent mode (default) - return null instead of throwing
  if (options.silent !== false) {
    return null;
  }
  
  // 👇 Only throw for critical APIs (like login)
  throw new Error(errorMessage);
} finally {
  decreaseLoader();
}
}

// Specific API functions
export const getStatus = async () => {
  try {
    const response = await apiCall('status');
    if (response?.data?.isLoggedIn) {
      globalState.isLoggedIn = true;
    } else {
      globalState.isLoggedIn = false;
      globalState.user = null;
      globalState.guilds = [];
    }
    return response;
  }
  catch (error) {
    if (error.status === 401) {
      toast.error('Please login to continue');
    } else {
      toast.error(error.message); 
    }
    
  }
};
export const getME = async () => {
 try {
    const response = await apiCall('me');
    return response?.data;
  }catch (error) {
    console.error('Failed to fetch user data', error);
    toast.error('Failed to fetch user data');
    
  }
};
export const updateProfile = async (formData) => {
  try{
    const response = await apiCall('updateProfile', {body: formData})
    if (response.status === true) {
      globalState.user = { ...globalState.user, ...response.data }
    }

    return response;
  } catch (error) {
    console.log('failed to update profile:', error)
    toast.error('failed to update profile:')
  }
}
export const login = async () => {
  try{
    const data = await apiCall('login');
    return data;
  }catch (error) {
    console.error('Failed to login', error);
    toast.error('Failed to login');
    
  }
}
export const logout = async () => {
  try{
    const data = await apiCall('logout'); 
    return data;
  }catch (error) {
    console.error('Failed to logout', error);
    toast.error('Failed to logout');
    
  }
}
export const getGuilds = async () => {
  try{
    const response = await apiCall('guilds'); 
    return response.data;
  }catch (error) {
    console.error('Failed to fetch guilds', error);
    toast.error('Failed to fetch guilds');
    
  }
}

// Create a new project
export const createProject = async (formData) => {
  try {
    const response = await apiCall('createProject', { body: formData })
    const newProjects = response?.data?.project || []; 
    console.log("newprojects:", newProjects);
    const newTeams = response?.data?.teams || [];
    console.log("newteams:", newTeams);
    newProjects.teams = newTeams;  
    console.log("newprojects:", newProjects);
    const currentProjects = getProjectsData(globalState.projects); 
    globalState.projects = [...currentProjects, newProjects];
    globalState.projectId = [...globalState.projectId || [], newProjects._id];
    
    return response?.data
  } catch (error){
    console.error('Failed to create projects', error);
    toast.error('Failed to create projects');
    
  }
  };

// Get all projects
export const getAllProject = async () => {
  try {
    const response = await apiCall('getAllProjects');
    const currentProjects = Array.isArray(globalState.projects) ? globalState.projects : [];
    globalState.projects = [...currentProjects, ...(response?.data?.projects || [])];
    globalState.projectId = [...currentProjects, ...(response?.data?.projects.map(project => project._id) || [])];
    return response?.data;
  } catch (error) {
    console.error('Failed to fetch projects', error);
    toast.error('Failed to fetch projects');
    
  }
};

// Delete project
export const deleteProject = async (projectId) => {
  try {

    const response = await apiCall('deleteProject', { id: projectId });
   
    const projectData = getProjectsData(globalState.projects);
    globalState.projects = projectData.filter(project => project._id !== projectId);
    globalState.projectId = globalState.projectId.filter(id => id !== projectId);
   
    return response;
  } catch (error) {
    console.error('Failed to delete project', error);
    toast.error('Failed to delete project');
    
  }
};

// Create a new team
export const createTeam = async (formData) => {
  try {
    const response = await apiCall('createTeam', { body:formData});
    const newTeam = response?.data?.team || [];
    const currentTeams = globalState.teams || [];
    globalState.teams = [...currentTeams, newTeam];
    return response?.data;
  } catch (error) {
    console.error('Failed to create team', error);
    toast.error('Failed to create team');
    
  }
};

// Accept team invite
export const acceptTeamInvite = async ({token}) => {
  try {
    const response = await apiCall('acceptTeamInvite', { query: { token } });
    return response?.data;
  } catch (error) {
    console.error('Failed to accept team invite', error);
    toast.error('Failed to accept team invite');
    
  }
};

export const isValidToken = async({token}) =>{
  try {
    const response = await apiCall('isValidToken', { query: { token } });
    return response;
  } catch (error) {
    console.error('Failed to validate invite token', error);
    toast.error('Failed to validate invite token');
    return null;
  }
};

// Connect bot to guild
export const botConnect = async (guildId) => {
  try {
    const response = await apiCall('botConnect', {guildId});
    globalState.installLink = response?.data?.installLink || '';
    console.log("responce:", response);
    console.log("Install Link:", globalState.installLink);
    console.log("Response Status:", response?.data?.installLink);
    globalState.isBotInstalled = response?.statusCode === 200;
    return response;
  } catch (error) {
    console.error('Failed to connect bot', error);
    toast.error('Failed to connect bot');
    
  }
};

// Add more specific functions as needed
export default apiCall;
