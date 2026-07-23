import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { getMyProfile } from "../../api/userApi";

import { useEffect, useState } from "react";

import type { UserProfile } from "../../types/user";

function Sidebar() {

  const location = useLocation();

  const { logout } = useAuth();

  const [user, setUser] =
    useState<UserProfile | null>(null);

  useEffect(() => {

    async function loadUser() {

      try {

        const data =
          await getMyProfile();

        setUser(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadUser();

  }, []);

  function handleLogout() {

    logout();

    window.location.href = "/login";

  }

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },

  ];

  if (user?.role === "admin") {

    menuItems.push({

      name: "Users",

      path: "/users",

      icon: Users,

    });

  }

  return (

    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold">

          FastAPI Admin

        </h1>

      </div>

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <li key={item.path}>

                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    location.pathname === item.path
                      ? "bg-indigo-600"
                      : "hover:bg-slate-800"
                  }`}
                >

                  <Icon size={20} />

                  {item.name}

                </Link>

              </li>

            );

          })}

        </ul>

      </nav>

      <div className="border-t border-slate-700 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 transition hover:bg-red-700"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}

export default Sidebar;
