import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { UserProfile } from "../../types/user";

type EditUserModalProps = {
  open: boolean;
  user: UserProfile | null;
  loading: boolean;
  onClose: () => void;
  onSave: (
    id: string,
    data: {
      name: string;
      email: string;
      role: string;
    }
  ) => void;
};

function EditUserModal({
  open,
  user,
  loading,
  onClose,
  onSave,
}: EditUserModalProps) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("user");

  useEffect(() => {

    if (user) {

      setName(user.name);

      setEmail(user.email);

      setRole(user.role);

    }

  }, [user]);

  function handleSave() {

    if (!name.trim()) {

      toast.error("Name is required.");

      return;

    }

    if (!email.trim()) {

      toast.error("Email is required.");

      return;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      toast.error(
        "Enter a valid email address."
      );

      return;

    }

    onSave(
      user!.id,
      {
        name: name.trim(),
        email: email.trim(),
        role,
      }
    );

  }

  if (!open || !user) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-xl font-semibold text-slate-800">

            Edit User

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Update the user's information.

          </p>

        </div>

        <div className="space-y-5 px-6 py-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Name

            </label>

            <input
              type="text"
              autoComplete="off"
              placeholder="Enter full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 disabled:bg-slate-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Email

            </label>

            <input
              type="email"
              autoComplete="off"
              placeholder="Enter email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 disabled:bg-slate-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Role

            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 disabled:bg-slate-100"
            >

              <option value="user">

                User

              </option>

              <option value="admin">

                Admin

              </option>

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >

            Cancel

          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditUserModal;

