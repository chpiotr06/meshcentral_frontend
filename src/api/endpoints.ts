export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;

export const ENDPOINTS = {
  auth: {
    register: `${API_BASE}${API_PREFIX}/auth/register`,
    login: `${API_BASE}${API_PREFIX}/auth/login`,
    logout: `${API_BASE}${API_PREFIX}/auth/logout`,
  },
  organizations: {
    base: `${API_BASE}${API_PREFIX}/organizations`,
  },
};
