import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">

      <div className="border-b border-slate-700 p-6">

        <h2 className="text-xl font-bold">
          FastAPI Admin
        </h2>

      </div>

      <nav className="flex flex-col gap-2 p-4">

        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Profile
        </Link>

        <Link
          to="/users"
          className="rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Users
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;