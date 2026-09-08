import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  collapsed?: boolean;
  subtext?: string;
  showText?: boolean;
}

const Logo = ({
  className,
  collapsed = false,
  subtext = "SECURE WORKSPACE",
  showText = true,
}: LogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 select-none transition-all duration-200",
        collapsed ? "justify-center" : "justify-start",
        className
      )}
    >
      {/* Brand Icon Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white transition-transform hover:scale-105">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Shield Outline */}
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            {/* Document Lines inside shield */}
            <path d="M9 10h6" strokeWidth="1.8" />
            <path d="M9 14h4" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {!collapsed && showText && (
        <div className="flex flex-col min-w-0 leading-tight">
          <div className="flex items-center text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <span>Note</span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Guard
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-400">
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
