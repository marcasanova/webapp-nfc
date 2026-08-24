"use client";

import { useState, useTransition } from "react";
import { deleteAlbum } from "@/app/actions/albums";
import { ConfirmDialog } from "@/components/confirm-dialog";

export function DeleteAlbumButton({
  albumId,
  slug,
}: {
  albumId: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 min-h-[44px] w-full items-center justify-center rounded-full border border-surface-border bg-blanco px-4 text-base font-medium text-muted-foreground transition-transform duration-150 hover:border-lust hover:text-lust active:scale-95 sm:h-11 sm:w-auto sm:text-sm"
      >
        Borrar álbum
      </button>

      <ConfirmDialog
        open={open}
        title="¿Borrar este álbum?"
        description="Se borran el álbum y todas sus fotos. Esto no se puede deshacer."
        pending={isPending}
        onConfirm={() =>
          startTransition(async () => {
            await deleteAlbum(albumId, slug);
          })
        }
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
