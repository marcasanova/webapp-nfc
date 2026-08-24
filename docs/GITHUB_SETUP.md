# Checklist: metadatos del repo en GitHub

Hazlo en [Settings del repo](https://github.com/marcasanova/WebApp-NFCs/settings) (o en la portada → engranaje de “About”).

## About

- **Description:** `WebApp de álbumes de fotos abiertos al escanear pegatinas NFC (Next.js + Supabase).`
- **Website / Homepage:** `https://album-nfc.vercel.app/`
- **Topics:** `nextjs`, `supabase`, `nfc`, `typescript`, `tailwindcss`, `photo-album`

## Social preview

Settings → General → Social preview → subir imagen ~1280×640 (logo + tagline “Tus recuerdos, a un toque.”).

## Visibilidad

Confirma que el repo es **público** y que `.env.local` nunca estuvo en el historial (`git log --all -- .env.local` no debería listar commits).

## Opcional

- Renombrar el repo a `album-nfc` para alinear nombre remoto y producto.
- Añadir botón “Deploy to Vercel” en el README cuando la demo esté estable.
