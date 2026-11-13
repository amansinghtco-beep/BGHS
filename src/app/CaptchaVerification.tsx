import React, { useState } from "react";

interface CaptchaVerificationProps {
  verified: boolean;
  onVerify: () => void;
  dark?: boolean;
}

export default function CaptchaVerification({
  verified,
  onVerify,
  dark = false,
}: CaptchaVerificationProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (verified || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify();
    }, 650);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`inline-flex items-center justify-between gap-5 sm:gap-8 px-4 py-2.5 rounded-2xl border transition-all select-none cursor-pointer max-w-full sm:max-w-xs shadow-sm ${
        dark
          ? "bg-[#0B1A30]/90 border-white/20 hover:border-[#F3C44E]/50 text-white"
          : "bg-slate-50/90 border-slate-200 hover:border-slate-300 text-slate-800"
      } ${verified ? (dark ? "ring-1 ring-emerald-400/50" : "ring-1 ring-emerald-500/40") : ""}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
            verified
              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
              : dark
              ? "border-slate-400 bg-white/10 hover:border-white"
              : "border-slate-300 bg-white hover:border-slate-400"
          }`}
        >
          {loading ? (
            <div className="w-3.5 h-3.5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          ) : verified ? (
            <svg
              className="w-4 h-4 stroke-[3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : null}
        </div>
        <span
          className={`text-xs sm:text-sm font-medium ${
            dark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          {verified ? "Verification confirmed" : "I'm not a robot"}
        </span>
      </div>

      <div
        className={`flex flex-col items-center justify-center text-[9px] pl-3 border-l ${
          dark
            ? "border-white/10 text-slate-400"
            : "border-slate-200 text-slate-400"
        }`}
      >
        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
        </svg>
        <span className={`font-semibold ${dark ? "text-slate-300" : "text-slate-600"}`}>
          reCAPTCHA
        </span>
        <span className="text-[8px] opacity-75">Privacy &bull; Terms</span>
      </div>
    </div>
  );
}
