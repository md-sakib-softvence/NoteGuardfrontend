"use client";

import React, { useState } from "react";
import AnimatedContainer from "@/components/common/AnimatedContainer";
import { PenTool, ArrowLeft, Loader2, Check } from "lucide-react";
import { useCreatePostMutation } from "@/store/Api/Post/post.api";
import { useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAppSelector((state: any) => state.auth);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in both title and content.");
      return;
    }

    try {
      await createPost({
        title: formData.title.trim(),
        content: formData.content.trim(),
        userId: user._id,
      }).unwrap();

      toast.success("Post created successfully!");
      router.push("/user/posts");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create post.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/user/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-blue-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Posts
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <PenTool className="w-6 h-6 text-blue-600" />
            Create New Post
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Write something interesting to share with everyone.
          </p>
        </div>
      </div>

      <AnimatedContainer delay={0.1}>
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Post Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="A catchy title for your post..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 dark:text-white transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Post Content
              </label>
              <textarea
                id="content"
                required
                rows={8}
                placeholder="What's on your mind? Write your full post content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 dark:text-white transition-all text-sm resize-y"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
              <Link
                href="/user/posts"
                className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </AnimatedContainer>
    </div>
  );
}
