import { useStore } from "@/state/store";
import { useRouter } from "next/navigation";

export const useFetchWithAuth = (url: string | URL, options: RequestInit) => {
  const access_token = useStore((state) => state.access_token);
  const router = useRouter();

  if (!access_token) {
    router.push("/login");
  }

  const response = fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response;
};
