const parseErrorResponse = async (res, defaultMessage) => {
  try {
    const data = await res.json();
    return data.message || defaultMessage;
  } catch {
    const text = await res.text();
    return text || defaultMessage;
  }
};

export const loginRequest = async (email, password) => {
  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw new Error(`Login request failed: ${error.message}`);
  }
};

export const logoutRequest = async () => {
  try {
    const res = await fetch('/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      const message = await parseErrorResponse(res, 'Logout failed');
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(`Logout request failed: ${error.message}`);
  }
};

export const refreshTokenRequest = async () => {
  try {
    const res = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      const message = await parseErrorResponse(res, 'Failed to refresh token');
      throw new Error(message);
    }

    const text = await res.text();
    let data = {};

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Invalid response format');
    }

    if (data.accessToken) {
      return data.accessToken;
    } else {
      throw new Error('Access token missing');
    }
  } catch (error) {
    throw new Error(`Refresh token request failed: ${error.message}`);
  }
};
