"use client";

import { useRef, useState } from "react";
import { registerMedia } from "@/app/actions/media";
import { createClient } from "@/lib/supabase/client";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MEDIA_BUCKET,
  extensionFromMimeType,
} from "@/lib/storage";

type UploadButtonProps = {
  albumId: string;
  slug: string;
};

export function UploadButton({ albumId, slug }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    setError(null);

    const validFiles = files.filter(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type) &&
        file.size <= MAX_IMAGE_BYTES,
    );

    if (validFiles.length === 0) {
      setError(
        "Solo valen fotos (JPEG, PNG, WebP, HEIC o GIF) de hasta 10 MB.",
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    setProgress({ done: 0, total: validFiles.length });

    const supabase = createClient();

    for (const file of validFiles) {
      const ext = extensionFromMimeType(file.type);
      const path = `${albumId}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { contentType: file.type });

      if (!uploadError) {
        try {
          await registerMedia(albumId, slug, path, file.type);
        } catch {
          setError("No se ha podido guardar alguna foto. Prueba otra vez.");
        }
      } else {
        setError("No se ha podido guardar alguna foto. Prueba otra vez.");
      }

      setProgress((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev));
    }

    setUploading(false);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-2 px-4">
      {error ? (
        <p
          role="alert"
          className="max-w-sm rounded-2xl border border-borde bg-blanco px-4 py-2.5 text-center text-sm text-lust shadow-sm"
        >
          {error}
        </p>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex h-14 min-h-[48px] w-full max-w-sm items-center justify-center gap-2 rounded-full bg-tierra px-7 text-base font-semibold text-blanco shadow-lg shadow-piedra/20 transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-70 sm:w-auto sm:min-w-[14rem] sm:text-sm"
      >
        {uploading && progress
          ? `Guardando ${progress.done}/${progress.total}…`
          : "+ Añadir foto"}
      </button>
    </div>
  );
}
