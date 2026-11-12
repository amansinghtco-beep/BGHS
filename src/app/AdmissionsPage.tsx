import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { school } from "./data";

/* ─────────────────────────────────────────────────────────────────────────
   INLINE SVG VECTOR ICONS (Zero emojis, zero external icon packages)
───────────────────────────────────────────────────────────────────────── */
const Icon = {
  School: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 22V12H10v10" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M18 5v17" /><path d="m4 6 8-4 8 4" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" />
    </svg>
  ),
  GraduationCap: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  ShieldCheck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  HeartHand: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Trophy: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  Award: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  CheckCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  FileText: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Phone: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  BookOpen: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
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
  ClipboardCheck: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  Sparkles: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  ),
  Building: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  Headset: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Compass: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────
   FLOATING ACADEMIC VECTOR BACKGROUND
───────────────────────────────────────────────────────────────────────── */
const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: "radial-gradient(#1E3A8A 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────
   DATA CONSTANTS
───────────────────────────────────────────────────────────────────────── */
const stats = [
  { value: "1880", label: "Founded · 140+ Yrs", IconComp: Icon.School },
  { value: "100%", label: "ICSE Pass Rate", IconComp: Icon.Award },
  { value: "Pre-KG to X", label: "Classes Offered", IconComp: Icon.GraduationCap },
  { value: "24/7", label: "Enquiry Helpline", IconComp: Icon.Headset },
];

const parentPromises = [
  {
    num: "01",
    title: "Individual Academic Nurturing",
    description: "Every student's unique learning curve is tracked with dedication. Balanced student-teacher ratios ensure no girl is lost in the crowd.",
    icon: Icon.HeartHand,
  },
  {
    num: "02",
    title: "7-Acre Safe & Disciplined Campus",
    description: "Full CCTV surveillance, dedicated round-the-clock female security staff, trained wardens, and an on-campus infirmary with a registered medical team.",
    icon: Icon.ShieldCheck,
  },
  {
    num: "03",
    title: "Holistic Development & 18+ Sports",
    description: "From international-standard swimming pool and basketball courts to robotics, AI lab, NCC, debating, choir, and arts.",
    icon: Icon.Trophy,
  },
  {
    num: "04",
    title: "100% ICSE Board Distinction Record",
    description: "Consistently producing city and state toppers. In 2025, 44 students scored above 95%, with over 85% graduating in first division with distinction.",
    icon: Icon.GraduationCap,
  },
];

