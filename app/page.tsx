import type { Metadata } from "next";
import { LandingCta } from "@/components/landing-cta";
import { LandingFaq } from "@/components/landing-faq";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHero } from "@/components/landing-hero";
import { LandingHow } from "@/components/landing-how";
import { LandingMoments } from "@/components/landing-moments";
import { LandingProblem } from "@/components/landing-problem";
import { LandingProduct } from "@/components/landing-product";

export const metadata: Metadata = {
  title: "Album NFC — Tus recuerdos, a un toque",
  description:
    "Acerca el móvil a un imán de nevera y salen las fotos de ese viaje. Sin cuenta ni apps que instalar.",
};

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingProblem />
      <LandingProduct />
      <LandingHow />
      <LandingMoments />
      <LandingFaq />
      <LandingCta />
      <LandingFooter />
    </>
  );
}
