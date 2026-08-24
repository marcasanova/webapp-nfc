"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { deleteMedia, setAlbumCover } from "@/app/actions/media";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { PhotoLightbox } from "@/components/photo-lightbox";
import { publicMediaUrl } from "@/lib/storage";
import type { Media } from "@/lib/types";

type PhotoGridProps = {
  media: Media[];
  albumId: string;
  slug: string;
  coverPath: string | null;
};

export function PhotoGrid({ media, albumId, slug, coverPath }: PhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSettingCover, startCoverTransition] = useTransition();
  const [justSetCover, setJustSetCover] = useState(false);

  const confirming = media.find((m) => m.id === confirmingId) ?? null;
  const lightboxOpen =
    selectedIndex !== null &&
    selectedIndex >= 0 &&
    selectedIndex < media.length;

  function handleIndexChange(nextIndex: number, nextDirection: number) {
    setDirection(nextDirection);
    setSelectedIndex(nextIndex);
  }

  function handleDelete(item: Media) {
    const deleteIndex = media.findIndex((m) => m.id === item.id);

    startTransition(async () => {
      await deleteMedia(item.id, item.storage_path, albumId, slug);
      setConfirmingId(null);

      const remaining = media.length - 1;
      if (remaining <= 0 || deleteIndex < 0) {
        setSelectedIndex(null);
        return;
      }

      const nextIndex = Math.min(deleteIndex, remaining - 1);
      setDirection(0);
      setSelectedIndex(nextIndex);
    });
  }

  function handleSetCover(item: Media) {
    startCoverTransition(async () => {
      await setAlbumCover(albumId, item.storage_path, slug);
      setJustSetCover(true);
      setTimeout(() => setJustSetCover(false), 1800);
    });
  }

  if (media.length === 0) {
    return (
      <EmptyState
        title="Este álbum está vacío"
        description="Toca el botón de abajo y sube la primera foto, desde la cámara o la galería."
      />
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {media.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => {
              setDirection(0);
              setSelectedIndex(i);
            }}
            className="group relative aspect-square min-h-[44px] overflow-hidden rounded-2xl border border-surface-border bg-surface transition-transform duration-150 active:scale-[0.98]"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={publicMediaUrl(item.storage_path)}
              alt="Foto del álbum"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
            {item.storage_path === coverPath ? (
              <span className="absolute left-2 top-2 rounded-full border border-surface-border bg-blanco/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-tierra">
                Portada
              </span>
            ) : null}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxOpen && selectedIndex !== null ? (
          <PhotoLightbox
            key="photo-lightbox"
            media={media}
            index={selectedIndex}
            direction={direction}
            coverPath={coverPath}
            isSettingCover={isSettingCover}
            justSetCover={justSetCover}
            onIndexChange={handleIndexChange}
            onClose={() => setSelectedIndex(null)}
            onSetCover={handleSetCover}
            onRequestDelete={(item) => setConfirmingId(item.id)}
          />
        ) : null}
      </AnimatePresence>

      <ConfirmDialog
        open={confirming !== null}
        title="¿Borrar esta foto?"
        description="Se quita del álbum y no se puede recuperar."
        pending={isPending}
        onConfirm={() => confirming && handleDelete(confirming)}
        onCancel={() => setConfirmingId(null)}
      />
    </>
  );
}
