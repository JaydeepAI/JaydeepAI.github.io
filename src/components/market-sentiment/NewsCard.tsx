import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { NewsItem } from "../../lib/marketApi";

const BADGE = {
  positive: { text: "Positive", color: "#22C55E" },
  negative: { text: "Negative", color: "#EF4444" },
  neutral: { text: "Neutral", color: "#94A3B8" },
};

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  const badge = BADGE[item.sentiment];

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ x: 4 }}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#12192C] p-4 transition-colors hover:border-white/20"
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-white group-hover:text-[#3B82F6]">
          {item.headline}
        </p>
        <p className="mt-1 text-xs text-[#94A3B8]">
          {item.source} · {item.publishedAt}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ color: badge.color, backgroundColor: `${badge.color}1A` }}
        >
          {badge.text}
        </span>
        <ExternalLink size={14} className="text-[#94A3B8] group-hover:text-white" />
      </div>
    </motion.a>
  );
}
