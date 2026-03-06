"use client";

import { useState, useEffect, useRef } from "react";

const DOGGY_PRICE_MXN = 0.000034;
const DOGGY_PRICE_USD = 0.00000234;
const USD_MXN = 17.2;
const COMMISSION = 0.03;

const PRESETS = [50, 100, 200, 500, 1000, 2000];

const PAYMENT_METHODS = [
  { id: "spei", label: "SPEI", icon: "🏦", sub: "Transferencia interbancaria", badge: "Recomendado", badgeColor: "#22c55e", fee: 0, time: "~2 min" },
  { id: "card", label: "Tarjeta débito / crédito", icon: "💳", sub: "Visa, Mastercard, AMEX", badge: null, fee: 0.015, time: "~1 min" },
  { id: "oxxo", label: "OXXO Pay", icon: "🟢", sub: "Pago en efectivo en OXXO", badge: null, fee: 0, time: "~15 min" },
  { id: "mp_wallet", label: "Saldo MercadoPago", icon: "💰", sub: "Usa tu saldo MP directamente", badge: "Rápido", badgeColor: "#3b82f6", fee: 0, time: "Inmediato" },
];

const STEPS_FLOW = [
  { n: 1, title: "MercadoPago abre el checkout", desc: "Elige SPEI como método de pago", icon: "🏦" },
  { n: 2, title: "Realiza el SPEI", desc: "Recibes la CLABE destino en pantalla", icon: "📲" },
  { n: 3, title: "Webhook confirma", desc: "El sistema compra $DOGGY vía Jupiter en PumpSwap", icon: "⚡" },
  { n: 4, title: "$DOGGY en tu wallet", desc: "Llega automáticamente a tu wallet Privy", icon: "🐶" },
];

interface DbUser {
  id: string;
  privy_did: string;
  email: string;
  name: string;
  avatar_url?: string;
  wallet_address?: string;
  created_at: string;
}

function NumInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) return;
    if (!/[\d.]/.test(e.key)) e.preventDefault();
  };
  return (
    <div style={{ position: "relative" }}>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        min={50}
        placeholder="200"
        style={{
          width: "100%", background: "transparent", border: "none",
          fontSize: 48, fontWeight: 800, color: "#fff", fontFamily: "'Sora',sans-serif",
          outline: "none", letterSpacing: -2, padding: 0,
        }}
      />
      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontSize: 16, fontWeight: 700, color: "#555", letterSpacing: 1 }}>MXN</div>
    </div>
  );
}

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
      background: done ? "#22c55e" : active ? "#f59e0b" : "#1a1a2a",
      border: `2px solid ${done ? "#22c55e" : active ? "#f59e0b" : "#333"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 800, color: done ? "#000" : active ? "#000" : "#555",
      transition: "all .4s", boxShadow: active ? "0 0 12px #f59e0b88" : done ? "0 0 8px #22c55e44" : "none"
    }}>
      {done ? "✓" : n}
    </div>
  );
}

interface BuyPageNewProps {
  dbUser?: DbUser | null;
}

export default function BuyPageNew({ dbUser }: BuyPageNewProps) {
  const [amount, setAmount] = useState("200");
  const [method, setMethod] = useState("spei");
  const [step, setStep] = useState(0);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [countdown, setCountdown] = useState(120);
  const [pulse, setPulse] = useState(false);

  const mxn = parseFloat(amount) || 0;
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === method);
  const extraFee = mxn * (selectedMethod?.fee || 0);
  const commission = mxn * COMMISSION;
  const net = mxn - commission - extraFee;
  const doggyReceived = net / DOGGY_PRICE_MXN;
  const validAmount = mxn >= 50;

  // Wallet real del usuario
  const walletDisplay = dbUser?.wallet_address 
    ? `${dbUser.wallet_address.slice(0, 8)}...${dbUser.wallet_address.slice(-6)}`
    : "Sin wallet";

  useEffect(() => {
    if (step !== 2) return;
    if (countdown <= 0) { setStep(3); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  useEffect(() => {
    if (step !== 2) return;
    const pcts = [0, 0.25, 0.55, 0.85];
    const total = 120;
    const elapsed = total - countdown;
    const pct = elapsed / total;
    const fs = pcts.findLastIndex(p => pct >= p);
    setActiveFlowStep(Math.max(0, fs));
  }, [countdown, step]);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(t);
  }, []);

  const handlePay = () => {
    if (!validAmount) return;
    setStep(1);
    setTimeout(() => setStep(2), 1200);
  };

  const fmt = (n: number) => n.toLocaleString("es-MX", { maximumFractionDigits: 0 });
  const fmtDoggy = (n: number) => n >= 1e6 ? `${(n/1e6).toFixed(3)}M` : n.toLocaleString("es-MX", { maximumFractionDigits: 0 });

  return (
    <div style={{ fontFamily: "'Sora','Nunito',sans-serif", background: "transparent", minHeight: "100%", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #f59e0b44; border-radius: 4px; }
        @keyframes fadeUp { from { opacity:0;transform:translateY(16px) } to { opacity:1;transform:translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px #f59e0b22} 50%{box-shadow:0 0 40px #f59e0b55,0 0 80px #f59e0b22} }
        @keyframes ticker { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        @keyframes progress { from{width:0%} to{width:100%} }
        @keyframes successPop { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        .preset-btn:hover { background:#f59e0b22!important; border-color:#f59e0b88!important; color:#f59e0b!important; }
        .method-card:hover { border-color:#f59e0b44!important; background:#ffffff05!important; }
        .pay-btn:hover:not(:disabled) { transform:translateY(-2px)!important; box-shadow:0 8px 40px #f59e0baa!important; }
        .pay-btn:active:not(:disabled) { transform:translateY(0)!important; }
      `}</style>

      {/* STEP 0 — FORM */}
      {step === 0 && (
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 0 36px", animation: "fadeUp .4s ease" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>Comprar $DOGGY <span style={{ color: "#f59e0b" }}>⚡</span></h1>
            <div style={{ fontSize: 13, color: "#666" }}>Paga con SPEI desde cualquier banco mexicano · Sin KYC · Mínimo $50 MXN</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

            {/* LEFT — Calculator */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Amount input */}
              <div style={{ background: "linear-gradient(135deg,#111118,#14141f)", border: "1px solid #ffffff12", borderRadius: 20, padding: "28px 28px 20px", position: "relative", overflow: "hidden", animation: "glow 4s ease-in-out infinite" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, background: "radial-gradient(circle,#f59e0b0d,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 12 }}>MONTO EN MXN</div>
                <NumInput value={amount} onChange={setAmount} />
                <div style={{ height: 1, background: "linear-gradient(90deg,#f59e0b44,transparent)", margin: "16px 0" }} />

                {/* Presets */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {PRESETS.map(p => (
                    <button key={p} className="preset-btn" onClick={() => setAmount(String(p))} style={{
                      background: amount === String(p) ? "#f59e0b22" : "#ffffff08",
                      border: `1px solid ${amount === String(p) ? "#f59e0b" : "#ffffff12"}`,
                      color: amount === String(p) ? "#f59e0b" : "#666",
                      borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700,
                      cursor: "pointer", transition: "all .2s", fontFamily: "inherit"
                    }}>${fmt(p)}</button>
                  ))}
                </div>

                {!validAmount && mxn > 0 && (
                  <div style={{ marginTop: 12, fontSize: 12, color: "#ef4444", background: "#ef444412", border: "1px solid #ef444430", borderRadius: 8, padding: "8px 12px" }}>
                    ⚠️ El monto mínimo es $50 MXN
                  </div>
                )}
              </div>

              {/* Recibirás */}
              <div style={{ background: "linear-gradient(135deg,#0d1a0d,#111a11)", border: "1px solid #22c55e22", borderRadius: 16, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#22c55e", letterSpacing: 1.5, marginBottom: 4 }}>RECIBIRÁS APROXIMADAMENTE</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e", letterSpacing: -1, animation: "ticker 1.5s ease-in-out infinite" }}>
                    {validAmount ? fmtDoggy(doggyReceived) : "—"} <span style={{ fontSize: 16, fontWeight: 600, color: "#4ade80" }}>$DOGGY</span>
                  </div>
                </div>
                <div style={{ fontSize: 36 }}>🐶</div>
              </div>

              {/* Payment Method */}
              <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: "20px 24px" }}>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 14 }}>MÉTODO DE PAGO</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PAYMENT_METHODS.map(m => (
                    <div key={m.id} className="method-card" onClick={() => setMethod(m.id)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: method === m.id ? "#f59e0b0d" : "transparent",
                      border: `1px solid ${method === m.id ? "#f59e0b55" : "#ffffff0a"}`,
                      borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all .2s"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, background: "#ffffff08", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{m.icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: method === m.id ? "#f59e0b" : "#ccc", display: "flex", alignItems: "center", gap: 8 }}>
                            {m.label}
                            {m.badge && <span style={{ fontSize: 10, background: m.badgeColor + "20", color: m.badgeColor, border: `1px solid ${m.badgeColor}44`, borderRadius: 20, padding: "2px 8px", fontWeight: 800 }}>{m.badge}</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{m.sub} · {m.time}</div>
                        </div>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${method === m.id ? "#f59e0b" : "#333"}`, background: method === m.id ? "#f59e0b" : "transparent", transition: "all .2s", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Flow steps */}
              <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: "20px 24px" }}>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 16 }}>FLUJO DE PAGO</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {STEPS_FLOW.map((s, i) => (
                    <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < STEPS_FLOW.length - 1 ? 20 : 0, position: "relative" }}>
                      {i < STEPS_FLOW.length - 1 && (
                        <div style={{ position: "absolute", left: 13, top: 28, width: 2, height: "calc(100% - 8px)", background: "linear-gradient(#f59e0b44,transparent)" }} />
                      )}
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f59e0b18", border: "1px solid #f59e0b44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, color: "#f59e0b", fontWeight: 800 }}>{s.n}</div>
                      <div style={{ paddingTop: 4 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#ccc" }}><span style={{ color: "#f59e0b" }}>{s.icon} {s.title}</span></div>
                        <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Order Summary */}
            <div style={{ position: "sticky", top: 24 }}>
              <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 20, padding: "24px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#888", letterSpacing: 1, marginBottom: 20 }}>RESUMEN DE ORDEN</div>
                {[
                  { label: "Pagas", value: `$${fmt(mxn)} MXN`, color: "#fff" },
                  { label: `Comisión (3%)`, value: `-$${commission.toFixed(2)} MXN`, color: "#888" },
                  ...(extraFee > 0 ? [{ label: `Fee ${selectedMethod?.label}`, value: `-$${extraFee.toFixed(2)} MXN`, color: "#888" }] : []),
                  { label: "Precio $DOGGY", value: `$${DOGGY_PRICE_USD}`, color: "#888" },
                  { label: "Red", value: "Solana ⚡", color: "#9945FF" },
                  { label: "Tiempo estimado", value: selectedMethod?.time || "~2 min", color: "#22c55e" },
                  { label: "KYC", value: "No requerido ✓", color: "#22c55e" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #ffffff07" }}>
                    <div style={{ fontSize: 13, color: "#666" }}>{row.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: row.color, textAlign: "right" }}>{row.value}</div>
                  </div>
                ))}

                {/* Recibes highlight */}
                <div style={{ background: "linear-gradient(135deg,#f59e0b15,#f59e0b08)", border: "1px solid #f59e0b44", borderRadius: 12, padding: "14px 16px", marginTop: 16 }}>
                  <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 1, marginBottom: 4 }}>RECIBES</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: "#f59e0b", letterSpacing: -0.5 }}>{validAmount ? fmtDoggy(doggyReceived) : "—"} DOGGY</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>≈ ${validAmount ? (doggyReceived * DOGGY_PRICE_USD).toFixed(4) : "0.00"} USD</div>
                </div>

                {/* Wallet destino */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 10, color: "#444", letterSpacing: 1.5, marginBottom: 6 }}>WALLET DESTINO</div>
                  <div style={{ background: "#0d0d14", border: "1px solid #ffffff0a", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#f59e0b" }}>{walletDisplay}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Tu wallet Privy embebida</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="pay-btn" onClick={handlePay} disabled={!validAmount} style={{
                width: "100%",
                background: validAmount ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#222",
                border: "none", borderRadius: 14, padding: "18px",
                fontSize: 16, fontWeight: 800, color: validAmount ? "#000" : "#555",
                cursor: validAmount ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "all .25s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                letterSpacing: -0.3,
                boxShadow: validAmount ? "0 4px 24px #f59e0b44" : "none"
              }}>
                ⚡ Pagar con {selectedMethod?.icon} MercadoPago
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
                <div style={{ fontSize: 10, color: "#444" }}>🔒 Pago procesado por</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#555" }}>MercadoPago</div>
                <div style={{ fontSize: 10, color: "#333" }}>·</div>
                <div style={{ fontSize: 10, color: "#444" }}>Swap por Jupiter</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1 — Transitioning */}
      {step === 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", animation: "fadeUp .3s ease" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, border: "3px solid #f59e0b44", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 24px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f59e0b" }}>Abriendo MercadoPago...</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>Preparando tu orden de compra</div>
          </div>
        </div>
      )}

      {/* STEP 2 — Waiting / Progress */}
      {step === 2 && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 0", animation: "fadeUp .4s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 48, marginBottom: 12, animation: "ticker 2s ease-in-out infinite" }}>🏦</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 6 }}>Esperando tu pago</h2>
            <div style={{ fontSize: 14, color: "#666" }}>Realiza tu {method === "spei" ? "transferencia SPEI" : method === "oxxo" ? "pago en OXXO" : "pago"} para continuar</div>
          </div>

          {/* Timer */}
          <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 8 }}>TIEMPO RESTANTE</div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2, color: countdown < 30 ? "#ef4444" : "#f59e0b", fontVariantNumeric: "tabular-nums" }}>
              {String(Math.floor(countdown / 60)).padStart(2, "0")}:{String(countdown % 60).padStart(2, "0")}
            </div>
            <div style={{ marginTop: 16, height: 6, background: "#ffffff0a", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#f59e0b,#22c55e)", borderRadius: 6, width: `${(1 - countdown / 120) * 100}%`, transition: "width .5s linear" }} />
            </div>
          </div>

          {/* CLABE */}
          {method === "spei" && (
            <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 10 }}>CLABE DESTINO</div>
              <div style={{ background: "#0d0d14", border: "1px solid #f59e0b22", borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, letterSpacing: 2, color: "#f59e0b" }}>646 180 2140 1234 56</div>
                <button onClick={() => navigator.clipboard.writeText("6461802140123456")} style={{ background: "#f59e0b18", border: "1px solid #f59e0b44", color: "#f59e0b", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Copiar</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                {[["Monto", "$" + fmt(mxn) + " MXN"], ["Concepto", "DOGGY-" + Math.random().toString(36).slice(2, 8).toUpperCase()], ["Banco beneficiario", "STP"], ["Titular", "DOGGY OnRamp SA de CV"]].map(([k, v]) => (
                  <div key={k} style={{ background: "#0d0d14", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#555", letterSpacing: 1 }}>{k.toUpperCase()}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#ccc", marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flow progress */}
          <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 11, color: "#555", letterSpacing: 1.5, marginBottom: 20 }}>PROGRESO</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {STEPS_FLOW.map((s, i) => {
                const done = i < activeFlowStep;
                const active = i === activeFlowStep;
                return (
                  <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < STEPS_FLOW.length - 1 ? 22 : 0, position: "relative" }}>
                    {i < STEPS_FLOW.length - 1 && (
                      <div style={{ position: "absolute", left: 13, top: 30, width: 2, height: "calc(100% - 8px)", background: done ? "#22c55e" : "#ffffff08", transition: "background .5s" }} />
                    )}
                    <StepDot n={s.n} active={active} done={done} />
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: done ? "#22c55e" : active ? "#f59e0b" : "#555", transition: "color .4s" }}>
                        {s.icon} {s.title}
                        {active && <span style={{ marginLeft: 8, display: "inline-block", width: 14, height: 14, border: "2px solid #f59e0b44", borderTopColor: "#f59e0b", borderRadius: "50%", animation: "spin .8s linear infinite", verticalAlign: "middle" }} />}
                      </div>
                      <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — Success */}
      {step === 3 && (
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 0", textAlign: "center", animation: "fadeUp .5s ease" }}>
          <div style={{ fontSize: 80, marginBottom: 24, animation: "successPop .6s cubic-bezier(.34,1.56,.64,1) forwards" }}>🎉</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, marginBottom: 8, color: "#22c55e" }}>¡$DOGGY recibido!</h2>
          <div style={{ fontSize: 15, color: "#666", marginBottom: 36 }}>Tu compra fue procesada exitosamente y ya está en tu wallet.</div>

          <div style={{ background: "linear-gradient(135deg,#0d1a0d,#111a11)", border: "1px solid #22c55e33", borderRadius: 20, padding: "28px", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "#22c55e", letterSpacing: 1.5, marginBottom: 8 }}>RECIBISTE</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#22c55e", letterSpacing: -2 }}>{fmtDoggy(doggyReceived)}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#4ade80", marginBottom: 16 }}>$DOGGY</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, fontSize: 13, color: "#555" }}>
              <div>Pagaste: <strong style={{ color: "#ccc" }}>${fmt(mxn)} MXN</strong></div>
              <div>Red: <strong style={{ color: "#9945FF" }}>Solana</strong></div>
            </div>
            <div style={{ marginTop: 16, background: "#ffffff05", borderRadius: 10, padding: "10px", fontFamily: "monospace", fontSize: 11, color: "#f59e0b" }}>
              Tx: 3mRx8pKdL...7wYq ✓
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => { setStep(0); setCountdown(120); setActiveFlowStep(0); }} style={{ background: "#f59e0b18", border: "1px solid #f59e0b44", color: "#f59e0b", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              ⚡ Comprar más
            </button>
            <button style={{ background: "#ffffff08", border: "1px solid #ffffff15", color: "#888", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              📊 Ver wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
