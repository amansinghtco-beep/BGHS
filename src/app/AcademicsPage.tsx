import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { school } from "./data";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON LIBRARY
   All icons are pure SVG vectors – no emojis, no image files, no fonts.
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  Book: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Microscope: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 18h8"/><path d="M3 21h18"/><path d="M14 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4"/><path d="M14 7l-2.5 2.5"/><path d="M17 4l-6 6"/><circle cx="10" cy="10" r="1"/><path d="M5 21V7l5-5h4v6"/>
    </svg>
  ),
  Pencil: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
    </svg>
  ),
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Compass: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Flask: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3h6"/><path d="M9 3v7L4 20h16L15 10V3"/><path d="M7 20h10"/>
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  ChevronDown: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  Layers: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Award: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Paintbrush: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/>
    </svg>
  ),
  Cpu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
    </svg>
  ),
  Sparkle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"/><circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  Map: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  Target: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  School: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 22V12H10v10"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Zap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  BarChart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  FileText: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Lightbulb: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  MessageCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED BACKGROUND (SVG illustrations, no emojis)
───────────────────────────────────────────────────────────────────────── */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {/* Soft blobs */}
    <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
    <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-[#781428]/20 blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
    {/* Dot grid */}
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: "radial-gradient(#93C5FD 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

    {/* Floating SVG vector icons */}
    {[
      { C: Icon.Book,         top: "10%", left: "5%",  delay: "0s",    dur: "7s",  size: "w-10 h-10" },
      { C: Icon.GraduationCap,top: "75%", left: "4%",  delay: "1.2s",  dur: "8s",  size: "w-12 h-12" },
      { C: Icon.Microscope,   top: "25%", left: "92%", delay: "0.6s",  dur: "9s",  size: "w-10 h-10" },
      { C: Icon.Pencil,       top: "60%", left: "90%", delay: "2s",    dur: "6s",  size: "w-9 h-9"  },
      { C: Icon.Compass,      top: "18%", left: "50%", delay: "1.5s",  dur: "10s", size: "w-11 h-11" },
      { C: Icon.Flask,        top: "85%", left: "55%", delay: "0.9s",  dur: "7s",  size: "w-10 h-10" },
      { C: Icon.Award,        top: "45%", left: "2%",  delay: "2.5s",  dur: "8s",  size: "w-10 h-10" },
      { C: Icon.Layers,       top: "50%", left: "95%", delay: "0.3s",  dur: "11s", size: "w-9 h-9"  },
    ].map(({ C, top, left, delay, dur, size }, i) => (
      <span
        key={i}
        className={`absolute text-white/15 ${size}`}
        style={{ top, left, animation: `floatSvg ${dur} ease-in-out infinite`, animationDelay: delay }}
      >
        <C className="w-full h-full" />
      </span>
    ))}
  </div>
);

