import React from "react";
import { loginSchema, type LoginFormData } from "../validation/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "~/shared/hooks/useAuth";
import ErrorState from "~/shared/components/error";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, loginError, isLoginLoading } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
    navigate("/", { replace: true });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loginError && <ErrorState message={loginError.message} />}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
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
        {errors.email && (
          <p className="text-sm text-red-500 italic">{errors.email.message}</p>
        )}
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
        {errors.password && (
          <p className="text-sm text-red-500 italic">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        disabled={isLoginLoading}
        type="submit"
        className="mt-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoginLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
