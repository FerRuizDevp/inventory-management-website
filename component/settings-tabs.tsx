// component/settings-tabs.tsx
"use client";

import { useState } from "react";
import { User, Mail, Bell, Monitor } from "lucide-react";

const tabs = [
  { id: "profile", name: "My Profile", icon: User },
  { id: "emails", name: "Emails & Auth", icon: Mail },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "sessions", name: "Active Sessions", icon: Monitor },
];

export default function SettingsTabs({
  user,
}: {
  user: { name?: string | null; email?: string | null };
}) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex min-h-[500px]">
      {/* Sub-navigation */}
      <div className="w-56 border-r border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
          Account Settings
        </p>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left ${
                  isActive
                    ? "bg-violet-50 text-violet-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content panel */}
      <div className="flex-1 p-6">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              My Profile
            </h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <input
                  defaultValue={user.name ?? ""}
                  className="w-full px-3 py-2 border text-gray-500 border-gray-300 bg-gray-50 rounded-lg text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <input
                  defaultValue={user.email ?? ""}
                  className="w-full px-3 py-2 border text-gray-500 border-gray-300 bg-gray-50 rounded-lg text-sm"
                  disabled
                />
              </div>
              <button className="px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "emails" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Emails & Auth
            </h2>
            <p className="text-sm text-gray-500">
              Manage your sign-in methods and linked accounts.
            </p>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Notifications
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Choose which emails you want to receive
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between max-w-sm">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Transactional
                  </p>
                  <p className="text-xs text-gray-400">(cannot be disabled)</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-gray-300 flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between max-w-sm">
                <p className="text-sm font-medium text-gray-900">Marketing</p>
                <div className="w-10 h-6 rounded-full bg-violet-600 flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Active Sessions
            </h2>
            <p className="text-sm text-gray-500">
              Devices currently signed in to your account will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
