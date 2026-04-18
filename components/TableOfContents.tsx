import type { TocHeading } from "@/lib/types";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) {
    return null;
  }

  return (
    <aside className="sticky top-28 hidden max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
      <p className="font-heading text-base font-semibold text-textPrimary dark:text-slate-100">
        On This Page
      </p>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : "pl-0"}>
            <a
              href={`#${heading.id}`}
              className="block text-sm text-textMuted transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-blue-300"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
