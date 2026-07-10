import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { IndexQuote } from "../../lib/marketApi";
import { Sparkline } from "./Sparkline";

const TREND_STYLES = {
  up: { color: "#22C55E", Icon: ArrowUpRight, glow: "rgba(34,197,94,0.25)" },
  down: { color: "#EF4444", Icon: ArrowDownRight, glow: "rgba(239,68,68,0.25)" },
  flat: { color: "#94A3B8", Icon: Minus, glow: "rgba(148,163,184,0.15)" },
};

export function MetricCard({ quote, index = 0 }: { quote: IndexQuote; index?: number }) {
  const { color, Icon, glow } = TREND_STYLES[quote.trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: `0 12px 32px -8px ${glow}` }}
      className="rounded-[20px] border border-white/[0.06] bg-[#12192C] p-4 transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-medium text-[#94A3B8]">{quote.label}</p>
            {quote.isLive && (
              <span className="flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#22C55E]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                </span>
                Live
              </span>
            )}
          </div>
          <p className="mt-1 text-xl font-bold text-white">
            {quote.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>
          {quote.liveNote && (
            <p className="mt-0.5 text-[10px] text-[#94A3B8]">{quote.liveNote}</p>
          )}
        </div>
        <div
          className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          <Icon size={13} />
          {quote.changePercent > 0 ? "+" : ""}
          {quote.changePercent.toFixed(2)}%
        </div>
      </div>
      <div className="mt-2">
        <Sparkline data={quote.sparkline} trend={quote.trend} />
      </div>
    </motion.div>
  );
}
