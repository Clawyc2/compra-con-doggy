'use client';

import { useState, useEffect } from 'react';
import './globals.css';

// ============================================================
// COMPRA CON DOGGY — Landing Page v2.0
// Diseño moderno con animaciones fluidas
// ============================================================

export default function CompraConDoggy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="landing">
      {/* Background Effects */}
      <div className="bg-gradient" />
      <div className="bg-grid" />
      <div className="floating-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Hero Section */}
      <section className={`hero ${mounted ? 'visible' : ''}`}>
        {/* Badge */}
        <div className="badge">
          <span className="badge-icon">🇲🇽</span>
          <span className="badge-text">Hecho para México</span>
        </div>

        {/* Main Title */}
        <h1 className="title">
          <span className="title-line">Compra</span>
          <span className="title-line highlight">cripto</span>
          <span className="title-line">con pesos</span>
        </h1>

        {/* Subtitle */}
        <p className="subtitle">
          Sin KYC. Sin exchanges. Sin complicaciones.
          <br />
          Conecta tu dinero fiat con <span className="accent">$DOGGY</span>
        </p>

        {/* CTA Button */}
        <div className="cta-wrapper">
          <div className="sparkle-button-wrapper">
            <button className="sparkle-button">
              <span className="spark"></span>
              <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none">
                <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text">Empieza ahora</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <span className="stat-value">0%</span>
            <span className="stat-label">Comisión</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">2 min</span>
            <span className="stat-label">Tiempo</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Sin límites</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">¿Cómo funciona?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3 className="feature-title">Conecta tu tarjeta</h3>
            <p className="feature-desc">Usa cualquier tarjeta débito o crédito mexicana</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Compra al instante</h3>
            <p className="feature-desc">Intercambia MXN por $DOGGY en segundos</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Recibe tu crypto</h3>
            <p className="feature-desc">Directo a tu wallet, sin intermediarios</p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why">
        <h2 className="section-title">¿Por qué $DOGGY?</h2>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-emoji">🐕</div>
            <p>La memecoin mexicana por excelencia</p>
          </div>
          <div className="why-item">
            <div className="why-emoji">🎉</div>
            <p>Comunidad activa y en crecimiento</p>
          </div>
          <div className="why-item">
            <div className="why-emoji">💎</div>
            <p>100% on-chain, transparente y verificable</p>
          </div>
          <div className="why-item">
            <div className="why-emoji">🇲🇽</div>
            <p>Hecho por mexicanos, para mexicanos</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-final">
        <h2 className="cta-title">¿Listo para empezar?</h2>
        <p className="cta-subtitle">Únete a la revolución cripto mexicana</p>

        <div className="sparkle-button-wrapper">
          <button className="sparkle-button">
            <span className="spark"></span>
            <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none">
              <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text">Comprar ahora</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-brand">Compra con Doggy 🐕</p>
          <p className="footer-copy">© 2026 — Hecho con 💜 en México</p>
        </div>
      </footer>
    </main>
  );
}
