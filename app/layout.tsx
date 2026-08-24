import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Album NFC",
    template: "%s · Album NFC",
  },
  description:
    "Tus recuerdos, a un toque. Acerca el móvil a un imán de nevera y vuelven las fotos de ese viaje.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F9F6F1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-background">
        <div id="app-root" className="flex min-h-dvh flex-1 flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
