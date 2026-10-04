// app/dashboard/settings/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/server";
import SettingsTabs from "@/component/settings-tabs";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <SettingsTabs user={{ name: user.name, email: user.email }} />
    </div>
  );
}
