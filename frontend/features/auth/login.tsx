import AuthSecondaryActions from "~/features/auth/components/AuthSecondaryActions";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router";
import { useGoogleAuth } from "~/shared/hooks/useGoogleAuth";

export default function Login() {
  const navigate = useNavigate();
  const googleAuth = useGoogleAuth();

  const handleGoogleCredential = (credential: string) => {
    googleAuth.mutate(
      { credential },
      {
        onSuccess: () => {
          navigate("/", { replace: true });
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        <LoginForm />
        <AuthSecondaryActions
          promptText="Don't have an account?"
          linkText="Sign up"
          linkTo="/signup"
          onGoogleCredential={handleGoogleCredential}
          googleDisabled={googleAuth.isPending}
        />
      </section>
    </main>
  );
}
