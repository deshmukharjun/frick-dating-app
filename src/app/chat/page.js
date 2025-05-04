"use client";
import { useRouter } from "next/navigation";
import TopBar from "../matches/components/TopBar";
import ChatList from "./components/ChatList";
import BottomNav from "../matches/components/BottomNav";

export default function ChatPage() {
    const router = useRouter();

    return (
        <div className="bg-[#111111] text-white h-screen flex flex-col relative">
            <TopBar />
            <ChatList />
            <BottomNav />
        </div>
    );
}
