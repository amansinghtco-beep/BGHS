import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON LIBRARY — pure vectors, no emojis, no image files
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  FileText: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Phone: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Star: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Award: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  ChevronDown: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Clipboard: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Camera: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Sparkles: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  ),
  Building: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Headphones: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Download: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Info: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  RotateCcw: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  Check: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  FileCheck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="m9 15 2 2 4-4" />
    </svg>
  ),
  Filter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  MessageSquare: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  HelpCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Footprints: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.5-2 8.5V16" /><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.5 2 8.5V20" /><circle cx="6" cy="20" r="2" /><circle cx="18" cy="12" r="2" />
    </svg>
  ),
};


/* ─────────────────────────────────────────────────────────────────────────
   ANIMATED FLOATING SVG BACKGROUND
───────────────────────────────────────────────────────────────────────── */
const floatingShapes = [
  { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z", x: "5%", y: "15%", size: 40, delay: 0 },
  { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", x: "90%", y: "25%", size: 36, delay: 2 },
  { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", x: "15%", y: "70%", size: 44, delay: 4 },
  { d: "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5", x: "80%", y: "65%", size: 42, delay: 1 },
  { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2l6 6", x: "50%", y: "85%", size: 34, delay: 3 },
  { d: "M12 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12", x: "35%", y: "10%", size: 38, delay: 5 },
];

function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingShapes.map((shape, i) => (
        <svg
          key={i}
          className="absolute opacity-[0.04]"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            animation: `floatAdm ${8 + i * 2}s ease-in-out ${shape.delay}s infinite`,
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path d={shape.d} />
        </svg>
      ))}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};


/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */
const COLORS = {
  navy: "#0A1628",
  blue: "#1E3A8A",
  blueLight: "#3B82F6",
  bluePale: "#DBEAFE",
  burgundy: "#781428",
  burgundyLight: "#9F1239",
  burgundyPale: "#FFE4E6",
  white: "#FFFFFF",
  amber: "#F3C44E",
};

const stats = [
  { value: "24/7", label: "Support Available", icon: Icon.Headphones },
  { value: "Pre-KG to X", label: "All Grades", icon: Icon.BookOpen },
  { value: "100%", label: "Hassle-Free Process", icon: Icon.CheckCircle },
  { value: "Est. 1880", label: "Years of Trust", icon: Icon.Building },
];

const parentPromises = [
  {
    icon: Icon.Heart,
    title: "Individual Attention",
    description: "Every child receives personalised guidance. Our teachers know each student by name, strengths, and aspirations, ensuring no one is overlooked.",
  },
  {
    icon: Icon.Shield,
    title: "Safe & Nurturing Campus",
    description: "A secure, 7+ acre campus with CCTV monitoring, trained security personnel, and a dedicated infirmary ensures your daughter is safe at all times.",
  },
  {
    icon: Icon.Star,
    title: "Holistic Development",
    description: "Beyond academics, we nurture leadership, sportsmanship, creativity, and empathy through 18+ sports, NCC, robotics, AI lab, music, dance, and art.",
  },
  {
    icon: Icon.GraduationCap,
    title: "Proven Academic Excellence",
    description: "100% ICSE pass rate with 85%+ students earning distinction. Our 2025 batch had 44 students scoring above 95% and 89 above 90%.",
  },
];

const divisions = [
  {
    title: "Pre-Primary",
    grades: "Pre-KG, LKG, UKG, Std I & II",
    timing: "Pre-KG to UKG: 8:15 AM \u2013 12:05 PM | Std I & II: 8:15 AM \u2013 2:30 PM",
    color: "#3B82F6",
    icon: Icon.Sparkles,
    highlights: [
      "Activity-based, thematic learning approach",
      "Dedicated early-childhood trained educators",
      "Individual progress tracking and parent updates",
      "Art, craft, music, and sensory play integrated daily",
    ],
    process: [
      "Submit online or offline registration form",
      "Interactive session with age-appropriate assessment",
      "Admission granted upon selection",
    ],
  },
  {
    title: "Primary School",
    grades: "Standard III to Standard V",
    timing: "8:15 AM \u2013 3:00 PM",
    color: "#1E3A8A",
    icon: Icon.BookOpen,
    highlights: [
      "Strong foundation in English, Mathematics & Science",
      "Second and third language integration (Kannada, Hindi)",
      "Computer literacy and digital skills programme",
      "Regular co-curricular activities and field trips",
    ],
    process: [
      "Submit completed application with documents",
      "Written assessment and interaction round",
      "Admission offered to successful candidates",
    ],
  },
  {
    title: "Middle School",
    grades: "Standard VI to Standard VIII",
    timing: "8:15 AM \u2013 3:00 PM",
    color: "#781428",
    icon: Icon.Globe,
    highlights: [
      "ICSE-aligned interdisciplinary curriculum",
      "Dedicated science laboratories (Physics, Chemistry, Biology)",
      "Leadership development through student council participation",
      "Career guidance and counselling support",
    ],
    process: [
      "Submit application with previous school records",
      "Subject-based written test and interview",
      "Transfer Certificate from previous school required",
    ],
  },
  {
    title: "High School",
    grades: "Standard IX to Standard X (ICSE)",
    timing: "8:15 AM \u2013 3:00 PM",
    color: "#9F1239",
    icon: Icon.Award,
    highlights: [
      "Rigorous ICSE board examination preparation",
      "Subject specialisation with experienced faculty",
      "Regular mock examinations and performance analytics",
      "College readiness and career exploration programmes",
    ],
    process: [
      "Application with complete academic records",
      "Entrance assessment in core subjects",
      "Parent-school orientation meeting",
    ],
  },
];

const applicationSteps = [
  {
    step: 1,
    title: "Register & Apply",
    description: "Fill the Registration-cum-Admission form available both online at our portal and offline at the school office. Ensure all fields are completed accurately.",
    icon: Icon.Clipboard,
  },
  {
    step: 2,
    title: "Submit Documents",
    description: "Submit the duly filled form along with all required documents. Documents can be submitted later in case of any difficulty, but must be provided before admission is finalised.",
    icon: Icon.FileText,
  },
  {
    step: 3,
    title: "Verification & Assessment",
    description: "The Admission desk will verify all documents and schedule an interactive session with a simple, age-appropriate assessment for the student.",
    icon: Icon.CheckCircle,
  },
  {
    step: 4,
    title: "Selection & Enrolment",
    description: "Following the assessment, if selected, admission will be granted. Parents are required to complete all admission formalities within 10 working days to secure the seat.",
    icon: Icon.GraduationCap,
  },
];

interface RequiredDoc {
  id: string;
  doc: string;
  category: "Identity & Age" | "Academic & Transfer" | "Medical & Declaration" | "Special Category";
  grades: string;
  gradeFilter: ("all" | "pre-primary" | "primary-middle" | "high-school" | "special")[];
  type: "Mandatory" | "Conditional" | "Lateral Entry Only";
  format: string;
  detail: string;
  tip: string;
  icon: keyof typeof Icon;
}

const requiredDocuments: RequiredDoc[] = [
  {
    id: "birth-cert-orig",
    doc: "Original Birth Certificate",
    category: "Identity & Age",
    grades: "Pre-KG to Standard X",
    gradeFilter: ["all", "pre-primary", "primary-middle", "high-school"],
    type: "Mandatory",
    format: "Original certificate for in-person spot verification",
    detail: "Issued by Municipal Corporation, Panchayat, or Registrar of Births. Mandatory to verify date of birth as per CISCE regulations.",
    tip: "Will be verified on the spot by the Admissions Desk and returned immediately.",
    icon: "Shield",
  },
  {
    id: "birth-cert-attested",
    doc: "Attested Xerox of Birth Certificate",
    category: "Identity & Age",
    grades: "Pre-KG to Standard X",
    gradeFilter: ["all", "pre-primary", "primary-middle", "high-school"],
    type: "Mandatory",
    format: "2 copies with Gazetted Officer / Notary seal & signature",
    detail: "Clear photocopy bearing the official stamp, seal and signature of a Gazetted Officer or authorized Notary Public.",
    tip: "Retained permanently in the student's official CISCE admission dossier.",
    icon: "FileCheck",
  },
  {
    id: "photos",
    doc: "Photographs of Child & Parents",
    category: "Identity & Age",
    grades: "Pre-KG to Standard X",
    gradeFilter: ["all", "pre-primary", "primary-middle", "high-school"],
    type: "Mandatory",
    format: "Child: 4 copies | Parents: 2 copies each (35mm × 45mm)",
    detail: "Recent colour passport photographs against a light plain background. Clear frontal face view without headwear.",
    tip: "Please write the student's full name and provisional form number on the reverse in pencil.",
    icon: "Camera",
  },
  {
    id: "parent-declaration",
    doc: "Parents' Declaration Form",
    category: "Medical & Declaration",
    grades: "Pre-KG to Standard X",
    gradeFilter: ["all", "pre-primary", "primary-middle", "high-school"],
    type: "Mandatory",
    format: "Original signed proforma (available at portal)",
    detail: "Joint undertaking signed by both parents/guardians accepting the school rules, academic discipline, and attendance policy.",
    tip: "Can be downloaded below or collected from the admissions counter during office hours.",
    icon: "FileText",
  },
  {
    id: "medical-cert",
    doc: "Medical Fitness Certificate",
    category: "Medical & Declaration",
    grades: "Pre-KG to Standard X",
    gradeFilter: ["all", "pre-primary", "primary-middle", "high-school"],
    type: "Mandatory",
    format: "Signed by CDMO or Registered Medical Practitioner",
    detail: "Physical fitness certificate including blood group certification and updated childhood immunization / vaccination record.",
    tip: "Ensures our full-time campus infirmary and nursing team can provide personalized medical care.",
    icon: "Heart",
  },
  {
    id: "tc",
    doc: "Transfer Certificate (TC)",
    category: "Academic & Transfer",
    grades: "Standard II to Standard X",
    gradeFilter: ["all", "primary-middle", "high-school"],
    type: "Lateral Entry Only",
    format: "Original TC with Education Department Countersignature",
    detail: "Original TC from the previous recognized school. For schools outside Karnataka, TC must be countersigned by BEO / DDPI / Board Inspector.",
    tip: "Mandatory prior to commencement of classes; provisional admission granted pending TC.",
    icon: "GraduationCap",
  },
  {
    id: "report-cards",
    doc: "Previous School Report Cards",
    category: "Academic & Transfer",
    grades: "Standard I to Standard X",
    gradeFilter: ["all", "primary-middle", "high-school"],
    type: "Lateral Entry Only",
    format: "Photocopies of preceding 2 academic years' grade sheets",
    detail: "Cumulative academic records showing scholastic achievement, attendance percentage, and promotion remarks from previous institution.",
    tip: "Assists the academic department in understanding your daughter's subject baseline.",
    icon: "BookOpen",
  },
  {
    id: "caste-cert",
    doc: "Caste / Category Certificate",
    category: "Special Category",
    grades: "Applicable for SC / ST / OBC only",
    gradeFilter: ["all", "special"],
    type: "Conditional",
    format: "Attested photocopy of government revenue certificate",
    detail: "Issued by the competent revenue authority (Tahsildar / SDM) in the name of the student or father for official category records.",
    tip: "Only required for families seeking enrollment under government-notified categories.",
    icon: "Award",
  },
  {
    id: "nri-passport",
    doc: "Passport Copy (NRI Students)",
    category: "Special Category",
    grades: "NRI & Foreign Nationals",
    gradeFilter: ["all", "special"],
    type: "Conditional",
    format: "First & last passport pages + valid Indian visa / OCI card",
    detail: "Photocopy of student's and sponsoring parent's valid passport along with valid residential permit or OCI card endorsement.",
    tip: "Admissions Office provides dedicated liaison support for foreign equivalency certificates.",
    icon: "Globe",
  },
];

const ageCriteria = [
  { grade: "Pre-KG", age: "3 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "LKG", age: "4 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "UKG", age: "5 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard I", age: "6 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard II", age: "7 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard III", age: "8 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard IV", age: "9 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard V", age: "10 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard VI", age: "11 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard VII", age: "12 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard VIII", age: "13 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard IX", age: "14 years", cutoff: "As on 1st June of the year of admission" },
  { grade: "Standard X", age: "15 years", cutoff: "As on 1st June of the year of admission" },
];

const faqs = [
  {
    question: "What is the age criteria for admission to Pre-KG?",
    answer: "A child must be 3 years old as on 1st June of the year of admission to be eligible for Pre-KG. Similarly, LKG requires 4 years, UKG requires 5 years, and Standard I requires 6 years as on 1st June. The same progressive scale applies through Standard X.",
  },
  {
    question: "What are the school timings for different classes?",
    answer: "Pre-KG, LKG, and UKG: 8:15 AM to 12:05 PM. Standard I & II: 8:15 AM to 2:30 PM. Standard III to X: 8:15 AM to 3:00 PM. Standard IX & X may have additional revision sessions starting at 7:30 AM or extending to 4:00 PM during board exam preparation.",
  },
  {
    question: "What curriculum does the school follow?",
    answer: "Baldwin Girls' High School is affiliated to the Council for the Indian School Certificate Examinations (CISCE), New Delhi. The school follows the ICSE curriculum from Pre-KG through Standard X, with a comprehensive academic framework covering English, Mathematics, Sciences, Social Studies, Languages (Kannada, Hindi), Computer Applications, and co-curricular activities.",
  },
  {
    question: "What documents are required for admission?",
    answer: "You will need the Parents' Declaration Form, original Birth Certificate (for reference), an attested Xerox copy of the Birth Certificate, a Medical Fitness Certificate, photographs of the child and parents, and a Transfer Certificate for admissions above Standard I. SC/ST/OBC candidates need to submit a Caste Certificate, and NRI students must provide a passport copy.",
  },
  {
    question: "How do I apply for admission?",
    answer: "You can apply online through our Admission Portal at portal.baldwingirls.edu.in or collect a physical form from the school office. Fill the Registration-cum-Admission form, attach the required documents, and submit. After document verification, an interactive session with a simple assessment will be conducted. Upon selection, complete all formalities within 10 working days.",
  },
  {
    question: "Is there a Transfer Certificate (TC) procedure?",
    answer: "Yes, for students seeking admission from Standard II onwards, a Transfer Certificate from the previous school is mandatory. The TC must be countersigned by the appropriate educational authority. For students transferring from schools outside Karnataka, additional documentation may be required.",
  },
  {
    question: "What co-curricular and sports facilities are available?",
    answer: "Baldwin Girls' offers 18+ sports including swimming (international-standard pool), basketball, volleyball, badminton, table tennis, cricket, football, athletics, and more. Co-curricular activities include NCC, robotics, AI lab, dance, music, art, craft, quiz competitions, career guidance, and counselling.",
  },
  {
    question: "Does the school provide hostel and boarding facilities?",
    answer: "Yes, Baldwin Girls' High School has a well-equipped residential hostel with comfortable dormitories, a modern dining hall, recreational areas, and round-the-clock security. The hostel is supervised by experienced wardens who ensure the well-being of boarders.",
  },
];


/* ─────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION ITEM
───────────────────────────────────────────────────────────────────────── */
function FAQItem({ faq, isOpen, toggle, index }: { faq: typeof faqs[0]; isOpen: boolean; toggle: () => void; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="border-b border-[#1E3A8A]/10 last:border-b-0"
    >
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 py-6 px-2 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${isOpen ? "bg-[#781428] text-white" : "bg-[#DBEAFE] text-[#1E3A8A]"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-semibold text-base lg:text-lg transition-colors duration-300 ${isOpen ? "text-[#781428]" : "text-[#0A1628]"}`}>
            {faq.question}
          </span>
        </div>
        <Icon.ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#781428]" : "text-[#94A3B8]"}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-14 pr-4 text-[#5A6778] leading-7 text-[15px]">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   ENQUIRY FORM
───────────────────────────────────────────────────────────────────────── */
function EnquiryForm() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    grade: "",
    callbackTime: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="grid gap-5 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Parent / Guardian Name</label>
        <input
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Student Name</label>
        <input
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter student name"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Grade Applying For</label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition appearance-none"
        >
          <option value="" className="text-[#0A1628]">Select grade</option>
          {["Pre-KG", "LKG", "UKG", "Std I", "Std II", "Std III", "Std IV", "Std V", "Std VI", "Std VII", "Std VIII", "Std IX", "Std X"].map((g) => (
            <option key={g} value={g} className="text-[#0A1628]">{g}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Preferred Callback Time</label>
        <select
          name="callbackTime"
          value={formData.callbackTime}
          onChange={handleChange}
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition appearance-none"
        >
          <option value="" className="text-[#0A1628]">Select time</option>
          {["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"].map((t) => (
            <option key={t} value={t} className="text-[#0A1628]">{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Phone Number</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Email Address</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="your.email@example.com"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs font-bold tracking-wider text-white/70 uppercase mb-2">Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any specific questions or requirements..."
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition resize-none"
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-4 px-8 tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer"
        >
          Submit Enquiry
        </button>
      </div>
    </form>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   MAIN ADMISSIONS PAGE
───────────────────────────────────────────────────────────────────────── */
export default function AdmissionsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [docTab, setDocTab] = useState<"all" | "pre-primary" | "primary-middle" | "high-school" | "special">("all");
  const [readyDocs, setReadyDocs] = useState<Record<string, boolean>>({});

  const toggleDocReady = (id: string) => {
    setReadyDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDocs = requiredDocuments.filter(
    (d) => docTab === "all" || d.gradeFilter.includes(docTab)
  );

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  // Scroll progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          width: progressWidth,
          background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.burgundy})`,
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="overview" ref={heroRef} className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden scroll-mt-24">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroParallax }}>
          <img
            src="/admissions-hero-campus.jpg"
            alt="Baldwin Girls' High School Campus"
            className="w-full h-[120%] object-cover"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#781428]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-[#0A1628]/30" />

        {/* Floating SVG decorations */}
        <FloatingBackground />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/90">Admissions</span>
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#781428]/40 border border-[#781428]/50 px-5 py-2 mb-6 backdrop-blur-sm">
              <Icon.GraduationCap className="w-4 h-4 text-[#F3C44E]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#F3C44E] uppercase">Admissions 2026–27</span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Join Our{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] bg-clip-text text-transparent">
                Community
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mb-10">
              Begin your daughter's journey at one of Bangalore's most respected institutions.
              Our admissions team is here to guide your family through every step.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://portal.baldwingirls.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 group"
              >
                Apply Online
                <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+919148780138"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                <Icon.Phone className="w-4 h-4" />
                +91 91487 80138
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-1 bg-gradient-to-r from-[#1E3A8A] to-[#781428]">
        <div className="mx-auto max-w-[1380px] px-3 sm:px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-2 sm:gap-4 py-5 sm:py-7 px-3 sm:px-6 border-white/10 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${
                  i < 2 ? "border-b" : ""
                } lg:border-b-0 lg:border-r lg:last:border-r-0`}
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3C44E]" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-white whitespace-nowrap leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-0.5 sm:mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          PARENT FIRST PROMISE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F8FAFC] to-white">
        <FloatingBackground />
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-5 py-2 mb-5">
              <Icon.Heart className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#781428] uppercase">Our Commitment to Parents</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0A1628] leading-tight mb-5">
              The Parent First{" "}
              <span className="text-[#781428]">Promise</span>
            </h2>
            <p className="text-lg text-[#5A6778] leading-relaxed">
              When you choose Baldwin Girls', you choose a school that values your trust as much as
              your daughter's education. Here's our promise to every family.
            </p>
          </motion.div>

          {/* Promise Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parentPromises.map((promise, i) => (
              <motion.div
                key={promise.title}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative bg-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-[#3B82F6]/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] mb-6 group-hover:scale-110 transition-transform duration-500">
                  <promise.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-[#0A1628] mb-3">{promise.title}</h3>
                <p className="text-sm text-[#5A6778] leading-6">{promise.description}</p>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-[3px] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#781428] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          DIVISION-WISE ADMISSIONS GUIDELINES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-[#0A1628] text-white overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1E3A8A]/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#781428]/15 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 mb-5 border border-white/10">
              <Icon.BookOpen className="w-4 h-4 text-[#F3C44E]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#F3C44E] uppercase">Division-Wise Guidelines</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white leading-tight mb-5">
              Programmes &{" "}
              <span className="text-[#3B82F6]">Admissions</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Explore our four academic divisions, each designed to meet the developmental needs
              of students at every stage of their school journey.
            </p>
          </motion.div>

          {/* Division Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {divisions.map((div, i) => (
              <motion.div
                key={div.title}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/8 transition-all duration-500"
              >
                {/* Top color bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${div.color}, ${div.color}88)` }} />

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${div.color}22` }}
                        >
                          <div.icon className="w-5 h-5" style={{ color: div.color }} />
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-white">{div.title}</h3>
                      </div>
                      <p className="text-sm text-white/50">{div.grades}</p>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="flex items-center gap-2 mb-6 rounded-xl bg-white/5 px-4 py-3">
                    <Icon.Clock className="w-4 h-4 text-[#F3C44E] shrink-0" />
                    <span className="text-sm text-white/70">{div.timing}</span>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <p className="text-xs font-bold tracking-wider text-white/40 uppercase mb-3">Highlights</p>
                    <ul className="space-y-2.5">
                      {div.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-white/70">
                          <Icon.CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process Steps */}
                  <div className="mb-6">
                    <p className="text-xs font-bold tracking-wider text-white/40 uppercase mb-3">Admission Steps</p>
                    <ol className="space-y-2">
                      {div.process.map((step, si) => (
                        <li key={step} className="flex items-start gap-3 text-sm text-white/60">
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                            style={{ backgroundColor: `${div.color}30`, color: div.color === "#781428" || div.color === "#9F1239" ? "#FFE4E6" : "#DBEAFE" }}
                          >
                            {si + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://portal.baldwingirls.edu.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg group/btn"
                    style={{ backgroundColor: div.color }}
                  >
                    Enquire Now
                    <Icon.ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          STEP-BY-STEP APPLICATION PROCESS
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="steps" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div id="process" className="absolute -top-24" />
        <FloatingBackground />
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-5">
              <Icon.Clipboard className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#1E3A8A] uppercase">Application Process</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0A1628] leading-tight mb-5">
              Simple Steps to{" "}
              <span className="text-[#3B82F6]">Admission</span>
            </h2>
            <p className="text-lg text-[#5A6778] leading-relaxed">
              Our streamlined process ensures a smooth and transparent journey from enquiry to enrolment.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative"
              >
                {/* Connector line */}
                {i < applicationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-[#3B82F6]/30 to-[#781428]/30" />
                )}

                <div className="relative bg-gradient-to-b from-[#F8FAFC] to-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-[#3B82F6]/30 transition-all duration-300 hover:shadow-lg text-center group">
                  {/* Step Number */}
                  <div className="relative inline-flex mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                      <step.icon className="w-9 h-9 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#781428] text-white text-sm font-bold shadow-md">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#0A1628] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#5A6778] leading-6">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          REQUIRED DOCUMENTS CHECKLIST — REDESIGNED DOSSIER & VERIFICATION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="info" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F1F5F9] via-[#F8FAFC] to-white overflow-hidden scroll-mt-24">
        <div id="documents" className="absolute -top-24" />
        <div id="prospectus" className="absolute -top-24" />
        <FloatingBackground />
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-5 py-2 mb-4 border border-[#781428]/20">
              <Icon.FileCheck className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#781428] uppercase">Enrollment Dossier & Verification</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0A1628] leading-tight mb-4">
              Required Documents &{" "}
              <span className="bg-gradient-to-r from-[#781428] to-[#9F1239] bg-clip-text text-transparent">
                Checklist
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              Ensure a seamless verification on interaction day. Filter by your daughter's grade level below to review exact requirements, check off items as you collect them, and download official proformas.
            </p>

            {/* Interactive Grade Filter Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {[
                { id: "all", label: "All Documents", count: requiredDocuments.length },
                { id: "pre-primary", label: "Pre-Primary (Pre-KG – Std I)", count: requiredDocuments.filter(d => d.gradeFilter.includes("pre-primary")).length },
                { id: "primary-middle", label: "Primary & Middle (Std II – VIII)", count: requiredDocuments.filter(d => d.gradeFilter.includes("primary-middle")).length },
                { id: "high-school", label: "High School (Std IX – X)", count: requiredDocuments.filter(d => d.gradeFilter.includes("high-school")).length },
                { id: "special", label: "Special / NRI", count: requiredDocuments.filter(d => d.gradeFilter.includes("special")).length },
              ].map((tab) => {
                const isActive = docTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDocTab(tab.id as typeof docTab)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#781428] text-white shadow-md shadow-rose-950/20 scale-[1.02]"
                        : "bg-white text-[#334155] hover:bg-[#DBEAFE]/40 border border-[#CBD5E1]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Asymmetric 2-Column Main Dossier Area */}
          <div className="grid lg:grid-cols-[1fr_2.1fr] gap-8 items-start">
            
            {/* Left Column: Official Pass & Guidelines */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Card 1: Official Verification Counter Pass */}
              <div className="rounded-2xl bg-gradient-to-b from-[#0A1628] to-[#12233f] text-white p-6 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#F3C44E] uppercase block">Official Desk Pass</span>
                    <h3 className="font-serif font-bold text-lg text-white">Admissions Secretariat</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                    <Icon.Building className="w-5 h-5 text-[#F3C44E]" />
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-white/80">
                  <div className="flex items-start gap-2.5">
                    <Icon.MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Verification Venue</p>
                      <p className="text-white/70">Main Heritage Quadrangle, Room 104, #90 Richmond Road, Bengaluru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Icon.Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Counter Timings</p>
                      <p className="text-white/70">Mon – Fri: 8:15 AM – 3:00 PM</p>
                      <p className="text-white/70">Saturday: 8:15 AM – 12:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Icon.Phone className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Helpline / Liaison</p>
                      <a href="tel:+919148780138" className="text-[#38BDF8] hover:underline font-semibold">
                        +91 91487 80138
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/60">
                  <Icon.Info className="w-3.5 h-3.5 text-[#F3C44E] shrink-0" />
                  <span>Obtain your Visitor Security Token at Gate 1 on entry.</span>
                </div>
              </div>

              {/* Card 2: 4 Golden Submission Guidelines */}
              <div className="rounded-2xl bg-white p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#781428]/10 text-[#781428]">
                    <Icon.Shield className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#0A1628] text-sm tracking-wide">4 Important Submission Rules</h4>
                </div>

                <ul className="space-y-3.5 text-xs text-[#5A6778] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-[10px]">1</span>
                    <span><strong>Keep 3 Photocopy Sets:</strong> One for CISCE records, one for the school file, and one acknowledged parent copy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-[10px]">2</span>
                    <span><strong>Spot Verification:</strong> Present original Birth Certificate & TC in person; they are returned immediately after verification.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-[10px]">3</span>
                    <span><strong>Photograph Standard:</strong> 35×45mm matte colour photos. Write the student's full name & form number in pencil on the back.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-[10px]">4</span>
                    <span><strong>Attestation Seal:</strong> Birth certificate photocopies must bear a Gazetted Officer or authorized Notary seal.</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Proforma Templates Download */}
              <div className="rounded-2xl bg-[#DBEAFE]/40 border border-[#93C5FD]/40 p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider mb-2">
                  <Icon.Download className="w-4 h-4" />
                  <span>Official Form Proformas</span>
                </div>
                <p className="text-xs text-[#475569] mb-3 leading-relaxed">
                  Parents may download the official declaration format and physician medical certificate before attending the interaction:
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://portal.baldwingirls.edu.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0A1628] hover:text-[#1E3A8A] border border-[#CBD5E1] transition group shadow-2xs"
                  >
                    <span>Parent Declaration Format</span>
                    <Icon.ArrowRight className="w-3.5 h-3.5 text-[#1E3A8A] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="https://portal.baldwingirls.edu.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0A1628] hover:text-[#1E3A8A] border border-[#CBD5E1] transition group shadow-2xs"
                  >
                    <span>Medical Fitness Proforma (CDMO)</span>
                    <Icon.ArrowRight className="w-3.5 h-3.5 text-[#1E3A8A] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 4: Interaction Day Protocol & Walkthrough */}
              <div className="rounded-2xl bg-white p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A]">
                    <Icon.Footprints className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#1E3A8A] uppercase block">Campus Protocol</span>
                    <h4 className="font-bold text-[#0A1628] text-sm">Interaction Day Walkthrough</h4>
                  </div>
                </div>

                <ol className="relative border-l-2 border-[#DBEAFE] ml-2 space-y-4 text-xs text-[#5A6778]">
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-0.5 h-3 w-3 rounded-full bg-[#1E3A8A] border-2 border-white" />
                    <p className="font-bold text-[#0A1628]">1. Gate 1 Security Clearance</p>
                    <p className="mt-0.5 text-slate-500">Collect visitor token at Gate 1 on Richmond Road. Dedicated parent parking available.</p>
                  </li>
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-0.5 h-3 w-3 rounded-full bg-[#3B82F6] border-2 border-white" />
                    <p className="font-bold text-[#0A1628]">2. Handover Dossier Sets</p>
                    <p className="mt-0.5 text-slate-500">Submit your 3 attested photocopy sets at Counter 1, Room 104, Heritage Quadrangle.</p>
                  </li>
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-0.5 h-3 w-3 rounded-full bg-[#781428] border-2 border-white" />
                    <p className="font-bold text-[#0A1628]">3. Instant Spot Verification</p>
                    <p className="mt-0.5 text-slate-500">Admissions officer reviews original Birth Certificate & TC and returns them on the spot.</p>
                  </li>
                  <li className="ml-4">
                    <span className="absolute -left-1.5 mt-0.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <p className="font-bold text-[#0A1628]">4. Interactive Session & Slip</p>
                    <p className="mt-0.5 text-slate-500">Encouraging interaction with faculty, followed by formal provisional acknowledgement slip.</p>
                  </li>
                </ol>
              </div>

              {/* Card 5: Common Document Questions & Answers */}
              <div className="rounded-2xl bg-white p-6 border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#781428]/10 text-[#781428]">
                    <Icon.HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.16em] text-[#781428] uppercase block">Quick Assistance</span>
                    <h4 className="font-bold text-[#0A1628] text-sm">Document FAQ & Rules</h4>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3">
                    <p className="font-bold text-[#0A1628] mb-1">Q: What if the current school delays the TC?</p>
                    <p className="text-slate-600 leading-relaxed">
                      Submit a bonafide student letter from the current institution. You will be given a 10-day provisional grace period to submit the final original TC.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3">
                    <p className="font-bold text-[#0A1628] mb-1">Q: Transferring from outside Karnataka state?</p>
                    <p className="text-slate-600 leading-relaxed">
                      The Transfer Certificate must be countersigned by the respective district education authority (BEO / DDPI / Board Inspector) of that state.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3">
                    <p className="font-bold text-[#0A1628] mb-1">Q: Can guardians attend if parents are travelling?</p>
                    <p className="text-slate-600 leading-relaxed">
                      Yes. Please provide a signed parental authorization letter alongside a government photo ID of the accompanying guardian.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 6: Direct Admissions Liaison & Hotline */}
              <div className="rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#152e6f] to-[#781428] text-white p-6 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 border border-emerald-400/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Admissions Desk Active
                  </span>
                  <Icon.MessageSquare className="w-4 h-4 text-[#F3C44E]" />
                </div>

                <h4 className="font-serif font-bold text-base text-white mb-1">Need Clarification on Any Document?</h4>
                <p className="text-xs text-white/75 leading-relaxed mb-4">
                  Our admissions counsellors are available to review your documents prior to your scheduled interaction.
                </p>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <a
                    href="tel:+919148780138"
                    className="rounded-xl bg-white text-[#1E3A8A] font-bold py-2.5 px-3 hover:bg-[#DBEAFE] transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Icon.Phone className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href="mailto:baldwingirls@gmail.com"
                    className="rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold py-2.5 px-3 transition flex items-center justify-center gap-1.5 border border-white/20 backdrop-blur-sm"
                  >
                    <Icon.Mail className="w-3.5 h-3.5" />
                    <span>Email Desk</span>
                  </a>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Responsive 2-Column Cards Grid */}
            <div>
              <div className="grid sm:grid-cols-2 gap-4.5">
                {filteredDocs.map((item, i) => {
                  const isChecked = !!readyDocs[item.id];
                  const IconComp = Icon[item.icon] || Icon.FileText;

                  return (
                    <motion.div
                      key={item.id}
                      variants={scaleUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      onClick={() => toggleDocReady(item.id)}
                      className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                        isChecked
                          ? "bg-emerald-50/70 border-2 border-emerald-500/80 shadow-md shadow-emerald-500/10"
                          : "bg-white border border-[#E2E8F0] hover:border-[#3B82F6]/50 hover:shadow-lg hover:-translate-y-0.5"
                      }`}
                    >
                      <div>
                        {/* Top Bar: Icon + Toggle Checkbox Button */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                              isChecked
                                ? "bg-emerald-600 text-white"
                                : item.type === "Mandatory"
                                ? "bg-[#781428]/10 text-[#781428] group-hover:bg-[#781428] group-hover:text-white"
                                : "bg-[#1E3A8A]/10 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white"
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          {/* Checkbox Pill */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDocReady(item.id);
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                              isChecked
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-[#DBEAFE] hover:text-[#1E3A8A]"
                            }`}
                          >
                            {isChecked ? (
                              <>
                                <Icon.Check className="w-3.5 h-3.5" />
                                <span>Ready</span>
                              </>
                            ) : (
                              <>
                                <span className="h-2 w-2 rounded-full border border-slate-400" />
                                <span>Mark Ready</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Title */}
                        <h4
                          className={`font-serif font-bold text-base sm:text-[17px] mb-2 leading-snug transition-colors ${
                            isChecked ? "text-emerald-950 line-through decoration-emerald-500/40" : "text-[#0A1628]"
                          }`}
                        >
                          {item.doc}
                        </h4>

                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                              item.type === "Mandatory"
                                ? "bg-[#781428]/10 text-[#781428] border border-[#781428]/20"
                                : item.type === "Lateral Entry Only"
                                ? "bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/20"
                                : "bg-amber-500/10 text-amber-800 border border-amber-500/20"
                            }`}
                          >
                            {item.type}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {item.grades}
                          </span>
                        </div>

                        {/* Detail text */}
                        <p className="text-xs text-[#5A6778] leading-relaxed mb-4">
                          {item.detail}
                        </p>
                      </div>

                      {/* Bottom Info Spec & Tip */}
                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 text-[11px] text-[#334155]">
                          <span className="font-bold text-[#0A1628] block mb-0.5">Required Format:</span>
                          <span>{item.format}</span>
                        </div>

                        <div className="flex items-start gap-1.5 text-[11px] text-[#64748B] italic">
                          <Icon.Info className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5 not-italic" />
                          <span>{item.tip}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Support Banner */}
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#1E3A8A]/5 via-white to-[#781428]/5 border border-[#E2E8F0] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A] text-white">
                    <Icon.Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#0A1628]">Missing or Awaiting Any Document?</h5>
                    <p className="text-xs text-[#5A6778]">
                      Documents can be submitted within 10 working days of selection. Speak with our admissions desk for provisional waivers.
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+919148780138"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0A1628] hover:bg-[#1E3A8A] text-white px-5 py-2.5 text-xs font-bold tracking-wide transition shadow-sm"
                >
                  <Icon.Phone className="w-3.5 h-3.5" />
                  <span>Call Admissions Desk</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          AGE & ELIGIBILITY CRITERIA TABLE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="criteria" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
        <div id="eligibility" className="absolute -top-24" />
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-5">
              <Icon.Users className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-xs font-bold tracking-[0.15em] text-[#1E3A8A] uppercase">Eligibility</span>
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0A1628] leading-tight mb-5">
              Age &{" "}
              <span className="text-[#3B82F6]">Eligibility Criteria</span>
            </h2>
            <p className="text-lg text-[#5A6778] leading-relaxed">
              Age is calculated as on 1st June of the year of admission. Below is the complete
              grade-wise eligibility table from Pre-KG through Standard X.
            </p>
          </motion.div>

          {/* Table */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white">
                    <th className="px-6 py-5 font-bold text-sm tracking-wider uppercase">Grade / Class</th>
                    <th className="px-6 py-5 font-bold text-sm tracking-wider uppercase">Minimum Age</th>
                    <th className="px-6 py-5 font-bold text-sm tracking-wider uppercase hidden sm:table-cell">Cut-off Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ageCriteria.map((row, i) => (
                    <tr
                      key={row.grade}
                      className={`border-b border-[#E2E8F0] transition-colors hover:bg-[#DBEAFE]/30 ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-[#0A1628]">{row.grade}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#781428]/10 px-3 py-1 text-sm font-semibold text-[#781428]">
                          {row.age}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#5A6778] hidden sm:table-cell">{row.cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-sm text-[#94A3B8] mt-6"
          >
            Note: Age criteria are strictly followed. Original birth certificate must be produced at the time of admission for verification.
          </motion.p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          ONLINE ENQUIRY FORM
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="apply" className="relative py-24 lg:py-32 bg-[#0A1628] text-white overflow-hidden scroll-mt-24">
        <div id="enquiry" className="absolute -top-24" />
        {/* Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#1E3A8A]/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#781428]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 mb-5 border border-white/10">
                <Icon.Mail className="w-4 h-4 text-[#F3C44E]" />
                <span className="text-xs font-bold tracking-[0.15em] text-[#F3C44E] uppercase">Quick Enquiry</span>
              </div>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white leading-tight mb-5">
                Get in{" "}
                <span className="text-[#3B82F6]">Touch</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                Have questions about admissions? Fill out the form and our admissions team will
                get back to you within 24 hours.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/20">
                    <Icon.Phone className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Admissions Helpline</p>
                    <a href="tel:+919148780138" className="text-white font-semibold hover:text-[#3B82F6] transition-colors">
                      +91 91487 80138
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#781428]/20">
                    <Icon.Mail className="w-5 h-5 text-[#FFE4E6]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Email</p>
                    <a href="mailto:baldwingirls@gmail.com" className="text-white font-semibold hover:text-[#3B82F6] transition-colors">
                      baldwingirls@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3C44E]/20">
                    <Icon.MapPin className="w-5 h-5 text-[#F3C44E]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Visit Us</p>
                    <p className="text-white font-semibold text-sm">#90, Richmond Road, Bengaluru, Karnataka</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-10"
            >
              <h3 className="font-bold text-xl text-white mb-2">Admissions Enquiry Form</h3>
              <p className="text-sm text-white/50 mb-8">Fill in your details and we'll schedule a callback</p>
              <EnquiryForm />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="faqs" className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-[#F8FAFC] scroll-mt-24">
        <FloatingBackground />
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            {/* Left: Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-5">
                <Icon.BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-xs font-bold tracking-[0.15em] text-[#1E3A8A] uppercase">FAQs</span>
              </div>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#0A1628] leading-tight mb-5">
                Frequently Asked{" "}
                <span className="text-[#781428]">Questions</span>
              </h2>
              <p className="text-lg text-[#5A6778] leading-relaxed mb-8">
                Everything parents ask about admissions, curriculum, facilities, and student life
                at Baldwin Girls' High School.
              </p>
              <div className="rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-6 text-white">
                <p className="font-bold mb-2">Still have questions?</p>
                <p className="text-sm text-white/70 mb-4">
                  Our admissions counsellors are happy to help with any specific queries.
                </p>
                <a
                  href="tel:+919148780138"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-5 py-3 text-sm font-bold transition-colors"
                >
                  <Icon.Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </div>
            </motion.div>

            {/* Right: Accordion */}
            <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openFAQ === i}
                  toggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          ADMISSIONS HOTLINE CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-r from-[#1E3A8A] to-[#781428] text-white overflow-hidden">
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 800 200" fill="none">
            <pattern id="adm-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#adm-dots)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10"
          >
            <div className="text-center lg:text-left">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Ready to Begin Her Journey?
              </h2>
              <p className="text-lg text-white/70 max-w-xl">
                Admissions for 2026–27 are now open. Speak to our team or schedule a campus tour today.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
              <a
                href="https://portal.baldwingirls.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-white text-[#1E3A8A] px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                Apply Now
                <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+919148780138"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 border border-white/25 backdrop-blur-sm"
              >
                <Icon.Phone className="w-4 h-4" />
                +91 91487 80138
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white px-8 py-4 font-bold text-sm tracking-wide transition-all duration-300 border border-white/25 backdrop-blur-sm"
              >
                <Icon.Camera className="w-4 h-4" />
                Campus Tour
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER CONTACT STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A1628] text-white py-10">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-3">
              <Icon.MapPin className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Address</p>
                <p className="text-sm text-white/80">#90, Richmond Road, Bengaluru</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon.Phone className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Phone</p>
                <a href="tel:+919148780138" className="text-sm text-white/80 hover:text-white transition-colors">+91 91487 80138</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon.Mail className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Email</p>
                <a href="mailto:baldwingirls@gmail.com" className="text-sm text-white/80 hover:text-white transition-colors">baldwingirls@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon.Clock className="w-5 h-5 text-[#3B82F6] shrink-0" />
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Office Hours</p>
                <p className="text-sm text-white/80">Mon–Fri: 8:15 AM – 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Global Styles */}
      <style>{`
        @keyframes floatAdm {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(5deg); }
          66% { transform: translateY(12px) rotate(-3deg); }
        }
      `}</style>
    </main>
  );
}

