import { motion } from "motion/react";
import { SectorHeat } from "../../lib/marketApi";

export function HeatmapCard({ sector, index = 0 }: { sector: SectorHeat; index?: number }) {
  const isUp = sector.trend === "up";
  const isFlat = sector.trend === "flat";
  const color = isFlat ? "#94A3B8" : isUp ? "#22C55E" : "#EF4444";

  const intensity = Math.min(Math.abs(sector.changePercent) / 2, 1);
  const bg = isFlat
    ? "rgba(148,163,184,0.08)"
    : isUp
    ? `rgba(34,197,94,${0.08 + intensity * 0.22})`
    : `rgba(239,68,68,${0.08 + intensity * 0.22})`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.06] p-4"
      style={{ backgroundColor: bg, minHeight: 96 }}
    >
      <motion.div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl"
        style={{ backgroundColor: color, opacity: 0.25 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <p className="text-sm font-semibold text-white">{sector.name}</p>
      <p className="text-lg font-bold" style={{ color }}>
        {sector.changePercent > 0 ? "+" : ""}
        {sector.changePercent.toFixed(2)}%
      </p>
    </motion.div>
  );
}
