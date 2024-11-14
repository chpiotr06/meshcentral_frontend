import { useUserStore } from "@/state/store";

export const useFetchWithAuth = () => {
  const access_token = useUserStore((state) => state.access_token);

  const fetcher = (url: string | URL, options?: RequestInit) =>
    fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

  return fetcher;
};
