import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { school } from "./data";

/* ─────────────────────────────────────────────────────────────
   COLOUR TOKENS
   Blue:     #1E3A8A (dark) / #3B82F6 (mid) / #DBEAFE (light)
   Burgundy: #781428 (dark) / #9F1239 (mid) / #FFE4E6 (light)
   White, Slate for body text
───────────────────────────────────────────────────────────── */

// ── Floating particle background (SVG-based, pure CSS animation) ──
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {/* Large blurred blobs */}
    <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
    <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-[#781428]/20 blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/5 blur-[80px]" />

    {/* Dot grid */}
    <div className="absolute inset-0 opacity-10"
      style={{ backgroundImage: "radial-gradient(#93C5FD 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

    {/* Floating SVG icons */}
    {[
      { icon: "📚", top: "12%", left: "8%", delay: "0s", dur: "6s" },
      { icon: "🎓", top: "75%", left: "5%", delay: "1s", dur: "7s" },
      { icon: "🔬", top: "30%", left: "90%", delay: "0.5s", dur: "8s" },
      { icon: "✏️", top: "65%", left: "88%", delay: "2s", dur: "5s" },
      { icon: "🌟", top: "20%", left: "50%", delay: "1.5s", dur: "9s" },
      { icon: "📐", top: "85%", left: "50%", delay: "0.8s", dur: "6s" },
    ].map((f, i) => (
      <span
        key={i}
        className="absolute text-3xl opacity-10"
        style={{
          top: f.top,
          left: f.left,
          animation: `float ${f.dur} ease-in-out infinite`,
          animationDelay: f.delay,
        }}
      >
        {f.icon}
      </span>
    ))}
  </div>
);

// ── Inline float animation via <style> ──
const FloatStyle = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-18px) rotate(6deg); }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-slide-up { animation: fadeSlideUp 0.6s ease both; }
    .fade-slide-up-delay-1 { animation: fadeSlideUp 0.6s 0.15s ease both; }
    .fade-slide-up-delay-2 { animation: fadeSlideUp 0.6s 0.3s ease both; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// ── Badge component ──
const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    burgundy: "bg-rose-100 text-[#781428] border-rose-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${colorMap[color]}`}>
      {children}
    </span>
  );
};

// ── Subject pill ──
const SubjectPill = ({ label }: { label: string }) => (
  <span className="px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-900 text-xs font-semibold shadow-sm hover:bg-blue-50 transition-colors">
    {label}
  </span>
);

// ── Stat card ──
const StatCard = ({ value, label, icon }: { value: string; label: string; icon: string }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 p-5 shadow-sm text-center">
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-2xl font-black text-[#1E3A8A] font-serif">{value}</span>
    <span className="text-xs text-slate-500 mt-0.5">{label}</span>
  </div>
);

// ── Highlight pill ──
const Highlight = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex items-start gap-3 rounded-xl bg-white border border-slate-100 p-3.5 shadow-sm">
    <span className="text-xl mt-0.5 shrink-0">{icon}</span>
    <span className="text-sm text-slate-700 leading-snug">{label}</span>
  </div>
);

