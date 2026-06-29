"use client";

import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ClicksChartTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const ChartTooltip = ({ active, payload, label }: ClicksChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className="text-primary font-bold">
          {payload[0]?.value} clicks
        </p>
      </div>
    );
  }
  return null;
};

interface ClicksChartProps {
  data: { date: string; clicks: number }[];
  height?: number;
}

export default function ClicksChart({ data, height = 260 }: ClicksChartProps) {
  return (
    <div className={cn("w-full")} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: -16 }}
        >
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tick={{ fill: "var(--muted-foreground)" }}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorClicks)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "var(--primary)",
              stroke: "var(--card)",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
