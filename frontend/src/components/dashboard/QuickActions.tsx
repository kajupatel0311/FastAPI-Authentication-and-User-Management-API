import { Link } from "react-router-dom";

function QuickActions() {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4">

        <Link
          to="/profile"
          className="rounded-lg bg-indigo-600 p-3 text-center font-medium text-white hover:bg-indigo-700"
        >
          View Profile
        </Link>

        <Link
          to="/users"
          className="rounded-lg bg-slate-700 p-3 text-center font-medium text-white hover:bg-slate-800"
        >
          Manage Users
        </Link>

      </div>

    </div>

  );

}

export default QuickActions;