// ══════════════════════════════════════════════════════════════
//  SECTION DATA
// ══════════════════════════════════════════════════════════════
const SECTIONS = [
  {
    id: "pre-primary",
    emoji: "🌟",
    label: "Pre-Primary",
    shortLabel: "Pre-Primary",
    grades: "Pre-KG · LKG · UKG · Std I & II",
    tagline: "Where curiosity takes its first joyful step.",
    badgeColor: "amber",
    accentFrom: "from-amber-500",
    accentTo: "to-orange-400",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    accentText: "text-amber-700",
    image: `${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`,
    description: `The Pre‑Primary wing at Baldwin Girls' High School is the foundation of every child's academic journey. Spanning Pre‑KG through Standard II, this stage prioritises joyful, play‑based, and thematic learning. Children develop language, motor, and social skills in a warm, nurturing environment designed to spark a lifelong love of learning.`,
    timings: [
      { label: "Pre-KG, LKG & UKG", time: "8:15 am – 12:05 pm" },
      { label: "Standard I & II", time: "8:15 am – 2:30 pm" },
    ],
    highlights: [
      { icon: "🧩", label: "Thematic, activity-based curriculum with hands-on projects" },
      { icon: "🎨", label: "Art, craft, music and dance woven into daily routines" },
      { icon: "📖", label: "Phonics and early literacy in English, Hindi & Kannada" },
      { icon: "🏃", label: "Physical games, yoga and outdoor exploration every day" },
      { icon: "💻", label: "Introduction to computers through interactive play" },
      { icon: "🌱", label: "Social-emotional learning and mindfulness practices" },
    ],
    subjects: [
      "English Language", "Number Work", "Environmental Studies",
      "Rhymes & Conversation", "Art & Craft", "Kannada",
      "Hindi", "Mathematics", "Computers", "Physical Education",
    ],
    stats: [
      { value: "< 20", label: "Students per class", icon: "👩‍🏫" },
      { value: "5", label: "Grade levels", icon: "📚" },
      { value: "100%", label: "Activity-based", icon: "🎯" },
    ],
    pillars: [
      {
        num: "01",
        title: "Foundational Motor Skills",
        body: "Fine and gross motor development through craft, music, dance, and structured outdoor play that prepares children for formal learning.",
        color: "text-amber-600",
      },
      {
        num: "02",
        title: "Language & Literacy",
        body: "English, Hindi and Kannada are introduced early through storytelling, phonics games and rhymes, building strong multilingual foundations.",
        color: "text-blue-600",
      },
      {
        num: "03",
        title: "Creative Exploration",
        body: "Art, craft and imaginative play sessions every day that nurture self-expression, problem-solving and aesthetic sensibility.",
        color: "text-orange-600",
      },
    ],
  },
  {
    id: "primary",
    emoji: "🌱",
    label: "Primary School",
    shortLabel: "Primary",
    grades: "Standard III · IV · V",
    tagline: "Building curiosity into confident knowledge.",
    badgeColor: "emerald",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    accentText: "text-emerald-700",
    image: `${school}/static/media/schoolgirl2.28b8d7d780b54e871138.png`,
    description: `The Primary School years at Baldwin Girls are years of discovery and wonder. Standards III through V build strong academic foundations with a balanced mix of classroom teaching, computer labs, library exploration, and collaborative group projects. Subject-specific teachers from Standard III onward ensure depth of expertise.`,
    timings: [
      { label: "Standard III – V", time: "8:15 am – 3:00 pm" },
    ],
    highlights: [
      { icon: "🧮", label: "Deep dive into Mathematics with mental arithmetic and logic puzzles" },
      { icon: "🌍", label: "Social Studies and Environmental Science with field studies" },
      { icon: "🖊️", label: "Creative writing, comprehension and debate workshops" },
      { icon: "🔭", label: "Introduction to General Science with lab demonstrations" },
      { icon: "🎭", label: "Annual cultural programmes, elocution & quiz competitions" },
      { icon: "💻", label: "Computer literacy with MS Office and basic programming" },
    ],
    subjects: [
      "English Language", "English Literature",
      "Kannada", "Hindi", "Mathematics",
      "General Science", "Social Studies",
      "Computers", "Art & Craft", "Physical Education",
    ],
    stats: [
      { value: "30+", label: "Co-curricular clubs", icon: "🏆" },
      { value: "3", label: "Language mediums", icon: "🌏" },
      { value: "5", label: "Lab sessions/week", icon: "🔬" },
    ],
    pillars: [
      {
        num: "01",
        title: "Conceptual Understanding",
        body: "Interactive teaching methodologies that move beyond rote learning to build genuine understanding through real-world context and experimentation.",
        color: "text-emerald-600",
      },
      {
        num: "02",
        title: "Moral & Value Education",
        body: "Daily assemblies and value classes instil empathy, integrity, teamwork, and civic responsibility alongside academic learning.",
        color: "text-blue-600",
      },
      {
        num: "03",
        title: "Co-Curricular Flourishing",
        body: "Sports days, science fairs, cultural festivals and inter-school competitions ensure every child finds her arena of excellence.",
        color: "text-teal-600",
      },
    ],
  },
  {
    id: "middle-school",
    emoji: "🔬",
    label: "Middle School",
    shortLabel: "Middle School",
    grades: "Standard VI · VII · VIII",
    tagline: "Where thinking becomes analytical and deep.",
    badgeColor: "indigo",
    accentFrom: "from-indigo-600",
    accentTo: "to-purple-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
    image: `${school}/static/media/schoolgirl3.240a9001c710ecb41af8.png`,
    description: `Middle School marks a pivotal transition into specialist subject teaching and independent reasoning. Standards VI through VIII introduce students to dedicated Physics, Chemistry, Biology and Computer laboratories. Guided by passionate subject experts, students develop research skills, scientific temperament, and intellectual confidence in preparation for the high-stakes ICSE years.`,
    timings: [
      { label: "Standard VI – VIII", time: "8:15 am – 3:00 pm" },
      { label: "Practical Labs", time: "Weekly — Physics, Chem, Bio & Computers" },
    ],
    highlights: [
      { icon: "⚗️", label: "Dedicated Physics, Chemistry & Biology laboratories" },
      { icon: "🤖", label: "STEM robotics, coding and AI electives from Std VII" },
      { icon: "📊", label: "Statistics, algebra and advanced geometry in Mathematics" },
      { icon: "🌐", label: "Geography, History & Civics with global perspectives" },
      { icon: "🗣️", label: "Public speaking, MUN and inter-school debate programmes" },
      { icon: "📝", label: "Research projects, science fairs and investigative reports" },
    ],
    subjects: [
      "English Language", "English Literature",
      "Second Language (Hindi / Kannada)",
      "Third Language (optional)",
      "Mathematics", "Physics", "Chemistry", "Biology",
      "History & Civics", "Geography", "Computer Applications",
    ],
    stats: [
      { value: "4", label: "Dedicated labs", icon: "🔬" },
      { value: "85%+", label: "Score in assessments", icon: "📈" },
      { value: "50+", label: "Annual competitions", icon: "🏅" },
    ],
    pillars: [
      {
        num: "01",
        title: "Specialist Lab Science",
        body: "Students shift from general science to fully equipped, separate Physics, Chemistry and Biology labs with weekly practicals.",
        color: "text-indigo-600",
      },
      {
        num: "02",
        title: "Critical & Analytical Thinking",
        body: "Structured exercises in mathematical reasoning, literary analysis, and scientific enquiry prepare students for the rigour of board exams.",
        color: "text-purple-600",
      },
      {
        num: "03",
        title: "Leadership & Communication",
        body: "MUN, elocution, school council and inter-school programmes build the confidence and leadership skills that define a Baldwin girl.",
        color: "text-blue-600",
      },
    ],
  },
  {
    id: "high-school",
    emoji: "🎓",
    label: "High School",
    shortLabel: "High School",
    grades: "Standard IX · X (ICSE / CISCE)",
    tagline: "Excellence measured in distinction.",
    badgeColor: "burgundy",
    accentFrom: "from-[#781428]",
    accentTo: "to-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-200",
    accentText: "text-[#781428]",
    image: `${school}/static/media/schoolgirl4.ccbd076afeb2ad1259de.png`,
    description: `The High School years are the culmination of a Baldwin girl's academic journey. Governed by the Council for the Indian School Certificate Examinations (CISCE), New Delhi, our Standards IX and X offer rigorous board preparation through intensive revision, mock evaluations, and one-on-one faculty mentorship. Baldwin Girls' High School has consistently achieved a 100% board pass rate with over 85% of students earning Distinction.`,
    timings: [
      { label: "Standard IX & X", time: "8:15 am – 3:30 pm" },
      { label: "Revision / Extra classes", time: "By schedule — 7:30 am or 4:00 pm" },
    ],
    highlights: [
      { icon: "📋", label: "Structured mock exam cycle with detailed performance analytics" },
      { icon: "👩‍🏫", label: "Dedicated ICSE subject specialist faculty per paper" },
      { icon: "🏆", label: "100% board pass rate every year for over three decades" },
      { icon: "🌟", label: "School toppers consistently scoring 95%+ in ICSE" },
      { icon: "🎯", label: "Individual student counselling and career guidance sessions" },
      { icon: "🤝", label: "Peer tutoring, study circles and doubt-clearing workshops" },
    ],
    subjects: [
      "English Language", "English Literature",
      "Second Language (Hindi / Kannada)",
      "History, Civics & Geography",
      "Mathematics", "Physics", "Chemistry", "Biology",
      "Computer Applications",
      "Commercial Studies / Home Science (elective)",
    ],
    stats: [
      { value: "100%", label: "ICSE pass rate", icon: "🏆" },
      { value: "85%+", label: "Students with Distinction", icon: "🌟" },
      { value: "99%", label: "School topper score", icon: "🎯" },
    ],
    pillars: [
      {
        num: "01",
        title: "Proven Academic Track Record",
        body: "Three consecutive decades of 100% ICSE pass rate, with school toppers regularly ranking among the top in Karnataka and nationally.",
        color: "text-[#781428]",
      },
      {
        num: "02",
        title: "Board Preparation System",
        body: "A structured calendar of chapter tests, term exams, pre-board mocks, and answer-script reviews ensures zero surprises on exam day.",
        color: "text-blue-600",
      },
      {
        num: "03",
        title: "Pre-University Mentorship",
        body: "Personalised career counselling, university guidance, and leadership workshops prepare students for life beyond the ICSE board.",
        color: "text-rose-700",
      },
    ],
  },
  {
    id: "curriculum-framework",
    emoji: "📑",
    label: "ICSE Framework",
    shortLabel: "ICSE",
    grades: "CISCE Groups I, II & III",
    tagline: "A holistic, balanced and rigorous curriculum.",
    badgeColor: "blue",
    accentFrom: "from-blue-700",
    accentTo: "to-cyan-500",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    accentText: "text-blue-700",
    image: `${school}/static/media/schoolgirl1.f2a6dd0396cf9faa22cb.png`,
    description: `The ICSE (Indian Certificate of Secondary Education) curriculum is administered by the Council for the Indian School Certificate Examinations (CISCE), New Delhi. It is globally recognized for its breadth and rigour. The curriculum is divided into three subject groups ensuring every student graduates with strong language, scientific, mathematical, and applied skills.`,
    timings: [],
    highlights: [
      { icon: "📘", label: "Group I: Compulsory English, Second Language & Social Sciences" },
      { icon: "🔬", label: "Group II: Sciences (Physics, Chemistry, Biology) and Mathematics" },
      { icon: "💡", label: "Group III: Electives — Computer Applications, Robotics, Home Science" },
      { icon: "✍️", label: "Project-based Internal Assessment — 20% of final grade" },
      { icon: "🌍", label: "Global recognition — accepted by universities worldwide" },
      { icon: "📊", label: "Comprehensive grading across written, oral and practical components" },
    ],
    subjects: [],
    stats: [
      { value: "3", label: "Subject groups", icon: "📚" },
      { value: "10+", label: "Papers offered", icon: "📝" },
      { value: "Global", label: "Recognition", icon: "🌍" },
    ],
    pillars: [
      {
        num: "Group I",
        title: "Core Foundations (Compulsory)",
        body: "English Language & Literature, Second Language (Hindi or Kannada), History & Civics, Geography.",
        color: "text-blue-600",
      },
      {
        num: "Group II",
        title: "Sciences & Mathematics",
        body: "Mathematics, Physics, Chemistry, Biology — with lab practicals counting toward final assessment.",
        color: "text-indigo-600",
      },
      {
        num: "Group III",
        title: "Elective Specialisations",
        body: "Computer Applications (Java), Robotics & AI, Home Science, Commercial Studies — students choose one.",
        color: "text-cyan-600",
      },
    ],
  },
];

