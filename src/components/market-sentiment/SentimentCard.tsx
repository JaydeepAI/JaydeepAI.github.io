import { motion } from "motion/react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { SentimentData } from "../../lib/marketApi";
import { ProgressRing } from "./ProgressRing";

const CONFIG = {
  BULLISH: { color: "#22C55E", Icon: TrendingUp, emoji: "🟢" },
  BEARISH: { color: "#EF4444", Icon: TrendingDown, emoji: "🔴" },
  NEUTRAL: { color: "#FACC15", Icon: Minus, emoji: "🟡" },
};

export function SentimentCard({ sentiment }: { sentiment: SentimentData }) {
  const { color, Icon, emoji } = CONFIG[sentiment.label];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#12192C] p-6 md:p-8"
      style={{ boxShadow: `0 0 80px -30px ${color}55` }}
    >
      {/* animated ambient gradient */}
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${color}55, transparent 70%)` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-[#94A3B8]">
            Today's Market Sentiment
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {sentiment.label}
            </h1>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <Icon size={28} style={{ color }} />
            </motion.div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5E1]">
            {sentiment.summary}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ProgressRing value={sentiment.confidence} color={color} label="Confidence" />
        </div>
      </div>
    </motion.div>
  );
}