const divisions = [
  {
    id: "pre-primary",
    badge: "Pre-Primary Wing",
    title: "Pre-KG to Standard II",
    timings: "Pre-KG – UKG: 8:15 am – 12:05 pm | Std I & II: 8:15 am – 2:30 pm",
    image: `${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`,
    badgeColor: "bg-blue-50 text-[#1E3A8A] border-blue-200",
    headerColor: "from-[#1E3A8A] to-[#2563EB]",
    summary: "Activity-based, joyful learning focused on phonics, motor skills, sensory play, storytelling, and early multilingual foundations.",
    highlights: [
      "Joyful activity-based, non-exam foundational methodology",
      "Phonics and early literacy in English, Hindi & Kannada",
      "Fine & gross motor development through music, dance & physical games",
      "Interactive smart play classrooms with caring educators",
    ],
    steps: [
      "Submit online enquiry or collect physical admission form",
      "Friendly student-parent interactive conversation session",
      "Document verification and prompt admission confirmation",
    ],
  },
  {
    id: "primary",
    badge: "Primary Wing",
    title: "Standard III to Standard V",
    timings: "Monday – Friday: 8:15 am – 3:00 pm",
    image: `${school}/static/media/schoolgirl2.28b8d7d780b54e871138.png`,
    badgeColor: "bg-rose-50 text-[#781428] border-rose-200",
    headerColor: "from-[#781428] to-[#9F1239]",
    summary: "Transitioning curiosity into disciplined inquiry. Subject-focused teaching in Mathematics, General Science, Social Studies, and Computers.",
    highlights: [
      "Solid foundations in Mathematics with mental arithmetic & logic",
      "Practical science demonstrations and environmental field projects",
      "Second & third language development with creative writing workshops",
      "Dedicated computer lab sessions and digital learning programs",
    ],
    steps: [
      "Submit completed application along with previous grade records",
      "Written foundational diagnostic assessment in English & Math",
      "Verification of Transfer Certificate and completion of enrolment",
    ],
  },
  {
    id: "middle",
    badge: "Middle School",
    title: "Standard VI to Standard VIII",
    timings: "Monday – Friday: 8:15 am – 3:00 pm",
    image: `${school}/static/media/schoolgirl3.240a9001c710ecb41af8.png`,
    badgeColor: "bg-blue-50 text-[#1E3A8A] border-blue-200",
    headerColor: "from-[#1E3A8A] to-[#162E66]",
    summary: "Deep analytical thinking and subject specialisation. Separate laboratories for Physics, Chemistry, and Biology prepare students for the board curriculum.",
    highlights: [
      "Specialist laboratories: separate Physics, Chemistry & Biology practicals",
      "STEM robotics, AI coding electives, and science club exhibitions",
      "Public speaking, Model United Nations (MUN), and school council leadership",
      "Structured career counselling and personal mentoring sessions",
    ],
    steps: [
      "Application submission with last two years' academic transcripts",
      "Comprehensive evaluation in core subjects & student interview",
      "Provisional admission granted, finalized on submission of original TC",
    ],
  },
  {
    id: "high-school",
    badge: "High School (ICSE)",
    title: "Standard IX & Standard X",
    timings: "Monday – Friday: 8:15 am – 3:00 pm (Revision sessions: 7:30 am / 4:00 pm)",
    image: `${school}/static/media/schoolgirl4.ccbd076afeb2ad1259de.png`,
    badgeColor: "bg-rose-50 text-[#781428] border-rose-200",
    headerColor: "from-[#781428] to-[#881337]",
    summary: "The pinnacle of ICSE excellence. Rigorous CISCE curriculum delivery with mock boards, individual performance analytics, and university readiness.",
    highlights: [
      "100% ICSE Board Pass Rate with 85%+ Distinction year after year",
      "Intensive mock examinations, past papers analysis, and doubt workshops",
      "Guidance from senior faculty examiners and council resource persons",
      "Leadership roles in prefectorial board, house captaincies, and clubs",
    ],
    steps: [
      "Review of previous board/grade academic record and merit interview",
      "Subject choice counseling for ICSE Group II & III electives",
      "Formal admission granted upon clearance from CISCE criteria",
    ],
  },
];

const stepsRoadmap = [
  {
    step: "01",
    title: "Registration & Application",
    desc: "Fill the Registration-cum-Admission form online at portal.baldwingirls.edu.in or visit the admissions desk on campus.",
    color: "bg-[#1E3A8A]",
    accent: "border-blue-200",
  },
  {
    step: "02",
    title: "Document Verification",
    desc: "Submit birth certificate, previous school records, and photographs. The desk verifies credentials and schedules an interactive session.",
    color: "bg-[#781428]",
    accent: "border-rose-200",
  },
  {
    step: "03",
    title: "Interactive Assessment",
    desc: "An age-appropriate interactive assessment is conducted to understand the student's foundation and readiness.",
    color: "bg-[#1E3A8A]",
    accent: "border-blue-200",
  },
  {
    step: "04",
    title: "Seat Confirmation",
    desc: "Successful applicants are issued provisional admission letters. Formalities must be concluded within 10 working days to secure the seat.",
    color: "bg-[#781428]",
    accent: "border-rose-200",
  },
];

