import { Link } from "react-router-dom";

import type { UserProfile } from "../../types/user";

type AccountCardProps = {
  user: UserProfile;
};

function AccountCard({
  user,
}: AccountCardProps) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">

        Account

      </h2>

      <div className="flex items-center gap-5">

        {user.profile_image ? (

          <img
            src={`http://127.0.0.1:8000${user.profile_image}`}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover"
          />

        ) : (

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">

            {user.name.charAt(0).toUpperCase()}

          </div>

        )}

        <div>

          <h3 className="text-lg font-semibold">

            {user.name}

          </h3>

          <p className="text-slate-500">

            {user.email}

          </p>

          <span className="mt-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">

            {user.role}

          </span>

        </div>

      </div>

      <Link
        to="/profile"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
      >

        Go to Profile

      </Link>

    </div>

  );

}

export default AccountCard;
