import { motion } from "motion/react";

interface GaugeProps {
  value: number; // 0 - 100
  label: string;
  size?: number;
}

// 0-33 low/green, 34-66 medium/yellow, 67-100 high/red
function colorFor(value: number) {
  if (value <= 33) return "#22C55E";
  if (value <= 66) return "#FACC15";
  return "#EF4444";
}

export function Gauge({ value, label, size = 200 }: GaugeProps) {
  const width = size;
  const height = size / 2 + 24;
  const radius = size / 2 - 10;
  const cx = width / 2;
  const cy = size / 2;

  const angle = (value / 100) * 180;
  const rad = (Math.PI / 180) * (180 - angle);
  const needleX = cx + radius * Math.cos(rad);
  const needleY = cy - radius * Math.sin(rad);

  const color = colorFor(value);

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height}>
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={Math.PI * radius}
          strokeDashoffset={Math.PI * radius * (1 - value / 100)}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <motion.line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <circle cx={cx} cy={cy} r={5} fill="#FFFFFF" />
      </svg>
      <div className="-mt-2 flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {label}
        </span>
        <span className="text-xs text-[#94A3B8]">Risk Score: {value}/100</span>
      </div>
    </div>
  );
}
