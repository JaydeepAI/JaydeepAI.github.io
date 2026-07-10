/**
 * marketApi.ts
 * -----------------------------------------------------------------------
 * Data layer for the AI Market Sentiment Analyzer.
 *
 * LIVE DATA (as of now): USD/INR and Crude Oil are backed by a small
 * `public/market-data.json` file that a scheduled GitHub Action
 * refreshes from Alpha Vantage during NSE market hours (see
 * .github/workflows/update-market-data.yml + scripts/fetch-market-data.mjs).
 * Everything else stays on realistic mock data, exactly as before.
 *
 * FALLBACK BEHAVIOUR: if market-data.json is missing, stale, unreachable,
 * or malformed for any reason, getMarketData() silently falls back to
 * the mock values below. The page never shows an empty/error state.
 * ------------------------------------------------------------------- */

export type Trend = "up" | "down" | "flat";

export interface IndexQuote {
  symbol: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
  trend: Trend;
  sparkline: number[];
  isLive?: boolean;
  liveNote?: string;
}

export interface SectorHeat {
  name: string;
  changePercent: number;
  trend: Trend;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  publishedAt: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

export interface FiiDiiData {
  fii: { label: string; value: number; trend: Trend };
  dii: { label: string; value: number; trend: Trend };
}

export interface SentimentData {
  label: "BULLISH" | "BEARISH" | "NEUTRAL";
  confidence: number;
  summary: string;
}

export interface FearGreedData {
  score: number; // 0 - 100
  label: "Fear" | "Neutral" | "Greed" | "Extreme Fear" | "Extreme Greed";
}

export interface MoverRow {
  company: string;
  symbol: string;
  price: number;
  changePercent: number;
  volume: string;
}

export interface TechnicalSignal {
  name: string;
  value: string;
  signal: "Bullish" | "Bearish" | "Neutral";
}

export interface RiskData {
  score: number; // 0 - 100
  label: "Low" | "Medium" | "High";
}

interface LiveMarketFile {
  lastUpdatedIso?: string;
  marketOpen?: boolean;
  usdInr?: { value: number; updatedAt: string };
  crudeWti?: { value: number; updatedAt: string };
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomWalk = (base: number, points = 20, volatility = 0.006) => {
  const series = [base];
  for (let i = 1; i < points; i++) {
    const last = series[i - 1];
    const move = last * volatility * (Math.random() - 0.5) * 2;
    series.push(Number((last + move).toFixed(2)));
  }
  return series;
};

const trendFromChange = (change: number): Trend =>
  change > 0 ? "up" : change < 0 ? "down" : "flat";

// Reference "previous close" values used only to compute a %change for
// the live figures — Alpha Vantage's free tier doesn't hand us a
// previous-close for these endpoints without burning another request.
const PREV_CLOSE_USDINR = 85.52;
const PREV_CLOSE_CRUDE_INR_APPROX = 6536;

/** Reads the JSON file the GitHub Action writes. Returns null on any failure. */
async function getLiveOverrides(): Promise<LiveMarketFile | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}market-data.json`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data: LiveMarketFile = await res.json();
    if (!data || (!data.usdInr && !data.crudeWti)) return null;
    return data;
  } catch {
    return null;
  }
}

/** Core index & commodity/forex quotes shown in the Market Overview grid. */
export async function getMarketData(): Promise<IndexQuote[]> {
  await wait(500);

  const raw: Omit<IndexQuote, "trend" | "sparkline">[] = [
    { symbol: "NIFTY", label: "NIFTY 50", value: 24812.35, change: 148.2, changePercent: 0.6 },
    { symbol: "SENSEX", label: "SENSEX", value: 81523.14, change: 412.6, changePercent: 0.51 },
    { symbol: "BANKNIFTY", label: "BANK NIFTY", value: 52890.75, change: -96.4, changePercent: -0.18 },
    { symbol: "INDIAVIX", label: "INDIA VIX", value: 13.42, change: -0.58, changePercent: -4.14 },
    { symbol: "USDINR", label: "USD / INR", value: 85.61, change: 0.09, changePercent: 0.11 },
    { symbol: "GOLD", label: "GOLD (MCX)", value: 71230, change: 340, changePercent: 0.48 },
    { symbol: "CRUDE", label: "CRUDE OIL", value: 6482, change: -54, changePercent: -0.82 },
  ];

  const quotes: IndexQuote[] = raw.map((r) => ({
    ...r,
    trend: trendFromChange(r.change),
    sparkline: randomWalk(r.value, 20),
  }));

  // Try to layer in live data. If anything about this fails, the mock
  // values above are left completely untouched.
  const live = await getLiveOverrides();
  if (!live) return quotes;

  if (live.usdInr) {
    const q = quotes.find((x) => x.symbol === "USDINR");
    if (q) {
      const change = Number((live.usdInr.value - PREV_CLOSE_USDINR).toFixed(4));
      const changePercent = Number(((change / PREV_CLOSE_USDINR) * 100).toFixed(2));
      q.value = live.usdInr.value;
      q.change = change;
      q.changePercent = changePercent;
      q.trend = trendFromChange(change);
      q.sparkline = randomWalk(live.usdInr.value, 20, 0.001);
      q.isLive = true;
    }
  }

  if (live.crudeWti) {
    const q = quotes.find((x) => x.symbol === "CRUDE");
    if (q) {
      const usdInrForConversion = live.usdInr?.value ?? PREV_CLOSE_USDINR;
      const approxInr = Number((live.crudeWti.value * usdInrForConversion).toFixed(2));
      const change = Number((approxInr - PREV_CLOSE_CRUDE_INR_APPROX).toFixed(2));
      const changePercent = Number(((change / PREV_CLOSE_CRUDE_INR_APPROX) * 100).toFixed(2));
      q.value = approxInr;
      q.change = change;
      q.changePercent = changePercent;
      q.trend = trendFromChange(change);
      q.sparkline = randomWalk(approxInr, 20, 0.004);
      q.isLive = true;
      q.liveNote = "WTI × USD/INR, approx.";
    }
  }

  return quotes;
}

/** Sector heatmap tiles. */
export async function getSectorHeatmap(): Promise<SectorHeat[]> {
  await wait(400);
  const sectors = [
    "IT",
    "BANKING",
    "AUTO",
    "PHARMA",
    "ENERGY",
    "FMCG",
    "METAL",
    "REALTY",
  ];
  return sectors.map((name) => {
    const changePercent = Number(((Math.random() - 0.45) * 3).toFixed(2));
    return { name, changePercent, trend: trendFromChange(changePercent) };
  });
}

/** Latest market-moving headlines. */
export async function getTopNews(): Promise<NewsItem[]> {
  await wait(450);
  return [
    {
      id: "n1",
      headline: "RBI holds repo rate steady, signals continued liquidity support",
      source: "Economic Times",
      publishedAt: "2h ago",
      sentiment: "positive",
      url: "https://economictimes.indiatimes.com/",
    },
    {
      id: "n2",
      headline: "IT majors rally as US tech spending outlook improves",
      source: "Moneycontrol",
      publishedAt: "3h ago",
      sentiment: "positive",
      url: "https://www.moneycontrol.com/",
    },
    {
      id: "n3",
      headline: "Crude oil prices dip on demand concerns, energy stocks under pressure",
      source: "Livemint",
      publishedAt: "5h ago",
      sentiment: "negative",
      url: "https://www.livemint.com/",
    },
    {
      id: "n4",
      headline: "FIIs turn net buyers for the third straight session",
      source: "Business Standard",
      publishedAt: "6h ago",
      sentiment: "positive",
      url: "https://www.business-standard.com/",
    },
    {
      id: "n5",
      headline: "Auto sector volumes flat as festive demand yet to kick in",
      source: "CNBC-TV18",
      publishedAt: "8h ago",
      sentiment: "neutral",
      url: "https://www.cnbctv18.com/",
    },
  ];
}

/** Foreign / Domestic Institutional Investor flows, in ₹ crore. */
export async function getFiiData(): Promise<FiiDiiData> {
  await wait(350);
  return {
    fii: { label: "Today's FII", value: 1284, trend: "up" },
    dii: { label: "Today's DII", value: 962, trend: "up" },
  };
}

/** AI-generated overall sentiment + written summary for the hero card. */
export async function getSentiment(): Promise<SentimentData> {
  await wait(600);
  return {
    label: "BULLISH",
    confidence: 82,
    summary:
      "Broad-based buying in IT and banking is lifting the market, aided by a stable rupee and falling volatility. FII inflows have turned positive for a third session, suggesting improving foreign investor confidence. Watch crude oil and global rate cues for near-term risk.",
  };
}

/** Fear & Greed style investor mood score. */
export async function getFearGreed(): Promise<FearGreedData> {
  await wait(300);
  const score = 68;
  const label =
    score > 75 ? "Extreme Greed" : score > 55 ? "Greed" : score > 45 ? "Neutral" : score > 25 ? "Fear" : "Extreme Fear";
  return { score, label };
}

/** Top gaining stocks table. */
export async function getTopGainers(): Promise<MoverRow[]> {
  await wait(400);
  return [
    { company: "Tata Consultancy Services", symbol: "TCS", price: 4128.5, changePercent: 3.42, volume: "2.1M" },
    { company: "Infosys", symbol: "INFY", price: 1842.15, changePercent: 2.98, volume: "5.4M" },
    { company: "HDFC Bank", symbol: "HDFCBANK", price: 1712.4, changePercent: 2.11, volume: "8.7M" },
    { company: "Larsen & Toubro", symbol: "LT", price: 3654.9, changePercent: 1.87, volume: "1.3M" },
    { company: "ICICI Bank", symbol: "ICICIBANK", price: 1289.6, changePercent: 1.52, volume: "6.2M" },
  ];
}

/** Top losing stocks table. */
export async function getTopLosers(): Promise<MoverRow[]> {
  await wait(400);
  return [
    { company: "Tata Motors", symbol: "TATAMOTORS", price: 968.2, changePercent: -2.64, volume: "9.8M" },
    { company: "ONGC", symbol: "ONGC", price: 268.35, changePercent: -1.98, volume: "4.5M" },
    { company: "Coal India", symbol: "COALINDIA", price: 452.1, changePercent: -1.45, volume: "3.1M" },
    { company: "Sun Pharma", symbol: "SUNPHARMA", price: 1642.75, changePercent: -1.12, volume: "1.9M" },
    { company: "Hindalco", symbol: "HINDALCO", price: 678.4, changePercent: -0.86, volume: "2.6M" },
  ];
}

/** RSI / MACD / EMA / ADX / Moving Average signal readout. */
export async function getTechnicalSignals(): Promise<TechnicalSignal[]> {
  await wait(350);
  return [
    { name: "RSI (14)", value: "61.4", signal: "Bullish" },
    { name: "MACD", value: "+42.6", signal: "Bullish" },
    { name: "EMA (20)", value: "Above Price", signal: "Bullish" },
    { name: "ADX (14)", value: "24.8", signal: "Neutral" },
    { name: "Moving Avg (50/200)", value: "Golden Cross", signal: "Bullish" },
  ];
}

/** Overall market risk gauge. */
export async function getRiskMeter(): Promise<RiskData> {
  await wait(300);
  return { score: 34, label: "Low" };
}
