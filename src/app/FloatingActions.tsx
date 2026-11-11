"use client";

import { useState } from "react";
import { Link } from "react-router";

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const handleWhatsApp = (text?: string) => {
    const msg = encodeURIComponent(
      text || "Hello! I would like to inquire about admissions at Baldwin Girls' High School."
    );
    window.open(`https://wa.me/919148780138?text=${msg}`, "_blank");
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/baldwingirlshighschool/?hl=en",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/Baldwingirls/",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/c/BaldwinGirlsHighSchool",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/school/baldwin-girls-high-school-bangalore/home/",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:baldwingirls@gmail.com",
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. FLOATING SOCIAL SIDEBAR (Fixed Right Middle) */}
      <aside
        aria-label="Social media links"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col bg-[#07162c]/90 backdrop-blur-md border-l border-y border-white/10 rounded-l-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] py-2 text-white/70 overflow-hidden"
      >
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={item.name}
            title={item.name}
            className="flex items-center justify-center w-10 h-10 hover:text-white hover:bg-[#1D4ED8] transition-all duration-200"
          >
            {item.icon}
          </a>
        ))}
      </aside>

      {/* 2. FLOATING WHATSAPP BUTTON (Fixed Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center group">
        <a
          href="https://wa.me/919148780138?text=Hello!%20I%20would%20like%20to%20inquire%20about%20admissions%20at%20Baldwin%20Girls%27%20High%20School."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Baldwin Girls on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

          {/* Official WhatsApp SVG Icon */}
          <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>

        {/* Hover pill tooltip */}
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-gray-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Chat with us on WhatsApp
        </span>
      </div>

      {/* 3. FLOATING CHAT HELPER PILL (Bottom Right, Left of WhatsApp) */}
      <div className="fixed bottom-6 right-24 z-30 hidden md:block">
        {!chatOpen ? (
          <div
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-4 py-2 cursor-pointer hover:border-[#1D4ED8] hover:shadow-[0_10px_35px_rgba(29,78,216,0.18)] transition-all duration-300 group"
          >
            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center p-0.5">
              <img src="/baldwin-crest-official.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#0B1B3D] leading-tight flex items-center gap-1.5">
                Hello, How may I help you?
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <p className="text-[9.5px] text-[#637083]">Chat with the Baldwin Assistant 👋</p>
            </div>
            <span className="text-[#1D4ED8] text-xs font-bold pl-1 group-hover:translate-x-0.5 transition-transform">
              💬
            </span>
          </div>
        ) : (
          <div className="w-80 rounded-2xl bg-white border border-gray-200 shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center p-1">
                  <img src="/baldwin-crest-official.png" alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D]">Baldwin Assistant</h4>
                  <p className="text-[9.5px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#506690] mt-3 leading-relaxed">
              Welcome to Baldwin Girls’ High School! How can we assist you today?
            </p>

            <div className="mt-3 space-y-1.5">
              <button
                type="button"
                onClick={() => handleWhatsApp("I would like to inquire about 2026-27 Admissions.")}
                className="w-full text-left text-xs bg-gray-50 hover:bg-blue-50 hover:text-[#1D4ED8] border border-gray-200/80 rounded-lg px-3 py-2 transition-colors font-medium text-[#0B1B3D]"
              >
                🎒 2026–27 Admissions Procedure
              </button>
              <button
                type="button"
                onClick={() => handleWhatsApp("I would like to schedule a Campus Tour.")}
                className="w-full text-left text-xs bg-gray-50 hover:bg-blue-50 hover:text-[#1D4ED8] border border-gray-200/80 rounded-lg px-3 py-2 transition-colors font-medium text-[#0B1B3D]"
              >
                🏫 Schedule a Campus Tour
              </button>
              <button
                type="button"
                onClick={() => handleWhatsApp("Can you please share the Fee Structure?")}
                className="w-full text-left text-xs bg-gray-50 hover:bg-blue-50 hover:text-[#1D4ED8] border border-gray-200/80 rounded-lg px-3 py-2 transition-colors font-medium text-[#0B1B3D]"
              >
                📄 Fee Structure & Curriculum
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && chatMessage.trim()) {
                    handleWhatsApp(chatMessage);
                    setChatMessage("");
                  }
                }}
                placeholder="Type a question..."
                className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#1D4ED8]"
              />
              <button
                type="button"
                onClick={() => {
                  if (chatMessage.trim()) {
                    handleWhatsApp(chatMessage);
                    setChatMessage("");
                  }
                }}
                className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
