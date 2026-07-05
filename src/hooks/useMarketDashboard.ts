import { useCallback, useEffect, useState } from "react";
import {
  FearGreedData,
  FiiDiiData,
  IndexQuote,
  MoverRow,
  NewsItem,
  RiskData,
  SectorHeat,
  SentimentData,
  TechnicalSignal,
  getFearGreed,
  getFiiData,
  getMarketData,
  getRiskMeter,
  getSectorHeatmap,
  getSentiment,
  getTechnicalSignals,
  getTopGainers,
  getTopLosers,
  getTopNews,
} from "../lib/marketApi";

export interface MarketDashboardState {
  loading: boolean;
  lastUpdated: Date | null;
  indices: IndexQuote[];
  heatmap: SectorHeat[];
  news: NewsItem[];
  fiiDii: FiiDiiData | null;
  sentiment: SentimentData | null;
  fearGreed: FearGreedData | null;
  gainers: MoverRow[];
  losers: MoverRow[];
  signals: TechnicalSignal[];
  risk: RiskData | null;
  refresh: () => void;
}

export function useMarketDashboard(): MarketDashboardState {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [indices, setIndices] = useState<IndexQuote[]>([]);
  const [heatmap, setHeatmap] = useState<SectorHeat[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [fiiDii, setFiiDii] = useState<FiiDiiData | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null);
  const [gainers, setGainers] = useState<MoverRow[]>([]);
  const [losers, setLosers] = useState<MoverRow[]>([]);
  const [signals, setSignals] = useState<TechnicalSignal[]>([]);
  const [risk, setRisk] = useState<RiskData | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [
      indicesRes,
      heatmapRes,
      newsRes,
      fiiDiiRes,
      sentimentRes,
      fearGreedRes,
      gainersRes,
      losersRes,
      signalsRes,
      riskRes,
    ] = await Promise.all([
      getMarketData(),
      getSectorHeatmap(),
      getTopNews(),
      getFiiData(),
      getSentiment(),
      getFearGreed(),
      getTopGainers(),
      getTopLosers(),
      getTechnicalSignals(),
      getRiskMeter(),
    ]);

    setIndices(indicesRes);
    setHeatmap(heatmapRes);
    setNews(newsRes);
    setFiiDii(fiiDiiRes);
    setSentiment(sentimentRes);
    setFearGreed(fearGreedRes);
    setGainers(gainersRes);
    setLosers(losersRes);
    setSignals(signalsRes);
    setRisk(riskRes);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    loading,
    lastUpdated,
    indices,
    heatmap,
    news,
    fiiDii,
    sentiment,
    fearGreed,
    gainers,
    losers,
    signals,
    risk,
    refresh: load,
  };
}
