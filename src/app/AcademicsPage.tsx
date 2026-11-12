import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { school } from "./data";

export default function AcademicsPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("pre-primary");

  const sectionsList = [
    {
      id: "pre-primary",
      label: "Pre-Primary",
      grades: "Pre-KG to Std 2",
      icon: "🌟",
      badge: "Early Childhood",
      color: "border-amber-400 text-amber-500",
    },
    {
      id: "primary",
      label: "Primary School",
      grades: "Std 3 to Std 5",
      icon: "🌱",
      badge: "Formative Discovery",
      color: "border-emerald-500 text-emerald-500",
    },
    {
      id: "middle-school",
      label: "Middle School",
      grades: "Std 6 to Std 8",
      icon: "🔬",
      badge: "Analytical Reasoning",
      color: "border-indigo-500 text-indigo-500",
    },
    {
      id: "high-school",
      label: "High School",
      grades: "Std 9 & 10 (ICSE)",
      icon: "🎓",
      badge: "Board Distinction",
      color: "border-[#800020] text-[#800020]",
    },
    {
      id: "curriculum-framework",
      label: "ICSE Framework",
      grades: "CISCE Groups I, II, III",
      icon: "📑",
      badge: "Curriculum Structure",
      color: "border-blue-500 text-blue-500",
    },
  ];

  // Scroll to anchor on initial load or hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setActiveSection(id);
        }, 100);
      }
    }
  }, [location.hash]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;
      for (const item of sectionsList) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionsList]);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <main className="bg-[#FAF9F5] text-[#0A2540]">
      {/* 1. TOP HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0A2342] text-white py-16 sm:py-24">
        {/* Subtle dot matrix texture & ambient glows */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#38BDF8 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/20 mb-3.5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase font-sans">
                Academic Excellence Since 1880
              </span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-[52px] leading-[1.08] tracking-tight text-white">
              Academics at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Baldwin Girls</span>
            </h1>

            <p className="mt-3.5 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              From early foundational curiosity in Pre-Primary to prestigious ICSE board triumphs in High School, our curriculum nurtures intellect, character, and lifelong leadership.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT: STICKY LEFT SIDEBAR + SCROLLABLE RIGHT CONTENT */}
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ============ STICKY LEFT SIDEBAR ============ */}
          <aside className="lg:col-span-4 xl:col-span-3.5 lg:sticky lg:top-[90px] z-20">
            <div className="rounded-2xl bg-[#0C2340] text-white p-5 sm:p-6 shadow-xl border border-white/10 backdrop-blur-md">
              {/* Sidebar Header */}
              <div className="border-b border-white/10 pb-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 block mb-1">
                  Table of Contents
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  Academic Sections
                </h3>
                <p className="text-xs text-blue-200/70 mt-0.5">
                  Click any wing to navigate directly
                </p>
              </div>

              {/* Navigation Links List */}
              <nav className="space-y-1.5" aria-label="Academics Sections">
                {sectionsList.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToAnchor(item.id)}
                      className={`w-full flex items-center justify-between text-left px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20 translate-x-1"
                          : "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div className="truncate">
                          <p className={`text-xs sm:text-sm leading-tight ${isActive ? "text-slate-950 font-extrabold" : "text-white"}`}>
                            {item.label}
                          </p>
                          <p className={`text-[10px] truncate mt-0.5 ${isActive ? "text-slate-800" : "text-white/50"}`}>
                            {item.grades}
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs ml-2 font-bold transition-transform ${isActive ? "text-slate-950 translate-x-0.5" : "text-white/40"}`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Footer Callout */}
              <div className="mt-6 pt-4 border-t border-white/10 rounded-xl bg-white/5 p-3.5 border border-white/10">
                <p className="text-xs font-bold text-amber-300">
                  Admissions Open 2026–27
                </p>
                <p className="text-[11px] text-white/70 mt-1 leading-relaxed">
                  Applications open for Pre-KG through Std X.
                </p>
                <Link
                  to="/admissions"
                  className="mt-3 block text-center rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold py-2 transition-all shadow-sm"
                >
                  Apply Online →
                </Link>
              </div>
            </div>
          </aside>

          {/* ============ MAIN CONTENT AREA (RIGHT SIDE) ============ */}
          <div className="lg:col-span-8 xl:col-span-8.5 space-y-16 sm:space-y-20">

            {/* ---------------- SECTION 1: PRE-PRIMARY ---------------- */}
            <section
              id="pre-primary"
              className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Pre-KG to Standard 2
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Early Childhood Wing
                </span>
              </div>

              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight">
                Pre-Primary School
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                The Pre-Primary wing consists of Pre-KG, LKG, UKG, Standard I, and Standard II. Learning is thematic, activity-based, and thoughtfully crafted to make every single day joyful, engaging, and rich in natural discovery.
              </p>

              {/* Photo & Timings Box */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-[16/10]">
                  <img
                    src={`${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`}
                    alt="Pre-Primary Students at Baldwin Girls"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-amber-50/60 border border-amber-200/70 p-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      School Timings
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#0A2540] mt-1">
                      Daily Schedule
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">▪</span>
                        <span><strong>Pre-KG, LKG & UKG:</strong><br />8:15 am – 12:05 pm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">▪</span>
                        <span><strong>Standard I & II:</strong><br />8:15 am – 2:30 pm</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-amber-200/70 text-[11px] text-slate-600">
                    <p>Emphasis on play, physical rhythm, and social readiness.</p>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-blue-600 font-bold">01.</span> Foundational Motor Skills
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Builds language, social, motor, and kinesthetic skills in a supportive and stimulating environment.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-amber-600 font-bold">02.</span> Creative Exploration
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Rhymes, conversation, storytelling, art & craft, and structured play that foster expressive confidence.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Curricular Subjects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English",
                    "Number Work",
                    "Environmental Studies",
                    "Rhymes & Conversation",
                    "Art & Craft",
                    "Kannada",
                    "Hindi",
                    "Mathematics",
                    "Computers",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------- SECTION 2: PRIMARY SCHOOL ---------------- */}
            <section
              id="primary"
              className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Standard 3 to Standard 5
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Formative Discovery Years
                </span>
              </div>

              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight">
                Primary School
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                The primary years strengthen essential academic foundations while nurturing confidence, curiosity, and a love of independent discovery in every young girl.
              </p>

              {/* Photo & Timings Box */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-[16/10]">
                  <img
                    src={`${school}/static/media/schoolgirl2.28b8d7d780b54e871138.png`}
                    alt="Primary School Students at Baldwin Girls"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-emerald-50/60 border border-emerald-200/70 p-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Timings & Framework
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#0A2540] mt-1">
                      Daily Routine
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">▪</span>
                        <span><strong>School Day:</strong> 8:15 am – 3:00 pm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">▪</span>
                        <span><strong>Format:</strong> Balanced timetable of classroom lessons, computer labs, and games</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-emerald-200/70 text-[11px] text-slate-600">
                    <p>Focuses on strong language mastery, mathematics, and science.</p>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">01.</span> Conceptual Understanding
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Interactive classroom teaching methodologies that encourage active student inquiry rather than rote learning.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-blue-600 font-bold">02.</span> Moral & Value Education
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Instills empathy, integrity, teamwork, and leadership through value education classes and school assemblies.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Curricular Subjects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English Language",
                    "English Literature",
                    "Kannada",
                    "Hindi",
                    "Mathematics",
                    "General Science",
                    "Social Studies",
                    "Computers",
                    "Art & Physical Education",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------- SECTION 3: MIDDLE SCHOOL ---------------- */}
            <section
              id="middle-school"
              className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 text-indigo-800 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Standard 6 to Standard 8
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Analytical Reasoning & Discovery
                </span>
              </div>

              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight">
                Middle School
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Middle school is a pivotal era of intellectual acceleration, self-discovery, and independent responsibility. Guided by passionate subject specialists, students transition smoothly toward higher analytical reasoning.
              </p>

              {/* Photo & Timings Box */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-[16/10]">
                  <img
                    src={`${school}/static/media/schoolgirl3.240a9001c710ecb41af8.png`}
                    alt="Middle School Students at Baldwin Girls"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-indigo-50/60 border border-indigo-200/70 p-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">
                      Timings & Lab Routine
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#0A2540] mt-1">
                      Academic Timetable
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">▪</span>
                        <span><strong>School Day:</strong> 8:15 am – 3:00 pm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">▪</span>
                        <span><strong>Practical Labs:</strong> Weekly Physics, Chemistry, Biology & Computer sessions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-indigo-200/70 text-[11px] text-slate-600">
                    <p>Fosters project-based research, debating, and scientific logic.</p>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-indigo-600 font-bold">01.</span> Specialized Science Labs
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Transition from General Science to separate, dedicated laboratories for Physics, Chemistry, and Biology.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-purple-600 font-bold">02.</span> Applied Critical Thinking
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Structured exercises in analytical mathematics, literary debates, coding applications, and science fairs.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Curricular Subjects:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English",
                    "Second & Third Languages (Hindi / Kannada)",
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "History & Civics",
                    "Geography",
                    "Computer Applications",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------- SECTION 4: HIGH SCHOOL (ICSE) ---------------- */}
            <section
              id="high-school"
              className="scroll-mt-28 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-[#800020] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#800020]" />
                  Standard 9 & Standard 10 (ICSE)
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  CISCE Board Distinction
                </span>
              </div>

              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight">
                High School (Standards IX & X)
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                The High School curriculum is governed by the Council for the Indian School Certificate Examinations (CISCE), New Delhi. With structured revision, rigorous mock evaluations, and dedicated faculty mentorship, Baldwin girls consistently achieve 100% board pass results with top state and national ranks.
              </p>

              {/* Photo & Timings Box */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-[16/10]">
                  <img
                    src={`${school}/static/media/schoolgirl4.ccbd076afeb2ad1259de.png`}
                    alt="High School Students at Baldwin Girls"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-rose-50/60 border border-rose-200/70 p-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020]">
                      Board Preparation
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#0A2540] mt-1">
                      Daily Schedule & Labs
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#800020] font-bold">▪</span>
                        <span><strong>School Day:</strong> 8:15 am – 3:00 pm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#800020] font-bold">▪</span>
                        <span><strong>Format:</strong> Intensive ICSE prep, structured revision, and mock evaluations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-rose-200/70 text-[11px] text-slate-600">
                    <p>Celebrated 100% ICSE Board Examination pass rate for consecutive decades.</p>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-[#800020] font-bold">01.</span> Proven Academic Track Record
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Over 85% distinction rate across 200+ students, with school toppers reaching up to 99% in board exams.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                    <span className="text-blue-600 font-bold">02.</span> Pre-University Mentorship
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Personalized counseling, career guidance workshops, and leadership development for higher education.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Curricular Papers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English Language",
                    "English Literature",
                    "Second Language (Hindi / Kannada)",
                    "History, Civics & Geography",
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "Computer Applications",
                    "Commercial Studies / Home Science",
                  ].map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------- SECTION 5: ICSE FRAMEWORK ---------------- */}
            <section
              id="curriculum-framework"
              className="scroll-mt-28 rounded-3xl bg-[#0C2340] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-white/10"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
                  CISCE Regulations
                </span>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-white mt-1.5 tracking-tight">
                  ICSE Curriculum Structure (Class IX & X)
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-2xl">
                  As prescribed by the Council for the Indian School Certificate Examinations, New Delhi, students are prepared across three rigorous subject groups:
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Group I */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase tracking-wider mb-3 border border-blue-400/30">
                    Group I (Compulsory)
                  </span>
                  <h3 className="font-serif font-bold text-base text-white mb-2">Core Foundations</h3>
                  <ul className="space-y-1.5 text-xs text-blue-100/80">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>English:</strong> Language & Literature</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>2nd Language:</strong> Hindi or Kannada</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Social Sciences:</strong> History & Civics, Geography</span>
                    </li>
                  </ul>
                </div>

                {/* Group II */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider mb-3 border border-emerald-400/30">
                    Group II (Sciences & Math)
                  </span>
                  <h3 className="font-serif font-bold text-base text-white mb-2">Applied Disciplines</h3>
                  <ul className="space-y-1.5 text-xs text-blue-100/80">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Mathematics:</strong> Algebra, Geometry & Stats</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Science:</strong> Physics, Chemistry, Biology</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Commercial:</strong> Business fundamentals</span>
                    </li>
                  </ul>
                </div>

                {/* Group III */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-md">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider mb-3 border border-amber-400/30">
                    Group III (Electives)
                  </span>
                  <h3 className="font-serif font-bold text-base text-white mb-2">Specialized Skills</h3>
                  <ul className="space-y-1.5 text-xs text-blue-100/80">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Computer Applications:</strong> Java & Algorithms</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Robotics & AI:</strong> STEM automation & circuits</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span><strong>Home Science:</strong> Applied nutritional sciences</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-blue-200/80">
                  Have questions about our syllabus or academic calendar?
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    to="/admissions"
                    className="rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md"
                  >
                    Apply for Admissions →
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-xs font-bold border border-white/20 transition-all"
                  >
                    Contact School
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
