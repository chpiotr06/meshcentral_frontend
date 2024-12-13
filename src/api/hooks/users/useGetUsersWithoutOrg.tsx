import { ENDPOINTS } from "@/api/endpoints";
import { UsersWithoutOrgReponse } from "@/api/types/users";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsersWithoutOrg = () => {
  const fetcher = useFetchWithAuth();

  const { data, isError, isSuccess, isPending } = useQuery<
    UsersWithoutOrgReponse,
    Error
  >({
    queryFn: async () => {
      const response = await fetcher(ENDPOINTS.users.noOrg);

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    queryKey: ["usersWithoutOrg"],
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  });
  return { data, isError, isSuccess, isPending };
};
