import { useNavigate } from "react-router-dom";

function SecurityCard() {

  const navigate = useNavigate();

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">

        Security

      </h2>

      <div className="space-y-4">

        <div>

          <h3 className="font-medium">

            Password

          </h3>

          <p className="mt-1 text-sm text-slate-500">

            Change your account password to keep your account secure.

          </p>

        </div>

        <button
          onClick={() => navigate("/profile")}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >

          Change Password

        </button>

      </div>

    </div>

  );

}

export default SecurityCard;
