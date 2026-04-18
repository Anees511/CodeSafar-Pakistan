"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="relative z-[60] bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 text-white animate-fade-in">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2 text-center text-xs sm:text-sm font-medium">
        <span>
          🚀 New article every week — Join readers learning to code in Pakistan
        </span>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="ml-2 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
