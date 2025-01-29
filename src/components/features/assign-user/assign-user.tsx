"use client";

import { useFetchOrganizations } from "@/api/hooks/organizations/useFetchOrganizationList";
import { useBulkAssignUsersToOrg } from "@/api/hooks/users/useBulkAssignUsersMutation";
import { useFetchUsersWithoutOrg } from "@/api/hooks/users/useGetUsersWithoutOrg";
import { UserWithoutOrg } from "@/api/types/users";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export const AssignUser = () => {
  const [orgId, setOrgId] = useState<number>();
  const [usersList, setUsersList] = useState<Array<UserWithoutOrg>>([]);
  const { data: orgs } = useFetchOrganizations();
  const { data: users } = useFetchUsersWithoutOrg();
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const onError = () => {
    toast({
      variant: "destructive",
      duration: 5000,
      title: "There was an error while assigning user to organization",
    });
    setOrgId(undefined);
    setUsersList([]);
  };

  const onSuccess = () => {
    toast({
      variant: "success",
      duration: 5000,
      title: "Successfully assigned user to organization",
    });
    queryClient.invalidateQueries({ queryKey: ["usersWithoutOrg"] });
  };

  const { mutate, isPending, isSuccess } = useBulkAssignUsersToOrg(
    onError,
    onSuccess
  );

  const handleMutation = () => {
    if (!orgId) {
      toast({
        variant: "destructive",
        title: "You have to choose organization",
      });
      return;
    }
    if (usersList.length === 0) {
      toast({
        variant: "destructive",
        title: "You have to select at least one user",
      });
      return;
    }

    mutate({ orgId, userIds: usersList.map((user) => user.id) });
  };

  return (
    <div className="grid grid-cols-2 w-[50%] mx-auto gap-6 mt-6">
      <div>
        <div className="text-2xl mb-4">Add user to organization</div>
        <ScrollArea className="w-full p-2 border rounded-md gap-4 h-[500px]">
          {!users ? (
            <Loader2 className="animate-spin w-40 h-40" />
          ) : (
            <div className="flex gap-2 flex-col">
              {users.map((user) => (
                <div
                  className={cn(
                    "flex flex-row justify-between items-center hover:bg-slate-100 p-2 rounded-sm",
                    {
                      "bg-slate-100": usersList.some(
                        (usr) => usr.id === user.id
                      ),
                    }
                  )}
                  key={user.id}
                >
                  <div className="text-lg">{user.email}</div>
                  <Button
                    onClick={() =>
                      setUsersList((prevState) => [...prevState, user])
                    }
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" variant="outline">
              {orgs?.find((org) => org.id === orgId)?.name ||
                "Select Organization"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {!orgs ? (
              <Loader2 className="animate-spin w-40 h-40" />
            ) : (
              <ScrollArea className="h-[400px]">
                {orgs.map((org) => (
                  <DropdownMenuItem
                    className="p-2 hover:bg-slate-100 rounded-sm flex flex-col items-start"
                    key={org.id}
                    onSelect={() => setOrgId(org.id)}
                  >
                    <div className="text-lg">{org.name}</div>
                    <div className="flex flex-row gap-1">
                      <span>{org.address.country}</span>
                      <span>{org.address.postal}</span>
                    </div>
                    <div>{org.address.addressLine1}</div>
                    <div>{org.address.addressLine2}</div>
                    <div>{org.address.addressLine3}</div>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ScrollArea className="w-full p-2 border rounded-md gap-4 h-[500px]">
          {usersList.length === 0 ? (
            <div>No users selected</div>
          ) : (
            <div className="flex gap-2 flex-col">
              {usersList.map((user) => (
                <div
                  className="flex flex-row justify-between items-center hover:bg-slate-200 p-2 rounded-sm"
                  key={user.id}
                >
                  <div className="text-lg">{user.email}</div>
                  <Button
                    onClick={() =>
                      setUsersList((prevState) =>
                        prevState.filter((currUser) => currUser !== user)
                      )
                    }
                  >
                    Deselect
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
      <Button disabled={isPending || isSuccess} onClick={handleMutation}>
        {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </div>
  );
};
