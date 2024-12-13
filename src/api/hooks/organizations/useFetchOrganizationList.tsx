import { ENDPOINTS } from "@/api/endpoints";
import { OrganizationsListResponse } from "@/api/types/organization.types";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrganizations = () => {
  const fetcher = useFetchWithAuth();

  const { data, isError, isSuccess, isPending } = useQuery<
    OrganizationsListResponse,
    Error
  >({
    queryFn: async () => {
      const response = await fetcher(ENDPOINTS.organizations.base);

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    queryKey: ["organizations"],
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  });
  return { data, isError, isSuccess, isPending };
};
