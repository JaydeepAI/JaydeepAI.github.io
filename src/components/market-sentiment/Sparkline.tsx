import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";
import { Trend } from "../../lib/marketApi";

interface SparklineProps {
  data: number[];
  trend: Trend;
}

const COLORS: Record<Trend, string> = {
  up: "#22C55E",
  down: "#EF4444",
  flat: "#94A3B8",
};

export function Sparkline({ data, trend }: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const color = COLORS[trend];

  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.75}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
