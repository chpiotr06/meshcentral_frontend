import { ENDPOINTS } from "@/api/endpoints";
import { DeviceGeolocations } from "@/api/types/devices.types";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchDevicesGeolocations = (uuid: string | null) => {
  const fetcher = useFetchWithAuth();

  const { data, isError, isSuccess, isPending } = useQuery<
    DeviceGeolocations,
    Error
  >({
    queryFn: async () => {
      const response = await fetcher(ENDPOINTS.devices.geolocations(uuid));

      if (!response.ok) throw new Error("Error fetching data");
      const data = response.json();

      return data;
    },
    queryKey: ["devices", uuid],
    refetchOnWindowFocus: false,
    staleTime: 300_000,
    enabled: uuid ? true : false,
  });
  return { data, isError, isSuccess, isPending };
};
