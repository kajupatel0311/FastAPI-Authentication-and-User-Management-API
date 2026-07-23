import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { resetPassword } from "../../api/authApi";

const schema = z
  .object({
    token: z
      .string()
      .min(1, "Reset token is required"),

    new_password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword: z
      .string(),
  })
  .refine(
    (data) =>
      data.new_password ===
      data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type FormData = z.infer<typeof schema>;

function ResetPasswordPage() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(
    data: FormData
  ) {

    try {

      setLoading(true);

      const response =
        await resetPassword({
          token: data.token,
          new_password: data.new_password,
        });

      alert(response.message);

      navigate("/login");

    } catch (error: any) {

      alert(
        error?.response?.data?.detail ??
        "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Enter the reset token and your new password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block">
              Reset Token
            </label>

            <input
              type="text"
              {...register("token")}
              className="w-full rounded-lg border border-slate-300 p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.token?.message}
            </p>

          </div>

          <div>

            <label className="mb-2 block">
              New Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                {...register("new_password")}
                className="w-full rounded-lg border border-slate-300 p-3 pr-12"
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
              {errors.new_password?.message}
            </p>

          </div>

          <div>

            <label className="mb-2 block">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                {...register("confirmPassword")}
                className="w-full rounded-lg border border-slate-300 p-3 pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4"
              >
                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default ResetPasswordPage;
