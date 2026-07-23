import { useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPassword } from "../../api/authApi";

const schema = z.object({
  email: z
    .string()
    .email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

function ForgotPasswordPage() {

  const [loading, setLoading] =
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
        await forgotPassword(data);

      alert(response.message);

    } catch (error: any) {

      alert(
        error?.response?.data?.detail ??
        "Unable to process request."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">

          Forgot Password

        </h1>

        <p className="mb-8 text-center text-slate-500">

          Enter your registered email.

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
              className="w-full rounded-lg border border-slate-300 p-3"
            />

            <p className="mt-1 text-sm text-red-500">

              {errors.email?.message}

            </p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white"
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >

            Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}

export default ForgotPasswordPage;

