import React from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: string;
  borderColor: string;
}

function Icon3D({ color1, color2, shape }: { color1: string; color2: string; shape: "diamond" | "cube" | "prism" }) {
  if (shape === "diamond") {
    return (
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div
          className="w-full h-full"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            background: `linear-gradient(135deg, ${color1}, ${color2})`,
            boxShadow: `0 0 30px ${color1}66`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            background: `linear-gradient(135deg, ${color1}44, transparent)`,
          }}
        />
      </div>
    );
  }
  if (shape === "cube") {
    return (
      <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${color1}, ${color2})`,
            boxShadow: `0 0 30px ${color1}66, 0 8px 20px ${color2}44`,
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute w-12 h-12 rounded-lg opacity-40"
          style={{
            background: `linear-gradient(135deg, ${color2}, ${color1})`,
            transform: "rotate(-10deg) translateX(4px) translateY(4px)",
          }}
        />
      </div>
    );
  }
  // prism
  return (
    <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
      <div
        className="w-14 h-14"
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          boxShadow: `0 0 30px ${color1}66`,
        }}
      />
    </div>
  );
}

const advantages = [
  {
    id: "01",
    title: "SMART CONTRACT #1",
    description:
      "Smart contracts are self-executing programs stored on a blockchain that run when predetermined conditions are met.",
    color1: "#00d4ff",
    color2: "#0066ff",
    shape: "diamond" as const,
    footer: "Smart contracts are self executing programs stored.",
  },
  {
    id: "02",
    title: "SMART CONTRACT #2",
    description:
      "Smart contracts are self-executing programs stored on a blockchain that run when predetermined conditions are met.",
    color1: "#00e676",
    color2: "#00b248",
    shape: "cube" as const,
    footer: "Smart contracts are self executing programs stored.",
  },
  {
    id: "03",
    title: "SMART CONTRACT #3",
    description:
      "Smart contracts are self-executing programs stored on a blockchain that run when predetermined conditions are met.",
    color1: "#7c4dff",
    color2: "#aa00ff",
    shape: "prism" as const,
    footer: "Smart contracts are self executing programs stored.",
  },
];

export function AdvantagesSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1f 0%, #07101f 50%, #050d1f 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,80,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontSize: "clamp(5rem, 16vw, 14rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.018)",
          letterSpacing: "0.05em",
        }}
      >
        CRYPTO
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle gradient>Advantages</SectionTitle>
        <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto -mt-8 mb-12 leading-relaxed">
          Everyday practice shows that the constant information and propaganda support of our
          activities plays an important role in shaping the progressive training system and ensures
          a wide client base.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 duration-300"
              style={{
                background: "rgba(8, 18, 45, 0.8)",
                border: `1px solid ${adv.color1}33`,
                boxShadow: `0 0 30px ${adv.color1}10, inset 0 0 30px ${adv.color1}05`,
                backdropFilter: "blur(10px)",
              }}
            >
              <Icon3D color1={adv.color1} color2={adv.color2} shape={adv.shape} />
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: adv.color1 }}>
                {adv.title}
              </p>
              <h3 className="text-white text-sm font-semibold mb-3">{adv.description}</h3>
              <div
                className="h-px w-full mb-3"
                style={{ background: `linear-gradient(90deg, transparent, ${adv.color1}44, transparent)` }}
              />
              <p className="text-gray-500 text-xs">{adv.footer}</p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="flex justify-center">
          <Button size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
}