import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";

export function LandingHero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-[calc(2rem+env(safe-area-inset-top))] sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-8 sm:gap-10">
        <BrandLockup size="lg" showTagline href={null} />

        <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Abre el mapa de tus mejores momentos. Cada pegatina NFC abre un
          álbum vivo de fotos para revivir en cualquier instante.
        </p>

        <Link
          href="/app"
          className="inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-full bg-tierra px-8 text-base font-semibold text-blanco shadow-sm shadow-piedra/15 transition-transform duration-150 hover:scale-[1.02] active:scale-95 sm:w-auto sm:text-sm"
        >
          Acceder a Album NFC
        </Link>
      </div>
    </section>
  );
}
