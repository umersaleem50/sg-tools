import OpenGraphTemplate from "@/components/OpenGraphTemplate";
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

  return new ImageResponse(
    <OpenGraphTemplate
      title={"Profesionalni alati nastali iz 30 godina iskustva"}
      description={
        "Nastali iza pulta, oblikovani stvarnim potrebama majstora i tehničara. SG Tools donosi pouzdanost, trajnost i ergonomiju — po cenama koje imaju smisla."
      }
      btnText={"Kupi online"}
    />,
    { ...size },
  );
}
