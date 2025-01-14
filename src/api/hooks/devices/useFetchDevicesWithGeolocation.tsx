import { ENDPOINTS } from "@/api/endpoints";
import { DeviceWithGeolocationResponse } from "@/api/types/devices.types";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchDevicesWithGeolocation = () => {
  const fetcher = useFetchWithAuth();

  const { data, isError, isSuccess, isPending } = useQuery<
    DeviceWithGeolocationResponse[],
    Error
  >({
    queryFn: async () => {
      const response = await fetcher(ENDPOINTS.devices.withGeolocation);

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    queryKey: ["devices-with-geo"],
    refetchOnWindowFocus: false,
    staleTime: 300_000,
  });
  return { data, isError, isSuccess, isPending };
};
