"use client";

import { CONTACT_INFO } from "@/constants";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Container from "../container";
import Section from "../section";
import Wrapper from "../wrapper";

const LocationMap = dynamic(() => import("./location-map"), { ssr: false });

function ContactLocations() {
  return (
    <Section className="pt-0!">
      <Wrapper>
        <Container delay={0.1}>
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
              Naše prodavnice
            </h2>
            <p className="text-muted-foreground mt-3 text-center max-w-lg">
              Poseti nas na jednoj od dve lokacije u Beogradu
            </p>
          </div>
        </Container>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTACT_INFO.locations.map((location, index) => (
            <Container key={location.name} delay={0.2 + index * 0.1}>
              <div className="relative rounded-2xl border border-border/50 overflow-hidden">
                <div className="aspect-[16/10] w-full isolate">
                  <LocationMap
                    lat={location.coords.lat}
                    lng={location.coords.lng}
                    name={location.name}
                  />
                </div>

                <div className="relative p-5 flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          ))}
        </div>
      </Wrapper>
    </Section>
  );
}

export default ContactLocations;
