import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateNotePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/user/notes" className="p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-500 hover:text-slate-800 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Note</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Save className="w-4 h-4" />
          Save Note
        </button>
      </div>

      <AnimatedContainer delay={0.1} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <input 
            type="text" 
            placeholder="Note Title" 
            className="w-full text-2xl font-bold text-slate-800 dark:text-white bg-transparent outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />
        </div>
        <div className="p-6">
          <textarea 
            placeholder="Start typing your note here..." 
            className="w-full min-h-[400px] text-base text-gray-700 dark:text-gray-300 bg-transparent outline-none resize-none leading-relaxed placeholder:text-gray-300 dark:placeholder:text-gray-600"
          ></textarea>
        </div>
      </AnimatedContainer>
    </div>
  );
}
