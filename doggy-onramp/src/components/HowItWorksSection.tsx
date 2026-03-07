import { GlowCard } from "@/components/ui/GlowCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <GlowCard variant="cyan" className="h-full" padding="p-5">
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #0066ff, #00d4ff)",
            boxShadow: "0 0 12px rgba(0, 170, 255, 0.5)",
          }}
        >
          {step}
        </div>
        <h3 className="text-white text-sm font-semibold pt-0.5">{title}</h3>
      </div>
      <p className="text-gray-400 text-xs leading-5">{description}</p>
    </GlowCard>
  );
}

const steps = [
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
  {
    title: "Everyday practice",
    description:
      "Everyday practice shows that the constant information and propaganda support of our activities plays an important role in shaping the progressive training system.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1f 0%, #060f25 100%)" }}
    >
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-start pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: "clamp(5rem, 14vw, 12rem)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.015)",
          letterSpacing: "0.05em",
          paddingLeft: "2rem",
        }}
      >
        HOW
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h2
              className="text-white"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}
            >
              HOW IT WORKS
            </h2>
            <div
              className="h-px flex-1 min-w-16 max-w-32"
              style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.4), transparent)" }}
            />
          </div>
          <Button variant="outline" size="sm">Documentary</Button>
        </div>

        {/* Steps grid */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(8, 20, 50, 0.6)",
            border: "1px solid rgba(0, 212, 255, 0.1)",
            boxShadow: "0 0 40px rgba(0, 100, 255, 0.06)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={i + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
