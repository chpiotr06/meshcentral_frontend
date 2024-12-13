import { useUserStore } from "@/state/store";
import { useEffect, useState } from "react";

export const useFetchWithAuth = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const fetcher = async (url: string | URL, options?: RequestInit) => {
    if (!isHydrated) {
      // Wait for the store to be hydrated
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const currentToken = useUserStore.getState().access_token;

    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
    });
  };

  return fetcher;
};
