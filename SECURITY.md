# Seguridad — Album NFC

## Modelo del MVP

Este proyecto es un **MVP intencionalmente abierto**:

- No hay login ni roles.
- Las políticas RLS de Postgres permiten a `anon` (y `authenticated`) hacer `SELECT` / `INSERT` / `UPDATE` / `DELETE` en `albums` y `media`.
- El bucket de Storage `media` permite lectura pública y escritura/borrado al rol `anon`.

Cualquiera con la URL de la app (y la anon key pública, que va en el cliente) puede crear, editar o borrar álbumes y fotos.

## Qué no debes hacer

- No uses este MVP con datos personales sensibles, fotos privadas o contenido que no puedas permitirte perder o que sea abusado.
- No subas `.env`, `.env.local`, service role keys ni PATs al repositorio.
- No asumas autenticación ni aislamiento multi-usuario: el código actual no los implementa.

## Buenas prácticas al hacer fork o desplegar

1. Crea **tu propio** proyecto Supabase (no reutilices el de producción de otro).
2. Usa solo la **anon key** en variables `NEXT_PUBLIC_*`. La service role no debe ir al frontend.
3. Si necesitas privacidad real, añade Auth y políticas RLS restrictivas antes de producción.
4. Rota keys si alguna se filtra.

## Reportar problemas

Si encuentras una vulnerabilidad en el **código de la aplicación** (no el diseño abierto del MVP), abre un [issue](https://github.com/marcasanova/WebApp-NFCs/issues) describiendo el problema sin publicar secretos.

Para abuso de una instancia desplegada, contacta al dueño de ese despliegue; el acceso abierto es una decisión de producto del MVP, no un bug oculto.
