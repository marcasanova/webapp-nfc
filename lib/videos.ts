/**
 * Enlaces a los vídeos del proyecto (TikTok + Instagram).
 * Solo URLs: al tocar se abre la plataforma. Miniaturas en `public/videos/`
 * (y `docs/videos/` para el README de GitHub).
 */
export type ProjectVideo = {
  id: "tiktok" | "instagram";
  label: string;
  href: string;
  thumb: string;
  /** Placeholder de visualizaciones (no se obtiene de la API). */
  viewsLabel: string;
};

export const PROJECT_VIDEOS: readonly ProjectVideo[] = [
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@marc_casanova/video/7675024218152520982",
    thumb: "/videos/tiktok-thumb.jpg",
    viewsLabel: "+90k visualizaciones",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/reel/DcHFC1GuVfd/",
    thumb: "/videos/instagram-thumb.jpg",
    viewsLabel: "+20k visualizaciones",
  },
] as const;
