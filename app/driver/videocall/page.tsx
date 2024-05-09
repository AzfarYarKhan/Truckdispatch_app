import { MediaRoom } from "@/components/shared/driver/media-room";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Videocall() {
  const currentUser = await getCurrentUser();
  const drivername = currentUser?.name;
  return (
    <div className="bg-white dark:bg-slate-800 flex flex-col h-full">
      <MediaRoom video={true} audio={true} name={drivername} />
    </div>
  );
}
