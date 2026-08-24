const QUESTIONS = [
  {
    q: "¿Hace falta descargar una app?",
    a: "No. Se abre en el navegador del móvil y ya está.",
  },
  {
    q: "¿Hay que crear una cuenta?",
    a: "Tampoco. Entras, miras y guardas fotos sin registrarte.",
  },
  {
    q: "¿Quién puede ver o editar las fotos?",
    a: "Cualquiera con el enlace. Está hecho para compartirlo en casa, sin líos de usuarios.",
  },
  {
    q: "¿Puedo subir vídeos?",
    a: "De momento no, solo fotos (JPEG, PNG, WebP, HEIC o GIF).",
  },
  {
    q: "¿A dónde lleva la pegatina?",
    a: "A esta web, a la portada o a la lista de álbumes. No apunta a un álbum concreto.",
  },
  {
    q: "¿Va en iPhone y en Android?",
    a: "Sí. Con el NFC del móvil, en Safari o en Chrome.",
  },
] as const;

export function LandingFaq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-borde px-4 py-14 sm:px-8 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bosque">
            Dudas
          </p>
          <h2
            id="faq-heading"
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight text-piedra"
          >
            Cosas que suelen preguntar
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-borde border-y border-borde">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-base font-semibold text-piedra marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-tierra transition-transform duration-150 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
