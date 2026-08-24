"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BrandLockup } from "@/components/brand-lockup";
import { LandingCtaLink } from "@/components/landing-cta-link";
import { PROJECT_VIDEOS, type ProjectVideo } from "@/lib/videos";

function HeroVideoCard({ video }: { video: ProjectVideo }) {
  return (
    <a
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver en ${video.label}: ${video.viewsLabel}`}
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-borde bg-piedra shadow-sm shadow-piedra/10 transition-transform duration-150 active:scale-[0.98] sm:rounded-3xl"
    >
      <Image
        src={video.thumb}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 45vw, 22vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-piedra/65 via-piedra/10 to-transparent" />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blanco/90 text-piedra shadow-md shadow-piedra/20 transition-transform duration-150 group-hover:scale-105 sm:h-14 sm:w-14">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6"
            aria-hidden
          >
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        </span>
      </span>
      <span className="absolute left-2 top-2 rounded-full border border-blanco/20 bg-piedra/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blanco backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
        {video.label}
      </span>
      <span className="absolute inset-x-2 bottom-2 rounded-full border border-blanco/15 bg-piedra/60 px-2 py-1 text-center text-[10px] font-medium text-blanco backdrop-blur-sm sm:inset-x-3 sm:bottom-3 sm:px-2.5 sm:py-1.5 sm:text-xs">
        {video.viewsLabel}
      </span>
    </a>
  );
}

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
          className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:gap-4"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {PROJECT_VIDEOS.map((video) => (
            <HeroVideoCard key={video.id} video={video} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
