import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginRequest } from "~/features/auth/api/authApi";
import AuthSecondaryActions from "~/features/auth/components/AuthSecondaryActions";
import {
  loginSchema,
  type LoginFormData,
} from "~/features/auth/validation/authSchemas";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { error, isError, isPending, mutate: login } = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      navigate("/", { replace: true });
    }
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  if (isError) return <p>Error: {error.message}</p>;

  if (isPending) return <p>Loading...</p>;

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

        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500 italic">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Forgot password
              </a>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-red-500 italic">{errors.password.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Sign in
          </button>
        </form>

        <AuthSecondaryActions
          promptText="Don't have an account?"
          linkText="Sign up"
        />
      </section>
    </main>
  );
}
