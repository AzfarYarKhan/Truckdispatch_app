"use client";

import React, { useEffect, useState } from "react";
import L, { LatLngTuple } from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface MapComponentProps {
  locations?: Location[];
  setDistance: (distance: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  locations = [],
  setDistance,
}) => {
  const [routeData, setRouteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const areLocationsValid =
    locations.length >= 2 &&
    locations[0]?.lat !== 0 &&
    locations[0]?.lon !== 0 &&
    locations[1]?.lat !== 0 &&
    locations[1]?.lon !== 0;

  const center: LatLngTuple = [locations[0]?.lat, locations[0]?.lon];
  const center2: LatLngTuple = [locations[1]?.lat, locations[1]?.lon];

  useEffect(() => {
    const calculateRoute = async () => {
      try {
        const apiKey = "7d010b4c61ed4b66b7e012a9025a4ea8";
        const response = await fetch(
          `https://api.geoapify.com/v1/routing?waypoints=${center.join(
            ","
          )}|${center2.join(",")}&mode=drive&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch route data");
        }

        const result = await response.json();
        setRouteData(result);
        setError(null);
        const distance =
          result.features[0]?.properties?.legs[0]?.distance || null;
        if (distance !== null) {
          setDistance(distance);
        }
        // console.log("result obj", result);
      } catch (err) {
        console.error(err);
        setError("Failed to calculate route");
      }
    };

    if (areLocationsValid) {
      calculateRoute();
    }
  }, [locations, center, center2]);

  /* console.log("center_pickup", center);
  console.log("center_pickup2", center2); */
  const MapComponentView: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      if (routeData) {
        L.geoJSON(routeData, {
          style: (feature) => {
            return {
              color: "rgba(20, 137, 255, 0.7)",
              weight: 5,
            };
          },
        })
          .bindPopup((layer) => {
            return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`;
          })
          .addTo(map);
      }
    }, [routeData, map]);

    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={areLocationsValid ? 8 : 2}
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {areLocationsValid && !error && routeData && (
        <>
          <Marker position={center} />
          <Marker position={center2} />
          {routeData && routeData.features && routeData.features.length > 0 && (
            <MapComponentView />
          )}
        </>
      )}

      {error && <p>Error: {error}</p>}
    </MapContainer>
  );
};

export default MapComponent;
