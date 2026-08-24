"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BrandLockup } from "@/components/brand-lockup";
import { LandingCtaLink } from "@/components/landing-cta-link";

export function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative px-4 pb-12 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-8 sm:pb-24 sm:pt-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-7 md:grid-cols-2 md:gap-14">
        <div className="flex min-w-0 flex-col items-start gap-5 sm:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <BrandLockup size="lg" showTagline href={null} />
          </motion.div>

          <motion.p
            className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            Ese imán de la nevera no tiene por qué quedarse ahí quieto. Acerca
            el móvil y salen las fotos del viaje. Para mirarlas cuando te
            apetezca, sin buscar entre carpetas.
          </motion.p>

          <motion.div
            className="w-full sm:w-auto"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <LandingCtaLink className="w-full sm:w-auto" />
          </motion.div>
        </div>

        <motion.div
          className="relative aspect-[5/4] w-full min-w-0 overflow-hidden rounded-2xl border border-borde sm:aspect-[4/5] sm:rounded-3xl md:aspect-[3/4]"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="/landing/hero-magnet.jpg"
            alt="Una mano acerca el móvil a un imán de viaje en la nevera"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
