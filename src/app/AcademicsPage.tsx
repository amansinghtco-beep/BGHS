import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { PageHero } from "./components";
import { programmes, school } from "./data";

export default function AcademicsPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("pre-primary");

  // Scroll to anchor on load or hash change
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
      const sectionIds = ["pre-primary", "primary", "middle-school", "high-school", "curriculum-framework"];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <main className="bg-[#FAF9F5] text-[#0A2540]">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0A2342] text-white py-20 sm:py-28 lg:py-32">
        {/* Subtle background glow & school doodle texture */}
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

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 border border-white/20 mb-4 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase font-sans">
                Academic Excellence Since 1880
              </span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] tracking-tight text-white">
              Academics at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Baldwin Girls</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              From early foundational curiosity in Pre-Primary to prestigious ICSE board triumphs in High School, our curriculum nurtures intellect, character, and lifelong leadership.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STICKY SUB-NAVIGATION BAR (Assigned to Dropdown Anchors) */}
      <div className="sticky top-[64px] sm:top-[74px] z-30 bg-[#0C2340] border-y border-white/10 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar select-none">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest hidden md:inline-block pr-3 border-r border-white/15 shrink-0">
              Sections:
            </span>

            {[
              { id: "pre-primary", label: "Pre-Primary", sub: "Pre-KG – Std 2" },
              { id: "primary", label: "Primary School", sub: "Std 3 – Std 5" },
              { id: "middle-school", label: "Middle School", sub: "Std 6 – Std 8" },
              { id: "high-school", label: "High School", sub: "Std 9 – Std 10 (ICSE)" },
              { id: "curriculum-framework", label: "ICSE Framework", sub: "Groups & Electives" },
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToAnchor(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-md font-extrabold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] hidden sm:inline-block font-normal ${isActive ? "text-slate-800 font-semibold" : "text-white/50"}`}>
                    ({tab.sub})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. FOUR DETAILED SECTIONS CORRESPONDING TO THE BGHS PROGRAMMES */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-24">

        {/* ---------------- SECTION 1: PRE-PRIMARY ---------------- */}
        <section id="pre-primary" className="scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src={`${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`}
                  alt="Pre-Primary Students at Baldwin Girls"
                  className="w-full aspect-[4/3.8] object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-md">
                    Pre-KG to Standard 2
                  </span>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-amber-50/40 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                    Daily Timings & Schedule
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <strong>Pre-KG, LKG & UKG:</strong> 8:15 am – 12:05 pm
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <strong>Standard I & II:</strong> 8:15 am – 2:30 pm
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Early Childhood Wing
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#0A2540] mt-1.5 tracking-tight">
                Pre-Primary School
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                The Pre-Primary wing consists of Pre-KG, LKG, UKG, Standard I, and Standard II. Learning is thematic, activity-based, and thoughtfully crafted to make every day joyful, engaging, and rich in discovery.
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-sm">
                      01
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Foundational Motor Skills</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Builds language, social, motor, and kinesthetic skills in a free, joyful and stimulating environment.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 font-bold text-sm">
                      02
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Creative Expression</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Rhymes, conversation, storytelling, art & craft, and structured play that foster expressive confidence.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Curricular Subjects Taught:
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
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: PRIMARY SCHOOL ---------------- */}
        <section id="primary" className="scroll-mt-36 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Information Column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Formative Discovery Years
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#0A2540] mt-1.5 tracking-tight">
                Primary School
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                The primary years (Standard III to Standard V) strengthen essential academic foundations while nurturing confidence, curiosity, and a love of independent discovery in every young girl.
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 font-bold text-sm">
                      01
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Conceptual Understanding</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Interactive classroom lessons that move beyond rote memorization into real-world conceptual understanding.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-sm">
                      02
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Value & Moral Education</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Instills empathy, integrity, teamwork, and strong character through daily reflections and co-curriculars.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Curricular Subjects Taught:
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
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src={`${school}/static/media/schoolgirl2.28b8d7d780b54e871138.png`}
                  alt="Primary School Students at Baldwin Girls"
                  className="w-full aspect-[4/3.8] object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-md">
                    Standard 3 to Standard 5
                  </span>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-emerald-50/40 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                    Daily Timings & Schedule
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <strong>School Day:</strong> 8:15 am – 3:00 pm
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <strong>Format:</strong> Balanced academic & co-curricular activity timetable
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 3: MIDDLE SCHOOL ---------------- */}
        <section id="middle-school" className="scroll-mt-36 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src={`${school}/static/media/schoolgirl3.240a9001c710ecb41af8.png`}
                  alt="Middle School Students at Baldwin Girls"
                  className="w-full aspect-[4/3.8] object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-md">
                    Standard 6 to Standard 8
                  </span>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-indigo-50/40 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                    Daily Timings & Schedule
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <strong>School Day:</strong> 8:15 am – 3:00 pm
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <strong>Curricular:</strong> Academic periods, dedicated laboratory sessions & sports
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Critical Thinking & Leadership
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#0A2540] mt-1.5 tracking-tight">
                Middle School
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Middle school is a pivotal era of intellectual acceleration, self-discovery, and independent responsibility. Guided by passionate subject specialists, students transition toward higher analytical reasoning.
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 font-bold text-sm">
                      01
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Specialized Science Laboratories</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Transition from General Science to distinct physics, chemistry, and biology labs with hands-on experiments.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 font-bold text-sm">
                      02
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Analytical & Research Rigor</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Emphasis on debate, mathematical problem-solving, digital computing, and interdisciplinary project work.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Curricular Subjects Taught:
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
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 4: HIGH SCHOOL (ICSE) ---------------- */}
        <section id="high-school" className="scroll-mt-36 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Information Column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800020]">
                ICSE Board Preparation & Distinction
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#0A2540] mt-1.5 tracking-tight">
                High School (Standards IX & X)
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                The High School curriculum is governed by the Council for the Indian School Certificate Examinations (CISCE), New Delhi. With structured revision, mock evaluations, and dedicated faculty mentorship, Baldwin girls consistently achieve 100% pass results with top state and national ranks.
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-[#800020] font-bold text-sm">
                      01
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">100% Board Pass Record</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Consistent distinction rates with school toppers achieving scores as high as 99% in ICSE examinations.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-sm">
                      02
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2540]">Holistic Future Readiness</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Balances academic rigor with pre-university guidance, competitive exam foundations, leadership councils, and career seminars.
                  </p>
                </div>
              </div>

              {/* Subject Badges */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Core ICSE Curriculum Papers:
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
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src={`${school}/static/media/schoolgirl4.ccbd076afeb2ad1259de.png`}
                  alt="High School Students at Baldwin Girls"
                  className="w-full aspect-[4/3.8] object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#800020] text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-md">
                    ICSE Class IX & X
                  </span>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-red-50/40 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-2">
                    Daily Timings & Schedule
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#800020]" />
                      <strong>School Day:</strong> 8:15 am – 3:00 pm
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#800020]" />
                      <strong>Format:</strong> Structured ICSE exam preparation, labs & enrichment tutorials
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- SECTION 5: ICSE CURRICULUM FRAMEWORK ---------------- */}
        <section id="curriculum-framework" className="scroll-mt-36 pt-8 border-t border-slate-200/80">
          <div className="rounded-3xl bg-[#0C2340] text-white p-8 sm:p-12 shadow-2xl border border-white/10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                CISCE Subject Framework
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-white mt-2 tracking-tight">
                ICSE Curriculum Structure (Class IX & X)
              </h2>
              <p className="mt-3 text-sm sm:text-base text-blue-100/80 leading-relaxed">
                As per the Council for the Indian School Certificate Examinations, New Delhi, students are prepared across three comprehensive subject groups:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Group I */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-blue-400/30">
                  Group I (Compulsory)
                </span>
                <h3 className="font-serif font-bold text-xl text-white mb-3">Core Foundations</h3>
                <ul className="space-y-2 text-xs text-blue-100/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>English:</strong> Language (Paper 1) & Literature (Paper 2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Second Language:</strong> Hindi or Kannada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Social Sciences:</strong> History & Civics, Geography</span>
                  </li>
                </ul>
              </div>

              {/* Group II */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-400/30">
                  Group II (Sciences & Math)
                </span>
                <h3 className="font-serif font-bold text-xl text-white mb-3">Applied Disciplines</h3>
                <ul className="space-y-2 text-xs text-blue-100/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Mathematics:</strong> Advanced Algebra, Geometry & Statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Science:</strong> Physics, Chemistry, Biology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Commercial Studies:</strong> Business & Accounting fundamentals</span>
                  </li>
                </ul>
              </div>

              {/* Group III */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-amber-400/30">
                  Group III (Modern Electives)
                </span>
                <h3 className="font-serif font-bold text-xl text-white mb-3">Skill Specialization</h3>
                <ul className="space-y-2 text-xs text-blue-100/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Computer Applications:</strong> Java Programming & Algorithmic Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Robotics & AI:</strong> Embedded sensors, logic circuits & automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span><strong>Home Science & Performing Arts:</strong> Applied creative sciences</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Call to Action inside Framework */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-blue-200/80">
                Interested in admissions or touring our science and computer labs?
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/admissions"
                  className="rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 text-xs font-bold transition-all shadow-md"
                >
                  Apply for Admission 2026–27 →
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-xs font-bold border border-white/20 transition-all"
                >
                  Contact Admissions Office
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
