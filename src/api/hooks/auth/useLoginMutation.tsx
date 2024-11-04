import { ENDPOINTS } from "@/api/endpoints";
import { LoginDto, LoginReponseDto } from "@/api/types/auth.types";
import { useStore } from "@/state/store";
import { useMutation } from "@tanstack/react-query";
// import { cookies } from "next/headers";

export const fetchLogin = async (
  credentials: LoginDto
): Promise<LoginReponseDto> => {
  const response = await fetch(ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Error while logging in");

  return response.json();
};

export const useLoginMutation = (onError?: () => void) => {
  const setUser = useStore((state) => state.setUser);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const { data, mutate, isError, isPending, isSuccess } = useMutation<
    LoginReponseDto,
    Error,
    LoginDto,
    unknown
  >({
    mutationFn: (credentials) => fetchLogin(credentials),
    onError,
    onSuccess: (data) => {
      // const cookieStore = await cookies();
      setUser(data.user);
      setAccessToken(data.access_token);
      // cookieStore.set("Authorization", `Bearer ${data.access_token}`);
    },
  });
  return { data, mutate, isError, isSuccess, isPending };
};
