"use client";
import { useState } from "react";
import { Menu, X, Hexagon } from "lucide-react";

const navLinks = ["Page 1", "Page 2", "Page 3", "Page 4"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
      style={{
        background: "rgba(5, 13, 31, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 200, 255, 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00d4ff, #0055ff)" }}
          >
            <Hexagon size={14} color="white" fill="white" />
          </div>
          <span
            className="text-white font-bold text-lg tracking-wide"
            style={{ fontFamily: "sans-serif" }}
          >
            CryptoDo
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs text-green-400"
            style={{
              border: "1px solid rgba(74, 222, 128, 0.4)",
              background: "rgba(74, 222, 128, 0.08)",
            }}
          >
            ● Connected
          </span>
          <button className="btn-primary px-5 py-2 rounded text-sm text-white">
            Start a contract
          </button>
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-gray-400 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            ⊕
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mt-4 pb-4 flex flex-col gap-3 px-2"
          style={{ borderTop: "1px solid rgba(0,200,255,0.1)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-400 hover:text-cyan-400 text-sm py-1"
            >
              {link}
            </a>
          ))}
          <button className="btn-primary px-5 py-2 rounded text-sm text-white mt-2 w-fit">
            Start a contract
          </button>
        </div>
      )}

      <style>{`
        .btn-primary {
          background: linear-gradient(135deg, #0055ff 0%, #00aaff 100%);
          box-shadow: 0 0 16px rgba(0, 170, 255, 0.35);
          transition: box-shadow 0.2s, opacity 0.2s;
        }
        .btn-primary:hover {
          box-shadow: 0 0 24px rgba(0, 170, 255, 0.55);
          opacity: 0.92;
        }
      `}</style>
    </nav>
  );
}
