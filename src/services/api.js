const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').trim();

const buildUrl = (endpoint) => {
  if (!endpoint) return '';
  if (!API_BASE_URL) return endpoint;
  return `${API_BASE_URL}${endpoint}`;
};

export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'حدث خطأ في الاتصال بالخادم');
  }

  return response.json();
}

export const authService = {
  login: (email, password) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (displayName, email, password) => 
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ displayName, email, password }),
    }),

  checkSession: () => fetchAPI('/auth/me', { method: 'GET' }),

  forgotPassword: (email) =>
    fetchAPI('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (email, code, newPassword) =>
    fetchAPI('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    }),
};