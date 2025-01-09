"use client";

import { useForm } from "react-hook-form";
import { useFormSchema } from "./form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddOrderMutation } from "@/api/hooks/organizations/useAddOrganizationMutation";
import { LoaderCircle } from "lucide-react";

export const AddOrganizationForm = () => {
  const formSchema = useFormSchema();
  const { mutate, isPending, isSuccess } = useAddOrderMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      name: "",
      postal: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="border grow-0 p-4 rounded-md mt-8 place-self-center w-fit mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme inc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Legal name of the company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Poland" {...field} />
                    </FormControl>
                    <FormDescription>
                      Legal country of registration of the company.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal code</FormLabel>
                    <FormControl>
                      <Input placeholder="31-122" {...field} />
                    </FormControl>
                    <FormDescription>Postal code of company</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Cracow" {...field} />
                    </FormControl>
                    <FormDescription>
                      First line of the address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input placeholder="NY Avenue 42" {...field} />
                    </FormControl>
                    <FormDescription>
                      Second line of the address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 3</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment 13" {...field} />
                    </FormControl>
                    <FormDescription>
                      Third line of the address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSuccess || isPending}
                style={{ float: "right", marginTop: 8 }}
              >
                {!isPending ? (
                  "Submit"
                ) : (
                  <LoaderCircle className="animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
