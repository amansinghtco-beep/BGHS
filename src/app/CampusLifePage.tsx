import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { school } from "./data";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON SYSTEM — 100% Vector, Zero Emojis, Zero External Dependencies
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  Building: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Medal: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  UserCheck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  Shield: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Palette: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
    </svg>
  ),
  Music: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Sparkles: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  ),
  Waves: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  Microscope: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 18h8" /><path d="M3 21h18" /><path d="M14 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" /><path d="M14 7l-2.5 2.5" /><path d="M17 4l-6 6" /><circle cx="10" cy="10" r="1" /><path d="M5 21V7l5-5h4v6" />
    </svg>
  ),
  Cpu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  ),
  Flag: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Phone: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Compass: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   CAMPUS LIFE PAGE COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function CampusLifePage() {
  const location = useLocation();

  // Scroll to anchor on initial load / location change
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Tab State for Co-Curricular Gallery
  const [activeActivityTab, setActiveActivityTab] = useState<string>("all");

  // Tab State for Sports
  const [activeSportsTab, setActiveSportsTab] = useState<string>("all");

  // Tab State for Events
  const [activeEventTab, setActiveEventTab] = useState<string>("all");

  /* ─────────────────────────────────────────────────────────────────────────
     1. STUDENT DEVELOPMENT PILLARS (Section 3)
  ───────────────────────────────────────────────────────────────────────── */
  const pillars = [
    {
      id: "teamwork",
      title: "Teamwork & Individual Responsibility",
      desc: "Students learn to become part of a cohesive team while developing the confidence, integrity, and independence to take personal responsibility for their choices and actions.",
      icon: Icon.Users,
      color: "from-blue-600 to-indigo-700",
      image: `${school}/static/media/dance12.dc7863373cb54ccb2727.JPG`,
      badge: "Holistic Foundation",
    },
    {
      id: "creative",
      title: "Creative Expression",
      desc: "Through performing and visual arts, dance, vocal and instrumental music, craft studios, and creative fairs, girls explore unique artistic passions and express their authentic voice.",
      icon: Icon.Palette,
      color: "from-rose-600 to-pink-700",
      image: `${school}/static/media/art1.ab95958fe78278388c9f.JPG`,
      badge: "Art & Culture",
    },
    {
      id: "leadership",
      title: "Leadership & Discipline",
      desc: "Empowered through the Student Council, House Captaincy, and the National Cadet Corps (NCC), students cultivate self-command, organizational acumen, and resilient leadership.",
      icon: Icon.Shield,
      color: "from-amber-600 to-orange-700",
      image: `${school}/static/media/ncc1.af6e87d3322e56da03b3.JPG`,
      badge: "Character & Courage",
    },
    {
      id: "intellectual",
      title: "Knowledge & Intellectual Growth",
      desc: "Inter-house quizzes, robotics championships, spell bee tournaments, and interdisciplinary fairs encourage continuous curiosity, knowledge-sharing, and independent critical thinking.",
      icon: Icon.GraduationCap,
      color: "from-emerald-600 to-teal-700",
      image: `${school}/static/media/quiz1.ec8631c61a5c98313d56.JPG`,
      badge: "Inquiry & Wit",
    },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     2. SPORTS ACHIEVERS & DISCIPLINES (Section 4)
  ───────────────────────────────────────────────────────────────────────── */
  const sportsAchievers = [
    { name: "Loraine Verghese", sport: "Athletics & Track", honor: "State & National Track Laurels" },
    { name: "Kirthi Rao", sport: "Aquatics / Swimming", honor: "State Champion & Inter-School Laurels" },
    { name: "Natasha Sagar", sport: "Competitive Aquatics", honor: "National Meet Laurels" },
    { name: "Aishwarya G.M.", sport: "Swimming & Sports", honor: "CISCE National Swim Laurels" },
    { name: "Sangeetha Rao", sport: "Athletics", honor: "State Level Track Laurels" },
    { name: "Arhatha Magavi", sport: "Multi-Discipline Sports", honor: "Inter-School Tournament Laurels" },
    { name: "Nirupama Sunderraj", sport: "Track & Field", honor: "State & Regional Laurels" },
    {
      name: "Rhea Bhansali",
      sport: "Gymnastics (Under-17)",
      honor: "Silver Medalist · 65th National School Games 2019–20",
      highlight: true,
    },
  ];

  const sportsGalleries = [
    {
      category: "outdoor",
      title: "Outdoor Sports",
      subtitle: "Full-scale athletic fields, basketball courts, badminton & track",
      images: [
        { src: `${school}/static/media/outdoor1.efa02b380f0b223ca05b.JPG`, caption: "Track & Field Sprint Events" },
        { src: `${school}/static/media/outdoor2.e780281aba5072cec5c1.JPG`, caption: "Annual Sports Meet Parade" },
        { src: `${school}/static/media/outdoor6.3ddf6df4716f41b0c71a.JPG`, caption: "Outdoor Team Athletics" },
        { src: `${school}/static/media/outdoor22.08cb9c94026630d96a2a.JPG`, caption: "Inter-House March Past" },
      ],
    },
    {
      category: "aquatics",
      title: "Swimming & Aquatics",
      subtitle: "International-standard swimming pool with certified stroke coaches",
      images: [
        { src: "/bghs-swimming.png", caption: "International-Standard Swimming Pool" },
        { src: "/bghs-sports-hero.png", caption: "Aquatics Training & Swim Galas" },
      ],
    },
    {
      category: "indoor",
      title: "Indoor Sports",
      subtitle: "Table tennis, carrom, chess & all-weather training arenas",
      images: [
        { src: `${school}/static/media/indore1.b39f11701ce6c4baa2c7.jpg`, caption: "Indoor Badminton & Fitness Courts" },
        { src: `${school}/static/media/indore2.99d68aa225fc8aa3bdc5.jpg`, caption: "Table Tennis & Indoor Conditioning" },
        { src: "/bghs-indoor-sports.jpg", caption: "Indoor Sports Complex" },
      ],
    },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     3. CO-CURRICULAR ACTIVITIES (Section 5)
  ───────────────────────────────────────────────────────────────────────── */
  const coCurricularItems = [
    {
      category: "dance",
      name: "Classical & Contemporary Dance",
      desc: "Bharatnatyam, Kathak, folk traditions and modern expressive dance choreography taught by seasoned maestros.",
      images: [
        `${school}/static/media/dance1.ace8fed89df95eef0419.JPG`,
        `${school}/static/media/dance4.3a687afb004070e83b40.JPG`,
        `${school}/static/media/dance12.dc7863373cb54ccb2727.JPG`,
      ],
    },
    {
      category: "art",
      name: "Fine Arts & Painting",
      desc: "Watercolors, acrylics, sketching, and mixed-media exhibitions that cultivate visual discernment and aesthetic joy.",
      images: [
        `${school}/static/media/art1.ab95958fe78278388c9f.JPG`,
        `${school}/static/media/art4.63c63b259e6386b90f24.JPG`,
        `${school}/static/media/art9.f2f24b48236a3771cdd8.JPG`,
      ],
    },
    {
      category: "craft",
      name: "Craft Classes & Design",
      desc: "Origami, textile design, pottery, paper-mâché, and model construction that hone fine motor dexterity.",
      images: [
        `${school}/static/media/ceaft1.ed9c99d0133d32a7ec1e.jpg`,
        `${school}/static/media/ceaft2.45273bc124d04e9b0401.jpg`,
      ],
    },
    {
      category: "fair",
      name: "Creativity Fair",
      desc: "Annual celebration where students independently design working scientific models, literary installations, and innovations.",
      images: [
        `${school}/static/media/fair1.a5be28bb10d1cd20e9b9.JPG`,
        `${school}/static/media/fair5.ce246d7e7a68062b777f.JPG`,
        `${school}/static/media/fair12.ea56b98416ef4aed17b2.JPG`,
      ],
    },
    {
      category: "music",
      name: "Vocal & Instrumental Music",
      desc: "School choir, keyboard, guitar, violin, and Indian classical melodies that fill the historic chapel and auditorium.",
      images: [
        `${school}/static/media/music1.a2dfeb5b3fbb11bd2692.JPG`,
        `${school}/static/media/music2.3e213889f6235979dbe9.JPG`,
        `${school}/static/media/music5.e96a8f7b7e9d8c377432.JPG`,
      ],
    },
    {
      category: "ncc",
      name: "National Cadet Corps (NCC)",
      desc: "Rigorous cadet training emphasizing discipline, civic duty, parade synchronization, camp resilience, and patriotism.",
      images: [
        `${school}/static/media/ncc1.af6e87d3322e56da03b3.JPG`,
        `${school}/static/media/ncc4.fd70b60b699b2d291224.JPG`,
        `${school}/static/media/ncc8.3bdc7bb9ea8dfb4ee205.JPG`,
      ],
    },
    {
      category: "quiz",
      name: "Inter-House Quizzing",
      desc: "Fast-paced general knowledge, science trivia, current affairs, and history quiz bowls that test razor-sharp recall.",
      images: [
        `${school}/static/media/quiz1.ec8631c61a5c98313d56.JPG`,
        `${school}/static/media/quiz3.74e4fca99117133c6628.JPG`,
        `${school}/static/media/quiz6.34a79bd2cc4686489e63.JPG`,
      ],
    },
    {
      category: "rhyme",
      name: "Rhyme Times & Elocution",
      desc: "Oratorical exercises, dramatic poetry recitation, and storytelling that ignite linguistic confidence from early years.",
      images: [
        `${school}/static/media/rhyme1.2128778539827467836e.jpeg`,
        `${school}/static/media/rhyme2.dc2c8dc94fe85c3ac309.jpeg`,
      ],
    },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     4. STUDENT COUNCIL 2024–25 (Section 6)
  ───────────────────────────────────────────────────────────────────────── */
  const studentCouncil = [
    {
      position: "School President",
      name: "Aaheli Dutta",
      photo: "/students/aaheli-dutta.png",
      badge: "Head of Student Body",
      role: "Represents student perspectives, leads the council, and presides over school assemblies and delegations.",
    },
    {
      position: "School Vice-President",
      name: "Aandrita G",
      photo: "/students/aandrita-ghosh.png",
      badge: "Executive Leadership",
      role: "Assists the President, coordinates inter-house committees, and oversees student discipline and student initiatives.",
    },
    {
      position: "School Secretary",
      name: "Swara S",
      photo: "/students/swara-sudhir.png",
      badge: "Council Administration",
      role: "Manages council minutes, official student correspondence, and coordinates inter-school cultural festivals.",
    },
    {
      position: "School Games Captain",
      name: "Harshini P",
      photo: null,
      badge: "Sports & Athletics",
      role: "Champions the 18 sports programs, leads the athletic march past, and coordinates the Annual Athletic Meet.",
    },
    {
      position: "School Games Vice-Captain",
      name: "Priyadarshini Mansingh",
      photo: null,
      badge: "Sports Leadership",
      role: "Assists sports captains, manages inter-house leagues, tournament schedules, and physical fitness initiatives.",
    },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     5. CAMPUS INFRASTRUCTURE (Section 7)
  ───────────────────────────────────────────────────────────────────────── */
  const campusFacilities = [
    {
      name: "Science Laboratory",
      desc: "State-of-the-art physics, chemistry, and biology stations designed for safe hands-on experiments and empirical discovery.",
      image: `${school}/static/media/ScienceLab.d689eb9af7d97ee94b32.JPG`,
      tag: "Indoor Learning",
    },
    {
      name: "Boarding Facilities",
      desc: "Safe, warm, and secure residential quarters for girls fostering lifelong sisterhood, mentored study hours, and comfort.",
      image: `${school}/static/media/Boarding.866aba58e720b320fa4e.jpg`,
      tag: "Residential Life",
    },
    {
      name: "Hostel Dining Hall",
      desc: "Hygienic multi-cuisine dining hall serving nutritious, freshly prepared vegetarian and non-vegetarian meals under strict supervision.",
      image: `${school}/static/media/HostelDiningHall.eab6e3d225f139b3e097.jpg`,
      tag: "Dining & Nutrition",
    },
    {
      name: "School Auditorium",
      desc: "Grand acoustically-tuned auditorium seating 1,200+ guests for graduation, investiture, concerts, drama, and school assemblies.",
      image: `${school}/static/media/Auditorium.cf65442d9978d6969fec.JPG`,
      tag: "Performing Arts",
    },
    {
      name: "Interactive Classrooms",
      desc: "Spacious, airy classrooms equipped with interactive smart boards, ergonomic desks, and natural sunlight for vibrant learning.",
      image: `${school}/static/media/Classrooms.3ab42157584b68c3fdd3.JPG`,
      tag: "Academic Spaces",
    },
    {
      name: "Campus Infirmary",
      desc: "Full-time resident medical practitioner, qualified nursing staff, emergency observation beds, and direct hospital linkages.",
      image: `${school}/static/media/Infirmary.6c9dc47c73460e54fdd2.JPG`,
      tag: "Health & Wellbeing",
    },
    {
      name: "Central Library",
      desc: "Expansive reading rooms with thousands of volumes, research journals, digital reference terminals, and quiet study alcoves.",
      image: `${school}/static/media/Library.76974d8e0d88201136b0.JPG`,
      tag: "Knowledge Hub",
    },
  ];

  /* ─────────────────────────────────────────────────────────────────────────
     6. EVENTS & CELEBRATIONS (Section 8)
  ───────────────────────────────────────────────────────────────────────── */
  const eventCategories = [
    {
      id: "inter-house",
      title: "Inter-House Competitions",
      desc: "Spirited house rivalry across arts, debating, literary events, athletics, and cultural shields.",
      image: `${school}/static/media/house1.605ea98dd925a68c0882.JPG`,
    },
    {
      id: "festivals",
      title: "National Festivals",
      desc: "Patriotic celebrations for Independence Day, Republic Day, Gandhi Jayanti, and cultural festivals.",
      image: `${school}/static/media/fest1.51151379f52299e61699.JPG`,
    },
    {
      id: "graduation",
      title: "Graduation Ceremony",
      desc: "Solemn valedictory service honoring graduating cohorts as they step boldly into university life.",
      image: `${school}/static/media/graduation1.a0f47dfb62767c7bd2c0.JPG`,
    },
    {
      id: "field-trip",
      title: "Field Trips & Excursions",
      desc: "Heritage tours, ecological trails, planetarium visits, and botanical explorations across Karnataka.",
      image: "/bghs-events.png",
    },
    {
      id: "prize-day",
      title: "Annual Prize Day",
      desc: "Gala ceremony celebrating scholastic distinction, 100% attendance, character citations, and sports trophies.",
      image: `${school}/static/media/prize1.87da593fb2a76bd8a425.JPG`,
    },
    {
      id: "robotics",
      title: "Robotics & STEM Exhibitions",
      desc: "Hands-on coding showcases, micro-controller inventions, AI demos, and CISCE zonal robotics finals.",
      image: `${school}/static/media/robo1.ce05df7c33f32bdec13d.JPG`,
    },
    {
      id: "spell-bee",
      title: "Spell Bee Tournaments",
      desc: "Battle of words and wit testing vocabulary, etymology, and phonetics in an electric auditorium.",
      image: `${school}/static/media/bee1.0928ad61b8abb1013c6c.JPG`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F2] text-[#0A1628] antialiased">
      {/* ───────────────────────────────────────────────────────────────────
          1. HERO SECTION — CAMPUS LIFE
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#071A33] text-white">
        {/* Background Photo with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${school}/static/media/mainbanner3.04766c6109cb4c6d1124.png`}
            alt="Baldwin Girls' High School Campus Life"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/85 to-[#071A33]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.3)_0%,transparent_70%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-10 text-center">
          {/* Official Crest & Header Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 backdrop-blur-md mb-6"
          >
            <span className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              <img src="/baldwin-crest-official.png" alt="Crest" className="w-full h-full object-contain" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Baldwin Girls' High School · Bengaluru · Estd. 1880
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl mx-auto"
          >
            A Vibrant Campus Life at <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-sky-200">
              Baldwin Girls' High School
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base lg:text-lg text-slate-200/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            A place where girls thrive, forge lifelong sisterhood, explore 18 competitive sports, master performing arts,
            lead through NCC and the Student Council, and flourish within our heritage 7-acre sanctuary.
          </motion.p>

          {/* Quick Anchor Navigation Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {[
              { label: "Culture & Pillars", hash: "#culture" },
              { label: "Sports & Athletics", hash: "#sports" },
              { label: "Co-Curricular Arts", hash: "#co-curricular" },
              { label: "Leadership & NCC", hash: "#leadership" },
              { label: "Campus Facilities", hash: "#infrastructure" },
              { label: "Events & Celebrations", hash: "#events" },
            ].map((nav) => (
              <a
                key={nav.hash}
                href={nav.hash}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-[#071A33] hover:shadow-md"
              >
                <span>{nav.label}</span>
                <span className="text-amber-300">↓</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          2. SCHOOL HIGHLIGHTS / STATISTICS STRIP (Section 2)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <div className="text-center p-3 border-r border-slate-100 last:border-r-0">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A8A]">140+</p>
            <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#0A1628]">Years of Excellence</p>
            <p className="mt-0.5 text-[11px] text-slate-500 hidden sm:block">Shaping visionary women since 1880</p>
          </div>
          <div className="text-center p-3 lg:border-r border-slate-100">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9F1239]">18</p>
            <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#0A1628]">Indoor & Outdoor Sports</p>
            <p className="mt-0.5 text-[11px] text-slate-500 hidden sm:block">Olympic swimming to track & gymnastics</p>
          </div>
          <div className="text-center p-3 border-r border-slate-100 last:border-r-0">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2563EB]">25+</p>
            <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#0A1628]">Programs & Clubs</p>
            <p className="mt-0.5 text-[11px] text-slate-500 hidden sm:block">Pre-KG to high school holistic growth</p>
          </div>
          <div className="text-center p-3">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F59E0B]">ICSE</p>
            <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#0A1628]">Curriculum Affiliation</p>
            <p className="mt-0.5 text-[11px] text-slate-500 hidden sm:block">CISCE New Delhi Gold Standard</p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          3. STUDENT LIFE & CULTURE — BEYOND THE CLASSROOM (Section 3)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="culture" className="py-20 sm:py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
            Student Life & Culture
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A1628]">
            Beyond the Classroom
          </h2>
          <div className="mt-5 h-1 w-20 bg-[#1E3A8A] mx-auto rounded-full" />
          <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Baldwin Girls' High School is a place where girls thrive and acquire learning and social skills that will last a lifetime.
            Students are encouraged to explore their interests, develop individual responsibility, work as part of a team, and prepare
            for life beyond school.
          </p>
        </div>

        {/* 4 Key Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Photo Side */}
                <div className="sm:w-5/12 relative h-52 sm:h-auto overflow-hidden bg-slate-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/30" />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-[#0A1628] shadow-xs">
                    0{idx + 1} · {pillar.badge}
                  </span>
                </div>

                {/* Content Side */}
                <div className="sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
                        <PillarIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                        Core Pillar
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A1628] group-hover:text-[#1E3A8A] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          4. SPORTS & ATHLETICS (Section 4)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="sports" className="py-20 sm:py-28 bg-[#071A33] text-white relative overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider">
              Sports & Athletics
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-white">
              Explore Sports Activities
            </h2>
            <div className="mt-5 h-1 w-20 bg-amber-400 rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Sporting activities find an important place in our institution. We recognize that play is one of the most
              natural and important forms of recreation. It is also the best way to improve one's health and spirits.
              Every student gets an opportunity to choose from a wide range of 18 outdoor and indoor sports under the motivation
              and guidance of skilled coaches and trainers.
            </p>
          </div>

          {/* Key Achievements Grid (Swim Meet + Gymnastics National Medal) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Swimming Highlight */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-950/80 to-[#0A1628] border border-blue-500/30 p-7 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
                  <Icon.Waves className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-blue-400 uppercase">
                    International Standards
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    Aquatics & Swimming Pool
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    Our swimming pool is built to international standards. We are proud of our swimmers and athletes who
                    have won laurels at state and international levels, with outstanding podium finishes at the CISCE National Level Swim Meet.
                  </p>
                </div>
              </div>
            </div>

            {/* Gymnastics Highlight — Rhea Bhansali */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-950/60 to-[#0A1628] border border-amber-500/30 p-7 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
                  <Icon.Medal className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                    National School Games Laurels
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    National Gymnastics Silver
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Rhea Bhansali</strong> won a prestigious <span className="text-amber-300 font-semibold">Silver Medal</span> in the
                    Under-17 category at the 65th National School Games 2019–20 in Gymnastics, honoring Baldwin on the national athletic stage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Sports Achievers Roll of Honor */}
          <div className="mt-14 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Icon.Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-serif">
                Sports Achievers Roll of Honor
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {sportsAchievers.map((achiever) => (
                <div
                  key={achiever.name}
                  className={`rounded-xl p-4 transition-all ${
                    achiever.highlight
                      ? "bg-amber-500/15 border border-amber-400/50 shadow-md"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <p className="font-bold text-sm text-white">{achiever.name}</p>
                  <p className="text-xs text-blue-300 font-medium mt-0.5">{achiever.sport}</p>
                  <p className="text-[11px] text-slate-400 mt-2 leading-tight">{achiever.honor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sports Gallery Visual Showcase */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Outdoor & Indoor Athletic Arenas
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  18 sports disciplines supported by professional grounds and qualified coaches
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "All Sports" },
                  { id: "outdoor", label: "Outdoor Games" },
                  { id: "aquatics", label: "Aquatics" },
                  { id: "indoor", label: "Indoor Games" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSportsTab(tab.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      activeSportsTab === tab.id
                        ? "bg-amber-400 text-[#071A33] shadow-sm"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Galleries Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsGalleries
                .filter((g) => activeSportsTab === "all" || g.category === activeSportsTab)
                .flatMap((g) => g.images)
                .map((img, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl overflow-hidden bg-slate-800 h-64 border border-white/10 shadow-lg"
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {img.caption}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Baldwin Girls' Athletic Facilities</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          5. CO-CURRICULAR ACTIVITIES (Section 5)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="co-curricular" className="py-20 sm:py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
            Holistic Development
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A1628]">
            Explore Co-Curricular Activities
          </h2>
          <div className="mt-5 h-1 w-20 bg-[#1E3A8A] mx-auto rounded-full" />
          <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Baldwin Girls' High School provides ample scope for the development of co-curricular activities.
            A lot of emphasis is laid on the complete development of the body, mind, and spirit. The girls are exposed
            to various activities from which they choose according to their passions.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "All Activities" },
            { id: "dance", label: "Dance" },
            { id: "art", label: "Art & Craft" },
            { id: "music", label: "Music" },
            { id: "ncc", label: "NCC" },
            { id: "quiz", label: "Quiz & Spell Bee" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveActivityTab(tab.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeActivityTab === tab.id
                  ? "bg-[#1E3A8A] text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Co-Curricular Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coCurricularItems
            .filter((item) => {
              if (activeActivityTab === "all") return true;
              if (activeActivityTab === "art") return item.category === "art" || item.category === "craft" || item.category === "fair";
              if (activeActivityTab === "quiz") return item.category === "quiz" || item.category === "rhyme";
              return item.category === activeActivityTab;
            })
            .map((item, idx) => (
              <motion.div
                key={item.name}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {item.name}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Additional Thumbnails Strip */}
                {item.images.length > 1 && (
                  <div className="p-4 pt-0 flex gap-2">
                    {item.images.slice(1, 3).map((thumb, tIdx) => (
                      <div key={tIdx} className="w-14 h-11 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="flex-1 flex items-center justify-end">
                      <span className="text-[11px] font-bold text-[#1E3A8A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Active Club <Icon.ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          6. LEADERSHIP PROGRAMMES — NCC & STUDENT COUNCIL (Section 6)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="leadership" className="py-20 sm:py-28 bg-[#0B1B3D] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 px-3.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider">
              Governance & Civic Training
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-white">
              Leadership, Discipline & Responsibility
            </h2>
            <div className="mt-5 h-1 w-20 bg-amber-400 mx-auto rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Through the historic Student Council and the National Cadet Corps (NCC), Baldwin girls cultivate courage,
              executive poise, community service, and democratic responsibility.
            </p>
          </div>

          {/* 6.1 NCC Section */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0A1628] border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Icon.Flag className="w-4 h-4" />
                  <span>National Cadet Corps (NCC) Unit</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Training for Discipline, Service & Nation Building
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  NCC is an integral pillar of co-curricular life at Baldwin Girls' High School. Cadets undergo rigorous
                  drill routines, firing simulations, national integration camps, disaster management drills, and community
                  outreach, cultivating unyielding discipline, patriotism, and selfless leadership.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <p className="font-bold text-white text-sm">March Past & Drill</p>
                    <p className="text-xs text-slate-400 mt-1">Synchronization & ceremonial leadership</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <p className="font-bold text-white text-sm">Camp & Field Resilience</p>
                    <p className="text-xs text-slate-400 mt-1">Outdoor expeditions & civic training</p>
                  </div>
                </div>
              </div>

              {/* NCC Photo Collage */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                <div className="h-44 rounded-xl overflow-hidden shadow-md">
                  <img src={`${school}/static/media/ncc1.af6e87d3322e56da03b3.JPG`} alt="NCC Cadets Drill" className="w-full h-full object-cover" />
                </div>
                <div className="h-44 rounded-xl overflow-hidden shadow-md">
                  <img src={`${school}/static/media/ncc4.fd70b60b699b2d291224.JPG`} alt="NCC Parade" className="w-full h-full object-cover" />
                </div>
                <div className="h-44 rounded-xl overflow-hidden shadow-md">
                  <img src={`${school}/static/media/ncc8.3bdc7bb9ea8dfb4ee205.JPG`} alt="NCC Guard of Honor" className="w-full h-full object-cover" />
                </div>
                <div className="h-44 rounded-xl overflow-hidden shadow-md">
                  <img src={`${school}/static/media/ncc10.6955a90a0a6ad0f87e3a.JPG`} alt="NCC Camp" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* 6.2 Student Council & Investiture 2024–25 */}
          <div className="mt-20">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Investiture Ceremony 2024–2025
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  Student Council Executive Roster
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">
                <span>Elected by peers & faculty</span>
              </div>
            </div>

            {/* Student Council Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {studentCouncil.map((member) => (
                <div
                  key={member.position}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between hover:bg-white/10 transition-colors group"
                >
                  <div>
                    {/* Student Photo or Fallback Badge */}
                    <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-slate-800 border-2 border-amber-400/60 shadow-md mb-4 flex items-center justify-center">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] to-[#0A1628] flex items-center justify-center text-amber-300">
                          <Icon.UserCheck className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider text-center">
                      {member.position}
                    </p>
                    <h4 className="font-serif text-lg font-bold text-white text-center mt-1">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-slate-300 text-center mt-2 leading-relaxed">
                      {member.role}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {member.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Investiture Ceremony Photo Banner */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 relative h-72 sm:h-80">
              <img
                src={`${school}/static/media/ceremony.d3e4f64e2e67df07673e.png`}
                alt="Investiture Ceremony 2024-25"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-widest">Official Ceremony</p>
                  <p className="font-serif text-xl sm:text-2xl text-white font-bold">
                    Investiture Service in the Historic School Auditorium
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Student leaders taking the solemn oath of loyalty, service, and integrity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          7. WORLD-CLASS CAMPUS FACILITIES (Section 7)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="infrastructure" className="py-20 sm:py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
              Campus Infrastructure
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A1628]">
              World-Class Campus Facilities
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-normal">
              Purposeful indoor and outdoor facilities that support students' academic, residential,
              recreational, and personal development across 7 lush acres in Richmond Road.
            </p>
          </div>
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-6 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <span>Explore All Facilities</span>
            <Icon.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Facilities Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusFacilities.map((facility, i) => (
            <div
              key={facility.name}
              className={`group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="relative h-60 bg-slate-900 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-[#0A1628]">
                  {facility.tag}
                </span>
                <p className="absolute bottom-4 left-4 font-serif text-2xl font-bold text-white">
                  {facility.name}
                </p>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {facility.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          8. SCHOOL EVENTS & CELEBRATIONS (Section 8)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="events" className="py-20 sm:py-28 bg-[#F0EFE9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
              School Events & Celebrations
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0A1628]">
              Events & Experiences
            </h2>
            <div className="mt-5 h-1 w-20 bg-[#1E3A8A] mx-auto rounded-full" />
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              A vibrant calendar of inter-house festivals, national celebrations, graduation ceremonies,
              field trips, robotics championships, and prize days create indelible memories.
            </p>
          </div>

          {/* Event Categories Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((ev, i) => (
              <div
                key={ev.id}
                className={`group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-serif text-lg font-bold text-white">
                    {ev.title}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          9. FINAL ADMISSIONS CTA (Section 9)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#071A33] via-[#0A1628] to-[#1E3A8A] text-white relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/30 px-4 py-1 text-xs font-bold text-amber-300 uppercase tracking-widest">
            Admissions 2026–2027
          </span>

          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Give Your Daughter a Foundation for Life
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-200/90 leading-relaxed font-light max-w-2xl mx-auto">
            Baldwin Girls' High School encourages every girl to explore her potential, develop her talents,
            and grow into a confident, compassionate, and responsible individual.
          </p>

          {/* 3 Call-To-Action Buttons as specified in extraction */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/admissions#apply"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#071A33] font-bold px-7 py-3.5 text-sm hover:bg-slate-100 hover:scale-105 transition-all shadow-lg"
            >
              <span>Apply for Admission</span>
              <Icon.ArrowRight className="w-4 h-4 text-[#1E3A8A]" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              <Icon.Compass className="w-4 h-4 text-amber-300" />
              <span>Request Information</span>
            </Link>

            <a
              href="tel:+919148780138"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#071A33] font-bold px-7 py-3.5 text-sm transition-all shadow-md"
            >
              <Icon.Phone className="w-4 h-4" />
              <span>Contact Admissions Team</span>
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Admissions Office · #90, Richmond Road, Bengaluru · Mon–Fri, 8:15 am – 3:00 pm
          </p>
        </div>
      </section>
    </main>
  );
}

