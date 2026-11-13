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
    }, 600);
  };

  return (
    <div className="py-2">
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
        className={`inline-flex items-center justify-between gap-6 sm:gap-10 px-4 py-3 rounded-xl border-2 transition-all select-none cursor-pointer max-w-[320px] w-full shadow-md bg-white text-slate-800 ${
          verified
            ? "border-emerald-500 ring-2 ring-emerald-500/20"
            : "border-slate-300 hover:border-slate-400 hover:shadow-lg"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all ${
              verified
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "border-slate-400 bg-white hover:border-slate-600"
            }`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            ) : verified ? (
              <svg
                className="w-5 h-5 stroke-[3]"
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
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              {verified ? "Verification passed" : "I'm not a robot"}
            </span>
            {verified && (
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                Confirmed
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-[9px] pl-3 border-l border-slate-200 text-slate-400 select-none">
          <svg className="w-6 h-6 text-[#1A73E8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
          </svg>
          <span className="font-semibold text-slate-600 leading-tight mt-0.5">reCAPTCHA</span>
          <span className="text-[8px] text-slate-400">Privacy &bull; Terms</span>
        </div>
      </div>
    </div>
  );
}
