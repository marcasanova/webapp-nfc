"use client";

import { motion } from "motion/react";
import { AlbumCard } from "@/components/album-card";
import { EmptyState } from "@/components/empty-state";
import type { AlbumWithCount } from "@/lib/types";

export function AlbumGrid({ albums }: { albums: AlbumWithCount[] }) {
  if (albums.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay ningún álbum"
        description="Crea el primero cuando quieras y empieza a meter fotos de tus viajes."
      />
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </motion.div>
  );
}
