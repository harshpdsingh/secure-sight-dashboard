import Image from "next/image";
import UnresolvedIncidents from "@/components/UnresolvedIncidents";
import CameraCard from "@/components/CameraCard";
import TimelineRuler from "@/components/TimelineRuler";

export default function Home() {
  return (
    <>
      <div className="relative flex justify-center gap-6 m-8">
        <div className="relative w-1/2 h-[600px] rounded-xl overflow-hidden shadow-lg ">
          <Image
            src="/maincam.png"
            alt="Main Camera"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />

          <div className="absolute bottom-4 right-4 flex gap-4 w-[30%] h-[20%]">
            <div className="flex-1">
              <CameraCard src="/cam1.png" label="Camera 2" />
            </div>
            <div className="flex-1">
              <CameraCard src="/cam2.png" label="Camera 3" />
            </div>
          </div>
        </div>
        <UnresolvedIncidents />
      </div>
      <TimelineRuler />
    </>
  );
}
