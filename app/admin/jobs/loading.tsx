import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 mt-64">
      <div className="flex items-center space-x-4 mx-auto">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px] sm:w-[300px] md:w-[500px] lg:w-[900px]" />
          <Skeleton className="h-4 w-[250px] sm:w-[250px] md:w-[400px] lg:w-[750px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4 mx-auto">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px] sm:w-[300px] md:w-[500px] lg:w-[900px]" />
          <Skeleton className="h-4 w-[250px] sm:w-[250px] md:w-[400px] lg:w-[750px]" />
        </div>
      </div>
    </div>
  );
}
