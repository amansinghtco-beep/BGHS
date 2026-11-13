import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICONS — Pure vectors, zero external icon packages, zero emojis
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  Phone: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Compass: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Send: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ExternalLink: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Building: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Navigation: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  Instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  YouTube: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  ),
  Twitter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.768L20 4" />
    </svg>
  ),
  ShieldCheck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Bus: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M7 17v2" />
      <path d="M17 17v2" />
      <circle cx="7.5" cy="13.5" r="1.5" />
      <circle cx="16.5" cy="13.5" r="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export default function ContactPage() {
  // Enquiry form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "Admissions Inquiry",
    grade: "Not Applicable / General",
    message: "",
  });

  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const handleCaptchaClick = () => {
    if (captchaChecked || captchaLoading) return;
    setCaptchaLoading(true);
    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaChecked) {
      alert("Please confirm you are not a robot by clicking the verification checkbox.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setRefId(`BGHS-ENQ-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 900);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      department: "Admissions Inquiry",
      grade: "Not Applicable / General",
      message: "",
    });
    setCaptchaChecked(false);
    setSubmitted(false);
    setRefId("");
  };

  const googleMapsDirectionsUrl =
    "https://maps.google.com/?q=Baldwin+Girls+High+School+Richmond+Road+Bangalore";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0A1628] antialiased selection:bg-[#781428] selection:text-white">
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO HEADER BANNER & SUB-HERO ADMISSIONS QUICK BAR
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mb-6">
          <Link to="/" className="hover:text-[#781428] transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#0A1628] font-semibold">Contact</span>
        </div>

        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="h-0.5 w-6 bg-[#C59B27]" />
          <span className="text-xs uppercase tracking-widest font-bold text-[#C59B27]">
            CONTACT US
          </span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0A1628] tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-600 max-w-2xl font-light">
            Reach out to our administrative office, admissions desk, or visit our historic campus in the heart of Bengaluru.
          </p>
        </div>

        {/* Sub-Hero Dark Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#071326] via-[#0A1A35] to-[#122244] text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-white/10">
          {/* Subtle decorative background shapes */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#781428]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs sm:text-sm text-white/90 mb-6 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#F3C44E] animate-pulse" />
              <span>FOUNDED: 1880 | LOCATION: BENGALURU &bull; A UNIT OF BALDWIN METHODIST EDUCATIONAL SOCIETY</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Reach Our Team for Admissions
            </h2>
            <p className="text-white/75 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-8">
              We welcome prospective families to consult with our counselors for kindergarten, primary, middle, and ICSE / ISC high school programs. For administrative, alumni, or general queries, please contact our reception desk.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#enquiry-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#781428] hover:bg-[#8F1A32] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#781428]/30 group"
              >
                <Icon.Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Enquiry Form</span>
              </a>

              <Link
                to="/facilities"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-200 border border-white/20 backdrop-blur-md"
              >
                <Icon.Compass className="w-4 h-4 text-[#F3C44E]" />
                <span>Campus Tour</span>
              </Link>

              <a
                href="tel:08049363866"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium border border-white/10 transition-colors"
              >
                <Icon.Phone className="w-4 h-4 text-emerald-400" />
                <span>080-49363866</span>
              </a>
            </div>

            {/* Office Working Hours Strip */}
            <div className="rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md p-5 sm:p-6 mb-8">
              <div className="flex items-center gap-2.5 text-[#F3C44E] text-xs font-bold uppercase tracking-wider mb-3">
                <Icon.Clock className="w-4 h-4" />
                <span>School Office Visiting Hours</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-white/85">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5" />
                  <div>
                    <span className="font-semibold text-white">Monday &ndash; Friday:</span>
                    <span className="ml-1 text-white/80">8:30 AM &ndash; 3:30 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5" />
                  <div>
                    <span className="font-semibold text-white">Saturday:</span>
                    <span className="ml-1 text-white/80">9:00 AM &ndash; 12:00 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-rose-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5" />
                  <span>Every second Saturday is a holiday.</span>
                </div>
              </div>
            </div>

            {/* 3 Quick Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="tel:08049363866"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                  <Icon.Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    MAIN LANDLINE
                  </div>
                  <div className="text-sm font-bold text-white truncate">080-49363866</div>
                </div>
              </a>

              <a
                href="tel:+919148780138"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F3C44E]/20 text-[#F3C44E] flex items-center justify-center shrink-0">
                  <Icon.GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    ADMISSION CONTACTS
                  </div>
                  <div className="text-sm font-bold text-white truncate">+91 91487 80138</div>
                </div>
              </a>

              <a
                href="mailto:baldwingirls@gmail.com"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Icon.Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    OFFICIAL EMAIL
                  </div>
                  <div className="text-sm font-bold text-white truncate">baldwingirls@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. INSTITUTIONAL DESK — CONTACT INFORMATION (3 CARDS)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto">
        {/* Section Eyebrow */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF2F4] border border-[#F8D7DA] text-xs font-bold text-[#781428] uppercase tracking-wider mb-4">
            <Icon.Building className="w-3.5 h-3.5 text-[#781428]" />
            <span>INSTITUTIONAL DESK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1628] tracking-tight">
            Contact Information
          </h2>
          <div className="w-16 h-1 bg-[#C59B27] rounded-full my-4" />
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg font-light">
            Direct access channels for prospective families, enrolled parents, alumni, and educational partners.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* CARD 1: GENERAL LANDLINE */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-100/60 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0A1628] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Icon.Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B0000]">
                    MAIN LINE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628]">
                    General Landline
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Connect with the main reception desk for institutional enquiries, administrative verification, and general information.
              </p>

              {/* Primary Reception Highlight */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  PRIMARY RECEPTION DESK
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:08049363866"
                    className="inline-flex items-center gap-2 text-base font-bold text-[#0A1628] hover:text-[#781428] transition-colors"
                  >
                    <Icon.Phone className="w-4 h-4 text-[#781428]" />
                    <span>080-49363866</span>
                  </a>
                  <a
                    href="tel:08022211743"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#781428] transition-colors"
                  >
                    <Icon.Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>080-22211743</span>
                  </a>
                </div>
              </div>

              {/* Visiting Hours Highlight */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <Icon.Clock className="w-3.5 h-3.5 text-[#781428]" />
                  <span>OFFICE VISITING HOURS</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>
                    <span className="font-semibold text-slate-800">Mon &ndash; Fri:</span> 8:30 AM &ndash; 3:30 PM
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Saturday:</span> 9:00 AM &ndash; 12:00 PM
                  </p>
                  <p className="text-rose-600 font-medium pt-1">
                    Every second Saturday is a holiday.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Icon.Check className="w-2.5 h-2.5" />
              </span>
              <span>Central Campus Reception</span>
            </div>
          </div>

          {/* CARD 2: ADMISSION CONTACTS (DARK HERO CARD) */}
          <div className="bg-[#0B1A30] rounded-3xl p-7 sm:p-8 border border-blue-900/40 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden ring-2 ring-[#F3C44E]/30">
            {/* Radial glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#781428]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#781428] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#781428]/40">
                  <Icon.GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F3C44E]">
                    DEDICATED ADMISSIONS DESK
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Admission Contacts
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Direct hotlines for prospective parents seeking admissions from Pre-KG to Grade X (ICSE) &amp; ISC.
              </p>

              {/* Admissions Officer 1 */}
              <div className="rounded-2xl bg-[#132A52] border border-white/10 p-4 mb-3 hover:bg-[#16305C] transition-colors">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#F3C44E] mb-1.5">
                  ADMISSIONS OFFICER &bull; PRIMARY &amp; SECONDARY
                </div>
                <a
                  href="tel:+919148780138"
                  className="inline-flex items-center gap-2.5 text-lg font-bold text-white hover:text-[#F3C44E] transition-colors"
                >
                  <Icon.Phone className="w-4 h-4 text-[#F3C44E]" />
                  <span>+91 91487 80138</span>
                </a>
              </div>

              {/* Admissions Officer 2 */}
              <div className="rounded-2xl bg-[#132A52] border border-white/10 p-4 mb-6 hover:bg-[#16305C] transition-colors">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#F3C44E] mb-1.5">
                  ADMISSIONS OFFICER &bull; KINDERGARTEN &amp; GENERAL
                </div>
                <a
                  href="tel:+918147883880"
                  className="inline-flex items-center gap-2.5 text-lg font-bold text-white hover:text-[#F3C44E] transition-colors"
                >
                  <Icon.Phone className="w-4 h-4 text-[#F3C44E]" />
                  <span>+91 81478 83880</span>
                </a>
              </div>
            </div>

            {/* Footer Badge */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#F3C44E]">
              <span className="w-4 h-4 rounded-full bg-[#F3C44E]/20 text-[#F3C44E] flex items-center justify-center shrink-0">
                <Icon.Check className="w-2.5 h-2.5" />
              </span>
              <span>24-Hour Guaranteed Support</span>
            </div>
          </div>

          {/* CARD 3: BALDWIN GIRLS' HIGH SCHOOL (CAMPUS ADDRESS) */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-100/60 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#C59B27] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Icon.MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B0000]">
                    OFFICIAL CAMPUS ADDRESS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1628]">
                    Baldwin Girls' High School
                  </h3>
                </div>
              </div>

              {/* Address Box */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-5">
                <div className="text-sm font-semibold text-[#0A1628] leading-relaxed">
                  #90, Richmond Road, Bengaluru &ndash; 560025, Karnataka, India
                </div>
              </div>

              {/* Landmarks */}
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Key Landmarks &amp; Proximity:
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C59B27] font-bold">•</span>
                    <span>Located on the prime Richmond Road arterial corridor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C59B27] font-bold">•</span>
                    <span>2 mins from Richmond Circle &amp; Johnson Market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C59B27] font-bold">•</span>
                    <span>15 mins from MG Road &amp; Brigade Road</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C59B27] font-bold">•</span>
                    <span>Easy accessibility via BMTC buses &amp; Metro</span>
                  </li>
                </ul>
              </div>

              {/* Directions Button */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A1628] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-semibold transition-all mb-4"
              >
                <Icon.Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
                <Icon.ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Email footer */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-600">
              <span className="text-slate-400">Email: </span>
              <a
                href="mailto:baldwingirls@gmail.com"
                className="font-semibold text-[#781428] hover:underline"
              >
                baldwingirls@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          3. LOCATION & ADDRESS (INTERACTIVE MAP + DIRECT ENQUIRY FORM)
      ─────────────────────────────────────────────────────────────────── */}
      <section
        id="enquiry-form"
        className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto scroll-mt-20"
      >
        {/* Section Eyebrow */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-xs font-bold text-[#92400E] uppercase tracking-wider mb-4">
            <Icon.MapPin className="w-3.5 h-3.5 text-[#92400E]" />
            <span>CAMPUS COORDINATES &amp; DIRECT ENQUIRY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1628] tracking-tight">
            Location &amp; Address
          </h2>
          <div className="w-16 h-1 bg-[#C59B27] rounded-full my-4" />
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg font-light">
            Visit our campus or submit an enquiry directly below.
          </p>
        </div>

        {/* 2 Column Layout: Left Map, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: INTERACTIVE CAMPUS MAP */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl flex flex-col h-full">
            {/* Top Bar matching screenshot */}
            <div className="bg-[#0B1A30] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#C59B27]/20 text-[#F3C44E] flex items-center justify-center">
                  <Icon.MapPin className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-100">
                  Interactive Campus Map
                </span>
              </div>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Open in Google Maps</span>
                <Icon.ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Frame Container */}
            <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-100">
              <iframe
                title="Baldwin Girls High School Campus Map"
                src="https://maps.google.com/maps?q=Baldwin+Girls+High+School+Richmond+Road+Bangalore&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Overlay Card inside Map */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/80 pointer-events-auto">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#781428] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon.MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A1628]">
                      Baldwin Girls' High School
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      #90 Richmond Road, Bengaluru 560025
                    </p>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1E3A8A] text-white text-[11px] font-semibold hover:bg-[#1E40AF] transition-colors"
                    >
                      <Icon.Navigation className="w-3 h-3" />
                      <span>Open in Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Transit Information */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Icon.Bus className="w-4 h-4 text-[#781428]" />
                <span>Transit &amp; Commute Access</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Direct BMTC bus stops at Richmond Circle (150m). Metro Purple Line stops at Trinity (2.1 km) and MG Road (2.3 km).
              </p>
            </div>
          </div>

          {/* RIGHT: DIRECT ENQUIRY FORM */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            {/* Form Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F8D7DA] text-[11px] font-bold text-[#781428] uppercase tracking-wider mb-3">
                <Icon.Mail className="w-3 h-3 text-[#781428]" />
                <span>DIRECT COMMUNICATION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A1628]">
                Enquiry Form
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Submit your enquiry directly to the administration. We will review your message and respond promptly within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* SUCCESS CONFIRMATION RECEIPT */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <Icon.Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 mb-2">
                    Enquiry Successfully Submitted!
                  </h4>
                  <p className="text-emerald-800 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-emerald-950">{formData.fullName || "Parent"}</span>. Your inquiry has been routed to the BGHS administrative desk.
                  </p>

                  <div className="rounded-xl bg-white p-4 border border-emerald-200 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reference Number:</span>
                      <span className="font-mono font-bold text-[#0A1628]">{refId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department:</span>
                      <span className="font-semibold text-slate-800">{formData.department}</span>
                    </div>
                    {formData.grade !== "Not Applicable / General" && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Grade of Interest:</span>
                        <span className="font-semibold text-slate-800">{formData.grade}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Response SLA:</span>
                      <span className="font-semibold text-emerald-700">Within 24 business hours</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A1628] text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <span>Submit Another Enquiry</span>
                    <Icon.ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                /* ACTUAL ENQUIRY FORM */
                <form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Narayan"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Department */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9844329436"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Inquiry Department / Nature <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white"
                      >
                        <option value="Admissions Inquiry">Admissions Inquiry</option>
                        <option value="General Administration">General Administration</option>
                        <option value="Fee Structure & Billing">Fee Structure &amp; Billing</option>
                        <option value="Transfer Certificate / Records">Transfer Certificate / Records</option>
                        <option value="Principal's Office">Principal's Office</option>
                        <option value="Campus Visit & Tour">Campus Visit &amp; Tour</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Grade of Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Student Grade of Interest (If Applicable)
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white"
                    >
                      <option value="Not Applicable / General">Not Applicable / General</option>
                      <option value="Pre-Nursery / Nursery">Pre-Nursery / Nursery</option>
                      <option value="Kindergarten (LKG & UKG)">Kindergarten (LKG &amp; UKG)</option>
                      <option value="Primary School (Grades I - V)">Primary School (Grades I &ndash; V)</option>
                      <option value="Middle School (Grades VI - VIII)">Middle School (Grades VI &ndash; VIII)</option>
                      <option value="High School (Grades IX - X - ICSE)">High School (Grades IX &ndash; X &ndash; ICSE)</option>
                      <option value="Senior Secondary / ISC (Grades XI - XII)">Senior Secondary / ISC (Grades XI &ndash; XII)</option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Message / Detailed Enquiry <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your query, specific questions regarding admissions, fee structure, or appointment requests..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#781428]/30 focus:border-[#781428] transition-all bg-white resize-y"
                    />
                  </div>

                  {/* Row 5: Simulated reCAPTCHA matching screenshot */}
                  <div className="pt-2">
                    <div
                      onClick={handleCaptchaClick}
                      className="inline-flex items-center justify-between gap-6 px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer select-none transition-colors max-w-xs shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                            captchaChecked
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-400 bg-white"
                          }`}
                        >
                          {captchaLoading ? (
                            <div className="w-3.5 h-3.5 border-2 border-[#781428] border-t-transparent rounded-full animate-spin" />
                          ) : captchaChecked ? (
                            <Icon.Check className="w-4 h-4 stroke-[3]" />
                          ) : null}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                          I'm not a robot
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center text-[9px] text-slate-400 pl-4 border-l border-slate-200">
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z" />
                        </svg>
                        <span className="font-semibold text-slate-500">reCAPTCHA</span>
                        <span>Privacy - Terms</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 6: Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#781428] hover:bg-[#8F1A32] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#781428]/30 disabled:opacity-75 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Icon.Send className="w-4 h-4" />
                          <span>Submit</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          4. HERITAGE CAMPUS CTA BANNER (MATCHING SCREENSHOT 4)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#071738] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#781428]/30 to-[#1E3A8A]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-200 mb-6">
            <span>EXPERIENCE THE 140+ YEAR HERITAGE IN PERSON</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-5">
            Visit Our Historic Campus
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Schedule a guided walkthrough to tour our historic stone Quadrangle, Lincoln Hall, Olympic swimming complex, and modern STEM laboratories.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#781428] hover:bg-[#8F1A32] text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-[#781428]/30 group"
            >
              <Icon.Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
              <span>Campus Tour</span>
            </Link>

            <a
              href="tel:08049363866"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-200 border border-white/20 backdrop-blur-md"
            >
              <Icon.Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Reception: 080-49363866</span>
            </a>
          </div>

          {/* Social Links Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-white/70">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Connect With BGHS:
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/baldwingirlshighschool/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon.Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/Baldwingirls"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon.Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@baldwingirlshighschool"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon.YouTube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/baldwingirls"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
              >
                <Icon.Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          5. USEFUL INSTITUTIONAL PORTALS
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto">
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#0A1628]">
              Online Portals &amp; Digital Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct access for current students, parents, and applicants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://portal.baldwingirls.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#781428] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <span>Admissions Portal</span>
              <Icon.ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://baldwinvapsecampus.com/#/login/103"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#781428] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <span>Student VAPSE Portal</span>
              <Icon.ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://transport.baldwingirls.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#781428] text-xs font-semibold border border-slate-200 transition-colors"
            >
              <span>Transport Portal</span>
              <Icon.ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
