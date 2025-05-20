"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function StickyMascot() {
  const bubbleRef = useRef(null);
  const chatRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
      setTimeout(() => {
        gsap.fromTo(
          bubbleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        setTimeout(() => {
          gsap.to(bubbleRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => setShowBubble(false),
          });
        }, 5000);
      }, 10);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        closeChat();
      }
    };
    if (chatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatOpen]);

  const openChat = () => {
    setMessages([{ sender: "mascot", text: "Hej, hvad kan jeg gøre for dig?" }]);
    setChatOpen(true);
    setTimeout(() => {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }, 10);
  };

  const closeChat = () => {
    gsap.to(chatRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setChatOpen(false),
    });
  };

  const toggleChat = () => {
    chatOpen ? closeChat() : openChat();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: inputValue.trim() }]);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-row items-end gap-2">
      {/* Taleboble */}
      {showBubble && (
        <div
          ref={bubbleRef}
          style={{ opacity: 0 }}
          className="bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm relative"
        >
          <span className="absolute right-[-6px] transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white" />
          Klik på mig hvis du har brug for hjælp
        </div>
      )}

      {/* Chatboks */}
      {chatOpen && (
        <div
          ref={chatRef}
          style={{ opacity: 0 }}
          className="bg-white text-black w-64 p-4 rounded-lg shadow-xl text-sm space-y-2 flex flex-col relative"
        >
          <button
            onClick={closeChat}
            className="absolute top-2 right-2 text-gray-500 text-lg font-bold"
          >
            &times;
          </button>
          <div className="flex-1 space-y-1 overflow-y-auto max-h-64">
            {messages.map((msg, i) => (
              <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-xl break-words max-w-[80%] w-fit ${
                  msg.sender === "mascot"
                    ? "bg-gray-200 text-left"
                    : "bg-blue-100 text-right"
                }`}
              >
                {msg.text}
              </div>
            </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Skriv en besked..."
            />
            <button
              type="submit"
              className="bg-[#4D6A4E] text-white px-3 py-1 rounded text-xs"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Klikbar mascot */}
      <button
        onClick={toggleChat}
        className="w-16 h-16 overflow-hidden"
      >
        <Image
          src="/photos/spottermaskot.png"
          alt="Sticky mascot"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </button>
    </div>
  );
}
