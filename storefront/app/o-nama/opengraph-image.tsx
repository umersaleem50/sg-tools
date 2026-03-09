import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og/constants";
import { loadFonts } from "@/lib/og/fonts";
import { DefaultTemplate } from "@/lib/og/templates";

export const alt = "O nama — SG Tools";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <DefaultTemplate
        title="O nama"
        description="Upoznaj SG Tools — brend nastao iz 30 godina iskustva u svetu profesionalnih alata."
      />
    ),
    { ...size, fonts },
  );
}
