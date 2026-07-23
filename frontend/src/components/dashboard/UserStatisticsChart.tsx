import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
};

function UserStatisticsChart({
  totalUsers,
  totalAdmins,
  totalRegularUsers,
}: Props) {

  const data = [
    {
      name: "Users",
      value: totalUsers,
    },
    {
      name: "Admins",
      value: totalAdmins,
    },
    {
      name: "Regular",
      value: totalRegularUsers,
    },
  ];

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-semibold">

        User Statistics

      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default UserStatisticsChart;
