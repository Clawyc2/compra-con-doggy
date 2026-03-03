'use client';

import { useState, useEffect } from 'react';
import './globals.css';

// ============================================================
// COMPRA CON DOGGY — Landing Page v4.0
// Estética: MEXICAN POP - Limpiio, vibrante, directo
// ============================================================

export default function CompraConDoggy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="landing">
      {/* Color Blobs Background */}
      <div className="color-blobs">
        <div className="blob blob-pink" />
        <div className="blob blob-yellow" />
        <div className="blob blob-green" />
      </div>

      {/* Hero */}
      <section className={`hero ${mounted ? 'visible' : ''}`}>
        <div className="hero-content">
          {/* Flag Line */}
          <div className="flag-line">
            <span className="flag-segment green" />
            <span className="flag-segment white" />
            <span className="flag-segment red" />
          </div>

          {/* Main Headline */}
          <h1 className="headline">
            <span className="line-1">Compra</span>
            <span className="line-2">$DOGGY</span>
            <span className="line-3">con pesos</span>
          </h1>

          {/* Subheadline */}
          <p className="subheadline">
            Sin KYC. Sin exchanges. Sin complicaciones.
            <br />
            <span className="emphasis">De MXN a crypto en segundos.</span>
          </p>

          {/* CTA */}
          <button className="cta-main">
            <span className="cta-text">Empezar</span>
            <span className="cta-arrow">→</span>
          </button>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-num">0%</span>
              <span className="stat-word">comisión</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">2min</span>
              <span className="stat-word">tiempo</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-word">activo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="steps-section">
        <h2 className="section-heading">Así funciona</h2>

        <div className="steps-grid">
          <div className="step">
            <div className="step-circle">
              <span className="step-num">1</span>
            </div>
            <h3 className="step-title">Conecta tarjeta</h3>
            <p className="step-desc">Cualquier banco MX</p>
          </div>

          <div className="step">
            <div className="step-circle">
              <span className="step-num">2</span>
            </div>
            <h3 className="step-title">Compra</h3>
            <p className="step-desc">Pesos → $DOGGY</p>
          </div>

          <div className="step">
            <div className="step-circle">
              <span className="step-num">3</span>
            </div>
            <h3 className="step-title">Recibe</h3>
            <p className="step-desc">Directo a tu wallet</p>
          </div>
        </div>
      </section>

      {/* Why DOGGY */}
      <section className="why-section">
        <h2 className="section-heading">¿Por qué $DOGGY?</h2>

        <div className="why-grid">
          <div className="why-card">
            <span className="why-emoji">🐕</span>
            <p>La memecoin de México</p>
          </div>
          <div className="why-card">
            <span className="why-emoji">💎</span>
            <p>100% on-chain</p>
          </div>
          <div className="why-card">
            <span className="why-emoji">🇲🇽</span>
            <p>Por mexicanos</p>
          </div>
          <div className="why-card">
            <span className="why-emoji">🚀</span>
            <p>Comunidad activa</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-section">
        <div className="final-box">
          <h2 className="final-title">¿Listo?</h2>
          <button className="cta-main large">
            <span className="cta-text">Comprar $DOGGY</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Compra con Doggy 🐕 · Hecho en México 🇲🇽</p>
      </footer>
    </main>
  );
}
