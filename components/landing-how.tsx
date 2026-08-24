const STEPS = [
  {
    n: "01",
    title: "Pega la pegatina",
    body: "Coloca la pegatina NFC en el imán de un destino que quieras recordar.",
  },
  {
    n: "02",
    title: "Acerca el móvil",
    body: "Un toque abre Album NFC: el mapa de álbumes listo para explorar.",
  },
  {
    n: "03",
    title: "Guarda las fotos",
    body: "Crea álbumes por país y añade recuerdos desde la cámara o la galería.",
  },
] as const;

export function LandingHow() {
  return (
    <section
      aria-labelledby="como-funciona-heading"
      className="border-t border-borde px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bosque">
            Cómo funciona
          </p>
          <h2
            id="como-funciona-heading"
            className="text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-tight text-piedra"
          >
            Del imán de nevera al álbum compartido
          </h2>
        </div>

        <ol className="flex flex-col gap-10 sm:gap-12">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-2 sm:flex-row sm:gap-8">
              <span
                className="shrink-0 text-sm font-semibold tracking-wide text-tierra"
                aria-hidden
              >
                {step.n}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-piedra">{step.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
