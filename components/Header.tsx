"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, Moon, Sun, X } from "lucide-react";

import { siteConfig } from "@/lib/utils";
import AnnouncementBar from "@/components/AnnouncementBar";

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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    root.classList.toggle("dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
          hasScrolled
            ? "border-brand-500/10 bg-white/95 shadow-sm shadow-brand-500/5 dark:border-brand-500/20 dark:bg-ink-950/90"
            : "border-transparent bg-white/80 dark:bg-ink-950/80"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-500 text-[11px] font-extrabold text-white transition-transform group-hover:scale-110">
              CS
            </div>
            <span className="font-heading text-lg font-bold">
              <span className="text-brand-600 dark:text-brand-400">
                CodeSafar
              </span>
              <span className="text-ink-400 dark:text-ink-500 font-normal ml-1 hidden sm:inline">
                Pakistan
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  isActiveRoute(link.href)
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
                }`}
              >
                {link.label}
                {isActiveRoute(link.href) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-brand-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-all duration-200 hover:border-brand-400 hover:text-brand-500 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
            >
              {isMounted && isDarkMode ? (
                <Sun className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <Moon className="h-4 w-4 transition-transform duration-300" />
              )}
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:from-brand-600 hover:to-indigo-600 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-300"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[80] bg-ink-950/98 px-6 py-8 text-white md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-500 text-[11px] font-extrabold text-white">
                CS
              </div>
              <span className="font-heading text-lg font-bold text-brand-400">
                CodeSafar
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 hover:border-brand-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-heading text-2xl font-semibold py-3 px-4 rounded-xl transition-colors ${
                  isActiveRoute(link.href)
                    ? "text-brand-400 bg-brand-500/10"
                    : "text-ink-200 hover:text-white hover:bg-ink-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-6 inline-flex w-fit rounded-full bg-gradient-to-r from-brand-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
