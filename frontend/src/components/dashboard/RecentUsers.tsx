import type { RecentUser } from "../../api/dashboardApi";

type RecentUsersProps = {
  users: RecentUser[];
};

function RecentUsers({
  users,
}: RecentUsersProps) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-semibold">

        Recent Users

      </h2>

      {users.length === 0 ? (

        <p className="text-slate-500">

          No users found.

        </p>

      ) : (

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >

              <div className="flex items-center gap-4">

                {user.profile_image ? (

                  <img
                    src={`http://127.0.0.1:8000${user.profile_image}`}
                    alt={user.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                ) : (

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">

                    {user.name.charAt(0).toUpperCase()}

                  </div>

                )}

                <div>

                  <h3 className="font-semibold">

                    {user.name}

                  </h3>

                  <p className="text-sm text-slate-500">

                    {user.email}

                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >

                {user.role}

              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default RecentUsers;

