export type UserWithoutOrg = {
  id: number;
  email: string;
};

export type UsersWithoutOrgReponse = Array<UserWithoutOrg>;

export type AssignUserDto = {
  userId: number;
  orgId: number;
};

export type BulkAssignUserDto = {
  userIds: number[];
  orgId: number;
};

export type createUserWithOrgDto = {
  email: string;
  password: string;
  confirm: string;
  organizationId?: number;
};
