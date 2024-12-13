import { ArrowUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";
import { useCreateUserFormSchema } from "./use-create-user-form-schema";
import { useFetchOrganizations } from "@/api/hooks/organizations/useFetchOrganizationList";

export const OrganizationSelector = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const schema = useCreateUserFormSchema();
  const { data } = useFetchOrganizations();
  const form = useFormContext<z.infer<typeof schema>>();

  return (
    <FormField
      control={form.control}
      name="organizationId"
      render={() => (
        <FormItem>
          <FormLabel>Organizacja</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2" asChild>
              <Button
                variant="outline"
                role="combobox"
                className="h-fit w-full justify-between"
              >
                {data?.find(
                  (org) => org.id === form.getValues("organizationId")
                )?.name || "Wybierz ogranizacje"}
                <ArrowUpDown className="w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)]"
            >
              {data?.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onSelect={() => {
                    form.setValue("organizationId", org.id);
                  }}
                  className="flex flex-col gap-1 mt-3 items-start"
                >
                  <div className="text-xl">{org.name}</div>
                  <div>
                    <span>{org.address.country}</span>
                    <span>{org.address.postal}</span>
                  </div>
                  <div>{org.address.addressLine1}</div>
                  <div>{org.address.addressLine2}</div>
                  {org.address.addressLine3 && (
                    <div>{org.address.addressLine3}</div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
