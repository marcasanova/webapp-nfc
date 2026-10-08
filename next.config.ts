import type { NextConfig } from "next";

function supabaseRemotePatterns() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
    return [];
  }

  try {
    const { hostname } = new URL(supabaseUrl);
    return [
      {
        protocol: "https" as const,
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseRemotePatterns(),
  },
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/albums",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
