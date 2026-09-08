"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import { userNavItems } from "@/lib/nav";
import { useAppSelector } from "@/hooks/useRedux";
import { Loader2 } from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth as any);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user || !user.accessToken) {
      router.replace("/login");
    }
  }, [user, mounted, router]);

  if (!mounted || !user || !user.accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <DashboardShell
      navGroups={userNavItems}
      logoText="NOTEGUARD USER"
      title="User Dashboard"
      description="Manage your personal settings, profile, and activities."
    >
      {children}
    </DashboardShell>
  );
}
