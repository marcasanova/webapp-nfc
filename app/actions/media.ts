"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/storage";

export async function registerMedia(
  albumId: string,
  slug: string,
  storagePath: string,
  mimeType: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("media").insert({
    album_id: albumId,
    storage_path: storagePath,
    mime_type: mimeType,
  });

  if (error) {
    throw new Error("No se pudo guardar la foto.");
  }

  const { data: album } = await supabase
    .from("albums")
    .select("cover_path")
    .eq("id", albumId)
    .single();

  if (album && !album.cover_path) {
    await supabase
      .from("albums")
      .update({ cover_path: storagePath })
      .eq("id", albumId);
  }

  revalidatePath("/app");
  revalidatePath(`/album/${slug}`);
}

export async function setAlbumCover(
  albumId: string,
  storagePath: string,
  slug: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("albums")
    .update({ cover_path: storagePath })
    .eq("id", albumId);

  if (error) {
    throw new Error("No se pudo actualizar la portada.");
  }

  revalidatePath("/app");
  revalidatePath(`/album/${slug}`);
}

export async function deleteMedia(
  mediaId: string,
  storagePath: string,
  albumId: string,
  slug: string,
) {
  const supabase = await createClient();

  await supabase.storage.from(MEDIA_BUCKET).remove([storagePath]);
  await supabase.from("media").delete().eq("id", mediaId);

  const { data: album } = await supabase
    .from("albums")
    .select("cover_path")
    .eq("id", albumId)
    .single();

  if (album && album.cover_path === storagePath) {
    const { data: nextMedia } = await supabase
      .from("media")
      .select("storage_path")
      .eq("album_id", albumId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    await supabase
      .from("albums")
      .update({ cover_path: nextMedia?.storage_path ?? null })
      .eq("id", albumId);
  }

  revalidatePath("/app");
  revalidatePath(`/album/${slug}`);
}
