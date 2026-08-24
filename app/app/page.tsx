import { AlbumGrid } from "@/components/album-grid";
import { BrandLockup } from "@/components/brand-lockup";
import { CreateAlbumLauncher } from "@/components/create-album-launcher";
import { getAlbums } from "@/lib/albums";

export default async function AppHome() {
  const albums = await getAlbums();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] sm:gap-10 sm:px-8 sm:pb-16 sm:pt-16">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
          <BrandLockup size="lg" showTagline href="/app" />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Aquí tienes los álbumes. Cada uno es un sitio que ha pasado por la
            nevera, con sus fotos.
          </p>
        </div>
        <div className="w-full shrink-0 sm:w-auto">
          <CreateAlbumLauncher />
        </div>
      </header>

      <AlbumGrid albums={albums} />
    </main>
  );
}
