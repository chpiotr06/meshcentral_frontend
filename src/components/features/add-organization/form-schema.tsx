import { z } from "zod";

export const useFormSchema = () => {
  const formSchema = z.object({
    name: z.string().min(3),
    country: z.string().min(2),
    postal: z.string().min(3),
    addressLine1: z.string().min(3),
    addressLine2: z.string().min(3),
    addressLine3: z.string().optional(),
  });

  return formSchema;
};