const ageEligibilityData = [
  { grade: "Pre-Kindergarten (Pre-KG)", age: "3 Years", cutOff: "As on 1st June of admission year", stage: "Pre-Primary Foundation" },
  { grade: "Lower Kindergarten (LKG)", age: "4 Years", cutOff: "As on 1st June of admission year", stage: "Pre-Primary Foundation" },
  { grade: "Upper Kindergarten (UKG)", age: "5 Years", cutOff: "As on 1st June of admission year", stage: "Pre-Primary Foundation" },
  { grade: "Standard I", age: "6 Years", cutOff: "As on 1st June of admission year", stage: "Primary Stage" },
  { grade: "Standard II", age: "7 Years", cutOff: "As on 1st June of admission year", stage: "Primary Stage" },
  { grade: "Standard III", age: "8 Years", cutOff: "As on 1st June of admission year", stage: "Primary Stage" },
  { grade: "Standard IV", age: "9 Years", cutOff: "As on 1st June of admission year", stage: "Primary Stage" },
  { grade: "Standard V", age: "10 Years", cutOff: "As on 1st June of admission year", stage: "Primary Stage" },
  { grade: "Standard VI", age: "11 Years", cutOff: "As on 1st June of admission year", stage: "Middle School" },
  { grade: "Standard VII", age: "12 Years", cutOff: "As on 1st June of admission year", stage: "Middle School" },
  { grade: "Standard VIII", age: "13 Years", cutOff: "As on 1st June of admission year", stage: "Middle School" },
  { grade: "Standard IX (ICSE)", age: "14 Years", cutOff: "As on 1st June of admission year", stage: "ICSE Board Secondary" },
  { grade: "Standard X (ICSE)", age: "15 Years", cutOff: "As on 1st June of admission year", stage: "ICSE Board Final" },
];

const documentList = [
  { title: "Parents' Declaration Form", desc: "Duly signed by both parents/legal guardians." },
  { title: "Original Birth Certificate", desc: "Produced for in-person verification at the admission desk." },
  { title: "Attested Copy of Birth Certificate", desc: "Attested by a Gazetted Officer or with Notary Seal & signature." },
  { title: "Medical Fitness Certificate", desc: "Issued by a Registered Medical Practitioner or CDMO." },
  { title: "Category / Caste Certificate", desc: "Required for SC / ST / OBC applicants seeking reservation." },
  { title: "Passport Copy (NRI Students)", desc: "Mandatory for international / NRI student enrollments." },
  { title: "Student & Parent Photographs", desc: "Recent passport-size colour photographs (white background)." },
  { title: "Original Transfer Certificate (TC)", desc: "Mandatory for admissions from Standard II and upwards." },
  { title: "Previous 2 Years Progress Cards", desc: "Official academic transcripts for lateral class admissions." },
];

