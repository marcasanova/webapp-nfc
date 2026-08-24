import type { Metadata } from "next";
import { LandingHero } from "@/components/landing-hero";
import { LandingHow } from "@/components/landing-how";

export const metadata: Metadata = {
  title: "Album NFC — Tus recuerdos, a un toque",
  description:
    "Album NFC convierte cada pegatina NFC en un álbum de fotos abierto. Abre el mapa de tus mejores momentos.",
};

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingHow />
      <footer className="border-t border-borde px-4 py-8 sm:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs text-muted-foreground">
          <span className="font-semibold text-piedra">Album</span>
          <span className="font-semibold text-tierra"> NFC</span>
          {" · "}
          Tus recuerdos, a un toque.
        </p>
      </footer>
    </>
  );
}
