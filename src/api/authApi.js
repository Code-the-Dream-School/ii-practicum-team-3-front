import customFetch from './customFetch';

export const loginRequest = async (email, password) => {
  try {
    const res = await customFetch.post('/api/v1/auth/login', {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login request failed';
    console.error('Login request failed:', message);
    throw new Error(message);
  }
};

export const registerRequest = async ({ firstName, lastName, email, password }) => {
  try {
    const res = await customFetch.post('/api/v1/auth/register', {
      firstName,
      lastName,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration request failed';

    console.error('Register request failed:', message);
    throw new Error(message);
  }
};

export const logoutRequest = async () => {
  try {
    await customFetch.post('/api/v1/auth/logout');
  } catch (error) {
    console.error('Logout request failed:', error.response ? error.response.data : error.message);
    throw new Error('Logout request failed');
  }
};

export const refreshTokenRequest = async () => {
  try {
    const res = await customFetch.post('/api/v1/auth/refresh');
    return res.data.accessToken;
  } catch (error) {
    console.error(
      'Refresh token request failed:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Refresh token request failed');
  }
};
