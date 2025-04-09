export const loginRequest = async (email, password) => {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logoutRequest = async () => {
  const res = await fetch('/api/v1/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
};

export const refreshTokenRequest = async () => {
  const res = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to refresh token');
  }

  const text = await res.text();
  let data = {};

  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid response format');
  }

  if (data.accessToken) {
    return data.accessToken;
  } else {
    throw new Error('Access token missing');
  }
};
