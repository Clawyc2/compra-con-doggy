"use client";

// Force rebuild - clean Vercel cache
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UsernameModal } from "@/components/UsernameModal";
import { WalletPageReal } from "@/components/WalletPage";
import BuyPageNew from "@/components/BuyPageNew";

interface DbUser {
  id: string;
  privy_did: string;
  email: string;
  name: string;
  avatar_url?: string;
  wallet_address?: string;
  created_at: string;
}

type Page = "dashboard" | "buy" | "sell" | "chart" | "wallet" | "referrals" | "staking";

export default function AppPage() {
  const { ready, authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const router = useRouter();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [buyAmount, setBuyAmount] = useState(200);

  // Auth check
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
      return;
    }
    if (ready && authenticated && user) {
      loadUserData();
    }
  }, [ready, authenticated, user, router]);

  const loadUserData = async () => {
    if (!user?.id) return;

    // Obtener wallet address de diferentes formas
    const walletAddr = 
      (user as any)?.wallet?.address ||
      (user as any)?.linkedAccounts?.find((a: any) => a.type === 'wallet')?.address ||
      null;

    // 1. Buscar por privy_did
    let { data, error } = await supabase
      .from("doggy_users")
      .select("*")
      .eq("privy_did", user.id)
      .single();

    if (data) {
      // Actualizar wallet si no la tenemos
      if (!data.wallet_address && walletAddr) {
        const { data: updated } = await supabase
          .from("doggy_users")
          .update({ wallet_address: walletAddr })
          .eq("id", data.id)
          .select()
          .single();
        if (updated) setDbUser(updated);
        else setDbUser(data);
      } else {
        setDbUser(data);
      }
      setLoading(false);
      return;
    }

    // 2. Si no existe, buscar por email
    const email = user?.email?.address;
    if (email) {
      const { data: existingUser } = await supabase
        .from("doggy_users")
        .select("*")
        .eq("email", email)
        .single();

      if (existingUser) {
        // Actualizar privy_did y wallet
        const { data: updatedUser } = await supabase
          .from("doggy_users")
          .update({ 
            privy_did: user.id, 
            wallet_address: walletAddr,
            updated_at: new Date().toISOString() 
          })
          .eq("id", existingUser.id)
          .select()
          .single();

        if (updatedUser) {
          setDbUser(updatedUser);
          setLoading(false);
          return;
        }
      }
    }

    // 3. No existe - crear nuevo usuario
    const isGoogle = !!(user as any).google?.name;
    if (isGoogle) {
      await createUserFromGoogle();
    } else {
      // Login con email - pedir nombre
      setNeedsUsername(true);
      setLoading(false);
    }
  };

  const createUserFromGoogle = async () => {
    const email = user?.email?.address || "";
    const name = (user as any).google?.name || "Usuario";
    const avatarUrl = (user as any).google?.profilePictureUrl || null;
    const walletAddr = 
      (user as any)?.wallet?.address ||
      (user as any)?.linkedAccounts?.find((a: any) => a.type === 'wallet')?.address ||
      null;

    const { data: newUser, error } = await supabase
      .from("doggy_users")
      .upsert(
        {
          privy_did: user?.id,
          email,
          name,
          avatar_url: avatarUrl,
          wallet_address: walletAddr,
        },
        { onConflict: "privy_did" }
      )
      .select()
      .single();

    if (newUser) {
      setDbUser(newUser);
    } else if (error) {
      console.error("Error creating user:", error);
    }
    setLoading(false);
  };

  const handleUsernameComplete = async () => {
    setNeedsUsername(false);
    await loadUserData();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Calculations
  const DOGGY_PRICE = 0.00000234;
  const buyFee = buyAmount * 0.03;
  const buyNet = (buyAmount - buyFee) * 0.056;
  const doggyReceived = Math.floor(buyNet / DOGGY_PRICE);

  // Get wallet address from Privy
  const walletAddress = user?.wallet?.address || null;

  if (needsUsername) {
    return <UsernameModal onComplete={handleUsernameComplete} />;
  }

  if (!ready || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050507]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f5c842] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8888a8]">Cargando...</p>
        </div>
      </div>
    );
  }

  const userInitials = dbUser?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="flex h-screen bg-[#050507] text-[#f0f0f5] font-['DM_Sans',sans-serif] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#0d0d14] border-r border-white/[0.07] flex flex-col shrink-0 z-10">
        {/* Logo */}
        <div className="px-4 py-[18px] border-b border-white/[0.07] flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] bg-[#f5c842] rounded-[9px] flex items-center justify-center text-lg shadow-[0_0_18px_rgba(245,200,66,0.22)] shrink-0">
            🐶
          </div>
          <div>
            <div className="font-['Syne',sans-serif] font-extrabold text-sm leading-tight">
              DOGGY <span className="text-[#f5c842]">OnRamp</span>
            </div>
            <div className="text-[9px] text-[#444460] tracking-[0.08em] uppercase mt-0.5">
              Solana · LATAM
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2 py-2.5 flex flex-col gap-px overflow-y-auto">
          <div className="text-[9.5px] font-bold text-[#444460] tracking-[0.12em] uppercase px-2.5 py-2.5 mt-1">
            Principal
          </div>
          <NavItem icon="📊" label="Dashboard" active={currentPage === "dashboard"} onClick={() => setCurrentPage("dashboard")} />
          <NavItem icon="⚡" label="Comprar $DOGGY" badge="HOT" active={currentPage === "buy"} onClick={() => setCurrentPage("buy")} />
          <NavItem icon="💸" label="Vender $DOGGY" active={currentPage === "sell"} onClick={() => setCurrentPage("sell")} />
          <NavItem icon="📈" label="Ver Chart" active={currentPage === "chart"} onClick={() => setCurrentPage("chart")} />
          
          <div className="text-[9.5px] font-bold text-[#444460] tracking-[0.12em] uppercase px-2.5 py-2.5 mt-1">
            Mi Cuenta
          </div>
          <NavItem icon="👛" label="Mi Wallet" active={currentPage === "wallet"} onClick={() => setCurrentPage("wallet")} />
          <NavItem icon="🤝" label="Referidos" dot active={currentPage === "referrals"} onClick={() => setCurrentPage("referrals")} />
          
          <div className="text-[9.5px] font-bold text-[#444460] tracking-[0.12em] uppercase px-2.5 py-2.5 mt-1">
            Recompensas
          </div>
          <NavItem icon="💎" label="Staking" active={currentPage === "staking"} onClick={() => setCurrentPage("staking")} />
        </div>

        {/* User card */}
        <div className="px-2 py-2.5 border-t border-white/[0.07]">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-[9px] bg-[#13131e] border border-white/[0.07] cursor-pointer hover:border-white/[0.12] transition-colors">
            <div className="w-[30px] h-[30px] shrink-0 bg-gradient-to-br from-[#f5c842] to-[#f07a30] rounded-full flex items-center justify-center text-xs font-extrabold text-black">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate">{dbUser?.name || "Usuario"}</div>
              <div className="text-[10px] text-[#444460] font-mono mt-0.5">8xKm...3pRq</div>
            </div>
            <button onClick={handleLogout} className="text-[#444460] text-sm hover:text-red-400 transition-colors">⋯</button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <div className="h-[62px] bg-[#0d0d14] border-b border-white/[0.07] flex items-center px-[22px] gap-3.5 shrink-0">
          <div className="font-['Syne',sans-serif] font-bold text-[17px] flex-1">
            {getPageTitle(currentPage)}
          </div>
          <div className="flex items-center gap-2.5 bg-[#13131e] border border-white/[0.07] px-3.5 py-1.5 rounded-[9px] text-[12.5px]">
            <span className="text-[#444460] text-[11px]">$DOGGY</span>
            <span className="font-mono font-bold text-[#f5c842]">$0.00000234</span>
            <div className="w-px h-4 bg-white/[0.07]" />
            <span className="text-[#22c55e] text-[11.5px] font-bold">▲ +12.4%</span>
          </div>
          <button 
            onClick={() => setCurrentPage("buy")}
            className="bg-[#f5c842] text-black px-4 py-2 rounded-[9px] font-extrabold text-[13px] font-['Syne',sans-serif] shadow-[0_2px_14px_rgba(245,200,66,0.22)] hover:bg-[#ffd700] hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            ⚡ Comprar
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-[22px_24px]">
          {currentPage === "dashboard" && <DashboardPage dbUser={dbUser} />}
          {currentPage === "buy" && <BuyPageNew dbUser={dbUser} />}
          {currentPage === "sell" && <SellPage />}
          {currentPage === "chart" && <ChartPage />}
          {currentPage === "wallet" && <WalletPageReal dbUser={dbUser} />}
          {currentPage === "referrals" && <ReferralsPage userName={dbUser?.name} />}
          {currentPage === "staking" && <StakingPage />}
        </div>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ 
  icon, 
  label, 
  badge, 
  dot, 
  active, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  badge?: string;
  dot?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all border ${
        active 
          ? "bg-[rgba(245,200,66,0.12)] text-[#f5c842] border-[rgba(245,200,66,0.18)]" 
          : "text-[#8888a8] border-transparent hover:bg-[#13131e] hover:text-[#f0f0f5]"
      }`}
    >
      <span className="text-[15px] w-[18px] text-center shrink-0">{icon}</span>
      {label}
      {badge && (
        <span className="ml-auto bg-[#f5c842] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {dot && <span className="ml-auto w-1.5 h-1.5 bg-[#f5c842] rounded-full" />}
    </button>
  );
}

function getPageTitle(page: Page): string {
  const titles: Record<Page, string> = {
    dashboard: "Dashboard",
    buy: "Comprar $DOGGY ⚡",
    sell: "Vender $DOGGY 💸",
    chart: "Ver Chart 📈",
    wallet: "Mi Wallet 👛",
    referrals: "Referidos 🤝",
    staking: "Staking 💎",
  };
  return titles[page];
}

// Dashboard Page - Datos reales del usuario
function DashboardPage({ dbUser }: { dbUser?: DbUser | null }) {
  return (
    <div>
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[rgba(245,200,66,0.08)] to-transparent border border-[rgba(245,200,66,0.15)] rounded-2xl p-5.5 mb-4">
        <h1 className="font-['Syne',sans-serif] font-extrabold text-[19px] mb-1">
          ¡Bienvenido{dbUser?.name ? `, ${dbUser.name}` : ''}! 🐕
        </h1>
        <p className="text-[#8888a8] text-[13.5px]">
          Tu gateway para comprar $DOGGY con fiat
        </p>
      </div>

      {/* Quick start */}
      <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[13px] p-5 text-center">
        <div className="text-[#8888a8] text-[14px] mb-3">
          Aún no tienes transacciones. ¡Compra tu primer $DOGGY!
        </div>
        <div className="text-[#444460] text-[12px]">
          Miembro desde: {dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString("es-MX") : "Hoy"}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, hint, gold, green }: { icon: string; label: string; value: string; hint: string; gold?: boolean; green?: boolean }) {
  return (
    <div className="bg-[#0d0d14] border border-white/[0.07] rounded-xl px-4 py-3.5 relative overflow-hidden hover:border-[rgba(245,200,66,0.25)] transition-colors">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f5c842] to-transparent" />
      <div className="absolute top-3 right-3 text-xl opacity-[0.18]">{icon}</div>
      <div className="text-[11.5px] text-[#8888a8] mb-1.5">{label}</div>
      <div className={`font-['Syne',sans-serif] font-extrabold text-[21px] ${gold ? 'text-[#f5c842]' : green ? 'text-[#22c55e]' : ''}`}>
        {value}
      </div>
      <div className="text-[11px] text-[#444460] mt-0.5">{hint}</div>
    </div>
  );
}

function TxRow({ icon, type, title, desc, amount, sub, amountColor }: {
  icon: string;
  type: string;
  title: string;
  desc: string;
  amount: string;
  sub: string;
  amountColor: string;
}) {
  const bgColors: Record<string, string> = {
    up: 'bg-[rgba(34,197,94,0.12)] text-[#22c55e]',
    dn: 'bg-[rgba(239,68,68,0.12)] text-[#ef4444]',
    rf: 'bg-[rgba(245,200,66,0.12)] text-[#f5c842]',
  };
  const amountColors: Record<string, string> = {
    green: 'text-[#22c55e]',
    red: 'text-[#ef4444]',
    gold: 'text-[#f5c842]',
  };

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.07] last:border-0">
      <div className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center text-sm shrink-0 ${bgColors[type]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold">{title}</div>
        <div className="text-[11px] text-[#444460] mt-0.5">{desc}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`text-[13px] font-bold ${amountColors[amountColor]}`}>{amount}</div>
        <div className="text-[10.5px] text-[#444460] mt-0.5 font-mono">{sub}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, gold, green, last }: { label: string; value: string; gold?: boolean; green?: boolean; last?: boolean }) {
  return (
    <div className={`flex justify-between py-2 text-[12.5px] ${last ? '' : 'border-b border-white/[0.07]'}`}>
      <span className="text-[#8888a8]">{label}</span>
      <span className={`font-bold ${gold ? 'text-[#f5c842]' : green ? 'text-[#22c55e]' : ''}`}>{value}</span>
    </div>
  );
}

// Sell Page - Con Jupiter Swap real
function SellPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-['Syne',sans-serif] font-extrabold text-[22px]">Vender $DOGGY 💸</h1>
        <p className="text-[#8888a8] text-[13.5px] mt-0.5">Swap directo via Jupiter · Mejor precio garantizado</p>
      </div>

      {/* Jupiter Terminal Widget */}
      <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[14px] overflow-hidden" style={{ minHeight: '600px' }}>
        <iframe 
          src="https://jup.ag/swap/SOL-b3tr9tdcpqdtkah6hou2ut3u4udv1na75oe6r4femumt?theme=dark"
          className="w-full h-full border-0"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
}

// Chart Page - Con DexScreener real
function ChartPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-['Syne',sans-serif] font-extrabold text-[22px]">Chart $DOGGY 📈</h1>
        <p className="text-[#8888a8] text-[13.5px] mt-0.5">DexScreener · Tiempo real · Gratis</p>
      </div>

      <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[13px] overflow-hidden h-[calc(100vh-148px)] flex flex-col">
        <iframe 
          src="https://dexscreener.com/solana/b3tr9tdcpqdtkah6hou2ut3u4udv1na75oe6r4femumt?embed=1&theme=dark&trades=0&info=0"
          className="w-full h-full border-0"
          style={{ minHeight: '500px' }}
        />
      </div>
    </div>
  );
}

// Referrals Page
function ReferralsPage({ userName }: { userName?: string }) {
  const refCode = userName?.toLowerCase().replace(/\s+/g, '').slice(0, 8) || 'usuario';

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-['Syne',sans-serif] font-extrabold text-[22px]">Programa de Referidos 🤝</h1>
        <p className="text-[#8888a8] text-[13.5px] mt-0.5">Invita amigos y gana el 20% de lo que inviertan · Automático a tu wallet</p>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[rgba(245,200,66,0.12)] to-transparent border border-[rgba(245,200,66,0.18)] rounded-2xl p-6 mb-4 text-center">
        <div className="text-[11px] text-[#444460] uppercase tracking-[0.12em]">Tu comisión por cada referido</div>
        <div className="text-[52px] font-extrabold text-[#f5c842] font-['Syne',sans-serif] leading-none my-1.5">20%</div>
        <p className="text-[#8888a8] text-[13.5px]">Por cada peso que invierta tu referido, tú recibes el 20% directo en tu wallet. Sin límites, sin esperas.</p>
      </div>

      {/* Link bar */}
      <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[11px] px-4 py-3 flex items-center gap-3 mb-3.5">
        <span className="text-[11px] text-[#444460] whitespace-nowrap">Tu link:</span>
        <span className="flex-1 font-mono text-[12.5px] text-[#f5c842] truncate">
          https://doggyonramp.com/ref/<strong>{refCode}</strong>
        </span>
        <button className="bg-[#13131e] border border-white/[0.07] rounded-[7px] px-2.5 py-1.5 text-[12px] text-[#8888a8] hover:text-[#f5c842] hover:border-[rgba(245,200,66,0.3)] transition-all">📋 Copiar</button>
        <button className="bg-[#13131e] border border-white/[0.07] rounded-[7px] px-2.5 py-1.5 text-[12px] text-[#8888a8] hover:text-[#f5c842] hover:border-[rgba(245,200,66,0.3)] transition-all">↗ Compartir</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[11px] p-3.5 text-center">
          <div className="font-['Syne',sans-serif] font-extrabold text-xl text-[#f5c842]">3</div>
          <div className="text-[11px] text-[#8888a8] mt-0.5">Referidos activos</div>
        </div>
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[11px] p-3.5 text-center">
          <div className="font-['Syne',sans-serif] font-extrabold text-xl text-[#f5c842]">$43.20</div>
          <div className="text-[11px] text-[#8888a8] mt-0.5">Total ganado (MXN)</div>
        </div>
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[11px] p-3.5 text-center">
          <div className="font-['Syne',sans-serif] font-extrabold text-xl text-[#f5c842]">$720</div>
          <div className="text-[11px] text-[#8888a8] mt-0.5">Volumen referidos</div>
        </div>
      </div>

      {/* Referrals list */}
      <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[13px] p-5">
        <div className="font-['Syne',sans-serif] font-bold text-sm mb-4">Tus referidos</div>
        <TxRow icon="🤝" type="rf" title="@carlos_crypto_mx" desc="Activo · se unió hace 5 días" amount="+$14.40" sub="$72 MXN invertidos" amountColor="gold" />
        <TxRow icon="🤝" type="rf" title="@mariela_hodl" desc="Activo · se unió hace 8 días" amount="+$20.00" sub="$100 MXN invertidos" amountColor="gold" />
        <TxRow icon="🤝" type="rf" title="@jose_degen_420" desc="Activo · se unió hace 12 días" amount="+$8.80" sub="$44 MXN invertidos" amountColor="gold" />
      </div>
    </div>
  );
}

// Staking Page
function StakingPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-['Syne',sans-serif] font-extrabold text-[22px]">Staking & Rewards 💎</h1>
        <p className="text-[#8888a8] text-[13.5px] mt-0.5">Stakea $DOGGY y gana recompensas automáticas cada época de Solana</p>
      </div>

      {/* APY Banner */}
      <div className="bg-gradient-to-br from-[#0a1a0d] to-[rgba(34,197,94,0.07)] border border-[rgba(34,197,94,0.18)] rounded-2xl p-5.5 mb-4 text-center">
        <div className="font-['Syne',sans-serif] font-extrabold text-xl">APY actual del ecosistema</div>
        <div className="inline-block bg-[#22c55e] text-black text-[30px] font-extrabold font-['Syne',sans-serif] px-4.5 py-1 rounded-lg my-2.5">42% APY</div>
        <p className="text-[#8888a8] text-[13px]">Rewards distribuidos cada época (~2 días)</p>
      </div>

      {/* Pools grid */}
      <div className="grid grid-cols-2 gap-3">
        <PoolCard 
          name="🔓 Pool Flexible"
          apy="28%"
          apyColor="green"
          tvl="12.4M DOGGY"
          stakers="1,247"
          min="1,000 DOGGY"
          withdrawal="Inmediato"
        />
        <PoolCard 
          name="🔒 Pool 30 días"
          apy="42% APY"
          apyColor="amber"
          tvl="45.2M DOGGY"
          stakers="3,891"
          min="10,000 DOGGY"
          withdrawal="Al vencimiento"
        />
        <PoolCard 
          name="🚀 Pool 90 días"
          apy="68% APY"
          apyColor="orange"
          tvl="89.7M DOGGY"
          stakers="2,134"
          min="50,000 DOGGY"
          withdrawal="Al vencimiento"
        />
        
        {/* My position */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-xl p-4.5">
          <div className="font-['Syne',sans-serif] font-bold text-sm mb-3.5">Mi posición activa</div>
          <div className="text-center py-3">
            <div className="text-[12px] text-[#8888a8] mb-1.5">Pool 30 días</div>
            <div className="font-['Syne',sans-serif] font-extrabold text-[30px] text-[#f5c842]">50,000</div>
            <div className="text-[12px] text-[#8888a8] mt-0.5">$DOGGY stakeados</div>
            <div className="bg-[#13131e] border border-white/[0.07] rounded-lg px-2.5 py-2.5 my-3.5">
              <div className="flex justify-between text-[12.5px] mb-1.5">
                <span className="text-[#8888a8]">Rewards acumulados</span>
                <span className="font-mono font-semibold text-[#22c55e]">+1,712 DOGGY</span>
              </div>
              <div className="flex justify-between text-[12.5px]">
                <span className="text-[#8888a8]">Vence en</span>
                <span className="font-mono font-semibold">22 días</span>
              </div>
            </div>
            <button className="w-full py-2.5 bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.28)] rounded-lg text-[#22c55e] font-bold text-[13px] hover:bg-[rgba(34,197,94,0.22)] transition-all">
              Reclamar Rewards 🎁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PoolCard({ name, apy, apyColor, tvl, stakers, min, withdrawal }: {
  name: string;
  apy: string;
  apyColor: 'green' | 'amber' | 'orange';
  tvl: string;
  stakers: string;
  min: string;
  withdrawal: string;
}) {
  const apyColors = {
    green: 'text-[#22c55e]',
    amber: 'text-[#fbbf24]',
    orange: 'text-[#f59e0b]',
  };
  const btnColors = {
    green: 'bg-[rgba(34,197,94,0.12)] border-[rgba(34,197,94,0.28)] text-[#22c55e] hover:bg-[rgba(34,197,94,0.22)]',
    amber: 'bg-[rgba(251,191,36,0.12)] border-[rgba(251,191,36,0.28)] text-[#fbbf24] hover:bg-[rgba(251,191,36,0.22)]',
    orange: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.28)] text-[#f59e0b] hover:bg-[rgba(245,158,11,0.22)]',
  };

  return (
    <div className="bg-[#0d0d14] border border-white/[0.07] rounded-xl p-4.5 hover:border-[rgba(34,197,94,0.28)] transition-colors">
      <div className="font-['Syne',sans-serif] font-bold text-[15px] mb-0.5">{name}</div>
      <div className={`text-[12.5px] mb-3 ${apyColors[apyColor]}`}>{apy} APY · Sin bloqueo</div>
      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex justify-between text-[12.5px]"><span className="text-[#8888a8]">TVL</span><span className="font-mono font-semibold">{tvl}</span></div>
        <div className="flex justify-between text-[12.5px]"><span className="text-[#8888a8]">Stakeadores</span><span className="font-mono font-semibold">{stakers}</span></div>
        <div className="flex justify-between text-[12.5px]"><span className="text-[#8888a8]">Mínimo</span><span className="font-mono font-semibold">{min}</span></div>
        <div className="flex justify-between text-[12.5px]"><span className="text-[#8888a8]">Retiro</span><span className="font-mono font-semibold">{withdrawal}</span></div>
      </div>
      <button className={`w-full py-2 rounded-lg font-bold text-[12.5px] border transition-all ${btnColors[apyColor]}`}>
        Stakear en {name.split(' ')[1]}
      </button>
    </div>
  );
}
