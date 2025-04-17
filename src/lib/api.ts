/**
 * API utility functions for making requests to the backend
 */

// Get the backend URL from environment variables or use a default
export const getBackendUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:0';
};

// Create a full URL for an API endpoint
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getBackendUrl();
  // Remove any trailing slash from the base URL
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  // Remove any leading slash from the endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  return `${cleanBaseUrl}/${cleanEndpoint}`;
};

// GitHub API endpoints
export const githubApi = {
  getRepositories: () => getApiUrl('github/repos'),
  getTopRepositories: (limit: number) => getApiUrl(`github/top-repos?limit=${limit}`),
  getContributions: () => getApiUrl('github/contributions'),
  getRecentContributions: (months: number) => getApiUrl(`github/contributions/recent?months=${months}`),
};
