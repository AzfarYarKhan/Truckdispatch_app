"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import { useSession } from "next-auth/react";
import { Track } from "livekit-client";

interface MediaRoomProps {
  video: boolean;
  audio: boolean;
  name: string;
}
function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
export const MediaRoom = ({ video, audio, name }: MediaRoomProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [token, setToken] = useState("");
  const router = useRouter();

  const onClick = () => {
    router.push("/driver/jobs");
  };

  useEffect(() => {
    if (!user?.role) return;
    const role = user.role;
    const room = `admin-${name}`;
    console.log(room);
    (async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${room}&username=${role}`);
        const data = await resp.json();
        //console.log(data.token);
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user?.id]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
          Getting token...
        </p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => onClick()}
      data-lk-theme="default"
      style={{ height: "100vh" }}
      className="sm:h-full"
    >
      {/* <MyVideoConference /> */}
      <VideoConference />
      {/*   <RoomAudioRenderer />*/}
      {/* <ControlBar /> */}
    </LiveKitRoom>
  );
};
