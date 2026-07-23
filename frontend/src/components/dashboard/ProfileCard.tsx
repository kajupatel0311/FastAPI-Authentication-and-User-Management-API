import type { UserProfile } from "../../types/user";

type ProfileCardProps = {
  user: UserProfile;
};

function ProfileCard({
  user,
}: ProfileCardProps) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Profile Information
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-slate-500">
            Name
          </p>

          <p className="font-medium">
            {user.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Email
          </p>

          <p className="font-medium">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Role
          </p>

          <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {user.role}
          </span>
        </div>

      </div>

    </div>

  );

}

export default ProfileCard;