const FloatStyle = () => (
  <style>{`
    @keyframes floatSvg {
      0%, 100% { transform: translateY(0px) rotate(-4deg); }
      50%       { transform: translateY(-20px) rotate(4deg); }
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────
   SECTION DATA  (zero emojis)
───────────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "pre-primary",
    SectionIcon: Icon.Sparkle,
    label: "Pre-Primary",
    grades: "Pre‑KG · LKG · UKG · Std I & II",
    tagline: "Where curiosity takes its first joyful step.",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    accentBar: "from-amber-400 to-orange-400",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    accentText: "text-amber-700",
    image: `${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`,
    description: `The Pre‑Primary wing at Baldwin Girls' High School is the foundation of every child's academic journey. Spanning Pre‑KG through Standard II, this stage prioritises joyful, play‑based, and thematic learning. Children develop language, motor, and social skills in a warm, nurturing environment designed to spark a lifelong love of learning.`,
    timings: [
      { label: "Pre-KG, LKG & UKG", time: "8:15 am – 12:05 pm" },
      { label: "Standard I & II",    time: "8:15 am – 2:30 pm"  },
    ],
    highlights: [
      { Icon: Icon.Layers,       label: "Thematic, activity-based curriculum with hands-on projects" },
      { Icon: Icon.Paintbrush,   label: "Art, craft, music and dance woven into daily routines" },
      { Icon: Icon.BookOpen,     label: "Phonics and early literacy in English, Hindi & Kannada" },
      { Icon: Icon.Heart,        label: "Physical games, yoga and outdoor exploration every day" },
      { Icon: Icon.Cpu,          label: "Introduction to computers through interactive play" },
      { Icon: Icon.Lightbulb,    label: "Social-emotional learning and mindfulness practices" },
    ],
    subjects: ["English Language", "Number Work", "Environmental Studies",
               "Rhymes & Conversation", "Art & Craft", "Kannada",
               "Hindi", "Mathematics", "Computers", "Physical Education"],
    stats: [
      { ValueIcon: Icon.Users,  value: "< 20", label: "Students per class" },
      { ValueIcon: Icon.Book,   value: "5",    label: "Grade levels"       },
      { ValueIcon: Icon.Target, value: "100%", label: "Activity-based"     },
    ],
    pillars: [
      { num: "01", title: "Foundational Motor Skills",
        body: "Fine and gross motor development through craft, music, dance, and structured outdoor play that prepares children for formal learning.",
        color: "text-amber-600" },
      { num: "02", title: "Language & Literacy",
        body: "English, Hindi and Kannada are introduced early through storytelling, phonics games and rhymes, building strong multilingual foundations.",
        color: "text-blue-600" },
      { num: "03", title: "Creative Exploration",
        body: "Art, craft and imaginative play sessions every day that nurture self-expression, problem-solving and aesthetic sensibility.",
        color: "text-orange-600" },
    ],
  },
  {
    id: "primary",
    SectionIcon: Icon.BookOpen,
    label: "Primary School",
    grades: "Standard III · IV · V",
    tagline: "Building curiosity into confident knowledge.",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    accentBar: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    accentText: "text-emerald-700",
    image: `${school}/static/media/schoolgirl2.28b8d7d780b54e871138.png`,
    description: `The Primary School years are years of discovery and wonder. Standards III through V build strong academic foundations with a balanced mix of classroom teaching, computer labs, library exploration, and collaborative group projects. Subject-specific teachers from Standard III onward ensure depth of expertise.`,
    timings: [
      { label: "Standard III – V", time: "8:15 am – 3:00 pm" },
    ],
    highlights: [
      { Icon: Icon.Target,     label: "Deep dive into Mathematics with mental arithmetic and logic puzzles" },
      { Icon: Icon.Globe,      label: "Social Studies and Environmental Science with field studies" },
      { Icon: Icon.Pencil,     label: "Creative writing, comprehension and debate workshops" },
      { Icon: Icon.Microscope, label: "Introduction to General Science with lab demonstrations" },
      { Icon: Icon.Award,      label: "Annual cultural programmes, elocution & quiz competitions" },
      { Icon: Icon.Cpu,        label: "Computer literacy with MS Office and basic programming" },
    ],
    subjects: ["English Language", "English Literature", "Kannada", "Hindi",
               "Mathematics", "General Science", "Social Studies",
               "Computers", "Art & Craft", "Physical Education"],
    stats: [
      { ValueIcon: Icon.Trophy,   value: "30+", label: "Co-curricular clubs" },
      { ValueIcon: Icon.Globe,    value: "3",   label: "Language mediums"    },
      { ValueIcon: Icon.Zap,      value: "5",   label: "Lab sessions/week"   },
    ],
    pillars: [
      { num: "01", title: "Conceptual Understanding",
        body: "Interactive teaching methodologies that move beyond rote learning to build genuine understanding through real-world context.",
        color: "text-emerald-600" },
      { num: "02", title: "Moral & Value Education",
        body: "Daily assemblies and value classes instil empathy, integrity, teamwork, and civic responsibility alongside academic learning.",
        color: "text-blue-600" },
      { num: "03", title: "Co-Curricular Flourishing",
        body: "Sports days, science fairs, cultural festivals and inter-school competitions ensure every child finds her arena of excellence.",
        color: "text-teal-600" },
    ],
  },
  {
    id: "middle-school",
    SectionIcon: Icon.Microscope,
    label: "Middle School",
    grades: "Standard VI · VII · VIII",
    tagline: "Where thinking becomes analytical and deep.",
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    accentBar: "from-indigo-600 to-purple-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
    image: `${school}/static/media/schoolgirl3.240a9001c710ecb41af8.png`,
    description: `Middle School marks a pivotal transition into specialist subject teaching and independent reasoning. Standards VI through VIII introduce students to dedicated Physics, Chemistry, Biology and Computer laboratories. Guided by passionate subject experts, students develop research skills and scientific temperament in preparation for the high-stakes ICSE years.`,
    timings: [
      { label: "Standard VI – VIII", time: "8:15 am – 3:00 pm" },
      { label: "Practical Labs", time: "Weekly — Physics, Chem, Bio & Computers" },
    ],
    highlights: [
      { Icon: Icon.Flask,         label: "Dedicated Physics, Chemistry & Biology laboratories" },
      { Icon: Icon.Cpu,           label: "STEM robotics, coding and AI electives from Std VII" },
      { Icon: Icon.BarChart,      label: "Statistics, algebra and advanced geometry in Mathematics" },
      { Icon: Icon.Globe,         label: "Geography, History & Civics with global perspectives" },
      { Icon: Icon.MessageCircle, label: "Public speaking, MUN and inter-school debate programmes" },
      { Icon: Icon.FileText,      label: "Research projects, science fairs and investigative reports" },
    ],
    subjects: ["English Language", "English Literature", "Second Language (Hindi / Kannada)",
               "Mathematics", "Physics", "Chemistry", "Biology",
               "History & Civics", "Geography", "Computer Applications"],
    stats: [
      { ValueIcon: Icon.Flask,    value: "4",   label: "Dedicated labs"       },
      { ValueIcon: Icon.BarChart, value: "85%+",label: "Score in assessments" },
      { ValueIcon: Icon.Trophy,   value: "50+", label: "Annual competitions"  },
    ],
    pillars: [
      { num: "01", title: "Specialist Lab Science",
        body: "Students shift from general science to fully equipped, separate Physics, Chemistry and Biology labs with weekly practicals.",
        color: "text-indigo-600" },
      { num: "02", title: "Critical & Analytical Thinking",
        body: "Structured exercises in mathematical reasoning, literary analysis, and scientific enquiry prepare students for the rigour of board exams.",
        color: "text-purple-600" },
      { num: "03", title: "Leadership & Communication",
        body: "MUN, elocution, school council and inter-school programmes build the confidence and leadership skills that define a Baldwin girl.",
        color: "text-blue-600" },
    ],
  },
  {
    id: "high-school",
    SectionIcon: Icon.GraduationCap,
    label: "High School",
    grades: "Standard IX · X (ICSE / CISCE)",
    tagline: "Excellence measured in distinction.",
    badgeBg: "bg-rose-100 text-[#781428] border-rose-200",
    accentBar: "from-[#781428] to-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-200",
    accentText: "text-[#781428]",
    image: `${school}/static/media/schoolgirl4.ccbd076afeb2ad1259de.png`,
    description: `The High School years are the culmination of a Baldwin girl's academic journey. Governed by the Council for the Indian School Certificate Examinations (CISCE), our Standards IX and X offer rigorous board preparation through intensive revision, mock evaluations, and one-on-one faculty mentorship. Baldwin Girls has consistently achieved a 100% board pass rate with over 85% of students earning Distinction.`,
    timings: [
      { label: "Standard IX & X",        time: "8:15 am – 3:30 pm"              },
      { label: "Revision / Extra classes",time: "By schedule — 7:30 am or 4 pm" },
    ],
    highlights: [
      { Icon: Icon.FileText,     label: "Structured mock exam cycle with detailed performance analytics" },
      { Icon: Icon.Users,        label: "Dedicated ICSE subject specialist faculty per paper" },
      { Icon: Icon.Trophy,       label: "100% board pass rate every year for over three decades" },
      { Icon: Icon.Award,        label: "School toppers consistently scoring 95%+ in ICSE" },
      { Icon: Icon.Target,       label: "Individual student counselling and career guidance sessions" },
      { Icon: Icon.Lightbulb,    label: "Peer tutoring, study circles and doubt-clearing workshops" },
    ],
    subjects: ["English Language", "English Literature", "Second Language (Hindi / Kannada)",
               "History, Civics & Geography", "Mathematics", "Physics", "Chemistry", "Biology",
               "Computer Applications", "Commercial Studies / Home Science (elective)"],
    stats: [
      { ValueIcon: Icon.Trophy,   value: "100%", label: "ICSE pass rate"               },
      { ValueIcon: Icon.Award,    value: "85%+", label: "Students with Distinction"    },
      { ValueIcon: Icon.Target,   value: "99%",  label: "School topper score"          },
    ],
    pillars: [
      { num: "01", title: "Proven Academic Track Record",
        body: "Three consecutive decades of 100% ICSE pass rate, with school toppers regularly ranking among the top in Karnataka and nationally.",
        color: "text-[#781428]" },
      { num: "02", title: "Board Preparation System",
        body: "A structured calendar of chapter tests, term exams, pre-board mocks, and answer-script reviews ensures zero surprises on exam day.",
        color: "text-blue-600" },
      { num: "03", title: "Pre-University Mentorship",
        body: "Personalised career counselling, university guidance, and leadership workshops prepare students for life beyond the ICSE board.",
        color: "text-rose-700" },
    ],
  },
  {
    id: "curriculum-framework",
    SectionIcon: Icon.Layers,
    label: "ICSE Framework",
    grades: "CISCE Groups I, II & III",
    tagline: "A holistic, balanced and rigorous curriculum.",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
    accentBar: "from-blue-700 to-cyan-500",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    accentText: "text-blue-700",
    image: `${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`,
    description: `The ICSE (Indian Certificate of Secondary Education) curriculum is administered by the Council for the Indian School Certificate Examinations (CISCE), New Delhi. It is globally recognised for its breadth and rigour. The curriculum is divided into three subject groups ensuring every student graduates with strong language, scientific, mathematical, and applied skills.`,
    timings: [],
    highlights: [
      { Icon: Icon.BookOpen,     label: "Group I: Compulsory English, Second Language & Social Sciences" },
      { Icon: Icon.Flask,        label: "Group II: Sciences (Physics, Chemistry, Biology) and Mathematics" },
      { Icon: Icon.Lightbulb,    label: "Group III: Electives — Computer Applications, Robotics, Home Science" },
      { Icon: Icon.Pencil,       label: "Project-based Internal Assessment — 20% of final grade" },
      { Icon: Icon.Globe,        label: "Global recognition — accepted by universities worldwide" },
      { Icon: Icon.BarChart,     label: "Comprehensive grading across written, oral and practical components" },
    ],
    subjects: [],
    stats: [
      { ValueIcon: Icon.Layers, value: "3",      label: "Subject groups"  },
      { ValueIcon: Icon.FileText,value: "10+",   label: "Papers offered"  },
      { ValueIcon: Icon.Globe,   value: "Global", label: "Recognition"    },
    ],
    pillars: [
      { num: "Group I", title: "Core Foundations (Compulsory)",
        body: "English Language & Literature, Second Language (Hindi or Kannada), History & Civics, Geography.",
        color: "text-blue-600" },
      { num: "Group II", title: "Sciences & Mathematics",
        body: "Mathematics, Physics, Chemistry, Biology — with lab practicals counting toward final assessment.",
        color: "text-indigo-600" },
      { num: "Group III", title: "Elective Specialisations",
        body: "Computer Applications (Java), Robotics & AI, Home Science, Commercial Studies — students choose one.",
        color: "text-cyan-600" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────────────────────────────────────── */
function SectionCard({ section }: { section: typeof SECTIONS[0] }) {
  const { SectionIcon } = section;
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="scroll-mt-28"
    >
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">

        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${section.accentBar}`} />

        {/* Header band */}
        <div className={`${section.accentBg} border-b ${section.accentBorder} px-6 sm:px-8 py-6`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* SVG section icon */}
                <span className={`w-8 h-8 ${section.accentText}`}>
                  <SectionIcon className="w-full h-full" />
                </span>
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide ${section.badgeBg}`}>
                  {section.grades}
                </span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight leading-tight">
                {section.label}
              </h2>
              <p className={`mt-1 text-sm font-medium italic ${section.accentText}`}>
                "{section.tagline}"
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex gap-3 flex-wrap">
              {section.stats.map((s) => {
                const { ValueIcon } = s;
                return (
                  <div key={s.label} className="flex flex-col items-center rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-3 min-w-[80px]">
                    <ValueIcon className={`w-5 h-5 mb-0.5 ${section.accentText}`} />
                    <span className="font-black text-lg text-[#1E3A8A] font-serif leading-none">{s.value}</span>
                    <span className="text-[10px] text-slate-500 text-center leading-tight mt-0.5">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-10">

          {/* Overview + photo */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3 space-y-4">
              <p className="text-base text-slate-600 leading-relaxed">{section.description}</p>
              {section.timings.length > 0 && (
                <div className={`rounded-2xl ${section.accentBg} border ${section.accentBorder} p-5`}>
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${section.accentText} mb-3`}>
                    <Icon.Clock className={`w-3.5 h-3.5 ${section.accentText}`} />
                    School Timings
                  </div>
                  <ul className="space-y-2">
                    {section.timings.map((t) => (
                      <li key={t.label} className="flex justify-between text-sm text-slate-700 gap-4">
                        <span className="font-medium">{t.label}</span>
                        <span className="font-bold text-right">{t.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-100">
              <img
                src={section.image}
                alt={`${section.label} students at Baldwin Girls`}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-4 flex items-center gap-2">
              <Icon.CheckCircle className={`w-5 h-5 ${section.accentText}`} />
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.highlights.map((h) => {
                const { Icon: HIcon } = h;
                return (
                  <div key={h.label} className="flex items-start gap-3 rounded-xl bg-white border border-slate-100 p-3.5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                    <span className={`w-5 h-5 mt-0.5 shrink-0 ${section.accentText}`}>
                      <HIcon className="w-full h-full" />
                    </span>
                    <span className="text-sm text-slate-700 leading-snug">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Three pillars */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-4 flex items-center gap-2">
              <Icon.Layers className={`w-5 h-5 ${section.accentText}`} />
              Academic Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {section.pillars.map((p) => (
                <div key={p.num} className="rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:shadow-md transition-shadow">
                  <span className={`text-sm font-black ${p.color} block mb-1`}>{p.num}</span>
                  <h4 className="font-bold text-sm text-[#0A2540] mb-2 leading-snug">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects */}
          {section.subjects.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-3 flex items-center gap-2">
                <Icon.BookOpen className={`w-5 h-5 ${section.accentText}`} />
                Curricular Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.subjects.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-900 text-xs font-semibold shadow-sm hover:bg-blue-50 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────── */
export default function AcademicsPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("pre-primary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], ["0%", "30%"]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
      }, 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <>
      <FloatStyle />
      <main className="bg-[#F8FAFF] text-[#0A2540] min-h-screen">

        {/* ── PROGRESS BAR ─────────────────────────── */}
        <motion.div
          className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-[#781428] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* ── HERO ─────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden min-h-[72vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2563] via-[#1E3A8A] to-[#781428]" />
          <AnimatedBackground />

          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 w-full"
          >
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">Academic Excellence Since 1880</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif font-black text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight text-white">
                Academics at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-amber-300">
                  Baldwin Girls
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
                From the first playful steps of Pre‑Primary through the distinction‑grade rigour of ICSE,
                every Baldwin girl is nurtured to discover her fullest potential.
              </motion.p>

              {/* Quick section links – SVG icons */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3">
                {SECTIONS.map((s) => {
                  const { SectionIcon } = s;
                  return (
                    <button key={s.id} onClick={() => scrollTo(s.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 transition-all duration-200 font-medium">
                      <SectionIcon className="w-4 h-4" />
                      {s.label}
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* School-wide stats */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {[
                { ValueIcon: Icon.School,  value: "140+", label: "Years of excellence"       },
                { ValueIcon: Icon.Trophy,  value: "100%", label: "ICSE pass rate"            },
                { ValueIcon: Icon.Award,   value: "85%+", label: "Students with Distinction" },
                { ValueIcon: Icon.Users,   value: "2000+",label: "Students enrolled"         },
              ].map(({ ValueIcon, value, label }) => (
                <div key={label} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-4 text-center">
                  <ValueIcon className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <div className="font-serif font-black text-2xl text-white">{value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── MOBILE STICKY NAV ────────────────────── */}
        <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <span className="flex items-center gap-2 text-sm font-bold text-[#1E3A8A]">
            {(() => { const s = SECTIONS.find((x) => x.id === activeSection); if (!s) return null; const { SectionIcon } = s; return <SectionIcon className="w-4 h-4" />; })()}
            {SECTIONS.find((s) => s.id === activeSection)?.label}
          </span>
          <button onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#781428] border border-[#781428] rounded-lg px-3 py-1.5">
            All Sections
            <Icon.ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden fixed top-28 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-1">
              {SECTIONS.map((s) => {
                const { SectionIcon } = s;
                return (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === s.id ? "bg-[#1E3A8A] text-white font-bold" : "text-slate-700 hover:bg-blue-50"
                    }`}>
                    <SectionIcon className={`w-4 h-4 ${activeSection === s.id ? "text-white" : "text-blue-600"}`} />
                    <div>
                      <div>{s.label}</div>
                      <div className="text-[11px] opacity-60">{s.grades}</div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN BODY ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 flex gap-10 items-start">

          {/* ── STICKY LEFT SIDEBAR ──────────────────── */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24">

            {/* Nav card */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#781428] px-5 py-5 text-white">
                <div className="flex items-center gap-2 text-blue-200 mb-1">
                  <Icon.BookOpen className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Navigate</span>
                </div>
                <div className="font-serif font-black text-xl text-white leading-tight">Academic Sections</div>
                <p className="text-xs text-white/60 mt-1">Click a section to explore</p>
              </div>
              <nav className="bg-white p-3 space-y-1">
                {SECTIONS.map((s, i) => {
                  const isActive = activeSection === s.id;
                  const { SectionIcon } = s;
                  return (
                    <button key={s.id} onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-3 text-left px-3.5 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-md shadow-blue-200"
                          : "text-slate-700 hover:bg-blue-50 hover:text-[#1E3A8A]"
                      }`}>
                      <span className={`text-[11px] font-black w-5 shrink-0 ${isActive ? "text-white/60" : "text-slate-400"}`}>
                        0{i + 1}
                      </span>
                      <SectionIcon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-blue-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isActive ? "text-white" : ""}`}>{s.label}</p>
                        <p className={`text-[10px] truncate mt-0.5 ${isActive ? "text-white/60" : "text-slate-400"}`}>{s.grades}</p>
                      </div>
                      {isActive && <Icon.ChevronRight className="w-3.5 h-3.5 text-white/80 shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Admissions CTA */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white p-5">
              <div className="flex items-center gap-1.5 text-amber-300 mb-1">
                <Icon.Star className="w-3.5 h-3.5" />
                <div className="text-xs font-bold tracking-widest uppercase">Admissions Open</div>
              </div>
              <div className="font-serif font-bold text-lg leading-tight">Join Baldwin Girls' Class of 2027</div>
              <p className="text-xs text-white/70 mt-2">Applications open for Pre-KG through Standard X. Limited seats available.</p>
              <Link to="/admissions"
                className="mt-4 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0A2540] text-sm font-bold rounded-xl py-2.5 transition-colors shadow-sm">
                Apply Online <Icon.ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact"
                className="mt-2 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl py-2 transition-colors border border-white/20">
                Contact Admissions <Icon.ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Quick facts */}
            <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
              <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                <Icon.FileText className="w-3.5 h-3.5" />
                <p className="text-xs font-bold uppercase tracking-widest">Quick Facts</p>
              </div>
              {[
                { label: "Board",    value: "CISCE / ICSE",    Icon: Icon.FileText },
                { label: "Medium",   value: "English",          Icon: Icon.Globe    },
                { label: "Founded",  value: "1880",             Icon: Icon.School   },
                { label: "Campus",   value: "7+ acres, Bangalore", Icon: Icon.Map  },
                { label: "Principal",value: "Ms. Violet Suresh", Icon: Icon.Users  },
              ].map(({ label, value, Icon: FIcon }) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0 gap-2">
                  <div className="flex items-center gap-1.5">
                    <FIcon className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                  <span className="text-xs font-bold text-[#1E3A8A] text-right">{value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── CONTENT ──────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Intro banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0 self-start">
                <Icon.School className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-serif font-black text-xl text-[#1E3A8A]">A Curriculum Built for Every Baldwin Girl</h2>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Scroll through each wing or click a section in the sidebar to explore our
                  detailed curriculum, timings, subjects and academic pillars.
                </p>
              </div>
            </motion.div>

            {/* All section cards */}
            {SECTIONS.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}

            {/* Final CTA */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#781428] text-white p-8 sm:p-12 text-center shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                  <Icon.GraduationCap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl">Ready to become a Baldwin Girl?</h3>
              <p className="mt-3 text-white/70 max-w-lg mx-auto text-sm leading-relaxed">
                Join over 2,000 students who experience world-class education in a nurturing, all-girls
                environment that has shaped leaders since 1880.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link to="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#0A2540] px-8 py-3 font-bold text-sm shadow-md transition-colors">
                  Start Your Application <Icon.ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 font-medium text-sm transition-colors">
                  Schedule a Campus Visit <Icon.ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
