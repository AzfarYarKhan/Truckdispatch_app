"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVideo, setIsVideo] = useState(
    searchParams?.get("/video") === "true"
  );
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
    setIsVideo(!isVideo);
  };
  const Icon = isVideo ? VideoOff : Video;
  const tooltiplabel = isVideo ? "End Video Call" : "Start Video Call";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="hover:opacity-75 transition mr-4"
          >
            <Icon className="h-6 w-6 text-zinc-500 daek:text-zinc-400" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{tooltiplabel}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
