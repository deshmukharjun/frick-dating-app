"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stories from "./Stories";
import conversations from "@/app/data/conversations";

export default function ChatList() {
  const router = useRouter();

  const chatEntries = Object.entries(conversations);

  return (
    <div className="flex-1 overflow-y-scroll no-scrollbar bg-[#111111]">
      <Stories />

      <div className="sticky top-0 bg-[#111111] py-4 z-10 px-4 flex items-center">
        <h2 className="text-lg font-bold text-white">Messages</h2>
      </div>

      <div className="bg-[#191919] rounded-t-[20px] px-2 py-2 mt-2">
        {chatEntries.map(([id, chat]) => {
          const lastMessage = chat.messages[chat.messages.length - 1];

          return (
            <div
              key={id}
              onClick={() => {
                localStorage.removeItem("viewedStories");
                router.push(`/chat/${id}`);
              }}
              className="flex items-center py-3 border-b border-gray-700 px-2 last:border-none relative cursor-pointer hover:bg-[#1f1f1f]"
            >

              <Image
                src={chat.profilePic}
                alt={chat.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-white">{chat.name}</h3>
                <p className="text-xs text-gray-400 truncate">{lastMessage.text}</p>
              </div>
              <div className="text-xs text-right">
                <p className={chat.unread > 0 ? "text-red-400 font-medium" : "text-gray-400"}>
                  {chat.lastActive}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-red-400 text-white text-xs px-2 py-1 rounded-full relative top-2.5">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        <div className="h-50 bg-[#191919]"></div>
      </div>
    </div>
  );
}