const faqs = [
  {
    q: "What is the official age cut-off for Pre-KG and Grade 1?",
    a: "Age criteria are strictly adhered to as per educational norms. The child must complete 3 years of age for Pre-KG, 4 years for LKG, 5 years for UKG, and 6 years for Standard I as on 1st June of the academic year of admission.",
  },
  {
    q: "What are the daily school timings for various grades?",
    a: "Pre-KG, LKG and UKG: 8:15 AM to 12:05 PM. Standard I & II: 8:15 AM to 2:30 PM. Standard III through Standard X: 8:15 AM to 3:00 PM. High School students (Std IX & X) may have structured early morning or evening revision sessions scheduled as board exams approach.",
  },
  {
    q: "Which board is Baldwin Girls' High School affiliated with?",
    a: "The school is affiliated to the Council for the Indian School Certificate Examinations (CISCE), New Delhi, code KA006. We prepare girls for the Indian Certificate of Secondary Education (ICSE) Class X examination.",
  },
  {
    q: "Can documents be submitted after completing the registration form?",
    a: "Yes. While the basic registration form must be submitted first, pending documents (such as final Transfer Certificate or current year report cards) may be submitted prior to the formal seat confirmation deadline.",
  },
  {
    q: "What is the procedure for obtaining admission through a Transfer Certificate (TC)?",
    a: "For lateral entry into Standard II through Standard X, the Transfer Certificate from the recognized previous school must be countersigned by the competent educational authority (BEO/DDPI or Regional Officer for other boards).",
  },
  {
    q: "Does the school provide hostel and boarding facilities for outstation students?",
    a: "Yes. Baldwin Girls' High School maintains a secure, comfortable on-campus residential boarding house with modern dormitory amenities, study halls, hygienic dining facilities, and round-the-clock matron and medical supervision.",
  },
  {
    q: "What sports and co-curricular opportunities are offered?",
    a: "Our students participate in 18+ indoor and outdoor sports including an international-standard swimming pool, basketball, athletics, throwball, badminton, and gymnastics, as well as NCC, debating, choir, robotics, and artificial intelligence programs.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   ENQUIRY FORM COMPONENT (Crisp white styling with school blue & burgundy)
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
      {submitted ? (
        <div className="text-center py-10">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Icon.CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-black text-2xl text-[#0A2540] mb-2">Enquiry Received</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Thank you, <span className="font-bold text-[#1E3A8A]">{formData.parentName}</span>. Our admissions coordinator will reach out to you at <span className="font-bold">{formData.phone}</span> during your preferred callback slot.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full bg-[#1E3A8A] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#162E66] transition-colors"
          >
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-slate-100 pb-4 mb-2">
            <h3 className="font-serif font-bold text-2xl text-[#0A2540]">Admissions Callback Request</h3>
            <p className="text-xs text-slate-500 mt-1">Our counselling desk provides personal assistance for 2026–27 enrollments.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Parent / Guardian Full Name <span className="text-[#781428]">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Dr. Rajesh Sharma"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Student Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ananya Sharma"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Grade Applying For <span className="text-[#781428]">*</span>
              </label>
              <select
                required
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              >
                <option value="">Select Grade Level</option>
                <option value="Pre-KG">Pre-KG (3+ Yrs)</option>
                <option value="LKG">LKG (4+ Yrs)</option>
                <option value="UKG">UKG (5+ Yrs)</option>
                <option value="Std I">Standard I (6+ Yrs)</option>
                <option value="Std II">Standard II</option>
                <option value="Std III">Standard III</option>
                <option value="Std IV">Standard IV</option>
                <option value="Std V">Standard V</option>
                <option value="Std VI">Standard VI</option>
                <option value="Std VII">Standard VII</option>
                <option value="Std VIII">Standard VIII</option>
                <option value="Std IX">Standard IX (ICSE)</option>
                <option value="Std X">Standard X (ICSE)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Preferred Callback Slot
              </label>
              <select
                value={formData.callbackTime}
                onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              >
                <option value="">Any Time During Office Hours</option>
                <option value="Morning">Morning (8:30 AM – 11:30 AM)</option>
                <option value="Midday">Midday (11:30 AM – 1:30 PM)</option>
                <option value="Afternoon">Afternoon (1:30 PM – 3:30 PM)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Number <span className="text-[#781428]">*</span>
              </label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="parent@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Specific Query / Sibling or Hostel Boarding Interest
            </label>
            <textarea
              rows={3}
              placeholder="Please let us know if you require boarding, transport or have specific questions..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#781428] hover:bg-[#8B0000] text-white font-bold py-3.5 px-6 text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Submit Admissions Enquiry</span>
              <Icon.ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://portal.baldwingirls.edu.in/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#1E3A8A] hover:bg-[#162E66] text-white font-bold py-3.5 px-6 text-sm tracking-wide transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Direct Online Application</span>
              <span className="text-xs opacity-75">↗</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN ADMISSIONS PAGE COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function AdmissionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.14], ["0%", "25%"]);

  return (
    <main className="bg-[#F8FAFF] text-[#0A2540] min-h-screen">
      {/* ── TOP READING PROGRESS BAR ────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#781428] to-[#1E3A8A] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── HERO BANNER (Architectural campus heritage + blue/burgundy palette) ── */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[76vh] flex items-center bg-[#071738]">
        {/* Real campus photo with authentic blue/burgundy blend */}
        <div className="absolute inset-0">
          <img
            src="/admissions-hero-campus.jpg"
            alt="Baldwin Girls' High School Campus"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Authentic multi-layer gradient overlay (same color system as AcademicsPage) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071738]/94 via-[#0F2563]/82 to-[#781428]/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#081836]/40 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-transparent to-[#071738]/70" />
        </div>

        {/* Ambient dot matrix grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#93C5FD 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 w-full"
        >
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-300">Admissions 2026–27</span>
            </div>

            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
                Admissions Open · Academic Year 2026–2027
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-serif font-black text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight text-white"
            >
              Admissions at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-amber-200 to-amber-300">
                Baldwin Girls
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl font-normal"
            >
              From the joyful first steps in Pre-Kindergarten to the distinction-grade rigour of the ICSE board examinations,
              empowering young women with character, courage, and scholarly excellence since 1880.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="https://portal.baldwingirls.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#781428] hover:bg-[#8B0000] text-white text-sm font-bold px-7 py-3.5 shadow-xl hover:shadow-rose-900/40 transition-all active:scale-95 group"
              >
                <span>Apply Online 2026–27</span>
                <Icon.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+919148780138"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold px-5 py-3.5 backdrop-blur-sm transition-all"
              >
                <Icon.Phone className="w-4 h-4 text-amber-300" />
                <span>+91 91487 80138</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold px-5 py-3.5 backdrop-blur-sm transition-all"
              >
                <Icon.Building className="w-4 h-4 text-blue-200" />
                <span>Schedule Campus Tour</span>
              </Link>
            </motion.div>
          </div>

          {/* School-Wide Stat Bar (matching AcademicsPage format) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
          >
            {stats.map(({ value, label, IconComp }) => (
              <div key={label} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-4 text-center">
                <IconComp className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                <div className="font-serif font-black text-2xl text-white">{value}</div>
                <div className="text-xs text-white/70 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── NOTICE RIBBON (High-contrast royal blue) ──────────────────────── */}
      <section className="bg-[#1E3A8A] text-white border-y border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span>Direct Admissions for Pre-KG, LKG, UKG and Standard I are currently being processed.</span>
          </div>
          <a
            href="https://portal.baldwingirls.edu.in/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 font-bold text-amber-200 hover:text-white transition-colors"
          >
            Access Admission Portal & Track Application Status &rarr;
          </a>
        </div>
      </section>

      {/* ── PARENT-FIRST PROMISE SECTION (Crisp white with burgundy accents) ── */}
      <section className="py-20 lg:py-28 bg-white relative">
        <FloatingBackground />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#781428] border border-rose-200 mb-3">
              The Baldwin Covenant
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              The Parent-First Promise
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Choosing a school is among the most consequential decisions for your daughter.
              Here is what every Baldwin family can count upon unconditionally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {parentPromises.map((p, i) => {
              const { icon: PIcon } = p;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        <PIcon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-300">{p.num}</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-2 leading-snug group-hover:text-[#1E3A8A] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#781428] mt-6" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIVISION-WISE GUIDELINES (Real photos, clean school styling) ───── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFF] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#1E3A8A] border border-blue-200 mb-3">
              Comprehensive Enrollment Structure
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              Division-Wise Guidelines
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Tailored learning environments from Pre-Primary through High School. Learn about daily schedules, curriculum focus, and admission criteria.
            </p>
          </div>

          <div className="space-y-12">
            {divisions.map((d, index) => (
              <motion.div
                key={d.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={index}
                className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden"
              >
                {/* Header Strip */}
                <div className={`h-2 w-full bg-gradient-to-r ${d.headerColor}`} />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-2 ${d.badgeColor}`}>
                          {d.badge}
                        </span>
                        <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#0A2540]">{d.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.summary}</p>
                      </div>

                      {/* Timings Callout */}
                      <div className="flex items-center gap-3 rounded-2xl bg-blue-50/70 border border-blue-100 p-4">
                        <Icon.Clock className="w-5 h-5 text-[#1E3A8A] shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">Official Class Timings</div>
                          <div className="text-sm font-semibold text-slate-800">{d.timings}</div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Academic & Developmental Highlights</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {d.highlights.map((h) => (
                            <div key={h} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <Icon.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Admission Pathway Steps */}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Admission Pathway</div>
                        <div className="space-y-1.5">
                          {d.steps.map((st, sidx) => (
                            <div key={st} className="flex items-center gap-3 text-xs text-slate-600">
                              <span className="h-5 w-5 rounded-full bg-slate-100 font-bold text-[#1E3A8A] flex items-center justify-center shrink-0 text-[10px]">
                                {sidx + 1}
                              </span>
                              <span>{st}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right photo & CTA (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-between gap-5 h-full">
                      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-100">
                        <img
                          src={d.image}
                          alt={`${d.title} at Baldwin Girls`}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="w-full flex flex-col sm:flex-row gap-3">
                        <a
                          href="https://portal.baldwingirls.edu.in/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-xl bg-[#781428] hover:bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 text-center transition-colors shadow-sm"
                        >
                          Enquire For {d.badge}
                        </a>
                        <Link
                          to="/academics"
                          className="rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A2540] text-xs font-bold uppercase tracking-wider py-3.5 px-4 text-center transition-colors"
                        >
                          View Curriculum
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP ROADMAP (Royal Blue & Burgundy Badges) ───────────── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#781428] border border-rose-200 mb-3">
              Application Timeline
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              4 Steps to Enrolment
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Transparent, professional, and family-friendly from your first enquiry through the issuance of your official admission certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsRoadmap.map((s, idx) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="relative rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`h-12 w-12 rounded-2xl ${s.color} text-white font-serif font-black text-lg flex items-center justify-center mb-5 shadow-md`}>
                    {s.step}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                  <span>Phase {s.step}</span>
                  <Icon.ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-500">
              * Note: Once admission is granted, parents are requested to complete formal seat confirmation within <strong>10 working days</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── AGE & CLASS ELIGIBILITY TABLE (Executive Academic Styling) ─────── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFF] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#1E3A8A] border border-blue-200 mb-3">
              Official Guidelines
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              Age & Class Eligibility Matrix
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Calculated strictly as on <strong>1st June of the year of admission</strong>. Verified against the official municipal birth certificate.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1E3A8A] text-white text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold">Class / Academic Division</th>
                    <th className="py-4 px-6 font-bold">Minimum Age</th>
                    <th className="py-4 px-6 font-bold hidden sm:table-cell">Official Cut-Off Criterion</th>
                    <th className="py-4 px-6 font-bold">Academic Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {ageEligibilityData.map((row, idx) => (
                    <tr
                      key={row.grade}
                      className={`hover:bg-blue-50/40 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                    >
                      <td className="py-4 px-6 font-bold text-[#0A2540]">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#781428]" />
                          <span>{row.grade}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#781428] border border-rose-200">
                          {row.age}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs hidden sm:table-cell">
                        {row.cutOff}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold text-[#1E3A8A]">
                          {row.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>* Age relaxation is not permitted under Council for the ICSE guidelines.</span>
              <a href="tel:+919148780138" className="font-bold text-[#1E3A8A] hover:underline">
                Have questions regarding age cut-offs? Call +91 91487 80138
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REQUIRED DOCUMENTS CHECKLIST ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left intro & office notice (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#781428] border border-rose-200 mb-3">
                  Checklist for Enrolment
                </span>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#0A2540] tracking-tight">
                  Required Documents
                </h2>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Please keep self-attested photocopies along with original documents ready for physical verification.
                  Missing documents may be submitted subsequently upon intimation to the admissions desk.
                </p>
              </div>

              {/* Office hours card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A2540] text-white p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Icon.Calendar className="w-5 h-5 text-amber-300" />
                  <h3 className="font-serif font-bold text-lg">Admissions Desk Hours</h3>
                </div>
                <div className="space-y-2.5 text-xs text-white/80 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Monday to Friday:</span>
                    <span className="font-bold text-white">8:15 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-bold text-white">8:15 AM – 12:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday & Public Holidays:</span>
                    <span className="text-amber-200 font-semibold">Closed</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/70">
                  <strong className="text-white">Desk Location:</strong> Administrative Office, Baldwin Girls' High School, #90 Richmond Road, Bengaluru.
                </div>
              </div>
            </div>

            {/* Right document cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {documentList.map((doc, idx) => (
                <div
                  key={doc.title}
                  className="rounded-2xl bg-[#F8FAFF] border border-slate-200 p-4 hover:border-blue-300 hover:bg-white transition-all shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-lg bg-[#781428] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#0A2540]">{doc.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">{doc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ADMISSIONS ENQUIRY PORTAL ─────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F1F5F9] border-t border-slate-200" id="enquiry">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#1E3A8A] border border-blue-200 mb-3">
              Direct Contact
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              Admissions Enquiry Desk
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Connect with our admissions counsellors or submit a callback request. We are here to guide your family with care and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Admissions Office Hub (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl bg-[#1E3A8A] text-white p-7 sm:p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Icon.School className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-xl leading-tight">Admissions Office</h3>
                    <p className="text-xs text-white/70">Baldwin Girls' High School</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-white/85 border-t border-white/15 pt-5">
                  <div className="flex items-start gap-3">
                    <Icon.MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-xs uppercase tracking-wider">Campus Address</div>
                      <p className="text-xs text-white/80 mt-0.5">#90, Richmond Road, Bengaluru, Karnataka – 560025</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon.Phone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-xs uppercase tracking-wider">Admissions Helpline</div>
                      <a href="tel:+919148780138" className="text-xs font-bold text-white hover:text-amber-300 transition-colors">
                        +91 91487 80138
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon.Mail className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-xs uppercase tracking-wider">Official Email</div>
                      <a href="mailto:baldwingirls@gmail.com" className="text-xs text-white/80 hover:text-white transition-colors">
                        baldwingirls@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/15">
                  <a
                    href="https://portal.baldwingirls.edu.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center rounded-xl bg-[#781428] hover:bg-[#8B0000] text-white font-bold py-3 text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Open Student Portal &rarr;
                  </a>
                </div>
              </div>

              {/* Security & Accreditation Seal */}
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex items-center gap-3.5">
                <Icon.ShieldCheck className="w-8 h-8 text-[#781428] shrink-0" />
                <div>
                  <div className="font-serif font-bold text-xs text-[#0A2540]">Affiliated to CISCE, New Delhi</div>
                  <div className="text-[11px] text-slate-500">School Code: KA006 · Est. 1880</div>
                </div>
              </div>
            </div>

            {/* Right Callback Form (8 cols) */}
            <div className="lg:col-span-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (Accordion) ────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-[#781428] border border-rose-200 mb-3">
              Common Parent Inquiries
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A2540] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Clear answers to the most common questions regarding enrollment, curriculum, documentation, and campus life.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen ? "border-[#1E3A8A] bg-blue-50/20 shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-[#0A2540] flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isOpen ? "bg-[#1E3A8A] text-white" : "bg-slate-100 text-slate-600"}`}>
                        0{idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <Icon.ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#1E3A8A]" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL ADMISSIONS CTA BANNER (Rich Burgundy Heritage Ribbon) ───── */}
      <section className="bg-gradient-to-r from-[#781428] via-[#881337] to-[#500717] text-white py-16 lg:py-20 relative overflow-hidden">
        {/* Subtle patterned overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-amber-200 border border-white/20 mb-3">
                Begin Her Baldwin Story
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Ready to Join Our Community?
              </h2>
              <p className="mt-3 text-base text-white/80 leading-relaxed">
                Direct admissions for 2026–27 are now open. Speak to our admissions counsellors or visit our historic Richmond Road campus.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="https://portal.baldwingirls.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white text-[#781428] hover:bg-slate-100 px-8 py-4 font-bold text-sm tracking-wide transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Apply Online Now &rarr;
              </a>
              <a
                href="tel:+919148780138"
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-4 font-bold text-sm tracking-wide transition-all"
              >
                Call +91 91487 80138
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER OFFICE STRIP (Deep Navy Royal Blue) ────────────────────── */}
      <section className="bg-[#071738] text-white py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-white/70">
            <div>
              <div className="font-serif font-bold text-sm text-white mb-1">Baldwin Girls' High School</div>
              <p>#90, Richmond Road, Bengaluru, Karnataka 560025</p>
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-1">Admissions Helpline</div>
              <p>Phone: +91 91487 80138 / 080 2221 1743</p>
              <p>Email: baldwingirls@gmail.com</p>
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-1">Office Timings</div>
              <p>Mon – Fri: 8:15 AM – 3:00 PM</p>
              <p>Saturday: 8:15 AM – 12:30 PM</p>
            </div>
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-1">Official Portals</div>
              <p><a href="https://portal.baldwingirls.edu.in/" target="_blank" rel="noreferrer" className="hover:text-white underline">Admission Portal</a></p>
              <p><a href="https://transport.baldwingirls.edu.in/" target="_blank" rel="noreferrer" className="hover:text-white underline">School Transport Portal</a></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
