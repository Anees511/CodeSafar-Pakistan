"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
