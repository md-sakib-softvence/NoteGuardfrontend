import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { Users, FileText, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
      </div>

      <AnimatedContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-xl">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">1,248</h3>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Notes</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">8,492</h3>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-xl">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Today</p>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">342</h3>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
}
