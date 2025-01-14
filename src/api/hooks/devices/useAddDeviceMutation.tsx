import { ENDPOINTS } from "@/api/endpoints";
import { AddDeviceDto, AddDeviceResponse } from "@/api/types/devices.types";
import { useToast } from "@/hooks/use-toast";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddDeviceMutation = (successCallback: () => void) => {
  const fetcher = useFetchWithAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, mutate, isError, isSuccess, isPending, reset } = useMutation<
    AddDeviceResponse,
    Error,
    AddDeviceDto,
    unknown
  >({
    mutationFn: async (orgData) => {
      const response = await fetcher(ENDPOINTS.devices.base, {
        method: "POST",
        body: JSON.stringify(orgData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    },
    onError: (error) => {
      let title = "There was an error while adding new device";
      if (error.message === "User not assigned to any organization") {
        title = "You are not assigned to any organisation.";
      }

      toast({
        variant: "destructive",
        duration: 5000,
        title: title,
      });
    },
    onSuccess: () => {
      successCallback();
      toast({
        variant: "success",
        duration: 5000,
        title: "Successfully added new device",
      });
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      reset();
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
