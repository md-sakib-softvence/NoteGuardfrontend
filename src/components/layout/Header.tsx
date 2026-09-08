"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import UserProfile from "@/components/common/UserProfile";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  description?: string;
  onMenuClick?: () => void;
}



export default function Header({ title, description, onMenuClick }: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <header className="relative h-20 bg-primary-background sticky top-0 z-30 flex items-center shrink-0 mx-6 rounded-b-xl shadow-md">
      <div className="flex items-center justify-between w-full px-6">
        {/* Left Side: Hamburger & Title & Description */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-light-background text-secondary-text hover:text-primary-text sm:hidden cursor-pointer shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-primary-text leading-tight truncate">
              {title || "Overview"}
            </h1>
            {description && (
              <p className="text-xs text-muted-blue mt-0.5 font-medium hidden sm:block truncate">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 h-full">
          {/* Search Input */}
          <div className="static sm:relative flex items-center h-full" ref={searchRef}>
            {/* Desktop Search */}
            <div className="relative w-60 hidden lg:block transition-all duration-300">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="size-5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-9 pr-4 h-11 bg-light-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-primary-text placeholder:text-slate-400"
              />
            </div>

            {/* Mobile/Tablet Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-500 hover:text-primary-text hover:bg-light-background rounded-lg transition-colors cursor-pointer lg:hidden"
            >
              <Search className="size-6" />
            </button>

            {/* Mobile/Tablet Search Popover */}
            {isSearchOpen && (
              <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full mt-2 sm:mt-7 w-auto sm:w-72 bg-primary-background border border-border rounded-lg p-2 z-50 shadow-lg animate-in fade-in zoom-in-95 duration-100 lg:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="w-5 h-5 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    autoFocus
                    className="w-full pl-9 pr-4 py-2 bg-light-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-primary-text placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}
          </div>



          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="h-6 w-px bg-border"></div>

          {/* User Profile */}
          <UserProfile />
        </div>
      </div>


    </header>
  );
}
