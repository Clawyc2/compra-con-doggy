# MEMORY.md - Long-Term Memory

## Origin

**2026-02-20** — Born. Luis created me. My name is Clawy 🐾. My purpose: help with design, crypto, tokenomics, whitepapers, project development, and trend analysis. I'm technical, honest, and I refine ideas — not just execute them.

---

## Creator - Luis

- **Name:** Luis
- **Role:** Creator & human I help
- **Work:** Crypto/Web3 space
- **Preferences:**
  - Technical and direct communication
  - Wants me to refine ideas, not just execute
  - Prefers honest feedback over agreement
  - Expects me to be a thought partner, not just an assistant

---

## Projects Created (All Time)

| Project | URL | Purpose | Status |
|---------|-----|---------|--------|
| **Sati Academy** | sati-academy.vercel.app | El Duolingo de Bitcoin | 🟢 Activo |
| **Agentes C2** | agentes-c2.vercel.app | Dashboard de gestión de subagentes | 🟢 Activo |
| **OficinaClaw** | oficinaclaw.vercel.app | Mission Control Dashboard | 🟢 Activo |
| **Clawy Archives** | clawy-archives.vercel.app | Los Archivos de Clawy | 🟢 Activo |
| **Clawy RSI Scanner** | clawy-rsi-scanner.vercel.app | Escáner RSI para crypto | 🟢 Activo |
| **ClawyDocumentos** | clawy-documentos.vercel.app | Tweets a Markdown | 🟢 Activo |
| **Tweet Archive** | tweet-archive.vercel.app | Archivo de tweets | 🟢 Activo |
| **Clawy Website v2** | clawy-website-v2.vercel.app | Web personal v2 | 🟢 Activo |
| **Referral Contest** | referral-contest.vercel.app | Sistema de referidos con X | 🟢 Activo |
| **Clawy Presentation** | clawy-website.vercel.app | Web de presentación inicial | 🟢 Activo |

---

## Proyectos Activos (2026-02-28)

| Proyecto | Descripción | Estado |
|----------|-------------|--------|
| **Sati Academy** | "El Duolingo de Bitcoin" - Plataforma educativa | ✅ Auth funcionando con Google OAuth |
| **Agentes C2** | Sistema de agentes | En desarrollo |
| **Despacho Contable** | Sistema contable | En desarrollo |

---

## Sati Academy - Detalles

- **URL:** https://sati-academy.vercel.app
- **Propósito:** Aprender Bitcoin de forma gamificada (estilo Duolingo)
- **Auth:** Google OAuth → Supabase Auth → `sati_users` table
- **Tech Stack:** Next.js 14, Supabase, Tailwind CSS, Framer Motion
- **Páginas:**
  - `/` - Landing page
  - `/aprender` - Dashboard principal con mapa de lecciones
  - `/perfil` - Perfil de usuario con stats y badges
- **Tablas Supabase:**
  - `sati_users` - Usuarios (id, email, name, avatar_url, points, streak, current_stage)
  - `sati_tokens` - Tokens $SATI
  - `sati_lesson_progress` - Progreso de lecciones
  - `sati_daily_activity` - Actividad diaria

---

## APIs Configured

| API | Purpose | Added |
|-----|---------|-------|
| GitHub | Code repos | 2026-02-20 |
| Vercel | Deploys | 2026-02-20 |
| OpenAI | Text/Code | 2026-02-20 |
| Supabase | Database | 2026-02-20 |
| ElevenLabs | Voice | 2026-02-21 |
| Replicate | Images | 2026-02-21 |
| Anthropic | Claude AI | 2026-02-21 |
| SerpApi | Web search | 2026-02-25 |
| ZenRows | Web scraping | 2026-02-25 |
| Blackbox.ai | Code generation | 2026-02-26 |

---

## Skills Created

| Skill | Purpose | Date |
|-------|---------|------|
| **Web Security Analyst** | Análisis de seguridad OWASP Top 10 | 2026-02-28 |
| **QoS Bug Testing Agent** | Control de calidad y detección de bugs | 2026-02-28 |
| **Clawy Archives Updater** | Sistema OBLIGATORIO de documentación | 2026-02-28 |
| **Frontend Design Premium** | Senior UI/UX Engineer rules | 2026-02-24 |

---

## Bots Created

| Bot | URL | Features |
|-----|-----|----------|
| **RSI Alert Bot** | @Rsi1alertasbot | `/price BTC/USDT`, `/rsi BTC/USDT 5m`, `/config 70 30`, `/scan` |

---

## Errors Made & Lessons Learned

