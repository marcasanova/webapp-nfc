import Image from "next/image";
import { LandingReveal } from "@/components/landing-reveal";

const MOMENTS = [
  {
    title: "Un toque en la nevera",
    body: "El imán deja de ser solo decoración. Es la forma más rápida de volver a las fotos de ese viaje.",
    image: "/landing/step-tocar.jpg",
    alt: "Móvil acercándose a un imán de viaje en la nevera",
  },
  {
    title: "Todos tus sitios, juntos",
    body: "Japón, Italia, lo que sea: cada uno tiene su álbum. Los ves todos de un vistazo.",
    image: "/landing/hero-magnet.jpg",
    alt: "Nevera con imanes de viaje y un móvil a punto de tocarlos",
  },
  {
    title: "Fotos que se quedan",
    body: "No hace falta rebuscar en el carrete. Las fotos viven junto al imán, en casa.",
    image: "/landing/step-fotos.jpg",
    alt: "Fotos de viaje extendidas sobre una mesa junto a un imán",
  },
] as const;

export function LandingMoments() {
  return (
    <section className="border-t border-borde px-4 py-14 sm:px-8 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-24">
        {MOMENTS.map((moment, index) => {
          const reverse = index % 2 === 1;
          return (
            <LandingReveal
              key={moment.title}
              className={`grid items-center gap-6 md:grid-cols-2 md:gap-14 ${
                reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="flex min-w-0 flex-col gap-3">
                <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-tight text-piedra">
                  {moment.title}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {moment.body}
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl border border-borde sm:rounded-3xl">
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </LandingReveal>
          );
        })}
      </div>
    </section>
  );
}
