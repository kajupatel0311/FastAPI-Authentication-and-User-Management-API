import LogoutButton from "../components/common/LogoutButton";

function Navbar() {

  return (

    <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">

      <h1 className="text-xl font-semibold text-slate-800">
        FastAPI Authentication
      </h1>

      <LogoutButton />

    </header>

  );

}

export default Navbar;