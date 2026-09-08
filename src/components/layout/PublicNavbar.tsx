"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/common/UserProfile";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";
import {
  Home,
  Info,
  Grid2x2,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommonWrapper from "@/components/common/CommonWrapper";



const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Table Demo", href: "/table-demo" },
  { label: "Form Demo", href: "/form-demo" },
];

export default function PublicNavbar() {
  const pathname = usePathname();



  const [isHomePopoverOpen, setIsHomePopoverOpen] = useState(false);
  const homePopoverRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (homePopoverRef.current && !homePopoverRef.current.contains(target)) {
        setIsHomePopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Header Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 h-20 flex items-center shadow-sm">
        <CommonWrapper className="w-full px-4 xl:px-0 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="no-underline hover:opacity-90">
              <Logo className="w-40 md:w-56" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-5 py-2 text-sm font-medium transition-colors no-underline",
                    active
                      ? "border-b-2 border-blue-500 font-semibold text-blue-500 dark:text-blue-400 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">


            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile */}
            <UserProfile />
          </div>
        </CommonWrapper>
      </nav>

      {/* Bottom Mobile Navigation Bar */}
      <div
        className="md:hidden"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        <div className="h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2">
          {/* About */}
          <Link
            href="/about"
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 no-underline text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors",
              pathname === "/about" && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            <Info className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-tight font-medium">About</span>
          </Link>

          {/* Services */}
          <Link
            href="/services"
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 no-underline text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors",
              pathname === "/services" && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            <Grid2x2 className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-tight font-medium">Services</span>
          </Link>

          {/* Center Home FAB */}
          <div
            className="relative -mt-6 flex-1 flex justify-center"
            ref={homePopoverRef}
          >
            <button
              onClick={() => setIsHomePopoverOpen(!isHomePopoverOpen)}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all active:scale-90 focus:outline-none cursor-pointer border border-blue-500"
              aria-label="Open home menu"
            >
              <Home className="w-6 h-6" />
            </button>

            {/* Full-width popover - list style */}
            {isHomePopoverOpen && (
              <div
                style={{ position: "fixed", bottom: "64px", left: 0, right: 0, zIndex: 10000 }}
                className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150"
              >
                {/* Nav Links List */}
                <div>
                  {[
                    { label: "Home", href: "/", active: pathname === "/" },
                    { label: "About", href: "/about", active: pathname === "/about" },
                    { label: "Services", href: "/services", active: pathname === "/services" },
                    { label: "Contact", href: "/contact", active: pathname === "/contact" },
                    { label: "Table Demo", href: "/table-demo", active: pathname === "/table-demo" },
                    { label: "Form Demo", href: "/form-demo", active: pathname === "/form-demo" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsHomePopoverOpen(false)}
                      className={cn(
                        "block px-6 py-4 text-base font-medium no-underline transition-colors",
                        item.active
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="px-5 pt-3 pb-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <Link
                    href="/login"
                    onClick={() => setIsHomePopoverOpen(false)}
                    className="block w-full text-center py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white no-underline transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsHomePopoverOpen(false)}
                    className="block w-full text-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg no-underline transition-colors"
                  >
                    Get Access
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Table Demo */}
          <Link
            href="/table-demo"
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 no-underline text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors",
              pathname === "/table-demo" && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            <Clipboard className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-tight font-medium">Table Demo</span>
          </Link>

          {/* Form Demo */}
          <Link
            href="/form-demo"
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 no-underline text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors",
              pathname === "/form-demo" && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            <Clipboard className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] tracking-tight font-medium">Form Demo</span>
          </Link>
        </div>
      </div>


    </>
  );
}
