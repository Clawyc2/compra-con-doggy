'use client';

import { useState, useEffect } from 'react';

// ============================================================
// COMPRA CON DOGGY — Landing Page
// Réplica pixel-perfect del diseño de referencia
// ============================================================

export default function CompraConDoggy() {
  return (
    <div style={{
      background: '#0A0B1A',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#FFFFFF',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      <FontLoader />
      <Hero />
      <Process />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
}

// ── HERO SECTION (Basado en Imagen 1) ───────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '80px 60px',
      gap: 60,
      position: 'relative',
    }}>
      {/* Número decorativo */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 60,
        fontSize: 80,
        fontWeight: 900,
        opacity: 0.1,
        color: '#7B2FF7',
      }}>1</div>

      {/* LADO IZQUIERDO - Texto */}
      <div style={{ zIndex: 1 }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 40,
        }}>
          <span style={{ fontSize: 32 }}>🐶</span>
          <span style={{
            fontSize: 28,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #7B2FF7, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Compra con Doggy
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 56,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: -0.5,
          maxWidth: 600,
        }}>
          Compra $DOGGY con SPEI desde $50 pesos
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 18,
          color: '#A0A0B0',
          lineHeight: 1.6,
          marginBottom: 40,
          maxWidth: 500,
        }}>
          El primer onramp cripto para México y LATAM. Sin KYC, sin exchanges, sin complicaciones. Conecta dinero fiat con la memecoin mexicana.
        </p>

        {/* CTA Button */}
        <button style={{
          background: '#7B2FF7',
          color: '#FFFFFF',
          border: 'none',
          padding: '16px 40px',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 0 40px #7B2FF740',
          transition: 'all 0.3s ease',
        }}>
          Comprar con MXN 💸
        </button>

        {/* Bottom text */}
        <p style={{
          marginTop: 60,
          fontSize: 20,
          fontWeight: 700,
          color: '#7B2FF7',
          letterSpacing: 1,
        }}>
          OnChain Growth Cycle
        </p>
      </div>

      {/* LADO DERECHO - Ilustración */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* Círculo principal con dots */}
        <div style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '2px solid #7B2FF730',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Dots decorativos */}
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FFFFFF',
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-240px)`,
            }} />
          ))}

          {/* Mascota centrada */}
          <div style={{
            fontSize: 200,
            filter: 'drop-shadow(0 0 60px #7B2FF760)',
          }}>
            🐶
          </div>

          {/* Elementos flotantes */}
          <div style={{
            position: 'absolute',
            top: 60,
            right: 80,
            fontSize: 48,
            animation: 'float 3s ease-in-out infinite',
          }}>💵</div>
          <div style={{
            position: 'absolute',
            bottom: 100,
            left: 60,
            fontSize: 42,
            animation: 'float 3s ease-in-out infinite 1s',
          }}>💸</div>
          <div style={{
            position: 'absolute',
            top: 140,
            left: 40,
            fontSize: 36,
            animation: 'float 3s ease-in-out infinite 2s',
          }}>🏦</div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}

// ── PROCESS SECTION (Pixel-Perfect - Imagen 2) ─────────────────────────
function Process() {
  const steps = [
    { 
      num: '01', 
      icon: '🔐', 
      title: 'Login Google', 
      desc: 'Tu wallet de Solana se crea automáticamente con Privy. Sin seed phrases.' 
    },
    { 
      num: '02', 
      icon: '💰', 
      title: 'Elige Monto', 
      desc: 'Selecciona cuánto comprar. Desde $50 MXN. Tú decides.' 
    },
    { 
      num: '03', 
      icon: '🏦', 
      title: 'Pago SPEI', 
      desc: 'Transfiere a la CLABE única. Desde cualquier banco en México.' 
    },
    { 
      num: '04', 
      icon: '🚀', 
      title: 'Recibe $DOGGY', 
      desc: 'Tokens en tu wallet en menos de 2 minutos. Directo a ti.' 
    },
  ];

  return (
    <section style={{
      padding: '120px 80px',
      background: '#0f0a30',
      position: 'relative',
    }}>
      {/* Número decorativo grande */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 80,
        fontSize: 80,
        fontWeight: 900,
        opacity: 0.1,
        color: '#a78bfa',
        fontFamily: 'cursive',
      }}>2</div>

      {/* Título principal */}
      <h2 style={{
        fontSize: 36,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 80,
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        OnChain Growth Cycle
      </h2>

      {/* Grid 4 columnas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 40,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {steps.map((step, i) => (
          <div key={i}>
            {/* Número grande arriba */}
            <div style={{
              fontSize: 32,
              fontWeight: 400,
              marginBottom: 20,
              color: '#ffffff',
              textAlign: 'center',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {step.num}
            </div>

            {/* Punto decorativo */}
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#a78bfa',
              margin: '0 auto 20px',
            }} />

            {/* Card con contenido */}
            <div style={{
              background: '#1a0d3a',
              borderRadius: 12,
              padding: '40px 24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}>
              {/* Icono placeholder */}
              <div style={{
                fontSize: 120,
                textAlign: 'center',
                marginBottom: 24,
                filter: 'drop-shadow(0 0 20px #a78bfa40)',
              }}>
                {step.icon}
              </div>

              {/* Título */}
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 12,
                color: '#ffffff',
                textAlign: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                {step.title}
              </h3>

              {/* Descripción */}
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#e0d0ff',
                textAlign: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                maxWidth: 200,
                margin: '0 auto',
              }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FEATURES SECTION (Basado en Imagen 3) ────────────────────────
function Features() {
  const features = [
    'Onramp SPEI sin KYC',
    'Wallet automática con Privy',
    'Comisión 3% (menos que exchanges)',
    'Sistema de referidos on-chain',
    'Mercado P2P interno',
    'Tokens en 2 minutos',
  ];

  return (
    <section style={{
      padding: '120px 60px',
      background: 'linear-gradient(180deg, #1A0B3A 0%, #2A1B5A 100%)',
      position: 'relative',
    }}>
      {/* Número decorativo */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 60,
        fontSize: 80,
        fontWeight: 900,
        opacity: 0.1,
        color: '#7B2FF7',
        fontFamily: 'cursive',
      }}>3</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr',
        gap: 60,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* LADO IZQUIERDO */}
        <div style={{
          background: '#2A1B5A',
          borderRadius: 24,
          padding: 60,
        }}>
          {/* Icono */}
          <div style={{
            fontSize: 100,
            marginBottom: 32,
            filter: 'drop-shadow(0 0 30px #7B2FF740)',
          }}>
            🐶💰
          </div>

          {/* Título */}
          <h2 style={{
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            Compra $DOGGY con pesos mexicanos
          </h2>

          {/* Descripción */}
          <p style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: '#A0A0B0',
          }}>
            Conecta tu banco con la memecoin mexicana. SPEI directo a tokens en segundos. Sin KYC, sin exchanges, sin complicaciones.
          </p>
        </div>

        {/* LADO DERECHO - Lista de features */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              background: '#1A0B3A',
              border: '1px solid #7B2FF720',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#7B2FF720',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}>
                {['🔐', '💳', '💰', '👥', '🔄', '⚡'][i]}
              </div>
              <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BENEFITS SECTION (Basado en Imagen 4) ────────────────────────
function Benefits() {
  const projectBenefits = [
    'Compra desde $50 MXN',
    'Wallet creada automáticamente',
    'Sin verificación de identidad',
    'Tokens en menos de 2 minutos',
    'Comisión del 3% total',
    'Compatible con Solana',
  ];

  const holderBenefits = [
    'Sistema de referidos (gana 1%)',
    'Mercado P2P interno',
    'No afectas el precio en DEX',
    'Wallet no-custodial',
    'Compatible con Jupiter/Raydium',
    'Comunidad mexicana activa',
  ];

  return (
    <section style={{
      padding: '120px 60px',
      background: '#0A0B1A',
      position: 'relative',
    }}>
      {/* Número decorativo */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 60,
        fontSize: 80,
        fontWeight: 900,
        opacity: 0.1,
        color: '#7B2FF7',
        fontFamily: 'cursive',
      }}>4</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {/* Columna 1 - Compradores */}
        <div style={{
          background: '#0F0F1A',
          border: '1px solid #7B2FF720',
          borderRadius: 20,
          padding: 48,
        }}>
          {/* Icono */}
          <div style={{
            fontSize: 80,
            marginBottom: 32,
            filter: 'drop-shadow(0 0 20px #7B2FF740)',
          }}>
            🏦
          </div>

          {/* Título */}
          <h3 style={{
            fontSize: 24,
            fontWeight: 900,
            marginBottom: 32,
            color: '#7B2FF7',
          }}>
            Para compradores:
          </h3>

          {/* Lista */}
          {projectBenefits.map((b, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#7B2FF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}>
                ✓
              </div>
              <span style={{ color: '#D0D0D0', fontSize: 16 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Columna 2 - Holders */}
        <div style={{
          background: '#0F0F1A',
          border: '1px solid #7B2FF720',
          borderRadius: 20,
          padding: 48,
        }}>
          {/* Icono */}
          <div style={{
            fontSize: 80,
            marginBottom: 32,
            filter: 'drop-shadow(0 0 20px #7B2FF740)',
          }}>
            💎
          </div>

          {/* Título */}
          <h3 style={{
            fontSize: 24,
            fontWeight: 900,
            marginBottom: 32,
            color: '#7B2FF7',
          }}>
            Para holders:
          </h3>

          {/* Lista */}
          {holderBenefits.map((b, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#7B2FF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}>
                ✓
              </div>
              <span style={{ color: '#D0D0D0', fontSize: 16 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: '80px 60px',
      background: '#050508',
      textAlign: 'center',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 24,
      }}>
        <span style={{ fontSize: 40 }}>🐶</span>
        <span style={{
          fontSize: 32,
          fontWeight: 900,
          background: 'linear-gradient(135deg, #7B2FF7, #A78BFA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Compra con Doggy
        </span>
      </div>

      {/* Links */}
      <div style={{
        display: 'flex',
        gap: 32,
        justifyContent: 'center',
        marginBottom: 32,
      }}>
        <a href="#" style={{ color: '#A0A0B0', textDecoration: 'none' }}>Twitter/X</a>
        <a href="#" style={{ color: '#A0A0B0', textDecoration: 'none' }}>Telegram</a>
        <a href="#" style={{ color: '#A0A0B0', textDecoration: 'none' }}>Whitepaper</a>
        <a href="#" style={{ color: '#A0A0B0', textDecoration: 'none' }}>Solscan</a>
      </div>

      {/* Disclaimer */}
      <p style={{
        color: '#505060',
        fontSize: 13,
        maxWidth: 600,
        margin: '0 auto 16px',
        lineHeight: 1.6,
      }}>
        $DOGGY es un token experimental de naturaleza especulativa. Las criptomonedas son activos de alto riesgo. No inviertas dinero que no puedas permitirte perder.
      </p>

      {/* Copyright */}
      <p style={{ color: '#404050', fontSize: 13 }}>
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
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      @media (max-width: 768px) {
        section {
          padding: 60px 24px !important;
        }
        
        h1 {
          font-size: 36px !important;
        }
        
        h2 {
          font-size: 32px !important;
        }
      }
    `}</style>
  );
}
