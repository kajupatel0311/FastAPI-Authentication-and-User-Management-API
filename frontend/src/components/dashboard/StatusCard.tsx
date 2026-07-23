function StatusCard() {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        System Status
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <span>Backend API</span>

          <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Online
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span>MongoDB</span>

          <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Connected
          </span>

        </div>

      </div>

    </div>

  );

}

export default StatusCard;

