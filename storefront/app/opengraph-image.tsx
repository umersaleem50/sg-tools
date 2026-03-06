import OpenGraphTemplate from "@/components/OpenGraphTemplate";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "SG Tools";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OpenGraphImage() {
  // Font loading, process.cwd() is Next.js project directory
  const t = await getTranslations("hero");
  return new ImageResponse(
    <OpenGraphTemplate
      title={`${t("titleLine1")}. ${t("titleLine2")}`}
      description={t("description")}
      btnText={t("ctaPrimary")}
      key={"about"}
    />,
    { ...size },
  );
}
