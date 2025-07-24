import Image from "next/image";
import { MoreVertical } from "lucide-react";

export default function CameraCard({ src, label }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md w-full h-full">
      {/* Camera Image */}
      <Image
        src={src}
        alt={label}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />

      {/* Badge (top center) */}
      <div
        className="absolute  left-1/2 -translate-x-1/2 flex flex-row justify-between items-center px-[5px] py-[4px] gap-[3.2px] w-full h-[17px] bg-[#0B0B0B] shadow-sm z-10"
        style={{
          boxShadow: "0px 0.8px 1.6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <span className="text-[#D4D4D4] font-inter font-medium text-[8px] leading-[10px] w-[48px] h-[10px] text-center">
          {label}
        </span>
        <MoreVertical
          className="w-[9.6px] h-[9.6px]"
          style={{
            background: "#0C0A09",
            border: "0.8px solid #FFFFFF",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}
