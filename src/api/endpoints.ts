export const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX;

export const ENDPOINTS = {
  auth: {
    register: `${API_BASE}${API_PREFIX}/auth/register`,
    login: `${API_BASE}${API_PREFIX}/auth/login`,
    logout: `${API_BASE}${API_PREFIX}/auth/logout`,
    createUserWithOrg: `${API_BASE}${API_PREFIX}/auth/register-with-org`,
  },
  organizations: {
    base: `${API_BASE}${API_PREFIX}/organizations`,
  },
  users: {
    base: `${API_BASE}${API_PREFIX}/users`,
    assign: `${API_BASE}${API_PREFIX}/users/assign`,
    bulkAssign: `${API_BASE}${API_PREFIX}/users/assign-bulk`,
    noOrg: `${API_BASE}${API_PREFIX}/users/no-org`,
  },
  devices: {
    base: `${API_BASE}${API_PREFIX}/devices`,
  },
};
