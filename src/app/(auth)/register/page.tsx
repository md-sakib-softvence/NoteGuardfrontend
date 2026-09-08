"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";
import { useSignupMutation } from "@/store/Api/Auth/auth.api";

const INTEREST_OPTIONS = [
  "Technology",
  "Business",
  "Design",
  "Personal Development",
  "Health & Fitness",
];

export default function RegisterPage() {
  const router = useRouter();
  const [signup, { isLoading: isSubmitting }] = useSignupMutation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please provide your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please provide a valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        interests: selectedInterests,
        role: "customer",
      };

      const res = await signup(payload).unwrap();

      if (res?.success) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/login");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (err: any) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        "Registration failed. Please verify your details.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 items-center justify-center bg-white dark:bg-slate-950 select-none relative px-4 py-12">
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
      <div className="text-center w-full mt-4">
        <h1 className="text-3xl font-semibold text-[#2b353d] dark:text-slate-100 tracking-wide">
          Create an Account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Join NoteGuard and start managing your secure notes
        </p>
      </div>

      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[500px] bg-[#f6f9ff] dark:bg-slate-900 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4"
      >
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5 px-2 w-full">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
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

          {/* Interests Chips */}
          <div className="flex flex-col gap-2 px-2 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
                Interests (Optional)
              </label>
              <span className="text-[11px] text-slate-400">
                {selectedInterests.length} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 px-2 w-full">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="At least 6 characters"
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5 px-2 w-full">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2b353d] dark:text-slate-300">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col px-2 w-full mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Redirect Link */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#1c73e0] font-semibold hover:underline cursor-pointer"
          >
            Sign in Now
          </span>
        </p>
      </motion.div>
    </div>
  );
}
