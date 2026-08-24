"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DEFAULT_ALBUM_EMOJI, isValidAlbumEmoji } from "@/lib/album-emojis";
import { countryNameFromCode } from "@/lib/countries";
import { randomSuffix, slugify } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/storage";

export type CreateAlbumState = {
  error: string | null;
};

export async function createAlbum(
  _prevState: CreateAlbumState,
  formData: FormData,
): Promise<CreateAlbumState> {
  const name = String(formData.get("name") ?? "").trim();
  const countryCode = String(formData.get("country_code") ?? "").trim();
  const emojiInput = String(formData.get("emoji") ?? "").trim();

  if (!name) {
    return { error: "Ponle un nombre al álbum." };
  }
  if (!countryCode) {
    return { error: "Elige un país." };
  }
  if (!emojiInput) {
    return { error: "Elige un emoji para el álbum." };
  }

  const emoji = isValidAlbumEmoji(emojiInput) ? emojiInput : DEFAULT_ALBUM_EMOJI;

  const countryName = countryNameFromCode(countryCode);
  const baseSlug = slugify(name) || slugify(countryName) || "album";

  const supabase = await createClient();

  let slug = baseSlug;
  let attempt = 0;
  let insertedSlug: string | null = null;

  while (attempt < 5 && !insertedSlug) {
    const { error } = await supabase.from("albums").insert({
      name,
      emoji,
      country_code: countryCode,
      country_name: countryName,
      slug,
    });

    if (!error) {
      insertedSlug = slug;
      break;
    }

    if (error.code === "23505") {
      attempt += 1;
      slug = `${baseSlug}-${randomSuffix()}`;
      continue;
    }

    return { error: "No se pudo crear el álbum. Inténtalo de nuevo." };
  }

  if (!insertedSlug) {
    return { error: "No se pudo crear el álbum. Inténtalo de nuevo." };
  }

  revalidatePath("/app");
  redirect(`/album/${insertedSlug}`);
}

export async function deleteAlbum(albumId: string, slug: string) {
  const supabase = await createClient();

  const { data: mediaRows } = await supabase
    .from("media")
    .select("storage_path")
    .eq("album_id", albumId);

  if (mediaRows && mediaRows.length > 0) {
    await supabase.storage
      .from(MEDIA_BUCKET)
      .remove(mediaRows.map((m) => m.storage_path));
  }

  await supabase.from("albums").delete().eq("id", albumId);

  revalidatePath("/app");
  revalidatePath(`/album/${slug}`);
  redirect("/app");
}
