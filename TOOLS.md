# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## 🔑 Credenciales (LEER EN CADA SESIÓN)

**Archivo principal:** `~/.config/clawy/.env`

### APIs Disponibles:
| API | Cómo usar |
|-----|-----------|
| **Vercel** | `curl -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v9/projects"` |
| **GitHub** | Token en `GITHUB_TOKEN` |
| **Supabase** | URL + Keys en `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **OpenAI** | `REPLICATE_API_TOKEN` (para imágenes) |
| **ElevenLabs** | `ELEVENLABS_API_KEY` |
| **X/Twitter** | `X_API_KEY`, `X_BEARER_TOKEN` |

### Comandos útiles:
```bash
# Leer credenciales
cat ~/.config/clawy/.env

# Usar token de Vercel
export VERCEL_TOKEN=$(grep VERCEL_TOKEN ~/.config/clawy/.env | cut -d= -f2)
```

---

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
