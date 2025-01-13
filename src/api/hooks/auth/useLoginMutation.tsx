import { ENDPOINTS } from "@/api/endpoints";
import { LoginDto, LoginReponseDto } from "@/api/types/auth.types";
import { useToast } from "@/hooks/use-toast";
import { routing } from "@/lib/routing";
import { useUserStore } from "@/state/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

export const fetchLogin = async (
  credentials: LoginDto
): Promise<LoginReponseDto> => {
  const response = await fetch(ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify(credentials),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Error while logging in");

  const data = await response.json();

  return data;
};

export const useLoginMutation = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const router = useRouter();
  const { toast } = useToast();

  const { data, mutate, isError, isPending, isSuccess } = useMutation<
    LoginReponseDto,
    Error,
    LoginDto,
    unknown
  >({
    mutationFn: (credentials) => fetchLogin(credentials),
    onError: () => {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Password or email is invalid",
        description: "Check supplied credentials and try again",
      });
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        duration: 5000,
        title: "Successfully logged in.",
      });
      setUser(data.user);
      setAccessToken(data.access_token);
      router.push(routing.dashboard.root);
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
