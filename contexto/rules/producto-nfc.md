# Producto — Album NFC

Documento de lógica de negocio / alcance del MVP. No hay un PRD aparte: este archivo es la fuente de verdad de producto.

## Concepto

Pegatina NFC en un imán de nevera (país / destino visitado). Al escanear con el smartphone se abre esta WebApp, **Album NFC**: un álbum compartido online de **fotos** (no vídeos). En el código y el schema el concepto se llama `album`/`albums`.

## Flujos del MVP

1. **Landing** (`/`): presentación de Album NFC (sin navbar) + CTA “Ver los álbumes” + footer con RRSS.
2. **Home de la herramienta** (`/app`): listado de todos los álbumes (por país), con portada o emoji, nombre y país.
3. **Álbum** (`/album/[slug]`): galería de fotos de ese álbum.
4. **Crear álbum**: cualquiera puede crear un álbum nuevo. Requiere **emoji** (selector curado), **nombre libre** (texto) **y país** (select de una lista fija) — los tres campos son **obligatorios**; el slug se genera del nombre.
5. **Añadir fotos**: desde galería o cámara del teléfono (`input[type=file][accept="image/*"]`).
6. **Portada**: cualquier foto del álbum puede marcarse manualmente como portada desde el lightbox (“Usar de portada”); se muestra en la card del dashboard. Si no hay portada, se muestra el emoji del álbum.
7. **Borrar**: cualquiera puede borrar álbumes o fotos (sin auth).

## Reglas de producto

- Sin login, sin roles, sin contenido por usuario.
- Un NFC apunta a la **landing** (`/`) o a la herramienta (`/app`); no a un álbum concreto.
- **Solo imágenes**: no se admiten vídeos en el MVP. Formatos: JPEG, PNG, WebP, HEIC, GIF. Tamaño máximo por foto: ~10 MB.
- Persistencia obligatoria (Supabase: Postgres + Storage).
- UI en español, pensada para móvil primero, con una identidad visual cuidada (ver `contexto/rules/ui-design.md`).
- No añadir features fuera del álbum compartido (auth, likes, comentarios, etc.) salvo petición explícita.

## Fuera de alcance (MVP)

Diseño de la pegatina física, deploy y vinculación NFC, vídeos, cuentas de usuario, multi-tenant.
