"use client";

import { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./dealer-map.css";
import type { Dealer } from "@/types/dealers";

interface DealerMapProps {
  dealers: Dealer[];
  selectedDealerId: string | null;
  onSelectDealer: (id: string | null) => void;
  userLocation?: { lat: number; lng: number } | null;
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

function createUserLocationIcon() {
  return L.divIcon({
    className: "user-location-marker",
    html: `
      <style>
        @keyframes user-loc-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      </style>
      <div style="position: relative; width: 18px; height: 18px;">
        <div style="
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #3b82f6;
          border: 2.5px solid #fff;
          box-shadow: 0 0 8px rgba(59,130,246,0.5);
          z-index: 2;
        "></div>
        <div style="
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: user-loc-pulse 1.5s ease-out infinite;
          z-index: 1;
        "></div>
      </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function MapController({
  dealer,
  markerRefs,
}: {
  dealer: Dealer | undefined;
  markerRefs: React.RefObject<Map<string, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (dealer) {
      map.flyTo([dealer.coordinates.lat, dealer.coordinates.lng], 13, {
        duration: 1,
      });

      const marker = markerRefs.current?.get(dealer.id);
      if (marker) {
        const onMoveEnd = () => {
          marker.openPopup();
        };
        map.once("moveend", onMoveEnd);
        return () => {
          map.off("moveend", onMoveEnd);
        };
      }
    } else {
      map.closePopup();
    }
  }, [dealer, map, markerRefs]);

  return null;
}

function UserLocationMarker({
  location,
}: {
  location: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    const marker = L.marker([location.lat, location.lng], {
      icon: createUserLocationIcon(),
      interactive: false,
      zIndexOffset: 1000,
    }).addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, location]);

  return null;
}

export default function DealerMap({
  dealers,
  selectedDealerId,
  onSelectDealer,
  userLocation,
}: DealerMapProps) {
  const selectedDealer = dealers.find((d) => d.id === selectedDealerId);
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  const setMarkerRef = useCallback((dealerId: string, marker: L.Marker | null) => {
    if (marker) {
      markerRefs.current.set(dealerId, marker);
    } else {
      markerRefs.current.delete(dealerId);
    }
  }, []);

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
      <MapController dealer={selectedDealer} markerRefs={markerRefs} />
      {userLocation && <UserLocationMarker location={userLocation} />}
      {dealers.map((dealer) => (
        <Marker
          key={dealer.id}
          ref={(marker) => setMarkerRef(dealer.id, marker as unknown as L.Marker | null)}
          position={[dealer.coordinates.lat, dealer.coordinates.lng]}
          icon={createMarkerIcon(dealer.id === selectedDealerId)}
          eventHandlers={{
            click: () => {
              onSelectDealer(dealer.id === selectedDealerId ? null : dealer.id);
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
