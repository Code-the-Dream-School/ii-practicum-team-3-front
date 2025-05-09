import customFetch from './customFetch';
export const getExercises = async (filters) => {
  const response = await customFetch.get('/api/v1/exercises', {
    params: {
      ...filters,
    },
  });
  return response.data;
};

export const getWorkouts = async (page = 1, limit = 10, level) => {
  const params = { page, limit, isTemplate: true };
  if (level) params.level = level;

  const response = await customFetch.get('/api/v1/workouts', { params });
  return response.data;
};


export const getWorkoutById = async (id) => {

  if (!id) {
    console.error('Workout ID is undefined');
    return;
  }
  try {
    
    const response = await customFetch.get(`/api/v1/workouts/${id}`);
    console.log('Workout response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout:', error);
    throw error;
  }
};

export const saveWorkoutToFavorites = async (id) => {
  try {
    console.log("Saving workout with ID:", id);
    const response = await customFetch.post(`/api/v1/saved-workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteSavedWorkout = async (id) => {
  try {
    const response = await customFetch.delete(`/api/v1/saved-workouts/${id}`);
    console.log('Removed workout response:', response.data); 
    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error('Failed to remove workout from favorites');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
    throw new Error(errorMessage);
  }
};

export const getSavedWorkouts = async (page = 1, limit = 10, filters = {}) => {
  try {
    const response = await customFetch.get('/api/v1/saved-workouts/all', {
      params: {
        isTemplate: false,
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching saved workouts:", error);
    throw error.response?.data || error;
  }
};

export const getSavedWorkoutById = async (id) => { 
  if (!id) {
    console.error('Workout ID is undefined');
    return;
  }
  try {
    const response = await customFetch.get(`/api/v1/saved-workouts/${id}`); 
    console.log('Workout response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching workout:', error);
    throw error;
  }
}; 