import Link from "next/link";
import { Globe, ExternalLink, Send } from "lucide-react";

import { CATEGORIES } from "@/lib/types";
import { siteConfig } from "@/lib/utils";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/start-here", label: "Start Here" },
];

const socialLinks = [
  { href: "https://github.com/Anees040", label: "GitHub", icon: Globe },
  { href: "https://linkedin.com", label: "LinkedIn", icon: ExternalLink },
  { href: "https://twitter.com", label: "Twitter", icon: Send },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-brand-500/20 bg-ink-950 text-white noise-texture">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-500 text-[11px] font-extrabold text-white">
              CS
            </div>
            <span className="font-heading text-lg font-bold">
              <span className="gradient-text">CodeSafar</span>
            </span>
          </div>
          <p className="mt-4 text-ink-300">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm text-ink-500">
            🇵🇰 Made for Pakistani students
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-800 text-ink-400 transition-all duration-200 hover:border-brand-500 hover:text-brand-400 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-white">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-3 text-ink-400">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-brand-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-white">
            Categories
          </h4>
          <ul className="mt-4 space-y-3 text-ink-400">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="transition-colors duration-200 hover:text-brand-400"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-ink-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-ink-500 md:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Crafted with ☕ and late nights in Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  );
}
