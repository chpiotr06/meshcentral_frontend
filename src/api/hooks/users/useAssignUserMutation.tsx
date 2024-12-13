import { ENDPOINTS } from "@/api/endpoints";
import { AssignUserDto } from "@/api/types/users";
import { useToast } from "@/hooks/use-toast";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOrderMutation = () => {
  const fetcher = useFetchWithAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, mutate, isError, isSuccess, isPending } = useMutation<
    Response,
    Error,
    AssignUserDto,
    unknown
  >({
    mutationFn: async (orgData) => {
      const response = await fetcher(ENDPOINTS.users.assign, {
        method: "POST",
        body: JSON.stringify(orgData),
      });

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "There was an error while assigning user to organization",
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        duration: 5000,
        title: "Successfully assigned user to organization",
      });
      queryClient.invalidateQueries({ queryKey: ["usersWithoutOrg"] });
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
