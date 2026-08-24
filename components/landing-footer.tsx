import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { SOCIALS } from "@/lib/socials";

export function LandingFooter() {
  return (
    <footer className="border-t border-borde px-4 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex min-w-0 flex-col gap-1.5">
          <BrandLockup size="sm" href="/" />
          <p className="text-xs text-muted-foreground">
            Tus recuerdos, a un toque.
          </p>
        </div>

        <nav
          aria-label="Redes sociales"
          className="-mx-1 flex flex-wrap items-center gap-0.5"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-piedra transition-colors hover:bg-borde/60 hover:text-tierra active:scale-95"
            >
              <span
                aria-hidden
                className="block h-5 w-5 bg-current"
                style={{
                  maskImage: `url(${social.icon})`,
                  WebkitMaskImage: `url(${social.icon})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            </a>
          ))}
        </nav>

        <Link
          href="/app"
          className="inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-full border border-borde bg-blanco px-5 text-sm font-medium text-tierra transition-transform duration-150 hover:border-tierra/40 active:scale-95 sm:w-auto sm:border-0 sm:bg-transparent sm:px-0 sm:hover:border-0"
        >
          Ver los álbumes
        </Link>
      </div>
    </footer>
  );
}
