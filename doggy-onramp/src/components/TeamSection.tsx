import React from "react";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  socials: { icon: React.ReactNode; href: string }[];
}

function TeamCard({ name, role, imageUrl, socials }: TeamMemberProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 duration-300"
      style={{
        background: "rgba(8, 18, 45, 0.8)",
        border: "1px solid rgba(0, 212, 255, 0.15)",
        boxShadow: "0 0 24px rgba(0, 100, 255, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.85) saturate(0.9)" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(8, 18, 45, 0.95) 100%)",
          }}
        />
        {/* Glow line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent)",
          }}
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-white text-sm font-bold tracking-wide uppercase mb-1">{name}</h3>
        <p className="text-cyan-400 text-xs mb-4">{role}</p>

        {/* Separator */}
        <div
          className="h-px w-full mb-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,212,255,0.3), transparent)",
          }}
        />

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const teamMembers: TeamMemberProps[] = [
  {
    name: "Enrico Iglesias",
    role: "CEO & Founder",
    imageUrl:
      "https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MjYwMjQ5Nnww&ixlib=rb-4.1.0&q=80&w=400",
    socials: [
      { icon: <Twitter size={14} />, href: "#" },
      { icon: <Linkedin size={14} />, href: "#" },
      { icon: <Github size={14} />, href: "#" },
      { icon: <Instagram size={14} />, href: "#" },
    ],
  },
  {
    name: "Elone Musk",
    role: "CTO & Co-Founder",
    imageUrl:
      "https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwY29ycG9yYXRlfGVufDF8fHx8MTc3MjYyMTI0NHww&ixlib=rb-4.1.0&q=80&w=400",
    socials: [
      { icon: <Twitter size={14} />, href: "#" },
      { icon: <Linkedin size={14} />, href: "#" },
      { icon: <Github size={14} />, href: "#" },
      { icon: <Instagram size={14} />, href: "#" },
    ],
  },
  {
    name: "Elton John",
    role: "Lead Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBnbGFzc2VzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNjg2MTMyfDA&ixlib=rb-4.1.0&q=80&w=400",
    socials: [
      { icon: <Twitter size={14} />, href: "#" },
      { icon: <Linkedin size={14} />, href: "#" },
      { icon: <Github size={14} />, href: "#" },
      { icon: <Instagram size={14} />, href: "#" },
    ],
  },
];

export function TeamSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050d1f 0%, #071530 50%, #050d1f 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(0,80,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            CRYPTODO TEAM
          </h2>
          <div
            className="h-px max-w-xs mx-auto mt-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent)",
            }}
          />
        </div>

        {/* Nav arrows */}
        <div className="flex items-center gap-3 mb-8 justify-end">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.04)" }}
          >
            ‹
          </button>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
            style={{ border: "1px solid rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.04)" }}
          >
            ›
          </button>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}