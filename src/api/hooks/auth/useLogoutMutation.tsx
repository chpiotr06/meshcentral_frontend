import { ENDPOINTS } from "@/api/endpoints";
import { useToast } from "@/hooks/use-toast";
import { routing } from "@/lib/routing";
import { useUserStore } from "@/state/store";
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

  console.log(response);

  if (!response.ok) throw new Error("Error while logging in");

  const data = await response.json();
  console.log(data);

  return data;
};

export const useLogoutMutation = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const accessToken = useUserStore((state) => state.access_token);
  const router = useRouter();
  const { toast } = useToast();

  const { data, mutate, isError, isPending, isSuccess } = useMutation<
    void,
    Error,
    void,
    unknown
  >({
    mutationFn: () => fetchLogout(accessToken),
    onError: () => {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "There was an error while logging out",
      });
    },
    onSuccess: () => {
      console.log("called before fetch?");
      toast({
        variant: "success",
        duration: 5000,
        title: "Successfully logged out",
      });
      setUser(null);
      setAccessToken(null);
      router.push(routing.login);
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
