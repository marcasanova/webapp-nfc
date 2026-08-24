import { LandingReveal } from "@/components/landing-reveal";

export function LandingProblem() {
  return (
    <section className="border-t border-borde px-4 py-14 sm:px-8 sm:py-24">
      <LandingReveal className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bosque">
          De vuelta en casa
        </p>
        <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight text-piedra">
          El imán se queda. Las fotos, a veces no.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ya sabes cómo va: vuelves, cuelgas el imán y las fotos se pierden en
          el móvil o en un chat que nadie vuelve a abrir. Album NFC une las
          dos cosas. Un toque en la nevera y ahí están.
        </p>
      </LandingReveal>
    </section>
  );
}
