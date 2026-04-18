"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, Moon, Sun, X } from "lucide-react";

import { siteConfig } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/category/web-development", label: "Categories" },
  { href: "/start-here", label: "Start Here" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    root.classList.toggle("dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const nextValue = !isDarkMode;
    setIsDarkMode(nextValue);
    document.documentElement.classList.toggle("dark", nextValue);
    localStorage.setItem("theme", nextValue ? "dark" : "light");
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/category")) {
      return pathname.startsWith("/category");
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-heading text-2xl font-bold text-primary transition-colors hover:text-primaryDark"
          >
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  isActiveRoute(link.href)
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-textMuted hover:text-textPrimary dark:text-slate-300 dark:hover:text-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-textPrimary transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {isMounted && isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryDark"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-textPrimary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {isMounted && isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-textPrimary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[80] bg-slate-950/95 px-6 py-8 text-white md:hidden">
          <div className="flex items-center justify-between">
            <p className="font-heading text-xl font-bold text-blue-300">{siteConfig.name}</p>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-heading text-3xl font-semibold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 inline-flex w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
