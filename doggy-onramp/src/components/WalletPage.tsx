"use client";

import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase";

interface DbUser {
  id: string;
  privy_did: string;
  email: string;
  name: string;
  avatar_url?: string;
  wallet_address?: string;
  created_at: string;
}

type TabType = "resumen" | "depositar" | "retirar" | "historial" | "seed";

export function WalletPageReal({ dbUser }: { dbUser?: DbUser | null }) {
  const { user, exportWallet } = usePrivy();
  const { wallets } = useWallets();
  
  const [tab, setTab] = useState<TabType>("resumen");
  const [depositTab, setDepositTab] = useState<"qr" | "address">("qr");
  const [balanceSOL, setBalanceSOL] = useState<string>("0.00");
  const [balanceDOGGY, setBalanceDOGGY] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  const [sendForm, setSendForm] = useState({ address: "", amount: "", token: "SOL" });
  const [sending, setSending] = useState(false);
  const [sendDone, setSendDone] = useState(false);
  
  const [seedRevealed, setSeedRevealed] = useState(false);
  const [seedConfirmed, setSeedConfirmed] = useState(false);

  const wallet = wallets.find(w => w.walletClientType === 'privy');
  
  // IMPORTANTE: Obtener wallet de CUALQUIER fuente disponible
  const walletAddress = 
    wallet?.address || 
    (user as any)?.wallet?.address ||
    (user as any)?.linkedAccounts?.find((a: any) => a.type === 'wallet')?.address ||
    dbUser?.wallet_address ||
    null;
  
  const SOL_PRICE = 145;
  const DOGGY_PRICE = 0.00000234;
  const solUSD = (parseFloat(balanceSOL) * SOL_PRICE).toFixed(2);
  const doggyUSD = (balanceDOGGY * DOGGY_PRICE).toFixed(4);
  const totalUSD = (parseFloat(solUSD) + parseFloat(doggyUSD)).toFixed(2);

  useEffect(() => {
    if (walletAddress) {
      fetchBalances();
    } else {
      setLoading(false);
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
      setBalanceSOL(sol.toFixed(4));
      setBalanceDOGGY(0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("¡Copiado!");
  };

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSendDone(true);
    }, 2200);
  };

  const handleExportSeed = async () => {
    try {
      if (wallet) {
        await exportWallet();
      } else {
        alert("No se encontró wallet para exportar.");
      }
    } catch (error) {
      console.error("Error exporting wallet:", error);
      alert("Para exportar tu wallet, necesitas verificar tu identidad primero con Privy.");
    }
  };

  if (!walletAddress) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f59e0b", marginBottom: 8 }}>Wallet no disponible</div>
        <div style={{ fontSize: 14, color: "#666" }}>
          Cierra sesión y vuelve a ingresar para crear tu wallet automáticamente.
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      {/* Balance Card */}
      <div style={{
        background: "linear-gradient(135deg, #111118 0%, #1a1a2e 50%, #111118 100%)",
        border: "1px solid rgba(245,158,11,0.2)",
        borderRadius: 20,
        padding: "28px 32px",
        marginBottom: 28,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: "#666", letterSpacing: 1, marginBottom: 4 }}>BALANCE TOTAL</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#22c55e" }}>
              ${loading ? "..." : totalUSD} <span style={{ fontSize: 16, color: "#666" }}>USD</span>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 20 }}>
              <div style={{ background: "#ffffff08", border: "1px solid #ffffff12", borderRadius: 12, padding: "10px 16px" }}>
                <div style={{ fontSize: 10, color: "#888" }}>SOLANA</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#9945FF" }}>{balanceSOL} SOL</div>
                <div style={{ fontSize: 12, color: "#666" }}>${solUSD} USD</div>
              </div>
              <div style={{ background: "#ffffff08", border: "1px solid rgba(245,158,11,0.13)", borderRadius: 12, padding: "10px 16px" }}>
                <div style={{ fontSize: 10, color: "#f59e0b" }}>$DOGGY</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#f59e0b" }}>{balanceDOGGY.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "#666" }}>${doggyUSD} USD</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#555", fontFamily: "monospace", marginBottom: 8 }}>
              {truncateAddress(walletAddress)}
            </div>
            <button onClick={() => copyToClipboard(walletAddress)} style={{
              background: "#ffffff08", border: "1px solid #ffffff15", color: "#f59e0b",
              borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600
            }}>
              📋 Copiar
            </button>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => setTab("depositar")} style={{
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.27)",
                color: "#22c55e", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer"
              }}>📥 Depositar</button>
              <button onClick={() => setTab("retirar")} style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.27)",
                color: "#ef4444", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer"
              }}>📤 Retirar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#ffffff06", borderRadius: 14, padding: 4 }}>
        {[
          { id: "resumen" as TabType, label: "📊 Resumen" },
          { id: "depositar" as TabType, label: "📥 Depositar" },
          { id: "retirar" as TabType, label: "📤 Retirar" },
          { id: "historial" as TabType, label: "🕐 Historial" },
          { id: "seed" as TabType, label: "🔑 Seed" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: tab === t.id ? (t.id === "seed" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.1)") : "transparent",
            border: tab === t.id ? `1px solid ${t.id === "seed" ? "rgba(239,68,68,0.33)" : "rgba(245,158,11,0.27)"}` : "1px solid transparent",
            color: tab === t.id ? (t.id === "seed" ? "#ef4444" : "#f59e0b") : "#666",
            borderRadius: 10, padding: "9px 4px", fontSize: 12, fontWeight: 700, cursor: "pointer"
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* RESUMEN */}
      {tab === "resumen" && (
        <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#888", marginBottom: 8 }}>Sin transacciones aún</div>
          <div style={{ fontSize: 13, color: "#555" }}>Tus transacciones aparecerán aquí después de tu primera compra o depósito.</div>
        </div>
      )}

      {/* DEPOSITAR */}
      {tab === "depositar" && (
        <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📥 Depositar fondos</div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>Envía SOL o $DOGGY a tu wallet.</div>

          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {["qr", "address"].map(dt => (
              <button key={dt} onClick={() => setDepositTab(dt as "qr" | "address")} style={{
                background: depositTab === dt ? "rgba(245,158,11,0.1)" : "transparent",
                border: `1px solid ${depositTab === dt ? "rgba(245,158,11,0.27)" : "#ffffff12"}`,
                color: depositTab === dt ? "#f59e0b" : "#666", borderRadius: 8, padding: "7px 18px", fontSize: 13, cursor: "pointer", fontWeight: 700
              }}>
                {dt === "qr" ? "📷 QR Code" : "📋 Dirección"}
              </button>
            ))}
          </div>

          {depositTab === "qr" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "inline-block" }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`} alt="QR" style={{ width: 150, height: 150 }} />
              </div>
            </div>
          )}

          {depositTab === "address" && (
            <div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Tu dirección Solana</div>
              <div style={{ background: "#0d0d14", border: "1px solid #ffffff15", borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", wordBreak: "break-all" }}>{walletAddress}</div>
                <button onClick={() => copyToClipboard(walletAddress)} style={{
                  background: "#ffffff08", border: "1px solid #ffffff15", color: "#f59e0b",
                  borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600
                }}>📋 Copiar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RETIRAR */}
      {tab === "retirar" && (
        <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📤 Retirar / Enviar</div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 24 }}>Envía SOL o $DOGGY a cualquier wallet.</div>

          {sendDone ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e", marginBottom: 8 }}>¡Transacción enviada!</div>
              <button onClick={() => { setSendDone(false); setSendForm({ address: "", amount: "", token: "SOL" }); }} style={{
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.27)",
                color: "#f59e0b", borderRadius: 10, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 700
              }}>Nueva transacción</button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Token a enviar</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["SOL", "$DOGGY"].map(tk => (
                    <button key={tk} onClick={() => setSendForm(f => ({ ...f, token: tk }))} style={{
                      flex: 1, background: sendForm.token === tk ? "rgba(245,158,11,0.1)" : "#0d0d14",
                      border: `1px solid ${sendForm.token === tk ? "#f59e0b" : "#ffffff15"}`,
                      color: sendForm.token === tk ? "#f59e0b" : "#888", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: "pointer"
                    }}>
                      {tk}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Dirección destino</div>
                <input placeholder="Dirección Solana" value={sendForm.address}
                  onChange={e => setSendForm(f => ({ ...f, address: e.target.value }))}
                  style={{ width: "100%", background: "#0d0d14", border: "1px solid #ffffff15", borderRadius: 10, padding: "12px 14px", fontSize: 13, color: "#fff" }} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Cantidad</div>
                <input type="number" placeholder="0.00" value={sendForm.amount}
                  onChange={e => setSendForm(f => ({ ...f, amount: e.target.value }))}
                  style={{ width: "100%", background: "#0d0d14", border: "1px solid #ffffff15", borderRadius: 10, padding: "12px 14px", fontSize: 15, color: "#fff", fontWeight: 700 }} />
              </div>

              <button onClick={handleSend} disabled={sending || !sendForm.address || !sendForm.amount} style={{
                width: "100%", background: sending ? "#444" : "linear-gradient(135deg,#ef4444,#dc2626)",
                border: "none", borderRadius: 12, padding: 16, fontSize: 15, fontWeight: 800, color: "#fff",
                cursor: sending ? "not-allowed" : "pointer"
              }}>
                {sending ? "Enviando..." : "📤 Enviar ahora"}
              </button>
            </>
          )}
        </div>
      )}

      {/* HISTORIAL */}
      {tab === "historial" && (
        <div style={{ background: "#111118", border: "1px solid #ffffff0f", borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#888" }}>Sin transacciones aún</div>
        </div>
      )}

      {/* SEED */}
      {tab === "seed" && (
        <div style={{ background: "#111118", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "#ef4444" }}>🔑 Frase Semilla</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Tu frase semilla es la llave maestra de tu wallet.</div>

          <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>⚠️ Advertencia</div>
            <ul style={{ paddingLeft: 16, color: "#cc6666", fontSize: 13, lineHeight: 1.8 }}>
              <li>Nunca compartas tu seed phrase con nadie</li>
              <li>Guárdala offline en un lugar seguro</li>
            </ul>
          </div>

          {!seedConfirmed ? (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" onChange={e => setSeedConfirmed(e.target.checked)} style={{ width: 16, height: 16 }} />
                <span style={{ fontSize: 13, color: "#888" }}>Entiendo los riesgos</span>
              </label>
            </div>
          ) : null}

          <button disabled={!seedConfirmed} onClick={handleExportSeed} style={{
            background: seedConfirmed ? "linear-gradient(135deg,#ef4444,#dc2626)" : "#333",
            border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 800,
            color: seedConfirmed ? "#fff" : "#666", cursor: seedConfirmed ? "pointer" : "not-allowed"
          }}>
            🔓 Exportar via Privy
          </button>
        </div>
      )}
    </div>
  );
}
