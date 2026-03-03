'use client';

import { useState, useEffect } from 'react';
import './globals.css';

// ============================================================
// COMPRA CON DOGGY — Landing Page v3.0
// Estética: NEON FIESTA - Vibrante, mexicano, futurista
// ============================================================

export default function CompraConDoggy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="landing">
      {/* Animated Background */}
      <div className="bg-canvas">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>

      {/* Floating Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1">🐕</div>
        <div className="shape shape-2">💰</div>
        <div className="shape shape-3">🚀</div>
        <div className="shape shape-4">💎</div>
        <div className="shape shape-5">⚡</div>
      </div>

      {/* Hero Section */}
      <section className={`hero ${mounted ? 'visible' : ''}`}>
        {/* Mexican Flag Accent */}
        <div className="flag-accent">
          <span className="flag-stripe green" />
          <span className="flag-stripe white" />
          <span className="flag-stripe red" />
        </div>

        {/* Badge */}
        <div className="badge">
          <span className="badge-icon">🔥</span>
          <span className="badge-text">El primer onramp cripto para México</span>
          <span className="badge-icon">🔥</span>
        </div>

        {/* Main Title */}
        <h1 className="title">
          <span className="title-word word-1">Compra</span>
          <span className="title-word word-2">$DOGGY</span>
          <span className="title-word word-3">al toque</span>
        </h1>

        {/* Subtitle */}
        <p className="subtitle">
          De <span className="highlight green">MXN</span> a <span className="highlight pink">crypto</span> en segundos.
          <br />
          Sin KYC. Sin drama. 100% mexicano.
        </p>

        {/* CTA Button */}
        <button className="cta-button">
          <span className="cta-bg" />
          <span className="cta-content">
            <span className="cta-icon">🚀</span>
            <span className="cta-text">Empieza ahora</span>
          </span>
        </button>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <span className="stat-value">2 min</span>
              <span className="stat-label">Tiempo real</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💸</div>
            <div className="stat-info">
              <span className="stat-value">0%</span>
              <span className="stat-label">Comisión</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🇲🇽</div>
            <div className="stat-info">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Disponible</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <h2 className="section-title">
          <span className="title-deco">◆</span>
          Así de fácil
          <span className="title-deco">◆</span>
        </h2>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-emoji">💳</div>
            <h3 className="step-title">Conecta tu tarjeta</h3>
            <p className="step-desc">Cualquier banco mexicano funciona</p>
            <div className="step-accent" />
          </div>

          <div className="step-connector">
            <div className="connector-line" />
            <div className="connector-dot" />
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-emoji">🔄</div>
            <h3 className="step-title">Intercambia</h3>
            <p className="step-desc">Pesos a $DOGGY al mejor precio</p>
            <div className="step-accent" />
          </div>

          <div className="step-connector">
            <div className="connector-line" />
            <div className="connector-dot" />
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-emoji">🎉</div>
            <h3 className="step-title">Recibe tu crypto</h3>
            <p className="step-desc">Directo a tu wallet, sin esperas</p>
            <div className="step-accent" />
          </div>
        </div>
      </section>

      {/* Why DOGGY */}
      <section className="why-section">
        <div className="why-bg" />
        <h2 className="section-title alt">
          ¿Por qué <span className="doggy-text">$DOGGY</span>?
        </h2>

        <div className="reasons-grid">
          <div className="reason-card">
            <div className="reason-icon">🐕</div>
            <p className="reason-text">La memecoin más perrona de México</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">🌱</div>
            <p className="reason-text">Comunidad que crece cada día</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">🔒</div>
            <p className="reason-text">100% on-chain y transparente</p>
          </div>

          <div className="reason-card">
            <div className="reason-icon">🇲🇽</div>
            <p className="reason-text">Hecho por mexicanos, para mexicanos</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-container">
          <h2 className="cta-title">
            ¿Qué esperas?
          </h2>
          <p className="cta-subtitle">
            Únete a la revolución cripto mexicana
          </p>

          <button className="cta-button large">
            <span className="cta-bg" />
            <span className="cta-content">
              <span className="cta-icon">💎</span>
              <span className="cta-text">Comprar $DOGGY</span>
            </span>
          </button>

          {/* Trust Badges */}
          <div className="trust-badges">
            <span className="badge-item">🔒 Seguro</span>
            <span className="badge-item">⚡ Rápido</span>
            <span className="badge-item">🇲🇽 Mexicano</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="footer-emoji">🐕</span>
            <span className="footer-name">Compra con Doggy</span>
          </div>
          <p className="footer-copy">© 2026 — Hecho con 🇲🇽 y mucho 💜</p>
        </div>
      </footer>
    </main>
  );
}
