function SystemStatusCard() {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">

        System Status

      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span>

            Backend API

          </span>

          <span className="font-semibold text-green-600">

            Connected

          </span>

        </div>

        <div className="flex justify-between">

          <span>

            MongoDB

          </span>

          <span className="font-semibold text-green-600">

            Connected

          </span>

        </div>

        <div className="flex justify-between">

          <span>

            Authentication

          </span>

          <span className="font-semibold text-green-600">

            Active

          </span>

        </div>

      </div>

    </div>

  );

}

export default SystemStatusCard;
