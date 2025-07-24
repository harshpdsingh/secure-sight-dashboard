import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { FaVideo, FaBarcode, FaExclamationTriangle, FaUsers } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="relative z-10 w-full h-[76px] flex items-center justify-between px-6 py-4 border-b border-white/15 bg-transparent backdrop-blur-md">
      
      {/* Left: Logo */}
      <div className="flex items-center gap-2 w-[120.39px] h-[26px]">
        <Image src="/logo.png" alt="Logo" width={20} height={26} />
        <span className="text-white text-base font-normal leading-[120%] font-['Plus Jakarta Sans']">
          MANDLACX
        </span>
      </div>

      {/* Middle: Navigation Buttons */}
      <div className="flex items-center gap-4 w-[540px] h-[36px] justify-center">
        <NavButton icon={<MdDashboard size={16} color="#FFCC00" />} label="Dashboard" />
        <NavButton icon={<FaVideo size={16} color="white" />} label="Cameras" />
        <NavButton icon={<FaBarcode size={16} color="white" />} label="Scans" />
        <NavButton icon={<FaExclamationTriangle size={16} color="white" />} label="Incidents" />
        <NavButton icon={<FaUsers size={16} color="white" />} label="Users" />
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-3 w-[200px] h-[48px] p-2 rounded-md">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image src="/profilepic.png" alt="Profile" width={32} height={32} />
        </div>
        <div className="flex flex-col text-white font-['DM Sans']">
          <span className="text-[13px] font-semibold leading-none">Mohammed Ajhas</span>
          <span className="text-[12px] font-normal leading-4">ajhas@mandlac.com</span>
        </div>
        <IoChevronDown size={16} className="text-white" />
      </div>
    </nav>
  );
}

function NavButton({ icon, label, active }) {
  return (
    <div
      className={`relative flex items-center justify-center gap-2 px-3 py-[10px] h-[36px] rounded-md ${
        active ? "bg-yellow-400/10" : ""
      }`}
    >
      <div className="z-0">{icon}</div>
      <span
        className={`z-1 text-white text-[12px] font-bold font-['Plus Jakarta Sans'] leading-[120%] tracking-[-0.01em]`}
      >
        {label}
      </span>
    </div>
  );
}
