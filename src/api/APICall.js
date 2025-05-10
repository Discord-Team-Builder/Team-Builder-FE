import axios from 'axios';
import Cookies from 'js-cookie';
import APIConfig from './APIConfig';
import globalState from '@/globalstate/page';
import { data } from 'autoprefixer';
import { toast } from 'sonner';
import { useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Set in .env

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    if (options[paramName]) {
      url = url.replace(param, options[paramName]);
    } else {
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
}
}

// Specific API functions
export const getStatus = async () => {
  try {
    const data = await apiCall('status');
    if (data?.isLoggedIn) {
      globalState.isLoggedIn = true;
    } else {
      globalState.isLoggedIn = false;
      globalState.user = null;
      globalState.guilds = [];
    }
    return data;
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
    const data = await apiCall('me');
    return data;
  }catch (error) {
    console.error('Failed to fetch user data', error);
    toast.error('Failed to fetch user data');
    
  }
};
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
    const data = await apiCall('guilds'); 
    return data;
  }catch (error) {
    console.error('Failed to fetch guilds', error);
    toast.error('Failed to fetch guilds');
    
  }
}

// Create a new project
export const createProject = async (body) => {
  try {
    const data = await apiCall('createProject', { body, type: 'body' })
    const currentProjects = Array.isArray(globalState.projects) ? globalState.projects : [];
    globalState.projects = [...currentProjects, data?.project];
    globalState.projectId = [...currentProjects, data?.project._id];
    return data
  } catch (error){
    console.error('Failed to create projects', error);
    toast.error('Failed to create projects');
    
  }
  };

// Get all projects
export const getAllProject = async () => {
  try {
    const data = await apiCall('getAllProjects');
    console.log("Fetched projects:", data);
    const currentProjects = Array.isArray(globalState.projects) ? globalState.projects : [];
    globalState.projects = [...currentProjects, data?.projects];
    globalState.projectId = [...currentProjects, data?.projects.map(project => project._id)];
    return data;
  } catch (error) {
    console.error('Failed to fetch projects', error);
    toast.error('Failed to fetch projects');
    
  }
};

// Delete project
export const deleteProject = async (projectId) => {
  try {
    console.log("Deleting project with ID:", projectId);
    const data = await apiCall('deleteProject', { id: projectId });
    getAllProject();
    return data;
  } catch (error) {
    console.error('Failed to delete project', error);
    toast.error('Failed to delete project');
    
  }
};

// Add more specific functions as needed
export default apiCall;