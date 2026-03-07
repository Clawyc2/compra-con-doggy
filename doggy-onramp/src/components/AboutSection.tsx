import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

function SmartContractCard() {
  return (
    <GlowCard variant="blue" className="max-w-sm mx-auto">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest">SMART CONTRACT #1</p>
          <div className="flex items-center gap-1 mt-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ background: "linear-gradient(135deg, #00d4ff, #0066ff)" }}
            />
            <span className="text-cyan-400 text-xs">CryptoDo</span>
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #00d4ff22, #0066ff44)",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          <span className="text-cyan-400 text-sm">⬡</span>
        </div>
      </div>

      {/* Circular progress placeholder */}
      <div className="flex justify-center my-6">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#contractGrad)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset="55"
            />
            <defs>
              <linearGradient id="contractGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0066ff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-lg font-bold">75%</span>
            <span className="text-gray-400 text-xs">progress</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Staked", value: "12.4K" },
          { label: "APY", value: "18.2%" },
          { label: "Users", value: "3.8K" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-white text-sm font-semibold">{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="space-y-2 mb-5">
        {[
          { label: "Liquidity", pct: 70 },
          { label: "Staking", pct: 45 },
        ].map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{bar.label}</span>
              <span className="text-cyan-400">{bar.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${bar.pct}%`,
                  background: "linear-gradient(90deg, #0066ff, #00d4ff)",
                  boxShadow: "0 0 6px rgba(0,212,255,0.5)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button size="sm" className="w-full">Submit</Button>
    </GlowCard>
  );
}

export function AboutSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1f 0%, #071a38 50%, #050d1f 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,80,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Smart Contract Card */}
          <div>
            <SmartContractCard />
          </div>

          {/* Right: About text */}
          <div>
            <h2
              className="text-white mb-6"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ABOUT COMPANY
            </h2>
            <p className="text-gray-400 text-sm leading-7 mb-4">
              Everyday practice shows that the constant information and propaganda support
              of our activities plays an important role in shaping the progressive training system
              and ensures a wide client base.
            </p>
            <p className="text-gray-400 text-sm leading-7 mb-4">
              Everyday practice shows that the constant information and propaganda support
              of our activities plays an important role in shaping the progressive training system
              and ensures a wide client base.
            </p>
            <p className="text-gray-400 text-sm leading-7 mb-6">
              <span className="text-cyan-400 font-semibold">SMART CONTRACT</span> is a decentralized
              blockchain application.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
