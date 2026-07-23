import type { UserProfile } from "../../types/user";

type UserRowProps = {
  user: UserProfile;
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
};

const IMAGE_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

function UserRow({
  user,
  onEdit,
  onDelete,
}: UserRowProps) {

  return (

    <tr className="transition-colors hover:bg-slate-50">

      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          {user.profile_image ? (

            <img
              src={`${IMAGE_BASE_URL}${user.profile_image}`}
              alt={user.name}
              className="h-10 w-10 rounded-full border border-slate-200 object-cover"
            />

          ) : (

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">

              {user.name.charAt(0).toUpperCase()}

            </div>

          )}

          <div>

            <p className="font-medium text-slate-800">

              {user.name}

            </p>

          </div>

        </div>

      </td>

      <td className="break-all px-6 py-4 text-sm text-slate-600">

        {user.email}

      </td>

      <td className="px-6 py-4">

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            user.role === "admin"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >

          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

        </span>

      </td>

      <td className="px-6 py-4">

        <div className="flex items-center gap-2">

          <button
            onClick={() => onEdit(user)}
            className="rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >

            Edit

          </button>

          <button
            onClick={() => onDelete(user)}
            className="rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
          >

            Delete

          </button>

        </div>

      </td>

    </tr>

  );

}

export default UserRow;
