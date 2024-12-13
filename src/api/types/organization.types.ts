export type CreateOrgDto = {
  name: string;
  country: string;
  postal: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
};

export type Address = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  country: string;
  id: number;
  postal: string;
};

export type Organization = {
  address: Address;
  id: number;
  name: string;
};

export type OrganizationsListResponse = Array<Organization>;
