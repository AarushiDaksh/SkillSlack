"use client";
import * as React from "react";

const RetroGrid: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* crisp grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]
          bg-[size:36px_36px]
        "
      />
      {/* soft center glow */}
      <div
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[70vw] h-[70vh] rounded-full blur-[120px] opacity-60
          bg-[radial-gradient(circle,rgba(0,255,128,0.12)_0%,rgba(0,128,255,0.10)_70%,transparent_100%)]
          dark:bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,rgba(56,189,248,0.18)_70%,transparent_100%)]
        "
      />
    </div>
  );
};

export default RetroGrid;
export { RetroGrid }; // optional named export
