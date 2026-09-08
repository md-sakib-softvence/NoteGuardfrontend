"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateNoteMutation } from "@/store/Api/Note/note.api";
import { toast } from "sonner";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please provide a note title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please provide note content");
      return;
    }

    try {
      await createNote({
        title: title.trim(),
        content: content.trim(),
      }).unwrap();

      toast.success("Note saved securely!");
      router.push("/user/notes");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/user/notes"
            className="p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-gray-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Note</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Note
            </>
          )}
        </button>
      </div>

      <AnimatedContainer
        delay={0.1}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full text-2xl font-bold text-slate-800 dark:text-white bg-transparent outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />
        </div>
        <div className="p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note here..."
            className="w-full min-h-[400px] text-base text-gray-700 dark:text-gray-300 bg-transparent outline-none resize-none leading-relaxed placeholder:text-gray-300 dark:placeholder:text-gray-600"
          ></textarea>
        </div>
      </AnimatedContainer>
    </div>
  );
}