// ══════════════════════════════════════════════════════════════
//  SECTION CARD – detailed content block
// ══════════════════════════════════════════════════════════════
function SectionCard({ section }: { section: typeof SECTIONS[0] }) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="scroll-mt-28"
    >
      {/* Card wrapper */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">

        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${section.accentFrom} ${section.accentTo}`} />

        {/* Header band */}
        <div className={`${section.accentBg} border-b ${section.accentBorder} px-6 sm:px-8 py-6`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{section.emoji}</span>
                <Badge color={section.badgeColor}>{section.grades}</Badge>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A2540] tracking-tight leading-tight">
                {section.label}
              </h2>
              <p className={`mt-1 text-sm font-medium italic ${section.accentText}`}>
                "{section.tagline}"
              </p>
            </div>
            {/* Stat row */}
            <div className="flex gap-3 flex-wrap">
              {section.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-3 min-w-[80px]"
                >
                  <span className="text-xl mb-0.5">{s.icon}</span>
                  <span className="font-black text-lg text-[#1E3A8A] font-serif leading-none">{s.value}</span>
                  <span className="text-[10px] text-slate-500 text-center leading-tight mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-10">

          {/* Overview + photo */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            {/* Text */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-base text-slate-600 leading-relaxed">{section.description}</p>

              {/* Timings block */}
              {section.timings.length > 0 && (
                <div className={`rounded-2xl ${section.accentBg} border ${section.accentBorder} p-5`}>
                  <p className={`text-xs font-bold uppercase tracking-widest ${section.accentText} mb-3`}>
                    ⏰ School Timings
                  </p>
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

            {/* Photo */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-100">
              <img
                src={section.image}
                alt={`${section.label} students at Baldwin Girls`}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Highlights grid */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-4">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.highlights.map((h) => (
                <Highlight key={h.label} icon={h.icon} label={h.label} />
              ))}
            </div>
          </div>

          {/* Three pillars */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-4">
              Academic Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {section.pillars.map((p) => (
                <div
                  key={p.num}
                  className="rounded-2xl bg-slate-50 border border-slate-100 p-5 hover:shadow-md transition-shadow"
                >
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
              <h3 className="font-serif font-bold text-lg text-[#0A2540] mb-3">
                Curricular Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.subjects.map((s) => (
                  <SubjectPill key={s} label={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function AcademicsPage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("pre-primary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], ["0%", "30%"]);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
      }, 100);
    }
  }, [location.hash]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sec.id);
          }
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

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2563] via-[#1E3A8A] to-[#781428]" />
          <AnimatedBackground />

          {/* Hero content */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 w-full"
          >
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 mb-6"
              >
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
                  Academic Excellence Since 1880
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif font-black text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight text-white"
              >
                Academics at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-amber-300">
                  Baldwin Girls
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
              >
                From the first playful steps of Pre‑Primary through the distinction‑grade rigour of ICSE,
                every Baldwin girl is nurtured to discover her fullest potential.
              </motion.p>

              {/* Quick section links */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 transition-all duration-200 font-medium"
                  >
                    <span>{s.emoji}</span> {s.shortLabel}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* School-wide stats */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            >
              {[
                { value: "140+", label: "Years of excellence", icon: "🏛️" },
                { value: "100%", label: "ICSE pass rate", icon: "🏆" },
                { value: "85%+", label: "Students with Distinction", icon: "🌟" },
                { value: "2000+", label: "Students enrolled", icon: "👩‍🎓" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-4 text-center"
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-serif font-black text-2xl text-white">{s.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── PROGRESS BAR ───────────────────────────────────────────── */}
        <motion.div
          className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-[#781428] z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* ── MOBILE SIDEBAR TOGGLE ──────────────────────────────────── */}
        <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <span className="text-sm font-bold text-[#1E3A8A]">
            {SECTIONS.find((s) => s.id === activeSection)?.emoji}{" "}
            {SECTIONS.find((s) => s.id === activeSection)?.label}
          </span>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-xs font-bold text-[#781428] border border-[#781428] rounded-lg px-3 py-1.5"
          >
            All Sections ↕
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden fixed top-28 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-1"
            >
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === s.id
                      ? "bg-[#1E3A8A] text-white font-bold"
                      : "text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  <span>{s.emoji}</span>
                  <div>
                    <div>{s.label}</div>
                    <div className="text-[11px] opacity-60">{s.grades}</div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN BODY ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 flex gap-10 items-start">

          {/* ── STICKY LEFT SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
            {/* Nav card */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              {/* Sidebar header */}
              <div className="bg-gradient-to-br from-[#1E3A8A] to-[#781428] px-5 py-5 text-white">
                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-blue-200 mb-1">
                  Navigate
                </div>
                <div className="font-serif font-black text-xl text-white leading-tight">
                  Academic Sections
                </div>
                <p className="text-xs text-white/60 mt-1">Click a section to explore</p>
              </div>

              {/* Nav links */}
              <nav className="bg-white p-3 space-y-1">
                {SECTIONS.map((s, i) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-3 text-left px-3.5 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-md shadow-blue-200"
                          : "text-slate-700 hover:bg-blue-50 hover:text-[#1E3A8A]"
                      }`}
                    >
                      {/* Number */}
                      <span className={`text-[11px] font-black w-5 shrink-0 ${isActive ? "text-white/60" : "text-slate-400"}`}>
                        0{i + 1}
                      </span>
                      {/* Icon */}
                      <span className="text-base">{s.emoji}</span>
                      {/* Label */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${isActive ? "text-white" : ""}`}>
                          {s.label}
                        </p>
                        <p className={`text-[10px] truncate mt-0.5 ${isActive ? "text-white/60" : "text-slate-400"}`}>
                          {s.grades}
                        </p>
                      </div>
                      {isActive && <span className="text-white/80 text-xs">→</span>}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Admissions CTA card */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white p-5">
              <div className="text-xs font-bold tracking-widest uppercase text-amber-300 mb-1">
                Admissions Open
              </div>
              <div className="font-serif font-bold text-lg leading-tight">
                Join Baldwin Girls' Class of 2027
              </div>
              <p className="text-xs text-white/70 mt-2">
                Applications open for Pre-KG through Standard X. Limited seats available.
              </p>
              <Link
                to="/admissions"
                className="mt-4 block text-center bg-amber-400 hover:bg-amber-300 text-[#0A2540] text-sm font-bold rounded-xl py-2.5 transition-colors shadow-sm"
              >
                Apply Online →
              </Link>
              <Link
                to="/contact"
                className="mt-2 block text-center bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl py-2 transition-colors border border-white/20"
              >
                Contact Admissions
              </Link>
            </div>

            {/* School quick facts */}
            <div className="mt-4 rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Facts</p>
              {[
                { label: "Board", value: "CISCE / ICSE" },
                { label: "Medium", value: "English" },
                { label: "Founded", value: "1880" },
                { label: "Campus", value: "7+ acres, Bangalore" },
                { label: "Principal", value: "Ms. Violet Suresh" },
              ].map((f) => (
                <div key={f.label} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-500">{f.label}</span>
                  <span className="text-xs font-bold text-[#1E3A8A]">{f.value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── SECTION CONTENT ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Intro banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="text-4xl">🏫</div>
              <div>
                <h2 className="font-serif font-black text-xl text-[#1E3A8A]">
                  A Curriculum Built for Every Baldwin Girl
                </h2>
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#781428] text-white p-8 sm:p-12 text-center shadow-xl"
            >
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl">
                Ready to become a Baldwin Girl?
              </h3>
              <p className="mt-3 text-white/70 max-w-lg mx-auto text-sm leading-relaxed">
                Join over 2,000 students who experience world-class education in a nurturing, all-girls
                environment that has shaped leaders since 1880.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  to="/admissions"
                  className="rounded-full bg-amber-400 hover:bg-amber-300 text-[#0A2540] px-8 py-3 font-bold text-sm shadow-md transition-colors"
                >
                  Start Your Application →
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 font-medium text-sm transition-colors"
                >
                  Schedule a Campus Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
