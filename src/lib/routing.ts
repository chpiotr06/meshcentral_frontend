export const routing = {
  root: "/",
  login: "/login",
  dashboard: {
    root: "/dashboard",
    admin: "/dashboard/admin",
    unauthorized: "/dashboard/unauthorized",
    addOrganization: "/dashboard/admin/add-organization",
    addUser: "/dashboard/admin/add-user",
    assignUser: "/dashboard/admin/assign-user",
  },
  devices: {
    root: "/dashboard/devices",
    addDevice: "/dashboard/devices/add",
  },
};
