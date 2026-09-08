"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { FileText, Plus, Search, Trash2, Loader2, Sparkles, Edit3 } from "lucide-react";
import Link from "next/link";
import { useGetMyNotesQuery, useDeleteNoteMutation } from "@/store/Api/Note/note.api";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function MyNotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data, isLoading } = useGetMyNotesQuery({
    searchTerm: debouncedSearch || undefined,
    myNotes: 'true',
  });

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  const notes = data?.data || [];

  const handleDelete = (id: string, title: string) => {
    toast(`Are you sure you want to delete "${title}"?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteNote(id).unwrap();
            toast.success(`Note "${title}" deleted successfully.`);
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete note");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Notes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, view, and securely manage your private notes
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 dark:text-white placeholder:text-gray-400"
            />
          </div>
          <Link
            href="/user/notes/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
          <p className="text-sm text-gray-500">Loading your secure notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
            {searchTerm ? "No matching notes found" : "No notes yet"}
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            {searchTerm
              ? `No notes matched "${searchTerm}". Try a different keyword.`
              : "Keep track of your thoughts, plans, and important data with NoteGuard."}
          </p>
          <Link
            href="/user/notes/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Create Your First Note
          </Link>
        </div>
      ) : (
        <AnimatedContainer
          delay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-blue-50 dark:bg-slate-800 rounded-xl text-blue-500 dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/user/notes/edit/${note._id}`}
                    className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    title="Edit note"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(note._id, note.title);
                    }}
                    disabled={isDeleting}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">
                {note.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-4 mb-4 flex-1 whitespace-pre-line">
                {note.content}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 text-xs text-gray-400">
                <span>{formatDate(note.createdAt)}</span>
                <span className="font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded text-[11px]">
                  Encrypted
                </span>
              </div>
            </div>
          ))}
        </AnimatedContainer>
      )}
    </div>
  );
}
