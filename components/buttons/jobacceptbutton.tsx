"use client";

import { acceptJob, finishJob } from "@/app/actions/job.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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

  const handleClick = async () => {
    try {
      if (jobstatus === "PENDING") {
        await acceptJob(jobname);
        toast.success("Job Accepted!");
        openGoogleMaps();
      } else if (jobstatus === "ACTIVE") {
        await finishJob(jobname);
        toast.success("Job Finished!");
      }

      router.refresh();
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
