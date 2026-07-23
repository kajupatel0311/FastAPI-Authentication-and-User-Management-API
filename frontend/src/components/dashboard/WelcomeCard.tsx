import type { UserProfile } from "../../types/user";

type WelcomeCardProps = {
  user: UserProfile;
};

function WelcomeCard({
  user,
}: WelcomeCardProps) {

  return (

    <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">

      <h1 className="text-3xl font-bold">
        Welcome Back, {user.name}
      </h1>

      <p className="mt-2 text-indigo-100">
        Manage your account, profile, and application from your dashboard.
      </p>

    </div>

  );

}

export default WelcomeCard;

