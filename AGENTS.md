<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Album NFC — AGENTS.md

Instrucciones para agentes de código. Complementa el README humano. Formato libre según [agents.md](https://agents.md/).

## Project overview

**Album NFC**: WebApp abierta al escanear una pegatina NFC en un imán de nevera. Actúa como álbum compartido online. En el código y el schema el concepto es `album`/`albums`. Marca tipográfica: “Album” (piedra) + “NFC” (tierra).

- La landing (`/`) presenta la marca; la herramienta lista **todos los álbumes** en `/app` (uno por país / destino).
- Dentro de cada álbum: galería dinámica de **fotos** (no hay vídeos en el MVP).
- Crear álbum requiere **emoji** (selector curado) **+ nombre libre + país** (select), los tres obligatorios.
- Cualquiera puede crear álbumes, añadir y borrar fotos. **Sin login ni multi-usuario**.
- Persistencia: **Supabase** (Postgres + Storage).

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase, `motion` para animaciones.

## Repo map

| Path | Rol |
| --- | --- |
| `app/` | App Router (páginas, layouts, futuras route handlers) |
| `public/` | Estáticos públicos |
| `contexto/rules/` | Reglas de dominio, stack y diseño (solo este proyecto) |
| `contexto/skills/` | Skills de flujos (MCP, schema, etc.) |
| `.cursor/mcp.json` | MCP de Supabase scoped a este proyecto |
| `.env.example` | Plantilla de variables; secretos en `.env.local` |
| `lib/supabase/` | Clientes Supabase (browser/server) y helpers de datos |
| `app/actions/` | Server Actions (crear/borrar álbum, registrar/borrar foto) |

## Build and test commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

Antes de dar por cerrada una tarea de código: `npm run lint` y, si tocas tipos o rutas, `npm run build` cuando sea razonable.

## Code style guidelines

- TypeScript estricto; evitar `any`.
- UI en **español**.
- Preferir Server Components; `"use client"` solo cuando haga falta (galería interactiva, input file, etc.).
- Tailwind para estilos; no añadir UI kits sin pedirlo.
- Cambios mínimos y enfocados; no refactorizar fuera de alcance.
- Leer guías en `node_modules/next/dist/docs/` antes de APIs de Next.js.

## Security considerations

- Nunca commitear `.env`, `.env.local`, service role keys ni PATs.
- El MVP usa acceso abierto a propósito (RLS permisiva / políticas públicas). Documentar el riesgo; no fingir seguridad de usuario.
- Storage: lectura pública de media; escrituras según políticas del MVP documentadas en `contexto/rules/supabase.md`.
- No hardcodear tokens en `.cursor/mcp.json`; el usuario autentica por OAuth (o variables de entorno si hace falta).

## Context for agents

Antes de implementar features de producto o Supabase:

1. Leer las rules en `contexto/rules/` (incluye `contexto/rules/ui-design.md` para tokens visuales y motion).
2. Usar las skills en `contexto/skills/` cuando el flujo coincida (verificar MCP, preparar schema).
3. No copiar rules/skills a `~/.cursor/`; la fuente de verdad es **solo** `contexto/` en este repo.

## Supabase MCP

Config en `.cursor/mcp.json` (URL con `project_ref` y `features=database,storage,docs`).

1. Sustituir `YOUR_PROJECT_REF` por el ref real del dashboard.
2. Cursor → Settings → Tools & MCP → autenticar Supabase (OAuth).
3. Verificar con la skill `contexto/skills/verificar-mcp-supabase/`.

El schema (`albums` + `media` + bucket `media`) ya está definido en `contexto/skills/preparar-schema-albumes/`. Antes de tocarlo, usar `list_tables` para ver el estado real.
