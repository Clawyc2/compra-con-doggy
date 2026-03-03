'use client';

import { useState } from 'react';

// ============================================================
// DOGGY LANDING PAGE — La Memecoin Mexicana en Solana
// ============================================================

export default function DoggyLanding() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0a0a1a 0%, #0a0a0f 100%)',
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      color: '#fff',
      minHeight: '100vh',
    }}>
      <FontLoader />
      <Navbar />
      <Hero />
      <Process />
      <Features />
      <Benefits />
      <Tokenomics />
      <Footer />
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(10, 10, 26, 0.8)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 28 }}>🐶</span>
        <span style={{
          fontSize: 24,
          fontWeight: 900,
          background: 'linear-gradient(135deg, #00FF87 0%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          $DOGGY
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <a href="#que-es" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>¿Qué es?</a>
        <a href="#como-funciona" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>Cómo funciona</a>
        <a href="#tokenomics" style={{ color: '#888', textDecoration: 'none', fontSize: 14 }}>Tokenomics</a>
        <button style={{
          background: 'linear-gradient(135deg, #00FF87 0%, #00cc6a 100%)',
          color: '#000',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 12,
          fontWeight: 800,
          fontSize: 14,
          cursor: 'pointer',
        }}>
          Comprar con MXN 💸
        </button>
      </div>
    </nav>
  );
}

