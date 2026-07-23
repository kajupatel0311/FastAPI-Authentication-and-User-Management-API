import { useEffect, useState } from "react";

import { getMyProfile } from "../../api/userApi";

import type { UserProfile } from "../../types/user";

function Navbar() {

  const [user, setUser] =
    useState<UserProfile | null>(null);

  useEffect(() => {

    async function loadUser() {

      try {

        const profile =
          await getMyProfile();

        setUser(profile);

      } catch (error) {

        console.error(error);

      }

    }

    loadUser();

  }, []);

  return (

    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>

        <h1 className="text-2xl font-semibold text-slate-800">
          Dashboard
        </h1>

      </div>

      {user && (

        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="font-semibold text-slate-800">
              {user.name}
            </p>

            <p className="text-sm text-slate-500">
              {user.role}
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">

            {user.name.charAt(0).toUpperCase()}

          </div>

        </div>

      )}

    </header>

  );

}

export default Navbar;
