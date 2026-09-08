"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";
import { useLoginMutation } from "@/store/Api/Auth/auth.api";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/store/features/AuthSlice/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isSubmitting }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (res?.success) {
        dispatch(
          setUser({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            user: res.data.user,
          })
        );
        toast.success(res.message || "Welcome back! Login successful.");

        const role = res.data?.user?.role;
        if (role === "admin" || role === "superAdmin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.error || "Login failed. Please check your credentials.";
      toast.error(errorMsg);
    }
  };

  const fillSuperAdmin = () => {
    setEmail("superadmin@noteguard.com");
    setPassword("SuperAdmin@1234");
    toast.info("Demo Super Admin credentials filled");
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center bg-white dark:bg-slate-950 select-none relative px-4 py-12">
      {/* Top Navigation Controls */}
      <div className="absolute top-4 left-0 right-0 w-full">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer w-52 transition-transform hover:scale-105 active:scale-95"
          >
            <Logo />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Title Centered Above the Card */}
      <div className="text-center w-full">
        <h1 className="text-3xl font-semibold text-[#2b353d] dark:text-slate-100 tracking-wide">
          Welcome to NoteGuard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Sign in to access your secure workspace
        </p>
      </div>

      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[488px] bg-[#f6f9ff] dark:bg-slate-900 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4"
      >
        {/* Quick Demo Login Preset Helper */}
        <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 rounded-xl p-3 flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Super Admin ready in DB</span>
          </div>
          <button
            type="button"
            onClick={fillSuperAdmin}
            className="font-medium underline hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer"
          >
            Fill Credentials
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-1.5 px-2 w-full">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5 px-2 w-full relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
                Password
              </label>
              <span
                onClick={() => router.push("/forgot-password")}
                className="text-[#1c73e0] text-xs font-medium hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex flex-col px-2 w-full mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        {/* Bottom Registration Link */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-[#1c73e0] font-semibold hover:underline cursor-pointer"
          >
            Register Now
          </span>
        </p>
      </motion.div>
    </div>
  );
}
