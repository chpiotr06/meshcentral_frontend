import { ENDPOINTS } from "@/api/endpoints";
import { BulkAssignUserDto } from "@/api/types/users";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useMutation } from "@tanstack/react-query";

export const useBulkAssignUsersToOrg = (
  onError: () => void,
  onSuccess: () => void
) => {
  const fetcher = useFetchWithAuth();

  const { data, mutate, isError, isSuccess, isPending } = useMutation<
    Response,
    Error,
    BulkAssignUserDto,
    unknown
  >({
    mutationFn: async (orgData) => {
      const response = await fetcher(ENDPOINTS.users.bulkAssign, {
        method: "POST",
        body: JSON.stringify(orgData),
      });

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    onError,
    onSuccess,
  });
  return { data, mutate, isError, isSuccess, isPending };
};
