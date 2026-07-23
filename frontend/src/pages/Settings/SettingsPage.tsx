import { useEffect, useState } from "react";

import { getMyProfile } from "../../api/userApi";

import type { UserProfile } from "../../types/user";

import AccountCard from "../../components/settings/AccountCard";
import SecurityCard from "../../components/settings/SecurityCard";
import ApplicationCard from "../../components/settings/ApplicationCard";
import SystemStatusCard from "../../components/settings/SystemStatusCard";
import AboutCard from "../../components/settings/AboutCard";

function SettingsPage() {

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const profile =
        await getMyProfile();

      setUser(profile);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center">

        <h2 className="text-xl font-semibold">

          Loading Settings...

        </h2>

      </div>

    );

  }

  if (!user) {

    return (

      <div className="flex h-96 items-center justify-center">

        <h2 className="text-xl font-semibold text-red-600">

          Unable to load settings.

        </h2>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Settings

        </h1>

        <p className="mt-2 text-slate-500">

          Manage your account, security and application preferences.

        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <AccountCard
          user={user}
        />

        <SecurityCard />

        <ApplicationCard />

        <SystemStatusCard />

      </div>

      <AboutCard />

    </div>

  );

}

export default SettingsPage;
