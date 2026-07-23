import type { UserProfile } from "../../types/user";

import UserRow from "./UserRow";

type UsersTableProps = {
  users: UserProfile[];
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
};

function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {

  if (users.length === 0) {

    return (

      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <h2 className="text-lg font-semibold text-slate-700">

          No users found

        </h2>

        <p className="mt-2 text-sm text-slate-500">

          Try changing your search or filters.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">

                User

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">

                Email

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">

                Role

              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                Actions

              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {users.map((user) => (

              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default UsersTable;

