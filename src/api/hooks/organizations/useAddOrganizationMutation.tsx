import { ENDPOINTS } from "@/api/endpoints";
import { CreateOrgDto } from "@/api/types/organization.types";
import { useToast } from "@/hooks/use-toast";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useMutation } from "@tanstack/react-query";

export const useAddOrderMutation = () => {
  const fetcher = useFetchWithAuth();
  const { toast } = useToast();

  const { data, mutate, isError, isSuccess, isPending } = useMutation<
    Response,
    Error,
    CreateOrgDto,
    unknown
  >({
    mutationFn: async (orgData) => {
      const response = await fetcher(ENDPOINTS.organizations.base, {
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
        title: "There was an error while adding new organization",
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        duration: 5000,
        title: "Successfully added new organization",
      });
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
