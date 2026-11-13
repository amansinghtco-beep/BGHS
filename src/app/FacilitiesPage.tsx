import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG ICON LIBRARY — pure vectors, zero emojis, zero external icon packages
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
          className="absolute opacity-[0.04] text-[#1E3A8A]"
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

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   DATA: FACILITIES CATALOG
───────────────────────────────────────────────────────────────────────── */
interface FacilityDetail {
  id: string;
  name: string;
  category: "indoor" | "outdoor" | "residential";
  categoryBadge: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  specs: string;
  icon: keyof typeof Icon;
}

const allFacilities: FacilityDetail[] = [
  {
    id: "physics-lab",
    name: "Physics Laboratory",
    category: "indoor",
    categoryBadge: "INDOOR SCIENCE",
    subtitle: "Optics, Mechanics & Advanced Experiments Studio",
    description: "Equipped with state-of-the-art optical benches, electrical circuit trainers, vernier systems, and darkroom facilities for ICSE senior experiments.",
    image: "/campus-sciencelab.jpg",
    features: ["Advanced Optical Benches", "Laser & Optics Darkroom", "Individual Workstations"],
    specs: "Capacity: 40 Students · Digital Interface",
    icon: "Flask",
  },
  {
    id: "chemistry-lab",
    name: "Chemistry Laboratory",
    category: "indoor",
    categoryBadge: "INDOOR SCIENCE",
    subtitle: "Fume-Protected Chemical Apparatus & Analysis Station",
    description: "Spacious laboratory with individual acid-resistant workstations, centralized LPG supplies, high-efficiency fume hoods, and fire safety systems.",
    image: "/campus-sciencelab.jpg",
    features: ["Individual Bunsen Lines", "Fume Extraction Hoods", "Analytical Precision Balances"],
    specs: "Full safety showers & eye wash stations",
    icon: "Flask",
  },
  {
    id: "biology-lab",
    name: "Biology Laboratory",
    category: "indoor",
    categoryBadge: "INDOOR SCIENCE",
    subtitle: "Microscopy & Life Sciences Specimen Studio",
    description: "Features binocular compound microscopes, human anatomical models, preserved specimen banks, and projection microscopy for botanical study.",
    image: "/campus-sciencelab.jpg",
    features: ["Digital Compound Microscopes", "300+ Specimen Archive", "Human Physiology Models"],
    specs: "Capacity: 40 Students · Bio-Safety Compliant",
    icon: "Microscope",
  },
  {
    id: "robotics-ai-lab",
    name: "Robotics & Artificial Intelligence Lab",
    category: "indoor",
    categoryBadge: "INDOOR TECH",
    subtitle: "STEM Automation, Coding & IoT Workspace",
    description: "Hands-on makerspace with Arduino, Raspberry Pi, robotics kits, sensors, 3D printing equipment, and specialized visual block programming platforms.",
    image: "/bghs-events.png",
    features: ["Microcontroller Platforms", "3D Modeling Printers", "Robotics Arena Turf"],
    specs: "All grades from Standard III onwards",
    icon: "Cpu",
  },
  {
    id: "senior-library",
    name: "Senior Academic Library",
    category: "indoor",
    categoryBadge: "INDOOR LEARNING",
    subtitle: "Extensive Research Center & Silent Reading Hall",
    description: "A sanctuary of knowledge holding over 20,000 reference books, encyclopedias, journals, national dailies, and digital catalog workstations.",
    image: "/campus-library.jpg",
    features: ["20,000+ Print Titles", "JSTOR & Digital Databases", "Private Study Carrels"],
    specs: "Seating Capacity: 150 · Silent Reading Zone",
    icon: "BookOpen",
  },
  {
    id: "junior-library",
    name: "Junior Primary Library",
    category: "indoor",
    categoryBadge: "INDOOR LEARNING",
    subtitle: "Early Reading & Illustrated Storybooks Wing",
    description: "Colorful, child-friendly reading space stocked with picture books, fairy tales, early phonics resources, and story-telling audio nooks.",
    image: "/campus-library.jpg",
    features: ["Graded Phonics Readers", "Cozy Floor Cushions", "Interactive Story Sessions"],
    specs: "Curated for Pre-KG to Standard II",
    icon: "BookOpen",
  },
  {
    id: "auditorium",
    name: "School Grand Auditorium",
    category: "indoor",
    categoryBadge: "INDOOR ARTS",
    subtitle: "Acoustic Multi-Purpose Theater & Assembly Hall",
    description: "Air-conditioned 1,200+ capacity auditorium equipped with professional theatrical lighting, surround sound system, stage wings, and green rooms.",
    image: "/campus-auditorium.jpg",
    features: ["Dolby Acoustic Paneling", "1,200+ Padded Theater Seats", "Green Rooms & Backstage"],
    specs: "Hosts Annual Day, Debates & Investiture",
    icon: "Building",
  },
  {
    id: "computer-lab",
    name: "Computer & Cyber Labs",
    category: "indoor",
    categoryBadge: "INDOOR TECH",
    subtitle: "High-Speed Computing & Digital Literacy Hub",
    description: "Modern network of 120+ desktop terminals with high-speed optical fiber internet, programming software, cybersecurity filters, and smart displays.",
    image: "/campus-sciencelab.jpg",
    features: ["Dedicated Terminals per Student", "High-Speed Leased Line", "ICSE Java / Python Setup"],
    specs: "Dual Air-Conditioned Laboratories",
    icon: "Monitor",
  },
  {
    id: "swimming-pool",
    name: "Olympic-Dimension Swimming Pool",
    category: "outdoor",
    categoryBadge: "OUTDOOR SPORTS",
    subtitle: "International-Standard Aquatics Center",
    description: "Built to international competitive standards with dedicated beginner shallow zones, diving blocks, continuous filtration, and certified female lifeguards.",
    image: "/bghs-swimming.png",
    features: ["25-Meter Heated Racing Lanes", "Continuous Water Ozone Plant", "Certified Lifeguards & Coaches"],
    specs: "Inter-School CISCE Aquatic Venue",
    icon: "Waves",
  },
  {
    id: "basketball-court",
    name: "FIBA Basketball Courts",
    category: "outdoor",
    categoryBadge: "OUTDOOR SPORTS",
    subtitle: "Championship Hardcourt with Floodlight Arena",
    description: "Multi-court basketball complex with synthetic acrylic shock-absorbing surface, professional spring-loaded backboards, and evening floodlights.",
    image: "/bghs-sports-hero.png",
    features: ["Shock-Absorbent Acrylic Surface", "Night Floodlit Practice", "Tournament Scoreboards"],
    specs: "Host to State ICSE Tournaments",
    icon: "Trophy",
  },
  {
    id: "playground",
    name: "Athletics Grounds & Turf",
    category: "outdoor",
    categoryBadge: "OUTDOOR SPORTS",
    subtitle: "Expansive Sports Grounds & Running Track",
    description: "Multi-sport outdoor arena accommodating 200m athletic track, football ground, cricket nets, volleyball, and physical conditioning stations.",
    image: "/campus-playground.jpg",
    features: ["200m Cinder Track", "Cricket & Football Fields", "Dedicated Throwing Sectors"],
    specs: "Supervised by 8 Certified Coaches",
    icon: "Trophy",
  },
  {
    id: "boarding-facility",
    name: "Residential Boarding Quarters",
    category: "residential",
    categoryBadge: "RESIDENTIAL",
    subtitle: "Safe, Nurturing Home Away from Home",
    description: "Modern residential dormitories with air-cooled rooms, personal study desks, secure wardrobes, 24/7 matron supervision, and CCTV protection.",
    image: "/campus-boarding.jpg",
    features: ["Pastoral Female Wardens", "Evening Supervised Study", "Wi-Fi Guided Study Lab"],
    specs: "Accommodates girls from Std III to X",
    icon: "Building",
  },
  {
    id: "dining-hall",
    name: "Hostel Dining Hall & Kitchen",
    category: "residential",
    categoryBadge: "RESIDENTIAL",
    subtitle: "Hygienic Multi-Cuisine Meal Service Area",
    description: "Large dining hall serving balanced, nutritionist-planned vegetarian and non-vegetarian meals prepared in a steam-operated hygienic kitchen.",
    image: "/campus-dininghall.jpg",
    features: ["Nutrient-Balanced Menus", "FSSAI Certified Kitchen", "Filtered RO Drinking Water"],
    specs: "500-seat simultaneous capacity",
    icon: "Building",
  },
  {
    id: "infirmary",
    name: "Campus Infirmary & Medical Bay",
    category: "residential",
    categoryBadge: "WELLBEING",
    subtitle: "Round-the-Clock First Aid & Medical Care",
    description: "Dedicated healthcare center staffed with a full-time certified resident nurse, oxygen equipment, observation beds, and emergency hospital tie-ups.",
    image: "/campus-infirmary.jpg",
    features: ["Resident Qualified Nurse", "Observation Beds & First Aid", "Emergency Ambulance Tie-up"],
    specs: "Immediate care for day & boarding girls",
    icon: "Heart",
  },
  {
    id: "school-transport",
    name: "GPS School Bus Fleet",
    category: "outdoor",
    categoryBadge: "TRANSPORT",
    subtitle: "Comprehensive Monitored Transit Network",
    description: "Fleet of modern yellow school buses covering all major residential corridors of Bengaluru, equipped with real-time GPS tracking and female attendants.",
    image: "/campus-parking.jpg",
    features: ["Live GPS Parent Tracking App", "CCTV & Speed Governors", "Trained Female Bus Attendants"],
    specs: "30+ Routes across Bengaluru",
    icon: "Bus",
  },
  {
    id: "green-gardens",
    name: "Heritage Quadrangle & Botanical Gardens",
    category: "outdoor",
    categoryBadge: "CAMPUS ENVIRONMENT",
    subtitle: "Lush Tree-Lined Courtyards & Green Spaces",
    description: "Century-old rain trees, landscaped gardens, shaded quadrangle benches, and quiet outdoor learning pavilions across the 7-acre property.",
    image: "/campus-garden.jpg",
    features: ["Centennial Rain Trees", "Outdoor Eco-Pavilions", "Zero-Waste Composting Unit"],
    specs: "Eco-Friendly Green Campus",
    icon: "Tree",
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
  const [filter, setFilter] = useState<"all" | "indoor" | "outdoor" | "residential">("all");
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

  const filteredFacilities = allFacilities.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

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
          HERO BANNER
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

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#facilities-grid"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-7 py-3.5 sm:px-8 sm:py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 group cursor-pointer"
              >
                <span>Explore All Facilities</span>
                <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 sm:px-8 sm:py-4 font-bold text-sm tracking-wide transition-all duration-300 border border-white/20 backdrop-blur-sm cursor-pointer"
              >
                <Icon.Camera className="w-4 h-4 text-[#F3C44E]" />
                <span>Book Campus Tour</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-1 bg-gradient-to-r from-[#1E3A8A] to-[#781428] text-white">
        <div className="mx-auto max-w-[1380px] px-3 sm:px-6 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { val: "7+ Acres", label: "Sprawling City Campus", icon: Icon.Building },
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
                className={`flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-2 sm:gap-4 py-5 sm:py-7 px-3 sm:px-6 border-white/10 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b" : ""} lg:border-b-0 lg:border-r lg:last:border-r-0`}
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3C44E]" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-white whitespace-nowrap leading-tight">
                    {stat.val}
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
          CAMPUS PILLARS / HIGHLIGHTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1380px] px-6 lg:px-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A]/10 px-5 py-2 mb-4 border border-[#1E3A8A]/20">
              <Icon.Shield className="w-4 h-4 text-[#1E3A8A]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#1E3A8A] uppercase">Safety & Environmental Standards</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              Infrastructure Built on Trust & Care
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              Every facility at BGHS is maintained to CISCE safety benchmarks, ensuring an invigorating and secure setting where your daughter learns with freedom.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Icon.Shield,
                title: "24/7 Gated Security",
                desc: "High-definition CCTV coverage across all gates, corridors, and perimeters with trained female security wardens.",
              },
              {
                icon: Icon.Heart,
                title: "Full-Time Infirmary",
                desc: "A resident nurse and dedicated medical bay equipped with oxygen, emergency first aid, and hospital tie-ups.",
              },
              {
                icon: Icon.Tree,
                title: "7-Acre Green Canopy",
                desc: "Historic rain trees, manicured botanical quadrangles, and outdoor reading zones supporting student wellbeing.",
              },
              {
                icon: Icon.Bus,
                title: "GPS-Tracked Transit",
                desc: "30+ fleet buses fitted with live GPS parent tracking, speed governors, and female bus attendants.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="rounded-2xl bg-white border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] mb-5">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0A1628] mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERACTIVE FACILITIES CATALOG (FILTERABLE GRID)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="facilities-grid" className="relative py-24 lg:py-32 bg-white scroll-mt-24">
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
              <Icon.Sparkles className="w-4 h-4 text-[#781428]" />
              <span className="text-xs font-bold tracking-[0.16em] text-[#781428] uppercase">Explore Spaces</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-4">
              Comprehensive Facility Directory
            </h2>
            <p className="text-base sm:text-lg text-[#5A6778] leading-relaxed">
              Explore our diverse learning environments, specialized STEM laboratories, competitive sporting venues, and comfortable residential quarters.
            </p>

            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {[
                { id: "all", label: "All Facilities", count: allFacilities.length },
                { id: "indoor", label: "Indoor Learning & Labs", count: allFacilities.filter(f => f.category === "indoor").length },
                { id: "outdoor", label: "Outdoor & Sports", count: allFacilities.filter(f => f.category === "outdoor").length },
                { id: "residential", label: "Boarding & Wellness", count: allFacilities.filter(f => f.category === "residential").length },
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFilter(tab.id as typeof filter)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#781428] text-white shadow-md shadow-rose-950/20 scale-[1.02]"
                        : "bg-[#F1F5F9] text-[#334155] hover:bg-[#DBEAFE] border border-[#CBD5E1]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredFacilities.map((facility, i) => {
              const IconComp = Icon[facility.icon] || Icon.Building;
              return (
                <motion.div
                  key={facility.id}
                  variants={scaleUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#3B82F6]/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Photo with Badge Overlay */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-transparent to-black/20" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase border border-white/20">
                        <IconComp className="w-3.5 h-3.5 text-[#F3C44E]" />
                        <span>{facility.categoryBadge}</span>
                      </span>
                    </div>

                    {/* Title inside photo bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif font-bold text-xl text-white leading-tight drop-shadow-sm">
                        {facility.name}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-sans">
                        {facility.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-[#5A6778] leading-relaxed">
                      {facility.description}
                    </p>

                    {/* Features Tags */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {facility.features.map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center gap-1 rounded-md bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-medium text-[#334155]"
                          >
                            <Icon.CheckCircle className="w-3 h-3 text-[#1E3A8A]" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>

                      {/* Specs info */}
                      <div className="flex items-center gap-2 text-xs text-[#1E3A8A] font-semibold bg-[#DBEAFE]/40 px-3 py-2 rounded-xl">
                        <Icon.Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{facility.specs}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION ANCHORS (INDOOR, OUTDOOR, BOARDING)
      ═══════════════════════════════════════════════════════════════════ */}
      <div id="indoor" className="scroll-mt-24" />
      <div id="outdoor" className="scroll-mt-24" />
      <div id="boarding" className="scroll-mt-24" />

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
                  Join us for an escorted campus tour with our admissions liaison team.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-[#1E3A8A] px-5 py-2.5 text-xs font-bold transition hover:bg-[#DBEAFE]"
                >
                  <Icon.Camera className="w-4 h-4" />
                  <span>Request Tour Date</span>
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
                to="/admissions"
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
