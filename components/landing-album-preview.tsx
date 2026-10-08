import Image from "next/image";

const PREVIEWS = [
  {
    name: "Nueva York",
    country: "Estados Unidos",
    emoji: "🗽",
    count: 14,
    image: "/landing/destinations/newyork.jpeg",
  },
  {
    name: "Kyoto",
    country: "Japón",
    emoji: "🏯",
    count: 12,
    image: "/landing/destinations/kyoto.webp",
  },
  {
    name: "Bangkok",
    country: "Tailandia",
    emoji: "🛕",
    count: 10,
    image: "/landing/destinations/bangkok.jpeg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    emoji: "🏝️",
    count: 8,
    image: "/landing/destinations/bali.jpeg",
  },
] as const;

export function LandingAlbumPreview() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {PREVIEWS.map((album) => (
        <article
          key={album.name}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-sm shadow-piedra/10 sm:rounded-3xl"
        >
          <Image
            src={album.image}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-piedra/85 via-piedra/15 to-transparent" />
          <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blanco/85 text-base backdrop-blur-sm sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-lg">
            {album.emoji}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
            <p className="line-clamp-2 text-sm font-semibold leading-tight text-blanco sm:text-base">
              {album.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-blanco/75 sm:text-xs">
              {album.country} · {album.count} fotos
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
