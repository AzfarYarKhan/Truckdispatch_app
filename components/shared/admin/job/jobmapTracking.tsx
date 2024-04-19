"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";

interface MapProps {
  pickupame: string;
  dropoffname: string;
  pickupLocation: { lat: number; lon: number };
  dropoffLocation: { lat: number; lon: number };
  jobname: string;
}
interface Coordinates {
  latitude: number;
  longitude: number;
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: "ap2",
});

const JobMap: React.FC<MapProps> = ({
  pickupame,
  dropoffname,
  pickupLocation,
  dropoffLocation,
  jobname,
}) => {
  const [driverLocation, setDriverLocation] = useState<Coordinates | null>(
    null
  );

  useEffect(() => {
    const channel = pusher.subscribe("location-channel");
    const eventName = `location-update-${jobname}`;
    channel.bind(eventName, (data: Coordinates) => {
      setDriverLocation({ latitude: data.latitude, longitude: data.longitude });
      const newLocation = {
        latitude: data.latitude,
        longitude: data.longitude,
      };
      console.log("Driver Location:", newLocation);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

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
      dynamic(() => import("./MapComponentTracking"), {
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
      <Map
        locations={locations}
        setDistance={setCalculatedDistance}
        driverlocation={driverLocation}
      />
    </div>
  );
};

export default JobMap;
