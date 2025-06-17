"use client";
import { useRouter } from "next/navigation";
import TopBar from "../../matches/components/TopBar";
import DetailedChat from "./components/DetailedChat";

export default function ChatPage() {
    const router = useRouter();

    return (
        <div className="bg-[#111111] text-white h-screen flex flex-col relative">
            <TopBar />
            <DetailedChat />
        </div>
    );
}
