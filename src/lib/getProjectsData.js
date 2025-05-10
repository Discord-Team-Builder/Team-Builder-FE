// This function takes a projects state object and returns an array of projects.
export const getProjectsData = (projectsState) => {
  if (Array.isArray(projectsState)) return projectsState;
  if (Array.isArray(projectsState?.projects)) return projectsState.projects;
  return [];
};
