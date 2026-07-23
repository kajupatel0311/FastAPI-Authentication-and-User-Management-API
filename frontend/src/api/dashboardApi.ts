import api from "./axios";

export type RecentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_image: string | null;
};

export type DashboardActivity = {
  title: string;
  description: string;
  user: string;
  role: string;
  profile_image: string | null;
};

export type DashboardStats = {
  total_users: number;
  total_admins: number;
  total_regular_users: number;
  my_role: string;
  recent_users: RecentUser[];
};

export async function getDashboardStats(): Promise<DashboardStats> {

  const response = await api.get(
    "/dashboard/stats"
  );

  console.log("Dashboard API Response:", response);

  return response.data.data;

}

export async function getDashboardActivity(): Promise<DashboardActivity[]> {

  const response = await api.get(
    "/dashboard/activity"
  );

  return response.data.activities;

}
