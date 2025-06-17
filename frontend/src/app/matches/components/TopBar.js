"use client";
import Image from "next/image";

export default function TopBar() {
    return (
        <div className="flex items-center py-4 px-4 bg-[#111111] text-white">
            <Image
                src="/fricklogo.svg"
                alt="Top Bar Logo"
                width={56} // Tailwind's w-14 = 56px
                height={56}
                className="w-14"
            />
        </div>
    );
}
