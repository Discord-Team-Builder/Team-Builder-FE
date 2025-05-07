import axios from 'axios';
import Cookies from 'js-cookie';
import APIConfig from './APIConfig';
import globalState from '@/globalstate/page';
import { data } from 'autoprefixer';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Set in .env

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

  // Prepare request config
  const requestConfig = {
    url: route,
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
  } catch (error) {
    console.error('API Error:', error?.response?.data || error?.message);
  
    // Optional: If you want to return a default value instead of throwing
    if (options.silent) return null;
  
    // Optional: You can return a structured response
    return { error: true, message: error?.response?.data?.message || 'Something went wrong' };
  
  }
}

// Specific API functions
export const getME = () => apiCall('me');
export const login = () => apiCall('login'); 
export const logout = () => apiCall('logout'); 
export const getGuilds = () => apiCall('guilds'); 
export const createProject = async (body) => {
  try {
   globalState.isLoading = true
    const data = await apiCall('createProject', { body, type: 'body' })
    getAllProject();
    {globalState.isLoading && window.location.reload()}
    globalState.isLoading = false
    return data
  } catch (error){
    console.error('Failed to create projects', error);
    toast.error('Failed to create projects');
    globalState.isLoading = false
    return null;
  }
  };
export const getAllProject = async () => {
  try {
    const data = await apiCall('getAllProjects');
    globalState.projects = data.projects;
    globalState.projectId = data.projects.map(project => project._id);
    return data;
  } catch (error) {
    console.error('Failed to fetch projects', error);
    toast.error('Failed to fetch projects');
    return null;
  }
};

// Add more specific functions as needed
export default apiCall;