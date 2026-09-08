"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import { adminNavItems } from "@/lib/nav";
import { useAppSelector } from "@/hooks/useRedux";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
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
    } else if (user.role !== "admin" && user.role !== "superAdmin") {
      router.replace("/user");
    }
  }, [user, mounted, router]);

  if (!mounted || !user || !user.accessToken || (user.role !== "admin" && user.role !== "superAdmin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <DashboardShell
      navGroups={adminNavItems}
      logoText="NOTEGUARD ADMIN"
      title="Admin Overview"
      description="Welcome back to your administration control center."
    >
      {children}
    </DashboardShell>
  );
}