### Error 1: Audio with gTTS instead of ElevenLabs
- **Problem:** Used gTTS when ElevenLabs API was available (much better quality)
- **Lesson:** Always use the best available API for the task
- **Date:** 2026-02-24

### Error 2: Files in /tmp (auto-deleted)
- **Problem:** Saved important files in /tmp which gets cleared on reboot
- **Lesson:** Save permanent files in `/home/ubuntu/.openclaw/audios/` or project folders
- **Date:** 2026-02-24

### Error 3: Visualization Problems
- **Problem:** After adding SerpApi + ZenRows, couldn't see images or command results
- **Cause:** Used new APIs intensively (scraping, analysis), something broke internally
- **Lesson:** When user shows something works, TRUST them. Don't insist on verifying.
- **Date:** 2026-02-26

### Error 4: Bucle Infinito de Redirección OAuth (Sati Academy)
- **Problema:** Google OAuth causaba bucle infinito entre landing y app
- **Causas identificadas:**
  1. Middleware interceptaba `/auth/callback` antes de que se creara la sesión
  2. Middleware redirigía automáticamente de `/` a `/aprender` cuando había sesión
  3. Landing page también redirigía con `useEffect` causando race condition
  4. Cookies no se establecían correctamente en el redirect del callback server-side
  5. AuthModal tenía `onAuthStateChange` que disparaba redirects dobles
- **Solución aplicada:**
  1. Middleware SOLO protege `/perfil`, `/ranking`, `/badges` (NO `/aprender`)
  2. `/aprender` maneja el hash OAuth del lado del cliente con `window.location.hash`
  3. Eliminar redirect automático de `/` a `/aprender` en middleware
  4. Landing usa `router.replace()` con flag `mounted` para evitar race conditions
  5. AuthModal simplificado sin `onAuthStateChange`
  6. Crear usuario en `sati_users` directamente en `/aprender` al detectar hash OAuth
- **Flujo correcto OAuth:**
  ```
  Landing → AuthModal → Google OAuth → Google redirect con hash → 
  /aprender (procesa hash en cliente) → crear usuario en sati_users → mostrar dashboard
  ```
- **Lecciones:**
  - NO usar middleware para redirects bidireccionales (causa bucles)
  - OAuth con PKCE requiere manejar el hash en CLIENTE, no en servidor
  - `setAll` cookies en middleware NO funciona bien con redirects
  - Cuando hay bucles, SIMPLIFICAR: quitar lógica, no agregar más
- **Date:** 2026-02-28

---

## Important Rules (from AGENTS.md)

### Session Startup
1. Read `SOUL.md` — who I am
2. Read `USER.md` — who I'm helping
3. Read `memory/YYYY-MM-DD.md` (today + yesterday)
4. If MAIN SESSION: Also read `MEMORY.md`

### Communication Style
- **Spanish** when talking to Luis
- Technical and direct
- Refine ideas, don't just execute
- Honest feedback over agreement
- Be a thought partner

### Safety
- Don't exfiltrate private data
- `trash` > `rm` (recoverable beats gone forever)
- Ask before destructive actions

---

## Key Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | My operating manual - how to behave |
| `SOUL.md` | Who I am (personality, vibe) |
| `USER.md` | Who Luis is |
| `IDENTITY.md` | Name, creature type, specialization |
| `TOOLS.md` | Local notes (cameras, SSH, voices) |
| `HEARTBEAT.md` | Proactive task checklist |
| `memory/` | Daily notes and session exports |
| `skills/clawy-archives/SKILL.md` | 🚨 OBLIGATORY documentation system |
| `clawy-archives/` | 📚 Clawy Archives website |

---

## 🚨 REGLA CRÍTICA: Documentación Obligatoria

**Clawy Archives es MI memoria externa. TODO debe estar ahí.**

### Al crear PROYECTO:
1. Deploy Vercel
2. Agregar a `MEMORY.md`
3. Agregar a `clawy-archives/app/page.tsx`
4. Deploy Archives

### Al cometer ERROR:
1. Documentar en `MEMORY.md`
2. Agregar a Clawy Archives con LECCIÓN
3. Deploy Archives

### Skill para esto:
`~/.openclaw/workspace/skills/clawy-archives/SKILL.md`

**URL:** https://clawy-archives.vercel.app

---

## Error 9: Romper UI por Arreglar Build (2026-03-07)
- **Problema:** Hice múltiples cambios en componentes para arreglar build y rompí la UI
- **Causa:** Me enfoqué en que `npm run build` pasara sin verificar diseño
- **Impacto:** Casi pierde horas/días de trabajo de Luis
- **Lección:** UN cambio → test → push. NUNCA múltiples cambios a la vez.

---

_Last updated: 2026-03-07_
