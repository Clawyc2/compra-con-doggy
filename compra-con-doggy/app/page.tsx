'use client';

import { useState, useEffect } from 'react';
import './globals.css';

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
        <div className="sparkle-button-wrapper">
          <button className="sparkle-button">
            <span className="spark"></span>
            <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text">Empieza ahora</span>
          </button>
        </div>

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

// ── PROCESS SECTION (Código exacto de referencia) ───────────────────────
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
      background: '#0a0a1f',
      position: 'relative',
    }}>
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
          <div key={i} style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            padding: 16,
            borderRadius: 12,
            background: 'linear-gradient(to bottom, #04022A, #2E0C7C)',
          }}>
            {/* Número en esquina superior derecha */}
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#8949FF',
              fontWeight: 500,
              fontSize: 24,
              zIndex: 10,
            }}>
              {step.num}
            </div>

            {/* Área de imagen/icono */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: '60%',
                position: 'relative',
              }}>
                <div style={{
                  fontSize: 100,
                  filter: 'drop-shadow(0 0 20px #8949FF40)',
                }}>
                  {step.icon}
                </div>
              </div>
            </div>

            {/* Contenido de texto */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              {/* Título */}
              <h3 style={{
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 12,
                width: '85%',
              }}>
                {step.title}
              </h3>

              {/* Descripción */}
              <p style={{
                textAlign: 'center',
                fontSize: 14,
                lineHeight: 1.5,
                height: 63,
                width: '85%',
                color: '#b8b8c8',
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
