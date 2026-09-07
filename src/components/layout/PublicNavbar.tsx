"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/common/UserProfile";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Logo from "@/components/common/Logo";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Home,
  Info,
  Grid2x2,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommonWrapper from "@/components/common/CommonWrapper";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New User Registered",
    description: "Alex joined the reseller admin platform as a Manager.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    title: "System Performance Alert",
    description: "Database latency spiked above 250ms on node-1b.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "3",
    title: "Billing Invoice Paid",
    description: "Invoice #1092-B has been paid by Client BaseKit.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    title: "Security Policy Updated",
    description: "Multi-factor authentication (MFA) requirements updated for all administrators.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "5",
    title: "Backup Completed",
    description: "Automated nightly backup completed successfully for database cluster storage.",
    time: "5 hours ago",
    read: true,
  },
];

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

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [isHomePopoverOpen, setIsHomePopoverOpen] = useState(false);
  const homePopoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotifOpen(false);
      }
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
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg relative transition-colors cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className="fixed md:absolute left-4 right-4 md:left-auto md:right-0 mt-2 top-20 md:top-full w-auto md:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 z-50 shadow-lg">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-xs text-slate-800 dark:text-white font-bold uppercase tracking-wider">
                      Notifications
                    </p>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <CheckCheck className="w-4 h-4" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400 flex flex-col items-center gap-1">
                        <BellOff className="w-8 h-8 opacity-40 mb-1" />
                        No notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex gap-3 items-start",
                            !n.read && "bg-blue-50/30 dark:bg-blue-900/10"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline gap-2">
                              <p className={cn("text-xs truncate font-semibold", n.read ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white")}>
                                {n.title}
                              </p>
                              <span className="text-[9px] text-slate-400 shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.description}</p>
                          </div>
                          {!n.read && (
                            <button
                              onClick={() => markAsRead(n.id)}
                              className="text-blue-500 hover:text-blue-700 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full shrink-0 cursor-pointer"
                              title="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1.5 px-3">
                    <button
                      onClick={() => { setIsNotifOpen(false); setIsModalOpen(true); }}
                      className="w-full text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

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

      {/* All Notifications Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[10001] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">All Notifications</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "p-4 rounded-lg border flex gap-3 items-start",
                    n.read
                      ? "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                      : "border-blue-100 dark:border-blue-800/50 bg-blue-50/20 dark:bg-blue-900/10"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={cn("text-sm font-semibold", n.read ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white")}>
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{n.description}</p>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-blue-500 hover:text-blue-700 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full shrink-0 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
