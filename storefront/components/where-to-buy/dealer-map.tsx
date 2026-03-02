"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Dealer } from "@/types/dealers";

interface DealerMapProps {
  dealers: Dealer[];
  selectedDealerId: string | null;
  onSelectDealer: (id: string | null) => void;
}

function createMarkerIcon(isSelected: boolean) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${isSelected ? "oklch(44.4% 0.177 26.899)" : "#6b7280"};
      border: 3px solid ${isSelected ? "#fff" : "#9ca3af"};
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      transition: all 0.2s ease;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

function MapController({
  dealer,
}: {
  dealer: Dealer | undefined;
}) {
  const map = useMap();

  useEffect(() => {
    if (dealer) {
      map.flyTo([dealer.coordinates.lat, dealer.coordinates.lng], 13, {
        duration: 1,
      });
    }
  }, [dealer, map]);

  return null;
}

export default function DealerMap({
  dealers,
  selectedDealerId,
  onSelectDealer,
}: DealerMapProps) {
  const selectedDealer = dealers.find((d) => d.id === selectedDealerId);

  return (
    <MapContainer
      center={[44.2, 20.9]}
      zoom={7}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController dealer={selectedDealer} />
      {dealers.map((dealer) => (
        <Marker
          key={dealer.id}
          position={[dealer.coordinates.lat, dealer.coordinates.lng]}
          icon={createMarkerIcon(dealer.id === selectedDealerId)}
          eventHandlers={{
            click: () => {
              onSelectDealer(
                dealer.id === selectedDealerId ? null : dealer.id
              );
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-foreground">{dealer.name}</p>
              {dealer.address && (
                <p className="text-muted-foreground">{dealer.address}</p>
              )}
              {dealer.city && (
                <p className="text-muted-foreground">{dealer.city}</p>
              )}
              {dealer.phone && (
                <p className="text-muted-foreground">{dealer.phone}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
