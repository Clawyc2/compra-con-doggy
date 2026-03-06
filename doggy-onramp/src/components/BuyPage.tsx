"use client";

import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase";

interface DbUser {
  id: string;
  privy_did: string;
  email: string;
  name: string;
  wallet_address?: string;
  created_at: string;
}

export function BuyPage({ dbUser }: { dbUser?: DbUser | null }) {
  const { user } = usePrivy();
  const { wallets } = useWallets();
  
  const [amount, setAmount] = useState<number>(200);
  const [paymentMethod, setPaymentMethod] = useState<"spei" | "card" | "oxxo">("spei");
  const [loading, setLoading] = useState(false);
  const [balanceSOL, setBalanceSOL] = useState<number>(0);
  const [balanceDOGGY, setBalanceDOGGY] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const wallet = wallets.find(w => w.walletClientType === 'privy');
  const walletAddress = 
    wallet?.address || 
    (user as any)?.wallet?.address ||
    (user as any)?.linkedAccounts?.find((a: any) => a.type === 'wallet')?.address ||
    dbUser?.wallet_address ||
    null;

  // Precios reales (estos deberían venir de una API en producción)
  const DOGGY_PRICE_USD = 0.00000234;
  const SOL_PRICE_USD = 145;
  const MXN_TO_USD = 0.056; // 1 MXN = 0.056 USD
  const COMMISSION_PERCENT = 3;

  // Cálculos
  const commission = amount * (COMMISSION_PERCENT / 100);
  const netAmount = amount - commission;
  const usdAmount = netAmount * MXN_TO_USD;
  const doggyTokens = Math.floor(usdAmount / DOGGY_PRICE_USD);
  const totalUSD = usdAmount.toFixed(2);

  useEffect(() => {
    if (walletAddress) {
      fetchBalances();
    }
  }, [walletAddress]);

  const fetchBalances = async () => {
    try {
      const response = await fetch(`https://api.mainnet-beta.solana.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [walletAddress],
        }),
      });
      const data = await response.json();
      const lamports = data.result?.value || 0;
      const sol = lamports / 1000000000;
      setBalanceSOL(sol);
      // TODO: Fetch DOGGY balance from token account
      setBalanceDOGGY(0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleBuy = () => {
    setLoading(true);
    // TODO: Integrar con API de pago real
    setTimeout(() => {
      setLoading(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];

  if (showConfirmation) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <div style={{ background: "#0d0d14", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>✅</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, color: "#22c55e" }}>¡Orden Creada!</h2>
          <p style={{ fontSize: 16, color: "#888", marginBottom: 32 }}>
            Tu orden de compra ha sido creada exitosamente. Recibirás {doggyTokens.toLocaleString()} $DOGGY en tu wallet.
          </p>
          
          <div style={{ background: "#13131e", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Detalles de la orden</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Monto pagado</span>
              <span style={{ fontWeight: 700 }}>${amount.toFixed(2)} MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Comisión (3%)</span>
              <span style={{ fontWeight: 700 }}>-${commission.toFixed(2)} MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Monto neto</span>
              <span style={{ fontWeight: 700 }}>${netAmount.toFixed(2)} MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #ffffff15" }}>
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>Recibirás</span>
              <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: 18 }}>{doggyTokens.toLocaleString()} $DOGGY</span>
            </div>
          </div>

          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b", marginBottom: 8 }}>⏱️ Tiempo estimado: 2-5 minutos</div>
            <div style={{ fontSize: 13, color: "#888" }}>Los tokens llegarán a tu wallet automáticamente después de confirmar el pago.</div>
          </div>

          <button onClick={() => { setShowConfirmation(false); setAmount(200); }} style={{
            background: "linear-gradient(135deg,#f5c842,#e6a800)",
            border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 800, color: "#000", cursor: "pointer"
          }}>
            Nueva compra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      {/* Header Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        <div style={{ background: "linear-gradient(135deg, #111118 0%, #1a1a2e 100%)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: 1 }}>TU BALANCE $DOGGY</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#f59e0b", marginTop: 8 }}>
            {balanceDOGGY.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>≈ ${(balanceDOGGY * DOGGY_PRICE_USD).toFixed(4)} USD</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #111118 0%, #1a1a2e 100%)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: 1 }}>PRECIO $DOGGY</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#6366f1", marginTop: 8 }}>
            $0.00000234
          </div>
          <div style={{ fontSize: 12, color: "#22c55e", marginTop: 4 }}>▲ +12.4% (24h)</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #111118 0%, #1a1a2e 100%)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: 1 }}>1 SOL</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#22c55e", marginTop: 8 }}>
            ${SOL_PRICE_USD} USD
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>≈ ${(SOL_PRICE_USD / MXN_TO_USD).toFixed(0)} MXN</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
        {/* Formulario Principal */}
        <div style={{ background: "#0d0d14", border: "1px solid #ffffff0f", borderRadius: 20, padding: 32 }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>⚡ Comprar $DOGGY</div>
          <div style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>Paga con SPEI, tarjeta o OXXO. Sin KYC. Mínimo $50 MXN.</div>

          {/* Monto */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>¿Cuánto quieres invertir?</div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Math.max(50, Number(e.target.value)))}
                style={{
                  flex: 1, background: "#13131e", border: "2px solid #ffffff15", borderRadius: 12,
                  padding: "16px 20px", fontSize: 24, fontWeight: 800, color: "#fff"
                }}
              />
              <div style={{
                background: "#13131e", border: "2px solid #ffffff15", borderRadius: 12,
                padding: "16px 20px", fontSize: 18, fontWeight: 700, color: "#888", display: "flex", alignItems: "center"
              }}>
                MXN
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {quickAmounts.map(a => (
                <button key={a} onClick={() => setAmount(a)} style={{
                  background: amount === a ? "rgba(245,158,11,0.12)" : "#13131e",
                  border: amount === a ? "1px solid rgba(245,158,11,0.3)" : "1px solid #ffffff12",
                  color: amount === a ? "#f59e0b" : "#888", borderRadius: 8, padding: "8px 16px",
                  fontSize: 13, fontWeight: 700, cursor: "pointer"
                }}>
                  ${a}
                </button>
              ))}
            </div>
          </div>

          {/* Método de pago */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Método de pago</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { id: "spei" as const, label: "🏦 SPEI", desc: "Transferencia bancaria · 2-5 min", recommended: true },
                { id: "card" as const, label: "💳 Tarjeta", desc: "Débito/Crédito · Instantáneo" },
                { id: "oxxo" as const, label: "🟢 OXXO Pay", desc: "Pago en efectivo · 24-48 hrs" },
              ].map(m => (
                <button key={m.id} onClick={() => setPaymentMethod(m.id)} style={{
                  background: paymentMethod === m.id ? "rgba(34,197,94,0.08)" : "#13131e",
                  border: paymentMethod === m.id ? "2px solid rgba(34,197,94,0.3)" : "1px solid #ffffff12",
                  borderRadius: 12, padding: "14px 20px", textAlign: "left", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: paymentMethod === m.id ? "#22c55e" : "#fff" }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{m.desc}</div>
                  </div>
                  {m.recommended && (
                    <span style={{
                      background: "rgba(34,197,94,0.12)", color: "#22c55e",
                      borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700
                    }}>
                      RECOMENDADO
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div style={{ background: "#13131e", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "#666", letterSpacing: 1, marginBottom: 12 }}>RESUMEN DE COMPRA</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Pagas</span>
              <span style={{ fontWeight: 700 }}>${amount.toFixed(2)} MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Comisión (3%)</span>
              <span style={{ fontWeight: 700 }}>-${commission.toFixed(2)} MXN</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Monto neto</span>
              <span style={{ fontWeight: 700 }}>${netAmount.toFixed(2)} MXN (${totalUSD} USD)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#888" }}>Precio $DOGGY</span>
              <span style={{ fontWeight: 700 }}>$0.00000234</span>
            </div>
            <div style={{ height: 1, background: "#ffffff15", margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>Recibirás</span>
              <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: 20 }}>{doggyTokens.toLocaleString()} $DOGGY</span>
            </div>
          </div>

          {/* Botón de compra */}
          <button onClick={handleBuy} disabled={loading || amount < 50} style={{
            width: "100%", background: loading ? "#444" : "linear-gradient(135deg,#f5c842,#e6a800)",
            border: "none", borderRadius: 14, padding: 18, fontSize: 17, fontWeight: 800,
            color: "#000", cursor: loading || amount < 50 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10
          }}>
            {loading ? "Procesando..." : `⚡ Pagar con ${paymentMethod === "spei" ? "SPEI" : paymentMethod === "card" ? "Tarjeta" : "OXXO"}`}
          </button>

          {amount < 50 && (
            <div style={{ marginTop: 12, textAlign: "center", fontSize: 13, color: "#ef4444" }}>
              El monto mínimo es $50 MXN
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Wallet Info */}
          {walletAddress && (
            <div style={{ background: "#0d0d14", border: "1px solid #ffffff0f", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#666", letterSpacing: 1, marginBottom: 8 }}>WALLET DESTINO</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#f59e0b", wordBreak: "break-all" }}>
                {walletAddress}
              </div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 8 }}>Tu wallet Privy embebida</div>
            </div>
          )}

          {/* Flujo de pago */}
          <div style={{ background: "#0d0d14", border: "1px solid #ffffff0f", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>📋 Flujo de pago</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{
                  width: 28, height: 28, background: "#f5c842", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0
                }}>1</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Checkout se abre</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Elige SPEI como método de pago</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{
                  width: 28, height: 28, background: "#f5c842", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0
                }}>2</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Realiza el SPEI</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Recibirás la CLABE destino</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{
                  width: 28, height: 28, background: "#f5c842", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0
                }}>3</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Webhook confirma</div>
                  <div style={{ fontSize: 12, color: "#888" }}>El sistema compra $DOGGY vía Jupiter</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{
                  width: 28, height: 28, background: "#22c55e", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "#000", flexShrink: 0
                }}>✓</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2, color: "#22c55e" }}>$DOGGY en tu wallet</div>
                  <div style={{ fontSize: 12, color: "#888" }}>Automáticamente, sin esperar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#f59e0b" }}>ℹ️ Información</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
              <div>• Tiempo estimado: <strong style={{ color: "#fff" }}>2-5 minutos</strong></div>
              <div>• Comisión: <strong style={{ color: "#fff" }}>3% (solo)</strong></div>
              <div>• KYC: <strong style={{ color: "#22c55e" }}>No requerido ✓</strong></div>
              <div>• Red: <strong style={{ color: "#9945ff" }}>Solana ⚡</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
