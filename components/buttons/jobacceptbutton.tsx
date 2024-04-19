"use client";

import { acceptJob, finishJob } from "@/app/actions/job.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { share_realtime_loc } from "@/app/actions/job.actions";
import { useEffect, useState } from "react";

interface ButtonProps {
  jobname: string;
  jobstatus: string;
  pickupLocation: { lat: number; lon: number };
  dropoffLocation: { lat: number; lon: number };
}

const Button: React.FC<ButtonProps> = ({
  jobname,
  jobstatus,
  pickupLocation,
  dropoffLocation,
}) => {
  const router = useRouter();

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pickupLocation.lat},${pickupLocation.lon}&destination=${dropoffLocation.lat},${dropoffLocation.lon}`;
    window.open(googleMapsUrl, "_blank");
  };
  let watchId: number;
  // let watchID: NodeJS.Timeout | number | undefined; // in case of setinterval method use this global watchID
  // in both useeffect and handleclick function

  useEffect(() => {
    const setupGeolocationWatch = () => {
      if (jobstatus === "ACTIVE") {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await share_realtime_loc(latitude, longitude, jobname);
          },
          (error) => {
            console.error("Geolocation denied:", error);
          },
          {
            enableHighAccuracy: false,
            timeout: 2000,
            maximumAge: 3000,
          }
        );
      }
    };

    setupGeolocationWatch();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [jobstatus]);

  //      alternative code using getposition and setinterval when using this make sure
  //      to have this one in handleclick as well instead of watch position there aswell
  /*   useEffect(() => {
    const updatePosition = async () => {
      if (!watchID) {
        watchID = setInterval(async () => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              let { latitude, longitude } = position.coords;
              await share_realtime_loc(latitude, longitude, jobname);
            },
            (error) => {
              console.error("Geolocation error:", error);
            }
          );
        }, 1000);
      }
    };
    if (jobstatus === "ACTIVE") {
      updatePosition();

      return () => {
        if (watchID) {
          clearInterval(watchID as number);
        }
      };
    }
    return () => {
      if (watchID) {
        clearInterval(watchID as number);
      }
    };
  }, [jobstatus]); */

  const handleClick = async () => {
    try {
      if (jobstatus === "PENDING") {
        if (navigator.geolocation) {
          await acceptJob(jobname);
          toast.success("Job Accepted!");
          openGoogleMaps();
          router.refresh();
          watchId = navigator.geolocation.watchPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await share_realtime_loc(latitude, longitude, jobname);
            },
            (error) => {
              console.error("Geolocation denied:", error);
            },
            {
              enableHighAccuracy: false,
              timeout: 2000,
              maximumAge: 3000,
            }
          );
        }
      } else if (jobstatus === "ACTIVE") {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
        await finishJob(jobname);
        toast.success("Job Finished!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error processing job:", error);
      toast.error("Failed to process job. Please try again.");
    }
  };

  return (
    <div>
      <button
        className="
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        xl:mt-48
        transition
        w-full
        h-8
        bg-gray-900 hover:bg-gray-800 text-white hover:text-slate-50
      "
        onClick={handleClick}
      >
        {jobstatus === "PENDING" ? "Accept Job" : "Finish Job"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default Button;
