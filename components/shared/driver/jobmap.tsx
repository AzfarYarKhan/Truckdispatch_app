"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

interface MapProps {
  pickupame: string;
  dropoffname: string;
  pickupLocation: { lat: number; lon: number };
  dropoffLocation: { lat: number; lon: number };
}

const JobMap: React.FC<MapProps> = ({
  pickupame,
  dropoffname,
  pickupLocation,
  dropoffLocation,
}) => {
  const [locations, setLocations] = useState([
    {
      name: "",
      lat: 0,
      lon: 0,
    },
    {
      name: "",
      lat: 0,
      lon: 0,
    },
  ]);

  const Map = useMemo(
    () =>
      dynamic(() => import("../driver/MapComponent"), {
        ssr: false,
      }),
    []
  );
  useEffect(() => {
    setLocations([
      {
        name: pickupame,
        lat: pickupLocation?.lat || 0,
        lon: pickupLocation?.lon || 0,
      },
      {
        name: dropoffname,
        lat: dropoffLocation?.lat || 0,
        lon: dropoffLocation?.lon || 0,
      },
    ]);
  }, [pickupame, dropoffname, pickupLocation, dropoffLocation]);

  const setCalculatedDistance = (distance: number) => {
    //console.log("distance", distance);
  };

  return (
    <div className="mb-4 xl:mb-0 pt-6 xl:pt-5">
      <Map locations={locations} setDistance={setCalculatedDistance} />
    </div>
  );
};

export default JobMap;
