import Image from "next/image";

const PREVIEWS = [
  {
    name: "Kyoto en abril",
    country: "Japón",
    emoji: "🌸",
    count: 12,
    image: "/landing/step-fotos.jpg",
  },
  {
    name: "Costa amalfitana",
    country: "Italia",
    emoji: "🍋",
    count: 8,
    image: "/landing/step-tocar.jpg",
  },
  {
    name: "Lisboa",
    country: "Portugal",
    emoji: "🚋",
    count: 5,
    image: "/landing/hero-magnet.jpg",
  },
  {
    name: "Islandia",
    country: "Islandia",
    emoji: "🌋",
    count: 0,
    image: null as string | null,
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
          {album.image ? (
            <Image
              src={album.image}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-tierra/15 via-arena to-bosque/15 text-4xl sm:text-5xl">
              {album.emoji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-piedra/85 via-piedra/15 to-transparent" />
          {album.image ? (
            <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blanco/85 text-base backdrop-blur-sm sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-lg">
              {album.emoji}
            </span>
          ) : null}
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
