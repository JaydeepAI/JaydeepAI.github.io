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
          <p className="text-xs font-medium text-[#94A3B8]">{quote.label}</p>
          <p className="mt-1 text-xl font-bold text-white">
            {quote.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
          </p>
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
