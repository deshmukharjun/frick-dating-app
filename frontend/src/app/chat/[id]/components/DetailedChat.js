"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import conversations from "@/app/data/conversations";

export default function DetailedChat() {
  const { id } = useParams();  // This grabs the dynamic route param
  const router = useRouter();
  const [showPfpModal, setShowPfpModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // State for the typed message

  // Retrieve messages from localStorage when component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(`messages-${id}`));
    if (savedMessages) {
      setMessages(savedMessages);
    } else {
      if (id && conversations[id]) {
        setMessages(conversations[id].messages); // Load messages for the current contact
      } else {
        setMessages([]);  // Fallback to empty array if no messages
      }
    }
  }, [id]);

  // Update localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`messages-${id}`, JSON.stringify(messages));
    }
  }, [messages, id]);

  const handleSendMessage = (newMessageText) => {
    if (!newMessageText.trim()) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const updatedMessages = [...messages, { sender: "me", text: newMessageText, timestamp: timeString }];
    setMessages(updatedMessages);  // Updates the state

    // Save updated messages in localStorage
    localStorage.setItem(`messages-${id}`, JSON.stringify(updatedMessages));
    
    // Clear input after sending the message
    setNewMessage("");
  };

  const handleGoBack = () => router.back();
  const handlePfpClick = () => setShowPfpModal(true);
  const closePfpModal = () => setShowPfpModal(false);

  const profilePicture = conversations[id]?.profilePic || "/defaultProfilePic.png";  // Default if no profilePic

  return (
    <div className="flex flex-col h-screen bg-[#111111] text-white relative">
      {/* Top Navigation */}
      <div className="bg-[#222222] p-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button className="mr-2" onClick={handleGoBack}>
            <Image src="/back_arrow.svg" alt="Back" width={24} height={24} />
          </button>
          <div className="flex items-center">
            <div
              className="relative w-10 h-10 rounded-full overflow-hidden mr-2 cursor-pointer"
              onClick={handlePfpClick}
            >
              <Image src={profilePicture} alt={id} layout="fill" objectFit="cover" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{conversations[id]?.name || 'No Name'}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 ? (
          <p>No messages yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-2 flex ${msg.sender === "me" ? "justify-end" : "justify-start"} items-start`}
            >
              {msg.sender !== "me" && (
                <div className="mr-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    {msg.profilePic && (
                      <Image src={msg.profilePic} alt={msg.sender} width={32} height={32} />
                    )}
                  </div>
                </div>
              )}
              <div className="flex flex-col max-w-[75%]">
                {msg.sender !== "me" && (
                  <p className="text-xs text-gray-400 font-semibold mb-1">{msg.sender}</p>
                )}
                <div
                  className={`px-4 py-2 rounded-xl text-sm ${msg.sender === "me" ? "bg-red-500" : "bg-[#2a2a2a]"}`}
                >
                  {msg.text}
                  <p className="text-xs text-gray-500 mt-1 text-right">{msg.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-[#222222] px-3 py-3 text-gray-400 z-50">
        <div className="flex items-center">
          <div className="mr-2">
            <Image src="/attach.svg" alt="Attach" width={24} height={24} />
          </div>
          <div className="flex-1 bg-[#111111] rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)} // Update the message in state
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(newMessage); // Send message on Enter
                }
              }}
              placeholder="Write your message"
              className="bg-transparent text-white w-full outline-none text-sm"
            />
            {/* Send Button */}
            <button
              onClick={() => handleSendMessage(newMessage)} // Send message on button click
              className="ml-2"
            >
              <Image src="/send_icon.svg" alt="Send" width={24} height={24} />
            </button>
          </div>
          <div className="mr-2 ml-2">
            <Image src="/camera.svg" alt="Camera" width={24} height={24} />
          </div>
          <div className="mr-2">
            <Image src="/voicenote.svg" alt="Voice" width={24} height={24} />
          </div>
        </div>
      </div>

      {/* Profile Picture Modal */}
      {showPfpModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closePfpModal}
        >
          <Image
            src={profilePicture}
            alt="Enlarged Profile"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
}
