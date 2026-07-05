import { motion } from "motion/react";

export function Loader({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className="rounded-full border-2 border-white/15 border-t-[#3B82F6]"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    />
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white/[0.06] ${className}`}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
      />
    </div>
  );
}
