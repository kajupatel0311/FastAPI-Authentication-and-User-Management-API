type StatCardProps = {
  title: string;
  value: string | number;
};

function StatCard({
  title,
  value,
}: StatCardProps) {

  return (

    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h2 className="mt-3 text-4xl font-bold text-indigo-600">

        {value}

      </h2>

    </div>

  );

}

export default StatCard;
