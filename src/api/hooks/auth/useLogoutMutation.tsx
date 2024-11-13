import { ENDPOINTS } from "@/api/endpoints";
import { useStore } from "@/state/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

export const fetchLogout = async (
  accessToken: string | null
): Promise<void> => {
  const response = await fetch(ENDPOINTS.auth.logout, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Error while logging in");

  return response.json();
};

export const useLogoutMutation = (onError?: () => void) => {
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const accessToken = useStore((state) => state.access_token);
  const router = useRouter();

  const { data, mutate, isError, isPending, isSuccess } = useMutation<
    void,
    Error,
    void,
    unknown
  >({
    mutationFn: () => fetchLogout(accessToken),
    onError,
    onSuccess: () => {
      setUser(null);
      setAccessToken(null);
      router.replace("/login");
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
