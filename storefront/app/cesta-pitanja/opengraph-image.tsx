import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og/constants";
import { loadFonts } from "@/lib/og/fonts";
import { DefaultTemplate } from "@/lib/og/templates";

export const alt = "Česta pitanja — SG Tools";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <DefaultTemplate
        title="Česta pitanja"
        description="Odgovori na najčešća pitanja o SG Tools alatima, garanciji i kupovini."
      />
    ),
    { ...size, fonts },
  );
}
