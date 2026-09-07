import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { PieChart, Users } from "lucide-react";

export default function UsersByInterestsPage() {
  const interests = [
    { id: 1, name: "Technology", count: 452, percentage: 35 },
    { id: 2, name: "Business", count: 312, percentage: 25 },
    { id: 3, name: "Design", count: 204, percentage: 16 },
    { id: 4, name: "Personal Development", count: 180, percentage: 14 },
    { id: 5, name: "Health & Fitness", count: 100, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Users by Interests</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatedContainer delay={0.1} className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
            <PieChart className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-slate-800 dark:text-white">Interest Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {interests.map((interest) => (
                <div key={interest.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{interest.name}</span>
                    <span className="text-gray-500 font-bold">{interest.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${interest.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-500" />
            <h2 className="font-bold text-slate-800 dark:text-white">Quick Stats</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {interests.map((interest) => (
                <li key={interest.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{interest.name}</span>
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg">
                    {interest.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}
