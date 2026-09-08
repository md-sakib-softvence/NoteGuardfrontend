"use client";

import React from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { MessageSquare, FileText, Loader2, Plus } from "lucide-react";
import { useGetUserPostsQuery } from "@/store/Api/Post/post.api";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";


export default function MyPostsPage() {
  const { user } = useAppSelector((state: any) => state.auth);
  
  const { data: postsData, isLoading } = useGetUserPostsQuery(user?.userId || "", {
    skip: !user?.userId,
  });

  // The backend $lookup aggregation returns the user object with a .posts array
  const posts = Array.isArray(postsData?.data) 
    ? postsData.data 
    : (postsData?.data as any)?.posts || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            My Posts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your authored posts which are visible to everyone.
          </p>
        </div>

        <Link
          href="/user/posts/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </Link>
      </div>

      <AnimatedContainer delay={0.1}>
        {isLoading ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
            <p className="text-slate-500">Loading your posts...</p>
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
              You haven&apos;t created any posts. Share your thoughts with the community!
            </p>
            <Link
              href="/user/posts/new"
              className="bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Start Writing
            </Link>
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
