"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocHeading } from "@/lib/types";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <>
      {/* Desktop TOC */}
      <aside className="sticky top-28 hidden max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl border border-ink-200 bg-white p-5 shadow-sm dark:border-ink-800 dark:bg-ink-900 lg:block">
        <p className="font-heading text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          On This Page
        </p>
        <ul className="mt-4 space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block border-l-2 py-1.5 text-sm transition-all duration-200 ${
                  heading.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === heading.id
                    ? "border-brand-500 text-brand-600 font-medium dark:text-brand-400"
                    : "border-transparent text-ink-500 hover:border-ink-300 hover:text-ink-700 dark:text-ink-400 dark:hover:text-ink-200"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile TOC */}
      <div className="mb-6 rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-4 text-sm font-semibold text-ink-700 dark:text-ink-300"
        >
          On This Page
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <ul className="border-t border-ink-100 p-4 pt-2 space-y-1 dark:border-ink-800">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block py-1.5 text-sm text-ink-500 hover:text-brand-500 dark:text-ink-400 dark:hover:text-brand-400 ${
                    heading.level === 3 ? "pl-4" : "pl-0"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
