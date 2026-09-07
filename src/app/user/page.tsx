import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { FileText, Clock, Star, Edit3 } from "lucide-react";

export default function UserDashboardPage() {
  const recentNotes = [
    { id: 1, title: "Meeting Notes: Q3 Planning", date: "2 hours ago", category: "Work" },
    { id: 2, title: "Grocery List", date: "5 hours ago", category: "Personal" },
    { id: 3, title: "Project Ideas 2026", date: "1 day ago", category: "Ideas" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
      </div>

      <AnimatedContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Notes</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">24</h3>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Created This Week</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">5</h3>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Favorite Notes</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">8</h3>
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.2} className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Recent Notes</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {recentNotes.map((note) => (
            <div key={note.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 dark:border-slate-800/80 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{note.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {note.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-xs">{note.category}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
