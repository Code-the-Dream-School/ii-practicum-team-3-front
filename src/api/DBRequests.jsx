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
  const params = { page, limit };
  if (level) params.level = level;

  const response = await customFetch.get('/api/v1/workouts', { params });
  return response.data;
};

export const getWorkoutById = async (id) => {
  try {
    const response = await customFetch.get(`/api/v1/workouts/${id}`);
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
