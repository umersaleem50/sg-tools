import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og/constants";
import { loadFonts } from "@/lib/og/fonts";
import { DefaultTemplate } from "@/lib/og/templates";

export const alt = "SG Tools — Profesionalni alati";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <DefaultTemplate
        title="Profesionalni alati nastali iz 30 godina iskustva"
        description="SG Tools donosi pouzdanost, trajnost i ergonomiju — po cenama koje imaju smisla."
      />
    ),
    { ...size, fonts },
  );
}
