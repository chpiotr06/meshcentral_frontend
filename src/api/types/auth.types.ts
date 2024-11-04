import { UserT } from "@/types/user";

export type LoginDto = {
  password: string;
  email: string;
};

export type LoginReponseDto = {
  access_token: string;
  user: UserT;
};
