import Link from "next/link";

import { CATEGORIES } from "@/lib/types";
import { siteConfig } from "@/lib/utils";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/start-here", label: "Start Here" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-2xl font-bold">{siteConfig.name}</h3>
          <p className="mt-4 text-slate-300">{siteConfig.tagline}</p>
          <p className="mt-3 text-sm text-slate-400">Made for Pakistani students</p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-slate-300">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold">Categories</h4>
          <ul className="mt-4 space-y-3 text-slate-300">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-slate-400 md:flex-row">
          <p>Copyright {year} {siteConfig.name}. All rights reserved.</p>
          <p>Built with Next.js and ❤️ in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
