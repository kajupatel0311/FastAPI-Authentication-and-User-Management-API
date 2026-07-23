import { useEffect, useState } from "react";

import { getMyProfile } from "../../api/userApi";

import {
  getDashboardStats,
  getDashboardActivity,
} from "../../api/dashboardApi";

import type { UserProfile } from "../../types/user";

import type {
  DashboardStats,
  DashboardActivity,
} from "../../api/dashboardApi";

import WelcomeCard from "../../components/dashboard/WelcomeCard";
import ProfileCard from "../../components/dashboard/ProfileCard";
import QuickActions from "../../components/dashboard/QuickActions";
import StatusCard from "../../components/dashboard/StatusCard";
import StatCard from "../../components/dashboard/StatCard";
import RecentUsers from "../../components/dashboard/RecentUsers";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import UserStatisticsChart from "../../components/dashboard/UserStatisticsChart";
import PageSkeleton from "../../components/common/PageSkeleton";

function DashboardPage() {

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [activities, setActivities] =
    useState<DashboardActivity[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const [
        profile,
        dashboardStats,
        activityData,
      ] = await Promise.all([

        getMyProfile(),

        getDashboardStats(),

        getDashboardActivity(),

      ]);

      setUser(profile);

      setStats(dashboardStats);

      setActivities(activityData);

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return <PageSkeleton />;

  }

  if (!user || !stats) {

    return (

      <div className="flex h-screen items-center justify-center">

        <h2 className="text-xl font-semibold text-red-600">

          Unable to load dashboard.

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Welcome Card */}
      <WelcomeCard
        user={user}
      />

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Users"
          value={stats.total_users}
        />

        <StatCard
          title="Total Admins"
          value={stats.total_admins}
        />

        <StatCard
          title="Regular Users"
          value={stats.total_regular_users}
        />

        <StatCard
          title="Your Role"
          value={stats.my_role.toUpperCase()}
        />

      </div>

      {/* Recent Users & Activity Timeline */}
      <div className="grid gap-6 xl:grid-cols-2">

        <RecentUsers
          users={stats.recent_users}
        />

        <ActivityTimeline
          activities={activities}
        />

      </div>

      {/* User Statistics Chart */}
      <UserStatisticsChart
        totalUsers={stats.total_users}
        totalAdmins={stats.total_admins}
        totalRegularUsers={stats.total_regular_users}
      />

      {/* Profile & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">

        <ProfileCard
          user={user}
        />

        <QuickActions />

      </div>

      {/* Status */}
      <StatusCard />

    </div>

  );

}

export default DashboardPage;
