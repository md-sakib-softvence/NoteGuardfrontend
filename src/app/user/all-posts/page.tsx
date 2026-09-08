"use client";

import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { MessageSquare, FileText, Loader2 } from "lucide-react";
import { useGetAllPostsQuery } from "@/store/Api/Post/post.api";

export default function AllPostsPage() {
  const { data: postsData, isLoading } = useGetAllPostsQuery();

  const posts = postsData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            All User Posts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover posts created by everyone in the NoteGuard community.
          </p>
        </div>
      </div>

      <AnimatedContainer delay={0.1}>
        {isLoading ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
            <p className="text-slate-500">Loading community posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
              No Posts Yet
            </h3>
            <p className="text-slate-500 max-w-sm mb-6">
              There are no posts from the community right now. Be the first to share!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <div
                key={post._id}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg line-clamp-1 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 mt-auto flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </AnimatedContainer>
    </div>
  );
}
