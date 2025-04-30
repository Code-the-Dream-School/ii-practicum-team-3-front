import customFetch from './customFetch';
export const getExercises = async (filters) => {
  const response = await customFetch.get('/api/v1/exercises', {
    params: {
      ...filters,
    },
  });
  return response.data;
};
