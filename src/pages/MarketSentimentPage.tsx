import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Flame,
  Gauge as GaugeIcon,
  Landmark,
  Newspaper,
  RefreshCw,
  Sparkles,
  Wallet,
} from "lucide-react";

import { useMarketDashboard } from "../hooks/useMarketDashboard";
import { MetricCard } from "../components/market-sentiment/MetricCard";
import { HeatmapCard } from "../components/market-sentiment/HeatmapCard";
import { SentimentCard } from "../components/market-sentiment/SentimentCard";
import { NewsCard } from "../components/market-sentiment/NewsCard";
import { Gauge } from "../components/market-sentiment/Gauge";
import { SectionTitle } from "../components/market-sentiment/SectionTitle";
import { AnimatedCounter } from "../components/market-sentiment/AnimatedCounter";
import { Skeleton } from "../components/market-sentiment/Loader";

function useLastUpdatedLabel(date: Date | null) {
  return useMemo(() => {
    if (!date) return "—";
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }, [date]);
}

function MoodEmoji({ score }: { score: number }) {
  const emoji = score > 65 ? "😄" : score > 40 ? "😐" : "😨";
  const label = score > 65 ? "Greed" : score > 40 ? "Neutral" : "Fear";
  const color = score > 65 ? "#22C55E" : score > 40 ? "#FACC15" : "#EF4444";
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        className="text-6xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        {emoji}
      </motion.span>
      <span className="text-xl font-bold" style={{ color }}>
        {label}
      </span>
      <span className="text-xs text-[#94A3B8]">Score {score}/100</span>
    </div>
  );
}

