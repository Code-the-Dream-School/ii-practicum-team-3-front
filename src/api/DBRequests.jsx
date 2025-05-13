import customFetch from './customFetch';

export const getExercises = async (filters) => {
  const response = await customFetch.get('/api/v1/exercises', {
    params: {
      ...filters,
    },
  });
  return response.data;
};


export const getSavedExercises = async (page = 1, limit = 10) => {
  const response = await customFetch.get('/api/v1/favorites', {
    params: { page, limit },
  });
  return response.data;
};

export const saveExerciseToFavorites = async (exerciseId) => {
  try {
    const response = await customFetch.post(`/api/v1/favorites/${exerciseId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error saving exercise to favorites:", error);
    }
    throw error;
  }
};

export const deleteSavedExercise = async (exerciseId) => {
  if (!exerciseId) {
    console.error("No exerciseId provided.");
    return;
  }
  try {
    const response = await customFetch.delete(`/api/v1/favorites/${exerciseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting exercise from favorites:", error);
    throw error;
  }
};

// Workouts ========================================================


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

export const createCustomWorkout = async (formData) => {
  const requestData = {
    age: parseInt(formData.age, 10),
    weight: parseFloat(formData.weight),
    level: formData.level,
    gender: formData.gender,
  };

  const response = await customFetch.post('/api/v1/customized-workout/create', requestData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};


export const getCustomWorkouts = async () => {
  try {
    const response = await customFetch.get('/api/v1/customized-workout/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch custom workout:', error);
    return { success: false, data: null };
  }
};


export const deleteCustomWorkout = async (id) => {
  try {
    const response = await customFetch.delete(`/api/v1/customized-workout/${id}`);
    if (response.data.success) {
      console.log('Workout deleted successfully');
      return response.data; 
    } else {
      console.log('Failed to delete workout');
      return { success: false };
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    return { success: false };
  }
};

