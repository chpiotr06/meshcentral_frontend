"use client";

import { useCreateUserFormSchema } from "./use-create-user-form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OrganizationSelector } from "./organization-selector";
import { useAddUserWithOrgMutation } from "@/api/hooks/users/useAddUserWithOrgMutation";
import { Loader2 } from "lucide-react";

export const CreateUser = () => {
  const schema = useCreateUserFormSchema();
  const { mutate, isPending, isSuccess } = useAddUserWithOrgMutation();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      organizationId: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(values);
  };

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add user</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email of a user you whish to add to the system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    Password of a user you want to add to the system. Remember
                    to use secure passwords
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide password once again to check if they are the same
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <OrganizationSelector />
            <Button
              type="submit"
              disabled={isPending || isSuccess}
              className="mt-2"
            >
              {isPending ? <Loader2 /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
