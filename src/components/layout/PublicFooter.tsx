"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import CommonWrapper from "@/components/common/CommonWrapper";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Services", href: "/services" },
  { label: "Table Demo", href: "/table-demo" },
  { label: "Form Demo", href: "/form-demo" },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function PublicFooter() {
  return (
    <footer
      className="bg-primary-brand pb-24 md:pb-0"
      style={{ backgroundColor: "var(--primary-brand)" }}
    >
      <CommonWrapper className="px-4 xl:px-0 py-10 text-white">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* About */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base font-bold mb-3 text-white">About Us</h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              We are a team of passionate developers building amazing web
              applications with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base font-bold mb-3 text-white">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-base font-bold mb-3 text-white">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} BaseKit. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </CommonWrapper>
    </footer>
  );
}
