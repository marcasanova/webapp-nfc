# Contribuir a Album NFC

Gracias por interesarte en el proyecto. Estas notas son para humanos que hacen fork o abren PRs.

## Requisitos

- Node.js 20+ (recomendado)
- Cuenta de [Supabase](https://supabase.com) (proyecto propio)
- npm

## Setup local

```bash
git clone https://github.com/marcasanova/WebApp-NFCs.git
cd WebApp-NFCs
npm install
cp .env.example .env.local
```

Rellena `.env.local` con la URL y la anon key de **tu** proyecto Supabase. Aplica la migración en `supabase/migrations/001_albums_and_media.sql` (SQL Editor del Dashboard).

```bash
npm run dev
```

## Flujo de contribución

1. Haz fork del repositorio.
2. Crea una rama desde `main`: `git checkout -b feat/mi-cambio`.
3. Haz cambios mínimos y enfocados.
4. Antes de abrir PR: `npm run lint` y, si tocas rutas o tipos, `npm run build`.
5. Abre un Pull Request describiendo el *por qué* del cambio.

## Normas

- UI en español.
- No añadas auth, likes, comentarios u otras features fuera del MVP salvo que se pida en un issue.
- **Nunca** commits de `.env`, `.env.local`, service role keys ni secretos.
- No hardcodees un `project_ref` real en `.cursor/mcp.json`; usa el placeholder.

## Agentes de código

`AGENTS.md` y la carpeta `contexto/` orientan a asistentes de IA. No sustituyen este documento ni el README principal.

## Licencia

Al contribuir, aceptas que tu código se publique bajo la licencia MIT del repositorio.
