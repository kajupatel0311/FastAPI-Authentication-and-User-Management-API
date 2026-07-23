import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../../api/authApi";
import { saveTokens } from "../../services/tokenService";
import { useAuth } from "../../hooks/useAuth";


const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {

    try {

      setLoading(true);

      const response =
        await loginUser(data);

      saveTokens(
        response.access_token,
        response.refresh_token
      );

      login();
      toast.success("Login successful.");

      navigate("/dashboard");

    } catch (error) {

      toast.error("Invalid email or password.");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.email?.message}
            </p>

          </div>

          <div>

            <label className="mb-2 block">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                {...register("password")}
                className="w-full rounded-lg border border-slate-300 p-3 pr-12 focus:border-indigo-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4"
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;

