import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { Search, Trash2, Eye } from "lucide-react";

export default function AllNotesPage() {
  const allNotes = [
    { id: 101, title: "Database Architecture", author: "Alice Smith", date: "2026-10-24", size: "12 KB" },
    { id: 102, title: "Marketing Plan", author: "Bob Jones", date: "2026-10-23", size: "8 KB" },
    { id: 103, title: "Server Credentials", author: "Charlie Brown", date: "2026-10-20", size: "2 KB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">All Notes (Admin)</h1>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search notes globally..." 
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <AnimatedContainer delay={0.1} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Date Created</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {allNotes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800 dark:text-white">
                    {note.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-500 hover:underline cursor-pointer">
                    {note.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{note.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{note.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View Note">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete Note">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedContainer>
    </div>
  );
}
