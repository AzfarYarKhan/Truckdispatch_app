"use client";

import { acceptJob } from "@/app/actions/job.actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface ButtonProps {
  jobname: string;
}

const Button: React.FC<ButtonProps> = ({ jobname }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await acceptJob(jobname);
      toast.success("Job Accepted!");
      router.refresh();
    } catch (error) {
      console.error("Error Accepting job:", error);
      toast.error("Failed to accept job. Please try again.");
    }
  };

  return (
    <button
      className="
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        xl:mt-56
        transition
        w-full
        h-8
        bg-gray-900 hover:bg-gray-800 text-white hover:text-slate-50
      "
      onClick={handleClick}
    >
      Cancel Job
      <ToastContainer />
    </button>
  );
};

export default Button;
