# UI / UX — Album NFC

## Marca

- Nombre: **Album NFC** (sin tilde en “Album”).
- Wordmark tipográfico (`components/brand-lockup.tsx`): **Album** en piedra + **NFC** en tierra. Sin imagen de logo.
- Eslogan principal: *"Tus recuerdos, a un toque."*
- Eslogan secundario: *"Abre el mapa de tus mejores momentos."*
- Filosofía: un viaje o momento especial no termina al volver a casa — vive en los lugares que habitas. Album NFC convierte un imán de nevera en un álbum vivo de fotos para revivir en cualquier momento.
- El código y el schema siguen usando `album`/`albums`; no renombrar identificadores técnicos. En UI, “álbum/álbumes” es el sustantivo de contenido; la marca es **Album NFC**.

## Tono y lenguaje

Cálido, inspirador, directo, sin jerga técnica.

- Evitar: "NFC tag", "upload", "data", "media", "postal".
- Usar: "pegatina", "recuerdo", "fotos", "guardar foto", "álbum".

Microtexto de referencia:

- Encabezado home: wordmark **Album NFC** + eslogan *"Tus recuerdos, a un toque."*
- Subtítulo home: *"Abre el mapa de tus mejores momentos."*
- CTA crear: *"+ Nuevo álbum"*.
- CTA subir foto (FAB): *"+ Añadir foto"*.
- Estado guardando: *"Guardando…"*.
- Galería vacía: *"Todavía no hay fotos en este álbum. Toca el botón para guardar la primera."*
- Home vacía: *"Todavía no hay álbumes."*

## Paleta de colores

Inspirada en paisajes reales: arena de playa, tierra arcillosa, verde de bosque, luz de atardecer. Tema **claro** (no dark mode).

| Nombre | Hex | Uso |
| --- | --- | --- |
| Tierra | `#D96B4B` | Color principal: CTA, acentos, “NFC” del logo |
| Bosque | `#5E7764` | Acento secundario: badges, focus, montañas del logo |
| Arena | `#F9F6F1` | Fondo de la app (nunca blanco puro) |
| Blanco | `#FFFFFF` | Tarjetas y superficies elevadas |
| Piedra | `#2D2926` | Texto y marco del logo (no negro puro) |
| Borde | `#E6E2DA` | Bordes y divisiones discretas |
| Lust | `#E4201B` | Acciones destructivas (borrar) |

Variables CSS en `app/globals.css`, mapeadas en `@theme inline` de Tailwind 4. `html { color-scheme: light; }`.

### Atmósfera y fondo continuo

- `html` y `body` con `background-color` sólido arena.
- Degradados + grain en pseudo-elementos `position: fixed; inset: 0` (no en el `background` del body), para que no se corte una “raya” al final del contenido.
- `#app-root` con `min-h-dvh` y `bg-background`.
- Excepción funcional: overlays oscuros sobre fotos (gradiente de cards / scrim del lightbox) usan `piedra`/negro con texto `blanco`.

## Tipografía

- Única familia: **DM Sans** (`next/font/google`) para marca, títulos y cuerpo. Nunca Inter/Roboto/Arial ni serif por defecto.
- Titulares con tamaño fluido vía `clamp()`.
- `lang="es"` en `<html>`.

## Composición

- Home herramienta (`/app`): `BrandLockup` (texto) como señal hero, grid de álbumes, un único CTA "+ Nuevo álbum". Sin stats, sin filtros, sin promos.
- Landing (`/`): wordmark hero + un eslogan + una frase + un CTA a `/app`; debajo, un bloque “Cómo funciona” en tres pasos. Sin cards de features ni formularios.
- Álbum (`/album/[slug]`): wordmark pequeño + volver, cabecera con emoji + país, nombre, grid de fotos, FAB "+ Añadir foto". Primera visita: overlay de bienvenida antes de la galería.
- Sin cards decorativas: la card de álbum es el contenedor de interacción.
- Excepción a "sin emojis": el emoji es un dato del álbum (elegido al crearlo), no decoración de UI.
- Estilo de foto: borde fino `borde` y esquinas `rounded-xl`/`rounded-3xl`.

## Motion

Usar `motion` con intención:

1. Stagger de cards / fotos.
2. Modal/sheet de crear álbum.
3. Lightbox inmersivo a pantalla completa: swipe horizontal, flechas (desktop) y teclado ←/→ / Escape; acciones portada/borrar en barra inferior.
4. Feedback al guardar fotos.
5. Hover de card: zoom + lift + borde Tierra.
6. Confirmación breve al setear portada.
7. Bienvenida primera visita al álbum (`AlbumWelcome`): título + emoji + partículas en colores de marca (tierra/bosque/arena/piedra); una vez por slug en `localStorage`; skip al tocar; respetar `prefers-reduced-motion`.

Evitar glow, sombras multicapa y pills decorativos.

## Móvil primero (obligatorio)

Acceso principal: escaneo NFC con el smartphone. Desktop es secundario. Escribir primero clases para 320–390px y añadir `sm:`/`md:`/`lg:` solo para pantallas mayores.

### Viewport y layout

- Usar `min-h-dvh` / `h-dvh` (nunca `100vh`) para evitar saltos con la barra del navegador móvil.
- `overflow-x-hidden` en `html`, `body` y `#app-root`.
- Meta viewport con `viewportFit: "cover"` en `app/layout.tsx` para que `env(safe-area-inset-*)` funcione con notch / home indicator.
- FAB y sheets: `env(safe-area-inset-bottom)`.

### Ergonómica táctil

- Touch targets ≥ **44×44px** (`min-h-[44px] min-w-[44px]` cuando aplique).
- Espacio mínimo `gap-2` (8px) entre controles contiguos.
- Feedback al pulsar: `active:scale-95 transition-transform duration-150`.
- `-webkit-tap-highlight-color: transparent` y `touch-action: manipulation` en controles interactivos (definido en `globals.css`).
- Sheets móviles (crear álbum, confirmaciones): asa superior, cabecera/pie fijos, cuerpo con scroll, CTAs a **ancho completo** y apilados (`flex-col-reverse`: acción primaria abajo).
- Enlace “volver” como botón/píldora con borde, no solo texto subrayado.
- FAB “+ Añadir foto” a ancho casi completo en móvil; el `input[type=file]` **sin** `capture` para poder elegir cámara o galería.

### Grids e imágenes

- Home álbumes: **2 columnas** en móvil; `md`/`lg` escalan a 3–4.
- Galería fotos: `grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4`.
- Fotos: `aspect-square` + `object-cover` en el grid. En el lightbox: `object-contain` a máximo viewport, sin pinch-zoom en el MVP.
- Z-index: bienvenida (`z-[60]`) > lightbox (`z-50`) > FAB (`z-40`).

### Tipografía y formularios

- Hero de marca puede usar `clamp` expresivo; cuerpo/subtítulos: `text-sm` / `text-base`.
- **Crítico iOS:** inputs y selects con **mínimo 16px** (`text-base`) para evitar auto-zoom de Safari.

### Checklist al tocar UI

- [ ] FAB / CTA alcanzable con el pulgar (una mano).
- [ ] Botones e inputs ≥ 44px de alto.
- [ ] Sin scroll horizontal (`overflow-x` = 0).
- [ ] Campos de texto ≥ 16px en móvil.
- [ ] Se ve bien en ~375px y en desktop.

## Fuera de alcance

Diseño de la pegatina NFC física impresa, deploy y vinculación NFC. Solo fotos: no hay vídeos en el MVP.
