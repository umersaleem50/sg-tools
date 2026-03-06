import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import Container from "./container";
import Wrapper from "./wrapper";

const companies = [
  { src: "/companies/coligoars.png", alt: "Coligoars" },
  { src: "/companies/enterijerjankovic.png", alt: "Enterijer Jankovic" },
  { src: "/companies/galens.png", alt: "Galens" },
  { src: "/companies/hidroina.png", alt: "Hidroina" },
  { src: "/companies/ingradnja.png", alt: "Ingradnja" },
  { src: "/companies/kokreator.png", alt: "Kokreator" },
  { src: "/companies/lokring.png", alt: "Lokring" },
  { src: "/companies/mbmrad.png", alt: "MBM Rad" },
  { src: "/companies/mimiz.png", alt: "Mimiz" },
  { src: "/companies/nobili.png", alt: "Nobili" },
  { src: "/companies/silmaxlogo.png", alt: "Silmax" },
  { src: "/companies/termotim.png", alt: "Termotim" },
  { src: "/companies/vitorog.png", alt: "Vitorog" },
];

const Companies = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Wrapper>
        <Container>
          <div className="flex flex-col items-center justify-center px-2 md:px-0">
            <h4 className="text-xl lg:text-2xl font-semibold text-center tracking-tight">
              Kompanije koje veruju SG Tools-u
            </h4>
          </div>
        </Container>

        <Container delay={0.1}>
          <div className="mt-10 w-full relative overflow-hidden opacity-80 rounded-md">
            <Marquee className="[--duration:30s]">
              {companies.map((company) => (
                <Image
                  key={company.src}
                  src={company.src}
                  alt={company.alt}
                  width={1024}
                  height={1024}
                  className="w-40 h-20 object-contain transition-opacity duration-300"
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
          </div>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Companies;
