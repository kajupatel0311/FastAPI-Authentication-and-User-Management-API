function ApplicationCard() {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">

        Application

      </h2>

      <div className="space-y-5">

        <div>

          <p className="font-medium">

            Theme

          </p>

          <p className="text-sm text-slate-500">

            Light Mode

          </p>

        </div>

        <div>

          <p className="font-medium">

            Language

          </p>

          <p className="text-sm text-slate-500">

            English

          </p>

        </div>

        <div>

          <p className="font-medium">

            Version

          </p>

          <p className="text-sm text-slate-500">

            v1.0.0

          </p>

        </div>

      </div>

    </div>

  );

}

export default ApplicationCard;