// ── HERO (Basado en Imagen 1) ───────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '100px 60px 60px',
      gap: 60,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '20%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, #00FF8720 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      
      {/* Left content */}
      <div style={{ zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#00FF8715',
          border: '1px solid #00FF8730',
          borderRadius: 100,
          padding: '8px 20px',
          marginBottom: 24,
        }}>
          <span style={{ color: '#00FF87', fontSize: 13, fontWeight: 600 }}>🇲🇽 Hecho en México</span>
        </div>
        
        <h1 style={{
          fontSize: 72,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 24,
          maxWidth: 600,
        }}>
          Compra <span style={{
            background: 'linear-gradient(135deg, #00FF87 0%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>$DOGGY</span> con SPEI desde $50 pesos
        </h1>
        
        <p style={{
          fontSize: 20,
          color: '#999',
          lineHeight: 1.6,
          marginBottom: 40,
          maxWidth: 500,
        }}>
          El primer onramp cripto para México y LATAM. Sin KYC, sin exchanges, sin complicaciones. Solo tu banco y tu Google.
        </p>
        
        <button style={{
          background: 'linear-gradient(135deg, #00FF87 0%, #00cc6a 100%)',
          color: '#000',
          border: 'none',
          padding: '18px 40px',
          borderRadius: 14,
          fontWeight: 900,
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 0 40px #00FF8740',
        }}>
          Comprar con MXN 💸
        </button>
        
        <div style={{
          display: 'flex',
          gap: 48,
          marginTop: 48,
        }}>
          {[
            { val: '$50 MXN', label: 'Mínimo' },
            { val: '3%', label: 'Comisión' },
            { val: '~2 min', label: 'Tiempo' },
            { val: '0 KYC', label: 'Sin verifica' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FFD700' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right illustration */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #00FF8715 0%, transparent 70%)',
          border: '2px solid #00FF8730',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          {/* Floating elements */}
          <div style={{
            position: 'absolute',
            top: 40,
            right: 80,
            fontSize: 48,
            animation: 'float 3s ease-in-out infinite',
          }}>💵</div>
          <div style={{
            position: 'absolute',
            bottom: 60,
            left: 60,
            fontSize: 42,
            animation: 'float 3s ease-in-out infinite 1s',
          }}>💸</div>
          <div style={{
            position: 'absolute',
            top: 120,
            left: 40,
            fontSize: 36,
            animation: 'float 3s ease-in-out infinite 2s',
          }}>🇲🇽</div>
          
          {/* Mascot */}
          <div style={{
            fontSize: 180,
            filter: 'drop-shadow(0 0 60px #00FF8760)',
            animation: 'bounce 3s ease-in-out infinite',
          }}>
            🐶
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

// ── PROCESS (Basado en Imagen 2) ───────────────────────────────
function Process() {
  const steps = [
    { num: '01', icon: '🔐', title: 'Login con Google', desc: 'Tu wallet de Solana se crea automáticamente con Privy. Sin seed phrases.' },
    { num: '02', icon: '💰', title: 'Elige monto', desc: 'Desde $50 MXN. El sistema calcula cuántos $DOGGY recibirás.' },
    { num: '03', icon: '🏦', title: 'Pago SPEI', desc: 'Transfiere a la CLABE única que te damos. Desde cualquier banco.' },
    { num: '04', icon: '🚀', title: 'Recibe $DOGGY', desc: 'En menos de 2 minutos, directo a tu wallet. Sin intermediarios.' },
  ];

  return (
    <section id="como-funciona" style={{
      padding: '100px 60px',
      background: '#0a0a0f',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 900,
          marginBottom: 16,
        }}>
          <span style={{ color: '#00FF87' }}>4 pasos</span> para comprar $DOGGY
        </h2>
        <p style={{ color: '#666', fontSize: 18 }}>Sin KYC. Sin exchanges. Sin complicaciones.</p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            background: `linear-gradient(180deg, #1a1a2e 0%, #16162a 100%)`,
            border: '1px solid #00FF8720',
            borderRadius: 20,
            padding: 40,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: -20,
              left: 30,
              background: 'linear-gradient(135deg, #00FF87, #00cc6a)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 900,
              fontSize: 16,
            }}>
              {step.num}
            </div>
            
            <div style={{ fontSize: 56, marginBottom: 24 }}>{step.icon}</div>
            
            <h3 style={{
              fontSize: 20,
              fontWeight: 800,
              marginBottom: 12,
              color: '#fff',
            }}>
              {step.title}
            </h3>
            
            <p style={{ color: '#777', fontSize: 15, lineHeight: 1.6 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FEATURES (Basado en Imagen 3) ───────────────────────────────
function Features() {
  const features = [
    { icon: '🐕', title: 'Hecho en México', desc: 'Para la comunidad mexicana y latina' },
    { icon: '⚡', title: 'Solana Network', desc: 'Transacciones rápidas y baratas' },
    { icon: '🔐', title: 'Wallet automática', desc: 'Privy crea tu wallet sin seed phrase' },
    { icon: '💸', title: '3% comisión', desc: 'Menos que cualquier exchange' },
    { icon: '👥', title: 'Sistema referidos', desc: 'Gana 1% por cada compra' },
    { icon: '🔄', title: 'Mercado P2P', desc: 'Vende sin afectar el precio' },
  ];

  return (
    <section id="que-es" style={{
      padding: '100px 60px',
      background: '#0a0a1a',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 40,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Main feature */}
        <div style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
          border: '1px solid #00FF8720',
          borderRadius: 24,
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 80, marginBottom: 32 }}>🐶💰</div>
          <h2 style={{
            fontSize: 42,
            fontWeight: 900,
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            La memecoin que <span style={{ color: '#00FF87' }}>sí llega</span> a tu cartera
          </h2>
          <p style={{ color: '#888', fontSize: 18, lineHeight: 1.7, maxWidth: 500 }}>
            $DOGGY es el primer onramp cripto para México y LATAM. Compra tokens directamente con pesos mexicanos vía SPEI, sin KYC, sin exchanges, sin complicaciones.
          </p>
        </div>
        
        {/* Feature list */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: '#0f0f1a',
              border: '1px solid #00FF8715',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <div style={{ fontSize: 32 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#fff' }}>{f.title}</div>
                <div style={{ color: '#666', fontSize: 13 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BENEFITS (Basado en Imagen 4) ───────────────────────────────
function Benefits() {
  const projectBenefits = [
    'Compra desde $50 MXN vía SPEI',
    'Wallet creada automáticamente',
    'Sin verificación de identidad',
    'Tokens en menos de 2 minutos',
    'Comisión del 3% (menos que exchanges)',
    'Sistema de referidos integrado',
  ];

  const userBenefits = [
    'Vende en el mercado P2P interno',
    'No afectas el precio del DEX',
    'Gana 1% por cada referido',
    'Wallet no-custodial (tus llaves, tus tokens)',
    'Compatible con Jupiter y Raydium',
    'Comunidad mexicana activa',
  ];

  return (
    <section style={{
      padding: '100px 60px',
      background: '#0a0a0f',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>
          ¿Por qué <span style={{ color: '#FFD700' }}>$DOGGY</span>?
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Column 1 */}
        <div style={{
          background: '#0f0f1a',
          border: '1px solid #00FF8720',
          borderRadius: 20,
          padding: 40,
        }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🏦</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: '#00FF87' }}>
            Para compradores:
          </h3>
          {projectBenefits.map((b, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <span style={{ color: '#00FF87', fontSize: 20 }}>✓</span>
              <span style={{ color: '#ccc' }}>{b}</span>
            </div>
          ))}
        </div>
        
        {/* Column 2 */}
        <div style={{
          background: '#0f0f1a',
          border: '1px solid #FFD70020',
          borderRadius: 20,
          padding: 40,
        }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>💎</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: '#FFD700' }}>
            Para holders:
          </h3>
          {userBenefits.map((b, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <span style={{ color: '#FFD700', fontSize: 20 }}>✓</span>
              <span style={{ color: '#ccc' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TOKENOMICS ───────────────────────────────────────────────────
function Tokenomics() {
  const dist = [
    { pct: '60%', label: 'Comunidad', color: '#00FF87' },
    { pct: '20%', label: 'Liquidez', color: '#FFD700' },
    { pct: '10%', label: 'Desarrollo', color: '#E8003D' },
    { pct: '10%', label: 'Reserva', color: '#9945FF' },
  ];

  return (
    <section id="tokenomics" style={{
      padding: '100px 60px',
      background: '#0a0a1a',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>
          <span style={{ color: '#FFD700' }}>Tokenomics</span>
        </h2>
        <p style={{ color: '#666', fontSize: 18 }}>Distribución justa y transparente</p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {dist.map((d, i) => (
          <div key={i} style={{
            background: '#0f0f1a',
            border: `1px solid ${d.color}20`,
            borderRadius: 20,
            padding: 40,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 56,
              fontWeight: 900,
              color: d.color,
              marginBottom: 12,
            }}>
              {d.pct}
            </div>
            <div style={{ color: '#888', fontSize: 16 }}>{d.label}</div>
            <div style={{
              width: '100%',
              height: 4,
              background: '#1a1a2e',
              borderRadius: 2,
              marginTop: 20,
              overflow: 'hidden',
            }}>
              <div style={{
                width: d.pct,
                height: '100%',
                background: d.color,
                borderRadius: 2,
              }} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: 48,
        padding: 24,
        background: '#00FF8710',
        border: '1px solid #00FF8720',
        borderRadius: 16,
        maxWidth: 800,
        margin: '48px auto 0',
      }}>
        <span style={{ color: '#00FF87', fontSize: 14 }}>
          🔗 Contrato verificado en Solana — 100% transparente
        </span>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #ffffff10',
      padding: '60px 40px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🐶</div>
      <div style={{
        fontSize: 28,
        fontWeight: 900,
        background: 'linear-gradient(135deg, #00FF87 0%, #FFD700 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 24,
      }}>
        $DOGGY
      </div>
      
      <div style={{
        display: 'flex',
        gap: 32,
        justifyContent: 'center',
        marginBottom: 32,
      }}>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Twitter/X</a>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Telegram</a>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Solscan</a>
      </div>
      
      <p style={{ color: '#444', fontSize: 13, maxWidth: 500, margin: '0 auto 16px', lineHeight: 1.6 }}>
        $DOGGY no es consejo de inversión. Las criptomonedas son activos de alto riesgo. Invierta solo lo que pueda permitirse perder.
      </p>
      
      <p style={{ color: '#333', fontSize: 13 }}>
        © 2025 $DOGGY — Hecho con 🐶 en México
      </p>
    </footer>
  );
}

// ── FONT LOADER ───────────────────────────────────────────────────
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    `}</style>
  );
}
