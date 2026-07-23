import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { registerUser } from "../../api/authApi";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must contain at least 3 characters"),

    email: z
      .string()
      .email("Enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterFormData
  ) {

    try {

      setLoading(true);

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
      });

      toast.success("Account created successfully.");

      navigate("/login");

    } catch (error: any) {

  toast.error(
    error?.response?.data?.detail ??
    error?.response?.data?.message ??
    "Registration failed."
  );

} finally {

  setLoading(false);

}

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Register a new account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block">
              Full Name
            </label>

            <input
              type="text"
              {...register("name")}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.name?.message}
            </p>

          </div>

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
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full rounded-lg border border-slate-300 p-3 pr-12 focus:border-indigo-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>

          </div>

          <div>

            <label className="mb-2 block">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full rounded-lg border border-slate-300 p-3 pr-12 focus:border-indigo-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-4"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;
