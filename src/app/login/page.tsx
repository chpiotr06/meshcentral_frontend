import { LoginForm } from "@/components/features/login/login-form";

export default function LoginPage() {
  return (
    <div className="place-content-center flex h-screen flex-col items-center gap-8">
      <h1 className="text-5xl">MeshCentral</h1>
      <LoginForm />
    </div>
  );
}
