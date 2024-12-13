import { z } from "zod";

export const useCreateUserFormSchema = () => {
  return z
    .object({
      email: z
        .string()
        .min(1, { message: "You must provide an email" })
        .email({ message: "You provided invalid email" }),
      password: z
        .string()
        .trim()
        .min(1, { message: "You must provide password" })
        .min(8, { message: "Password must have at least 8 characters" }),
      confirm: z.string(),
      organizationId: z.number().optional(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"], // path of error
    });
};
