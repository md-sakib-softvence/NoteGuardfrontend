import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { FileText, Plus, Search, MoreVertical, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default function MyNotesPage() {
  const notes = [
    { id: 1, title: "Meeting Notes: Q3 Planning", date: "Oct 24, 2026", preview: "Discussed the new product launch and marketing strategies..." },
    { id: 2, title: "Grocery List", date: "Oct 23, 2026", preview: "Milk, eggs, bread, butter, cheese, apples..." },
    { id: 3, title: "Project Ideas 2026", date: "Oct 20, 2026", preview: "1. AI driven note taking app. 2. Real-time collaboration tool..." },
    { id: 4, title: "Books to Read", date: "Oct 15, 2026", preview: "The Pragmatic Programmer, Clean Code, Design Patterns..." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Notes</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <Link href="/user/notes/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>
      </div>

      <AnimatedContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-500 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{note.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
              {note.preview}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-slate-800">
              <span className="text-xs font-medium text-gray-400">{note.date}</span>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </AnimatedContainer>
    </div>
  );
}
