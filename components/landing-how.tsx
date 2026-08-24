import Image from "next/image";
import { LandingReveal } from "@/components/landing-reveal";

const STEPS = [
  {
    n: "01",
    title: "Pega la pegatina",
    body: "Detrás del imán del viaje que quieres guardar. Tarda un segundo.",
    image: "/landing/step-pegar.jpg",
    alt: "Manos pegando una pegatina blanca en el reverso de un imán de viaje",
  },
  {
    n: "02",
    title: "Acerca el móvil",
    body: "Lo pones cerca del imán y se abre Album NFC con todos los álbumes.",
    image: "/landing/step-tocar.jpg",
    alt: "Un móvil tocando un imán de viaje en la nevera",
  },
  {
    n: "03",
    title: "Guarda las fotos",
    body: "Abres el álbum del país y vas metiendo fotos desde la cámara o la galería.",
    image: "/landing/step-fotos.jpg",
    alt: "Fotos de viaje sobre una mesa junto a un imán y un móvil",
  },
] as const;

export function LandingHow() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="scroll-mt-4 border-t border-borde px-4 py-14 sm:scroll-mt-8 sm:px-8 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-20">
        <LandingReveal className="flex max-w-2xl flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bosque">
            Cómo funciona
          </p>
          <h2
            id="como-funciona-heading"
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-semibold leading-tight text-piedra"
          >
            Del imán al álbum, en tres pasos
          </h2>
        </LandingReveal>

        <ol className="flex flex-col gap-14 sm:gap-24">
          {STEPS.map((step, index) => {
            const reverse = index % 2 === 1;
            return (
              <li key={step.n}>
                <LandingReveal
                  className={`grid items-center gap-6 md:grid-cols-2 md:gap-14 ${
                    reverse ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl border border-borde sm:rounded-3xl">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <span
                      className="text-sm font-semibold tracking-wide text-tierra"
                      aria-hidden
                    >
                      {step.n}
                    </span>
                    <h3 className="text-[clamp(1.35rem,3vw,1.75rem)] font-semibold text-piedra">
                      {step.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </LandingReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
