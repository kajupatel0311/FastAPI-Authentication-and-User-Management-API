import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import ProfileImageUpload from "../../components/profile/ProfileImageUpload";

import {
  getMyProfile,
  updateMyProfile,
} from "../../api/userApi";

import type {
  UserProfile,
} from "../../types/user";

function ProfilePage() {

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const profile =
        await getMyProfile();

      setUser(profile);

      setName(profile.name);

      setEmail(profile.email);

    } catch (error) {

      console.error("Load Profile Error:", error);
    } finally {

      setLoading(false);

    }

  }

  async function handleSave() {

    try {

      setSaving(true);

      await updateMyProfile({
        name,
        email,
      });

      await loadProfile();

      toast.success("Profile updated successfully.");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ??
        "Unable to update profile."
      );

    } finally {

      setSaving(false);

    }

  }

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        <h2 className="text-xl font-semibold text-slate-600">

          Loading profile...

        </h2>

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl">

      <div className="rounded-xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">

          My Profile

        </h1>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left Section */}

          <div className="space-y-6">

            <div>

              <label className="mb-2 block font-medium">

                Name

              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Email

              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Role

              </label>

              <input
                value={user?.role}
                disabled
                className="w-full rounded-lg border border-slate-300 bg-slate-100 p-3"
              />

            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
            >

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

          {/* Right Section */}

          <div className="flex flex-col items-center justify-center">

            {user?.profile_image ? (

              <img
                src={`http://127.0.0.1:8000${user.profile_image}`}
                alt="Profile"
                className="h-48 w-48 rounded-full border object-cover shadow"
              />

            ) : (

              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-indigo-600 text-6xl font-bold text-white shadow">

                {user?.name.charAt(0).toUpperCase()}

              </div>

            )}

            <div className="mt-6">

              <ProfileImageUpload
                onUploadSuccess={loadProfile}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProfilePage;
