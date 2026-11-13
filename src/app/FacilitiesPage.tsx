import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON LIBRARY — pure vectors, zero emojis, zero external packages
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  Building: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Microscope: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 18h8" /><path d="M3 21h18" /><path d="M14 21v-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" /><path d="M14 7l-2.5 2.5" /><path d="M17 4l-6 6" /><circle cx="10" cy="10" r="1" /><path d="M5 21V7l5-5h4v6" />
    </svg>
  ),
  Flask: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 3h6" /><path d="M9 3v7L4 20h16L15 10V3" /><path d="M7 20h10" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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
  Waves: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Cpu: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Monitor: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Bus: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="14" rx="2" /><path d="M7 17v2" /><path d="M17 17v2" /><circle cx="7.5" cy="13.5" r="1.5" /><circle cx="16.5" cy="13.5" r="1.5" /><line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  ArrowRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronDown: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronLeft: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Sparkles: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Camera: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Tree: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 19v3" /><path d="M12 3L5 12h3l-2 5h12l-2-5h3z" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────
   FLOATING BACKGROUND
───────────────────────────────────────────────────────────────────────── */
const floatingIcons = [
  { C: Icon.Building, top: "12%", left: "6%", dur: "9s", size: 36 },
  { C: Icon.Microscope, top: "28%", left: "92%", dur: "11s", size: 38 },
  { C: Icon.BookOpen, top: "65%", left: "4%", dur: "8s", size: 40 },
  { C: Icon.Waves, top: "78%", left: "90%", dur: "10s", size: 42 },
  { C: Icon.Trophy, top: "45%", left: "88%", dur: "12s", size: 34 },
];

