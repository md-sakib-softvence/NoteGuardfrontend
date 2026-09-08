"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { Loader2 } from "lucide-react";

export default function RootPage() {
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
    } else if (user.role === "admin" || user.role === "superAdmin") {
      router.replace("/admin");
    } else {
      router.replace("/user");
    }
  }, [user, mounted, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-sm text-slate-500">Routing to your workspace...</p>
    </div>
  );
}
