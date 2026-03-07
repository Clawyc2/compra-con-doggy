"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const distributionData = [
  { name: "Community", value: 30, color: "#00d4ff" },
  { name: "Public", value: 20, color: "#3b82f6" },
  { name: "Private", value: 15, color: "#0ea5e9" },
  { name: "Liquidity", value: 12, color: "#22d3ee" },
  { name: "Going listed", value: 13, color: "#06b6d4" },
  { name: "Team", value: 10, color: "#0284c7" },
];

function LegendDot({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span className="text-gray-400 text-xs flex-1">{label}</span>
      <span className="text-white text-xs font-semibold">{value}%</span>
    </div>
  );
}

function TokenomicsDonut() {
  return (
    <div>
      <h3 className="text-white text-sm uppercase tracking-widest mb-2">DISTRIBUTION OF TOKENS</h3>
      <p className="text-gray-500 text-xs mb-1">
        The <span className="text-cyan-400">CRYPTODO</span> company has its own{" "}
        <span className="text-cyan-400 underline cursor-pointer">CDO</span>
      </p>
      <p className="text-gray-500 text-xs mb-8 leading-5">
        It is accepted as a payment for the services, and also purchases are calculated as payment between customers
        and a token which becomes the core of our blockchain ecosystem.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut chart */}
        <div className="relative w-56 h-56 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(5, 13, 31, 0.95)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 12,
                }}
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-white text-2xl font-bold">CDO</span>
            <span className="text-cyan-400 text-xs">Token</span>
          </div>

          {/* Floating legend labels around chart */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-cyan-300 whitespace-nowrap">
            Liquidity
          </div>
          <div className="absolute top-2 -right-12 text-xs text-blue-300 whitespace-nowrap">
            Team
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-sky-300 whitespace-nowrap">
            Private
          </div>
          <div className="absolute top-2 -left-14 text-xs text-cyan-400 whitespace-nowrap">
            Going listed
          </div>
          <div className="absolute bottom-8 -right-14 text-xs text-blue-400 whitespace-nowrap">
            Bounty
          </div>
          <div className="absolute bottom-8 -left-14 text-xs text-cyan-500 whitespace-nowrap">
            Community
          </div>
        </div>

        {/* Legend list */}
        <div className="flex flex-col gap-2.5 min-w-36">
          {distributionData.map((item) => (
            <LegendDot key={item.name} color={item.color} label={item.name} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfitDistribution() {
  return (
    <div>
      <h3 className="text-white text-sm uppercase tracking-widest mb-4">PROFIT DISTRIBUTION</h3>
      <p className="text-gray-400 text-xs leading-6 mb-3">
        <span className="text-cyan-400">60%</span> of all{" "}
        <span className="text-orange-400">CRYPTODO</span> profits are distributed
        to <span className="text-cyan-400">CDO Holders</span> through our{" "}
        <span className="text-cyan-400 underline cursor-pointer">APPs</span>
      </p>
      <p className="text-gray-500 text-xs leading-5 mb-6">
        It is accepted as a payment for the services, and also the purchase are calculated as
        payment between customers and a token which becomes the core of our blockchain ecosystem
        withdraws from circulation.
      </p>

      {/* Distribution bars */}
      <div className="space-y-3">
        {[
          { label: "CDO Holders", pct: 60, color: "#00d4ff" },
          { label: "Development Fund", pct: 20, color: "#3b82f6" },
          { label: "Marketing", pct: 12, color: "#0ea5e9" },
          { label: "Reserve", pct: 8, color: "#22d3ee" },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400 text-xs">{item.label}</span>
              <span className="text-xs font-semibold" style={{ color: item.color }}>
                {item.pct}%
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.pct}%`,
                  background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                  boxShadow: `0 0 8px ${item.color}66`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenomicsSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1f 0%, #071228 50%, #050d1f 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,180,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section title */}
        <h2
          className="text-center text-white mb-16"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700,
            letterSpacing: "0.25em",
          }}
        >
          TOKENOMICS
        </h2>

        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(6, 15, 40, 0.7)",
            border: "1px solid rgba(0, 212, 255, 0.12)",
            boxShadow: "0 0 40px rgba(0, 100, 255, 0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-16">
            <TokenomicsDonut />
            <ProfitDistribution />
          </div>
        </div>
      </div>
    </section>
  );
}
