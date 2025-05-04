"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        
        { label: "Matches", icon: "/matches_icon.svg", path: "/matches" },
        { label: "Likes", icon: "/likes_icon.svg", path: "/likes" },
        { label: "Messages", icon: "/messages_icon.svg", path: "/chat" },
        { label: "Profile", icon: "/profile_icon.svg", path: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#111111] flex justify-around py-3 text-gray-400 z-50">
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                    <button
                        key={item.label}
                        onClick={() => {
                            router.push(item.path)}}
                        className={`flex flex-col items-center ${isActive ? "text-white" : "text-gray-400"}`}
                    >
                        <Image
                            src={item.icon}
                            alt={item.label}
                            width={28}
                            height={28}
                            className="mb-2"
                            style={{ filter: isActive ? "brightness(5)" : "brightness(0.5)" }}
                        />
                        <span className="text-xs">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
