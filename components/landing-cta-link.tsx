import Link from "next/link";

type LandingCtaLinkProps = {
  className?: string;
};

export function LandingCtaLink({ className = "" }: LandingCtaLinkProps) {
  return (
    <Link
      href="/app"
      className={`inline-flex h-12 min-h-[44px] items-center justify-center rounded-full bg-tierra px-8 text-base font-semibold text-blanco shadow-sm shadow-piedra/15 transition-transform duration-150 hover:scale-[1.02] active:scale-95 sm:text-sm ${className}`}
    >
      Ver los álbumes
    </Link>
  );
}
