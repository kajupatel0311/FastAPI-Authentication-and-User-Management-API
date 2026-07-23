import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function LogoutButton() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {

    logout();

    navigate("/login");

  }

  return (

    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
    >
      Logout
    </button>

  );

}

export default LogoutButton;
