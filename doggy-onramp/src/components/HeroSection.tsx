import { Button } from "@/components/ui/Button";

// Floating crypto icon component
function CryptoIcon({ symbol, color, top, left, size = 48, delay = 0 }: {
  symbol: string; color: string; top: string; left: string; size?: number; delay?: number;
}) {
  return (
    <div
      className="absolute flex items-center justify-center rounded-2xl text-white font-bold"
      style={{
        top, left, width: size, height: size,
        background: `linear-gradient(135deg, ${color}33, ${color}88)`,
        border: `1px solid ${color}66`,
        boxShadow: `0 0 20px ${color}44`,
        fontSize: size * 0.3,
        animation: `floatIcon 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {symbol}
    </div>
  );
}

// Stylized phone mockup
function PhoneMockup() {
  return (
    <div className="relative w-48 md:w-64 mx-auto">
      {/* Phone body */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d1f45 0%, #050d1f 100%)",
          border: "2px solid rgba(0, 200, 255, 0.35)",
          boxShadow: "0 0 40px rgba(0, 170, 255, 0.25), 0 0 80px rgba(0, 80, 255, 0.15)",
          height: "340px",
          padding: "16px",
        }}
      >
        {/* Screen inner */}
        <div
          className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden"
          style={{ background: "rgba(5, 13, 31, 0.6)" }}
        >
          {/* Floating icons on phone screen */}
          <div className="relative w-full h-full">
            {/* Top icon */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg, #ff6b35, #ff9500)",
                  boxShadow: "0 0 20px rgba(255, 107, 53, 0.5)",
                }}
              >
                ◈
              </div>
            </div>
            {/* Middle left */}
            <div className="absolute top-1/3 left-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                }}
              >
                ◆
              </div>
            </div>
            {/* Middle right */}
            <div className="absolute top-1/3 right-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg, #00e676, #00b248)",
                  boxShadow: "0 0 20px rgba(0, 230, 118, 0.5)",
                }}
              >
                ▲
              </div>
            </div>
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #6200ea, #aa00ff)",
                  boxShadow: "0 0 24px rgba(162, 0, 255, 0.6)",
                  fontSize: 20,
                }}
              >
                ⬡
              </div>
            </div>
            {/* Bottom */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff4081, #c51162)",
                  boxShadow: "0 0 20px rgba(255, 64, 129, 0.5)",
                }}
              >
                ★
              </div>
            </div>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 300">
              <line x1="100" y1="40" x2="40" y2="110" stroke="#00d4ff" strokeWidth="1" />
              <line x1="100" y1="40" x2="160" y2="110" stroke="#00d4ff" strokeWidth="1" />
              <line x1="40" y1="110" x2="100" y2="150" stroke="#00d4ff" strokeWidth="1" />
              <line x1="160" y1="110" x2="100" y2="150" stroke="#00d4ff" strokeWidth="1" />
              <line x1="100" y1="150" x2="100" y2="220" stroke="#00d4ff" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Outer glow ring */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,170,255,0.08) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050d1f 0%, #071530 50%, #050d1f 100%)" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,100,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,200,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.02)",
          letterSpacing: "0.1em",
          userSelect: "none",
        }}
      >
        CRYPTO
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h1
              className="text-white mb-4"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #ffffff 40%, #00d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CryptoDo
            </h1>
            <p className="text-gray-400 mb-3 text-sm uppercase tracking-widest">
              THE BEST crypto smart-contract to make better future
            </p>
            <p className="text-gray-300 mb-2 text-sm">
              Start building your smart contract with{" "}
              <span className="text-cyan-400 font-semibold">CRYPTODO</span>
            </p>
            <div className="mt-8">
              <Button size="lg">Start a contract</Button>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,13,31,0.8))" }}
      />
    </section>
  );
}
