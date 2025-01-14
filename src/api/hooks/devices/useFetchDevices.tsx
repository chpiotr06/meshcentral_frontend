import { ENDPOINTS } from "@/api/endpoints";
import { DevicesReponse } from "@/api/types/devices.types";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchDevices = () => {
  const fetcher = useFetchWithAuth();

  const { data, isError, isSuccess, isPending } = useQuery<
    DevicesReponse,
    Error
  >({
    queryFn: async () => {
      const response = await fetcher(ENDPOINTS.devices.base);

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    queryKey: ["devices"],
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  });
  return { data, isError, isSuccess, isPending };
};