function MoversTable({
  title,
  rows,
  positive,
}: {
  title: string;
  rows: { company: string; symbol: string; price: number; changePercent: number; volume: string }[];
  positive: boolean;
}) {
  const color = positive ? "#22C55E" : "#EF4444";
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-[20px] border border-white/[0.06] bg-[#12192C] p-4">
      <p className="mb-3 text-sm font-semibold text-white">{title}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-[#94A3B8]">
              <th className="pb-2 font-medium">Company</th>
              <th className="pb-2 font-medium">Price</th>
              <th className="pb-2 font-medium">%</th>
              <th className="pb-2 font-medium">Volume</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.symbol} className="border-t border-white/[0.05]">
                <td className="py-2.5">
                  <p className="font-medium text-white">{row.company}</p>
                  <p className="text-xs text-[#94A3B8]">{row.symbol}</p>
                </td>
                <td className="py-2.5 text-white">₹{row.price.toLocaleString("en-IN")}</td>
                <td className="py-2.5">
                  <span className="flex items-center gap-1 font-semibold" style={{ color }}>
                    <Icon size={13} />
                    {Math.abs(row.changePercent).toFixed(2)}%
                  </span>
                </td>
                <td className="py-2.5 text-[#94A3B8]">{row.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SIGNAL_COLOR = {
  Bullish: "#22C55E",
  Bearish: "#EF4444",
  Neutral: "#FACC15",
};

export default function MarketSentimentPage() {
  const data = useMarketDashboard();
  const lastUpdatedLabel = useLastUpdatedLabel(data.lastUpdated);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatNow = (d: Date) =>
    `${d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true })} · ${d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}`;

  const handleRefresh = async () => {
    setRefreshing(true);
    await data.refresh();
    setRefreshing(false);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ background: "#0B1020" }}
    >
      {/* subtle grid + glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#22C55E]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-8">
        {/* Navbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#22C55E] font-bold text-[#0B1020]">
              DJ
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-white">
                AI Market Sentiment
              </p>
              <p className="text-xs text-[#94A3B8]">Digital Jaydeep · Live Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
              </span>
              Live
            </div>
            <div className="hidden text-xs text-[#94A3B8] sm:block">
              Updated {lastUpdatedLabel}
            </div>
            <div className="hidden text-xs text-[#94A3B8] sm:block ml-3">
              {formatNow(now)}
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.08]"
            >
              <motion.span
                animate={refreshing ? { rotate: 360 } : {}}
                transition={{ repeat: refreshing ? Infinity : 0, duration: 0.8, ease: "linear" }}
              >
                <RefreshCw size={13} />
              </motion.span>
              Refresh
            </button>
            <button
              onClick={() => navigate('/')}
              className="hidden sm:inline-flex ml-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white hover:bg-white/[0.08]"
            >
              Home
            </button>
          </div>
        </div>

        {/* Hero Sentiment */}
        <div className="mb-8">
          {data.loading || !data.sentiment ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <SentimentCard sentiment={data.sentiment} />
          )}
        </div>

        {/* Market Overview */}
        <section className="mb-8">
          <SectionTitle icon={BarChart3} title="Market Overview" subtitle="Key indices, forex & commodities" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.loading
              ? Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
              : data.indices.map((quote, i) => <MetricCard key={quote.symbol} quote={quote} index={i} />)}
          </div>
        </section>

        {/* Sector Heatmap */}
        <section className="mb-8">
          <SectionTitle icon={Flame} title="Market Heatmap" subtitle="Sector performance today" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.loading
              ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
              : data.heatmap.map((sector, i) => (
                  <HeatmapCard key={sector.name} sector={sector} index={i} />
                ))}
          </div>
        </section>

        {/* FII / DII */}
        <section className="mb-8">
          <SectionTitle icon={Landmark} title="FII / DII Activity" subtitle="Institutional flows, ₹ crore" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.loading || !data.fiiDii
              ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)
              : [data.fiiDii.fii, data.fiiDii.dii].map((flow) => {
                  const isUp = flow.trend === "up";
                  const color = isUp ? "#22C55E" : "#EF4444";
                  const pct = Math.min(Math.abs(flow.value) / 20, 100);
                  return (
                    <div
                      key={flow.label}
                      className="rounded-[20px] border border-white/[0.06] bg-[#12192C] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#94A3B8]">{flow.label}</p>
                        <Wallet size={16} className="text-[#94A3B8]" />
                      </div>
                      <p className="mt-1 text-2xl font-bold" style={{ color }}>
                        {isUp ? "+" : "-"}₹<AnimatedCounter value={Math.abs(flow.value)} />
                        Cr
                      </p>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>

        {/* AI Market Summary */}
        <section className="mb-8">
          <SectionTitle icon={Sparkles} title="AI Market Summary" subtitle="Generated from today's data" />
          <div className="rounded-[20px] border border-white/[0.06] bg-[#12192C] p-6">
            {data.loading || !data.sentiment ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
              <div className="space-y-3 text-sm leading-relaxed text-[#CBD5E1]">
                <p>
                  <span className="font-semibold text-white">Overview: </span>
                  {data.sentiment.summary}
                </p>
                <ul className="ml-4 list-disc space-y-1.5 text-[#CBD5E1]">
                  <li>
                    IT and Banking are leading gains, with Bank Nifty consolidating after recent strength.
                  </li>
                  <li>India VIX cooling off signals easing near-term volatility expectations.</li>
                  <li>Rupee holding steady against the dollar supports foreign investor sentiment.</li>
                  <li>Key risk: global crude price swings and any surprise in US rate commentary.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top News */}
          <section className="lg:col-span-2">
            <SectionTitle icon={Newspaper} title="Top News" subtitle="Market-moving headlines" />
            <div className="space-y-3">
              {data.loading
                ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
                : data.news.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
            </div>
          </section>

          <div className="space-y-6">
            {/* Risk Meter */}
            <section>
              <SectionTitle icon={GaugeIcon} title="Risk Meter" />
              <div className="flex items-center justify-center rounded-[20px] border border-white/[0.06] bg-[#12192C] p-6">
                {data.loading || !data.risk ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <Gauge value={data.risk.score} label={data.risk.label} />
                )}
              </div>
            </section>

            {/* Investor Mood */}
            <section>
              <SectionTitle icon={Activity} title="Investor Mood" />
              <div className="flex items-center justify-center rounded-[20px] border border-white/[0.06] bg-[#12192C] p-6">
                {data.loading || !data.fearGreed ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <MoodEmoji score={data.fearGreed.score} />
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Gainers / Losers */}
        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {data.loading ? (
            <>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </>
          ) : (
            <>
              <MoversTable title="Top Gainers" rows={data.gainers} positive />
              <MoversTable title="Top Losers" rows={data.losers} positive={false} />
            </>
          )}
        </section>

        {/* Technical Signals */}
        <section className="mb-10">
          <SectionTitle icon={Activity} title="Technical Signals" subtitle="RSI · MACD · EMA · ADX · Moving Average" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.loading
              ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
              : data.signals.map((signal) => (
                  <div
                    key={signal.name}
                    className="rounded-[20px] border border-white/[0.06] bg-[#12192C] p-4"
                  >
                    <p className="text-xs font-medium text-[#94A3B8]">{signal.name}</p>
                    <p className="mt-1 text-lg font-bold text-white">{signal.value}</p>
                    <span
                      className="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        color: SIGNAL_COLOR[signal.signal],
                        backgroundColor: `${SIGNAL_COLOR[signal.signal]}1A`,
                      }}
                    >
                      {signal.signal}
                    </span>
                  </div>
                ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] pt-6 pb-10 text-center text-xs leading-relaxed text-[#94A3B8]">
          This dashboard is powered by publicly available market data and AI-generated analysis.
          It is intended for educational purposes only and should not be considered investment advice.
          <br />
          © 2026 Jaydeep Patel · Digital Jaydeep. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
