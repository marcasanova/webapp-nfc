import { LandingCtaLink } from "@/components/landing-cta-link";
import { LandingReveal } from "@/components/landing-reveal";

export function LandingCta() {
  return (
    <section className="border-t border-borde px-4 py-14 sm:px-8 sm:py-24">
      <LandingReveal className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 sm:items-center sm:text-center">
        <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight text-piedra">
          Tus recuerdos, a un toque.
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          Entra cuando quieras, echa un vistazo a los álbumes y guarda la
          siguiente foto. No hace falta cuenta.
        </p>
        <LandingCtaLink className="w-full sm:w-auto" />
      </LandingReveal>
    </section>
  );
}