function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {floatingIcons.map((item, idx) => (
        <item.C
          key={idx}
          className="absolute opacity-[0.035] text-[#1E3A8A]"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            animation: `floatFac ${item.dur} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   DATA: INDOOR ACADEMIC & SCIENCE LABS
───────────────────────────────────────────────────────────────────────── */
interface LabSpace {
  id: string;
  name: string;
  shortName?: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  specs: string;
  capacity: string;
  features: string[];
  icon: keyof typeof Icon;
}

const indoorLabs: LabSpace[] = [
  {
    id: "physics-lab",
    name: "Physics Laboratory",
    shortName: "Physics Lab",
    badge: "ICSE Senior Science",
    tagline: "Optics, Mechanics & Advanced Experiments Studio",
    description: "Equipped with state-of-the-art optical benches, electrical circuit trainers, vernier systems, and darkroom facilities for ICSE senior experiments. Provides an exploratory environment where concepts of mechanics and electromagnetism come to life.",
    image: "/campus-sciencelab.jpg",
    specs: "Digital Interface · Vernier Precision Systems",
    capacity: "40 Students Simultaneously",
    features: ["Advanced Optical Benches", "Laser & Optics Darkroom", "Individual Workstations", "Galvanometers & Potentiometers"],
    icon: "Flask",
  },
  {
    id: "chemistry-lab",
    name: "Chemistry Laboratory",
    shortName: "Chemistry Lab",
    badge: "Chemical Analysis",
    tagline: "Fume-Protected Chemical Apparatus & Analysis Station",
    description: "Spacious laboratory with individual acid-resistant workstations, centralized LPG supplies, high-efficiency fume hoods, and fire safety systems. Designed for complete safety during qualitative and quantitative inorganic chemistry procedures.",
    image: "/campus-sciencelab.jpg",
    specs: "Full safety showers & eye wash stations",
    capacity: "42 Students Simultaneously",
    features: ["Individual Bunsen Lines", "Fume Extraction Hoods", "Analytical Precision Balances", "Emergency Drench Showers"],
    icon: "Flask",
  },
  {
    id: "biology-lab",
    name: "Biology Laboratory",
    shortName: "Biology Lab",
    badge: "Life Sciences",
    tagline: "Microscopy & Life Sciences Specimen Studio",
    description: "Features binocular compound microscopes, human anatomical models, preserved specimen banks, and projection microscopy for botanical study. Students study cellular structures and physiological models with hands-on specimen investigation.",
    image: "/campus-sciencelab.jpg",
    specs: "Bio-Safety Level 1 Compliant",
    capacity: "40 Students Simultaneously",
    features: ["Digital Compound Microscopes", "300+ Specimen Archive", "Human Physiology Models", "Dissection & Staining Kits"],
    icon: "Microscope",
  },
  {
    id: "robotics-ai-lab",
    name: "Robotics & Artificial Intelligence Lab",
    shortName: "Robotics & AI",
    badge: "Next-Gen STEM",
    tagline: "STEM Automation, Coding & IoT Workspace",
    description: "Hands-on makerspace with Arduino, Raspberry Pi, robotics kits, sensors, 3D printing equipment, and specialized visual block programming platforms. Empowers young innovators from Standard III upwards in coding and automation.",
    image: "/bghs-events.png",
    specs: "High-Speed IoT Network & 3D Printers",
    capacity: "35 Students Simultaneously",
    features: ["Microcontroller Platforms", "3D Modeling Printers", "Robotics Arena Turf", "Python & Block Coding"],
    icon: "Cpu",
  },
  {
    id: "senior-library",
    name: "Senior Academic Library",
    shortName: "Sr. Library",
    badge: "Research & Literature",
    tagline: "Extensive Research Center & Silent Reading Hall",
    description: "A sanctuary of knowledge holding over 20,000 reference books, encyclopedias, journals, national dailies, and digital catalog workstations. Features quiet study carrels, scholarly periodicals, and a serene reading atmosphere.",
    image: "/campus-library.jpg",
    specs: "20,000+ Print Titles · Digital OPAC",
    capacity: "150 Seated Scholars",
    features: ["20,000+ Print Titles", "JSTOR & Digital Databases", "Private Study Carrels", "Heritage Fiction & Reference"],
    icon: "BookOpen",
  },
  {
    id: "junior-library",
    name: "Junior Primary Library",
    shortName: "Jr. Library",
    badge: "Early Literacy",
    tagline: "Early Reading & Illustrated Storybooks Wing",
    description: "Colorful, child-friendly reading space stocked with picture books, fairy tales, early phonics resources, and story-telling audio nooks curated especially for Pre-KG to Standard II learners.",
    image: "/campus-library.jpg",
    specs: "Curated for Pre-KG to Standard II",
    capacity: "60 Young Readers",
    features: ["Graded Phonics Readers", "Cozy Floor Cushions", "Interactive Story Sessions", "Illustrated Picture Books"],
    icon: "BookOpen",
  },
  {
    id: "auditorium",
    name: "School Grand Auditorium",
    shortName: "Auditorium",
    badge: "Theatrical Arts",
    tagline: "Acoustic Multi-Purpose Theater & Assembly Hall",
    description: "Air-conditioned 1,200+ capacity auditorium equipped with professional theatrical lighting, surround sound system, stage wings, and green rooms. Hosts annual days, inter-school debates, choir rehearsals, and investitures.",
    image: "/campus-auditorium.jpg",
    specs: "Dolby Acoustic Surround · Theatrical Rig",
    capacity: "1,200+ Plump Theater Seats",
    features: ["Dolby Acoustic Paneling", "1,200+ Padded Theater Seats", "Green Rooms & Backstage", "Motorized Stage Curtains"],
    icon: "Building",
  },
  {
    id: "computer-lab",
    name: "Computer & Cyber Labs",
    shortName: "Cyber Labs",
    badge: "Digital Skills",
    tagline: "High-Speed Computing & Digital Literacy Hub",
    description: "Modern network of 120+ desktop terminals with high-speed optical fiber internet, programming software, cybersecurity filters, and smart displays for ICSE computer applications and coding curriculum.",
    image: "/campus-sciencelab.jpg",
    specs: "Dual Air-Conditioned Laboratories",
    capacity: "80 Terminals Simultaneously",
    features: ["Dedicated Terminals per Student", "High-Speed Leased Line", "ICSE Java / Python Setup", "Safe Educational Firewall"],
    icon: "Monitor",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────────────────── */
const facilitiesFaqs = [
  {
    q: "Who can access the Olympic-dimension swimming pool?",
    a: "Swimming is integrated into the physical education curriculum for students from Standard III to Standard X under certified female coaches and lifeguards. Beginners are taught in shallow safety zones with mandatory float equipment.",
  },
  {
    q: "What safety protocols are followed in the science and chemical laboratories?",
    a: "All laboratories feature emergency eye wash stations, fire blankets, ABC fire extinguishers, chemical fume hoods, and non-slip floors. Students wear protective lab coats and safety goggles under faculty supervision.",
  },
  {
    q: "How does the hostel boarding accommodation work for outstation students?",
    a: "Boarding is available for girls from Standard III upwards. The hostel is supervised round-the-clock by female residential wardens, with scheduled daily study hours, weekend recreation, laundry facilities, and medical support.",
  },
  {
    q: "Does the school bus fleet cover peripheral areas of Bengaluru?",
    a: "Yes. Our GPS-enabled bus fleet operates on over 30 designated routes covering North, South, East, and Central Bengaluru. Every bus carries a trained female attendant, first aid kit, speed governor, and real-time tracking.",
  },
  {
    q: "Can parents visit and tour the campus facilities?",
    a: "Yes! Parents seeking admission can schedule an escorted campus walkthrough with our admissions liaison team on weekdays between 9:00 AM and 2:30 PM.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   MAIN FACILITIES PAGE COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function FacilitiesPage() {
  const [selectedLabId, setSelectedLabId] = useState<string>("physics-lab");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Smooth scroll handler for anchor links
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

  const activeLab = indoorLabs.find((l) => l.id === selectedLabId) || indoorLabs[0];
  const ActiveIcon = Icon[activeLab.icon] || Icon.Building;
  const activeLabIndex = indoorLabs.findIndex((l) => l.id === activeLab.id);

  const handlePrevLab = () => {
    const nextIdx = (activeLabIndex - 1 + indoorLabs.length) % indoorLabs.length;
    setSelectedLabId(indoorLabs[nextIdx].id);
  };

  const handleNextLab = () => {
    const nextIdx = (activeLabIndex + 1) % indoorLabs.length;
    setSelectedLabId(indoorLabs[nextIdx].id);
  };

  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #1E3A8A, #781428)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO BANNER & QUICK ANCHORS
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} id="overview" className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden scroll-mt-24">
        {/* Parallax Background Campus Photo */}
        <motion.div className="absolute inset-0" style={{ y: heroParallax }}>
          <img
            src="/academics-hero-campus.jpg"
            alt="Baldwin Girls' High School Campus Infrastructure"
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/85 to-[#781428]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-transparent to-[#0A1628]/35" />

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
              <span className="text-white/90">Facilities</span>
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#781428]/40 border border-[#781428]/60 px-5 py-2 mb-6 backdrop-blur-sm">
              <Icon.Building className="w-4 h-4 text-[#F3C44E]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#F3C44E] uppercase">Campus Infrastructure</span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.06] mb-6">
              World-Class Spaces Built to{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#93C5FD] bg-clip-text text-transparent">
                Inspire.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-2xl mb-10">
              Spread across 7+ lush acres in Richmond Town, Bengaluru, Baldwin Girls' High School blends
              collegiate Gothic architecture with cutting-edge laboratories, Olympic sports facilities, and nurturing residential boarding.
            </p>

            {/* Quick Navigation Anchor Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="#indoor"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition"
              >
                <Icon.Flask className="w-4 h-4 text-[#38BDF8]" />
                <span>Indoor Labs & Tech</span>
              </a>
              <a
                href="#outdoor"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition"
              >
                <Icon.Waves className="w-4 h-4 text-[#38BDF8]" />
                <span>Olympic Sports & Pool</span>
              </a>
              <a
                href="#boarding"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-sm transition"
              >
                <Icon.Heart className="w-4 h-4 text-[#38BDF8]" />
                <span>Boarding & Dining</span>
              </a>
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 text-xs sm:text-sm font-bold transition shadow-md"
              >
                <Icon.Camera className="w-4 h-4 text-white" />
                <span>Campus Tour</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-1 bg-gradient-to-r from-[#1E3A8A] to-[#781428] text-white">
        <div className="mx-auto max-w-[1380px] px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { val: "7+ Acres", label: "Heritage City Campus", icon: Icon.Building },
              { val: "16+ Labs", label: "Science & Tech Studios", icon: Icon.Microscope },
              { val: "18+ Sports", label: "Indoor & Outdoor Arenas", icon: Icon.Trophy },
              { val: "1,200 Seats", label: "Acoustic Grand Auditorium", icon: Icon.Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`flex items-center gap-4 py-6 sm:py-8 px-4 sm:px-6 border-white/10 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
              >
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3C44E]" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif font-bold text-base sm:text-xl lg:text-2xl text-white leading-tight">
                    {stat.val}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: INDOOR ACADEMIC & SCIENCE LABS (INTERACTIVE STUDIO SHOWCASE)
          Replacing the card grid with an interactive flagship studio selector
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="indoor" className="relative py-24 lg:py-32 bg-[#F8FAFC] scroll-mt-24">
        <div id="facilities-grid" className="absolute -top-24" />
        <FloatingBackground />
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          
          {/* Section Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-4 border border-[#1E3A8A]/20">
              <Icon.Flask className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#1E3A8A] uppercase">Academic Infrastructure</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              Advanced Science & Innovation Studios
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              Click on any learning environment to inspect its high-resolution studio, safety equipment, student capacity, and curriculum integration.
            </p>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE PHONE VIEW: INTERACTIVE FLAGSHIP STUDIO SHOWCASE (< lg)
              Custom mobile-first layout:
              - Horizontal category scroll track (prevents 600px vertical list)
              - 1-of-8 counter with thumb-friendly Prev/Next buttons
              - Hero card with full text wrapping (no cutoffs/ellipses)
              - 2-column quick metrics + technical checklist
              - Bottom pagination jump dots
          ───────────────────────────────────────────────────────────── */}
          <div className="block lg:hidden">
            {/* 1. Category Pill Scroller */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
              {indoorLabs.map((lab) => {
                const isSelected = selectedLabId === lab.id;
                const LabIcon = Icon[lab.icon] || Icon.Flask;
                return (
                  <button
                    key={lab.id}
                    type="button"
                    onClick={() => setSelectedLabId(lab.id)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#1E3A8A] text-white shadow-md shadow-blue-900/20"
                        : "bg-white text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-slate-50"
                    }`}
                  >
                    <LabIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#F3C44E]" : "text-[#1E3A8A]"}`} />
                    <span>{lab.shortName || lab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* 2. Status Bar with Prev / Next Thumb Controls */}
            <div className="flex items-center justify-between mt-3 mb-4 px-0.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Facility {activeLabIndex + 1} of {indoorLabs.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevLab}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous facility"
                >
                  <Icon.ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextLab}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next facility"
                >
                  <Icon.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. Featured Mobile Studio Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
                className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xl"
              >
                {/* Image & Gradient Header */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={activeLab.image}
                    alt={activeLab.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase border border-white/20">
                      <ActiveIcon className="w-3 h-3 text-[#F3C44E]" />
                      <span>{activeLab.badge}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                      <Icon.CheckCircle className="w-3 h-3" />
                      <span>Active ICSE</span>
                    </span>
                  </div>

                  {/* Title overlay (NO truncation) */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl drop-shadow-sm leading-snug">
                      {activeLab.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">
                      {activeLab.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {activeLab.description}
                  </p>

                  {/* Metric Chips (Full text wrap, no cutoff) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A]">
                        <Icon.Users className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Student Capacity</p>
                        <p className="text-xs font-semibold text-[#0A1628] mt-0.5">{activeLab.capacity}</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3 flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#781428]/10 text-[#781428]">
                        <Icon.Shield className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance & Safety</p>
                        <p className="text-xs font-semibold text-[#0A1628] mt-0.5">{activeLab.specs}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="pt-1">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Laboratory Features</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeLab.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60">
                          <Icon.CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-slate-100">
                    {indoorLabs.map((l, i) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSelectedLabId(l.id)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === activeLabIndex ? "w-6 bg-[#1E3A8A]" : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Go to ${l.name}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              DESKTOP VIEW: SPLIT MASTER-DETAIL SHOWCASE (lg+)
              Preserved for wide monitors with side-by-side sticky preview
          ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-12 items-start">
            
            {/* Left: Navigation Menu List of Studios */}
            <div className="space-y-2.5">
              {indoorLabs.map((lab) => {
                const isSelected = selectedLabId === lab.id;
                const LabIcon = Icon[lab.icon] || Icon.Flask;

                return (
                  <button
                    key={lab.id}
                    type="button"
                    onClick={() => setSelectedLabId(lab.id)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer border ${
                      isSelected
                        ? "bg-white border-[#1E3A8A] shadow-lg shadow-blue-900/5 -translate-y-0.5"
                        : "bg-white/70 hover:bg-white border-[#E2E8F0] hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isSelected ? "bg-[#1E3A8A] text-white" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                        }`}
                      >
                        <LabIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className={`font-serif font-bold text-base line-clamp-1 ${isSelected ? "text-[#0A1628]" : "text-slate-800"}`}>
                            {lab.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#64748B] line-clamp-1">
                          {lab.specs}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isSelected ? "bg-[#DBEAFE] text-[#1E3A8A]" : "bg-slate-100 text-slate-500"
                      }`}>
                        {lab.badge}
                      </span>
                      <Icon.ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#1E3A8A] translate-x-1" : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Immersive High-Impact Studio Feature View */}
            <div className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLab.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                  className="rounded-3xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xl"
                >
                  {/* Studio Hero Image */}
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                    <img
                      src={activeLab.image}
                      alt={activeLab.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent" />

                    {/* Badge & Icon overlay */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold tracking-wider text-white uppercase border border-white/20">
                        <ActiveIcon className="w-3.5 h-3.5 text-[#F3C44E]" />
                        <span>{activeLab.badge}</span>
                      </span>
                    </div>

                    <div className="absolute top-5 right-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-xs">
                        <Icon.CheckCircle className="w-3.5 h-3.5" />
                        <span>Active ICSE Facility</span>
                      </span>
                    </div>

                    {/* Title inside bottom of photo */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-serif font-bold text-2xl sm:text-3xl drop-shadow-sm mb-1">
                        {activeLab.name}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-1">
                        {activeLab.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Studio Information Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      {activeLab.description}
                    </p>

                    {/* Specs / Capacity Bar */}
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A]">
                          <Icon.Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Student Capacity</p>
                          <p className="text-xs sm:text-sm font-semibold text-[#0A1628] mt-0.5">{activeLab.capacity}</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#781428]/10 text-[#781428]">
                          <Icon.Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Compliance & Safety</p>
                          <p className="text-xs sm:text-sm font-semibold text-[#0A1628] mt-0.5">{activeLab.specs}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Technical Features */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Key Laboratory Features</h5>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {activeLab.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200/60">
                            <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: SPORTS, AQUATICS & OUTDOOR ARENA (EDITORIAL MAGAZINE SPREAD)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="outdoor" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
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
            <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-5 py-2 mb-4 border border-[#781428]/20">
              <Icon.Trophy className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#781428] uppercase">Athletics & Recreation</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              Championship Arenas & Outdoor Facilities
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              Physical education is central to character at BGHS. Students train across 18 indoor and outdoor disciplines guided by certified coaches and lifeguards.
            </p>
          </motion.div>

          {/* Editorial Feature 1: The Olympic-Dimension Swimming Pool */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0A1628] via-[#12233f] to-[#1E3A8A] text-white overflow-hidden shadow-2xl mb-12">
            <div className="grid lg:grid-cols-2 items-center">
              
              {/* Photo Side */}
              <div className="relative h-80 sm:h-96 lg:h-full min-h-[380px] overflow-hidden">
                <img
                  src="/bghs-swimming.png"
                  alt="Baldwin Girls High School Swimming Pool"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#12233f]" />
                
                {/* Floating pill badge */}
                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#1E3A8A] shadow-md">
                    <Icon.Waves className="w-4 h-4" />
                    <span>State & National Level CISCE Aquatic Center</span>
                  </span>
                </div>
              </div>

              {/* Text & Specs Side */}
              <div className="p-8 sm:p-12 lg:p-14 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F3C44E] block mb-2">Flagship Sports Infrastructure</span>
                  <h3 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
                    Olympic-Dimension Swimming Pool
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Built to international competitive standards, our aquatics center features dedicated beginner shallow zones, competition racing lanes, electronic timers, continuous ozone filtration plants, and certified female lifeguards.
                </p>

                {/* Highlight badges */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-xs sm:text-sm text-white/90 border border-white/10">
                    <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>25m Heated Racing Lanes</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-xs sm:text-sm text-white/90 border border-white/10">
                    <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Continuous Ozone Water Plant</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-xs sm:text-sm text-white/90 border border-white/10">
                    <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Certified Female Coaches</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-xs sm:text-sm text-white/90 border border-white/10">
                    <Icon.CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Inter-School Host Venue</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3 text-xs text-white/60">
                  <Icon.Trophy className="w-4 h-4 text-[#F3C44E] shrink-0" />
                  <span>Home to CISCE National Swim Meet Medalists</span>
                </div>
              </div>

            </div>
          </div>

          {/* Editorial Feature 2: Basketball, Athletics Grounds & Green Campus (3 Column Bento) */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Box 1: Basketball Courts */}
            <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img
                    src="/bghs-sports-hero.png"
                    alt="Basketball and Outdoor Sports"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A1628]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Floodlit Arena
                  </div>
                </div>
                <h4 className="font-serif font-bold text-xl text-[#0A1628] mb-2">FIBA Basketball Complex</h4>
                <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed mb-4">
                  Multi-court synthetic acrylic shock-absorbing surface with tournament spring backboards and evening floodlight fixtures for state matches.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#334155] border-t border-slate-200 pt-4">
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Shock-Absorbent Acrylic Floor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>State Tournament Regulation</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Athletics Grounds */}
            <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img
                    src="/campus-playground.jpg"
                    alt="Athletics Grounds and Turf"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A1628]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    200m Cinder Track
                  </div>
                </div>
                <h4 className="font-serif font-bold text-xl text-[#0A1628] mb-2">Athletics Grounds & Turf</h4>
                <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed mb-4">
                  Expansive outdoor grounds accommodating 200m running tracks, football turf, cricket nets, volleyball courts, and march-past parade grounds.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#334155] border-t border-slate-200 pt-4">
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>8 Certified Full-Time Coaches</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cricket Nets & Football Arena</span>
                </li>
              </ul>
            </div>

            {/* Box 3: 7-Acre Botanical Canopy & Gardens */}
            <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                  <img
                    src="/campus-garden.jpg"
                    alt="Heritage Gardens and Quadrangle"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A1628]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Green Canopy
                  </div>
                </div>
                <h4 className="font-serif font-bold text-xl text-[#0A1628] mb-2">Heritage Botanical Quadrangle</h4>
                <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed mb-4">
                  Century-old rain trees, landscaped gardens, shaded quadrangle benches, and quiet outdoor learning pavilions across the 7-acre campus.
                </p>
              </div>
              <ul className="space-y-2 text-xs text-[#334155] border-t border-slate-200 pt-4">
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Zero-Waste Composting Unit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon.CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Eco-Pavilions & Shaded Courtyards</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Transport Fleet Strip */}
          <div className="mt-8 rounded-2xl bg-[#EEF4FB] border border-[#D9E5F3] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1E3A8A] text-white">
                <Icon.Bus className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3A8A]">Transit Network</span>
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#0A1628]">GPS-Tracked School Bus Fleet</h4>
                <p className="text-xs sm:text-sm text-[#5A6778] mt-0.5">
                  Over 30 designated city routes with live parent GPS tracking, CCTV monitoring, speed governors, and trained female bus attendants.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0A1628] hover:bg-[#1E3A8A] text-white px-5 py-3 text-xs font-bold tracking-wide transition shadow-sm"
            >
              <span>View Route Coverage</span>
              <Icon.ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: RESIDENTIAL BOARDING & WELLBEING (ALTERNATING STORY SPREAD)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="boarding" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F1F5F9] via-[#F8FAFC] to-white scroll-mt-24">
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
            <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-5 py-2 mb-4 border border-[#781428]/20">
              <Icon.Heart className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#781428] uppercase">Residential Care & Boarding</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              A Safe, Nurturing Home Away from Home
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              For outstation students from across India and abroad, Baldwin Girls' High School provides a secure, caring residential environment with pastoral female wardens and round-the-clock medical care.
            </p>
          </motion.div>

          {/* Alternating Story 1: Residential Quarters */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div className="order-2 lg:order-1 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-4 py-1 text-xs font-bold text-[#1E3A8A]">
                <Icon.Building className="w-3.5 h-3.5" />
                <span>Comfortable Living</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0A1628]">
                Residential Boarding Quarters
              </h3>
              <p className="text-sm sm:text-base text-[#5A6778] leading-relaxed">
                Supervised by experienced female wardens, our residential dormitories provide bright, air-cooled rooms with private study desks, ergonomic beds, personal wardrobes, and recreational common rooms.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 Female Matron Care</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Evening Supervised Study</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Wi-Fi Monitored Study Lab</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CCTV Protected Perimeter</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/campus-boarding.jpg"
                alt="Residential Boarding Quarters"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>

          {/* Alternating Story 2: Hostel Dining Hall */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/campus-dininghall.jpg"
                alt="Hostel Dining Hall and Kitchen"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#781428]/10 px-4 py-1 text-xs font-bold text-[#781428]">
                <Icon.Heart className="w-3.5 h-3.5" />
                <span>Nutritious & Hygienic</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0A1628]">
                Hostel Dining Hall & Kitchen
              </h3>
              <p className="text-sm sm:text-base text-[#5A6778] leading-relaxed">
                Balanced, nutritionist-planned meals prepared in our FSSAI-certified, steam-operated kitchen. Students enjoy fresh vegetarian and non-vegetarian menus in a spacious, naturally ventilated 500-seat dining hall.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nutrient-Balanced Menus</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FSSAI Certified Operations</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Continuous RO Water Plant</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>500-Seat Simultaneous Capacity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternating Story 3: Campus Infirmary */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-bold text-emerald-800">
                <Icon.Heart className="w-3.5 h-3.5" />
                <span>Health & Wellness</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0A1628]">
                Campus Infirmary & Medical Bay
              </h3>
              <p className="text-sm sm:text-base text-[#5A6778] leading-relaxed">
                A dedicated healthcare center staffed with a full-time resident nurse, first-aid observation beds, medical supplies, oxygen cylinders, and emergency ambulance tie-ups with leading hospitals in Bengaluru.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Resident Qualified Nurse</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Emergency Oxygen & Vitals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hospital Ambulance Tie-Up</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Care for Day & Boarding Girls</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/campus-infirmary.jpg"
                alt="Campus Infirmary and Medical Bay"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FACILITIES FAQ ACCORDION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-4 border border-[#1E3A8A]/20">
                <Icon.BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                <span className="text-xs font-bold tracking-[0.16em] text-[#1E3A8A] uppercase">Facility Queries</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0A1628] leading-tight mb-4">
                Frequently Asked Facility Questions
              </h2>
              <p className="text-base text-[#5A6778] leading-relaxed mb-6">
                Answers to common parent questions about lab safety, sports training schedules, boarding oversight, and transport.
              </p>

              <div className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] text-white p-6 shadow-md">
                <h4 className="font-serif font-bold text-lg mb-2">Want to see the facilities in person?</h4>
                <p className="text-xs sm:text-sm text-white/75 mb-4 leading-relaxed">
                  Join us for an escorted campus walkthrough with our admissions liaison team.
                </p>
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-[#1E3A8A] px-5 py-2.5 text-xs font-bold transition hover:bg-[#DBEAFE]"
                >
                  <Icon.Camera className="w-4 h-4" />
                  <span>Campus Tour</span>
                </Link>
              </div>
            </motion.div>

            {/* Accordion */}
            <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-sm divide-y divide-[#E2E8F0]">
              {facilitiesFaqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="p-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span className="font-serif font-bold text-base sm:text-lg text-[#0A1628] group-hover:text-[#1E3A8A] transition-colors">
                        {faq.q}
                      </span>
                      <Icon.ChevronDown
                        className={`w-5 h-5 shrink-0 text-[#1E3A8A] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-xs sm:text-sm text-[#5A6778] leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-r from-[#1E3A8A] to-[#781428] text-white overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1380px] px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
                Experience Baldwin Girls' in Person
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl">
                Admissions for Academic Year 2026–27 are now open. Visit #90 Richmond Road and witness our facilities firsthand.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/admissions#apply"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#1E3A8A] font-bold px-7 py-3.5 text-sm hover:scale-105 transition-all shadow-lg"
              >
                <span>Apply for Admission</span>
                <Icon.ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919148780138"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold px-7 py-3.5 text-sm border border-white/25 backdrop-blur-sm transition"
              >
                <Icon.Phone className="w-4 h-4" />
                <span>+91 91487 80138</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Animation Keyframes */}
      <style>{`
        @keyframes floatFac {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-16px) rotate(4deg); }
        }
      `}</style>
    </main>
  );
}
