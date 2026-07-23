import type { DashboardActivity } from "../../api/dashboardApi";

type ActivityTimelineProps = {
  activities: DashboardActivity[];
};

function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">

          Activity Timeline

        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">

          {activities.length}

        </span>

      </div>

      {activities.length === 0 ? (

        <div className="flex h-48 items-center justify-center">

          <p className="text-slate-500">

            No recent activity found.

          </p>

        </div>

      ) : (

        <div className="max-h-[420px] space-y-5 overflow-y-auto pr-2">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="flex gap-4 border-b pb-4 last:border-none"
            >

              {activity.profile_image ? (

                <img
                  src={`http://127.0.0.1:8000${activity.profile_image}`}
                  alt={activity.user}
                  className="h-12 w-12 rounded-full object-cover"
                />

              ) : (

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">

                  {activity.user.charAt(0).toUpperCase()}

                </div>

              )}

              <div className="flex-1">

                <h3 className="font-semibold">

                  {activity.title}

                </h3>

                <p className="mt-1 text-sm text-slate-600">

                  {activity.description}

                </p>

                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    activity.role === "admin"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >

                  {activity.role.toUpperCase()}

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default ActivityTimeline;