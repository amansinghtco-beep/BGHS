import React, { useState, useEffect, useRef } from "react";

export interface LanyardMember {
  id: string;
  name: string;
  role: string;
  team?: string;
  image: string;
  bio?: string;
  tags?: string[];
  tone: 1 | 2 | 3 | 4 | 5;
  score: string;
  rank: number;
  drop: number; // Staggered lanyard length drop
}

interface ChampionCard {
  id: string;
  sport: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  image: string;
  accentColor: string;
}

// Tone configurations: Unified to Baldwin Maroon (#781428) as requested
const MAROON_CONFIG = {
  ribbon: "from-[#8E1830] via-[#781428] to-[#5C0F1E]",
  headerBg: "bg-[#781428]",
  border: "border-[#781428]/40",
  glow: "rgba(120,20,40,0.45)",
  tagBg: "bg-[#5C0F1E]/80 text-rose-200 border-[#781428]/50",
};

const DROPS = [8, 22, 2, 16, 26, 6, 18, 12];

export default function TriumphsSection() {
  const [activeTab, setActiveTab] = useState<"icse" | "champions">("icse");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flippedBadge, setFlippedBadge] = useState<string | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ [id: string]: { x: number; y: number } }>({});
  const [cardsPerFrame, setCardsPerFrame] = useState(6);

  // Responsive frame size: Exactly 6 cards per frame on desktop, scaling cleanly down on smaller viewports
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerFrame(2);
      else if (window.innerWidth < 900) setCardsPerFrame(3);
      else if (window.innerWidth < 1200) setCardsPerFrame(4);
      else if (window.innerWidth < 1400) setCardsPerFrame(5);
      else setCardsPerFrame(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 35 ICSE Toppers with authentic names, scores, and ranks
  const toppers: LanyardMember[] = [
    { id: "1", name: "Yukthi D", role: "School Topper · 99%", team: "BGHS · Merit Star", image: "/students/yukthi-d.png", score: "99%", rank: 1, tone: 1, drop: DROPS[0], bio: "Overall School Topper in ICSE 2025 Board Exams with outstanding distinction across all academic subjects.", tags: ["School Topper", "99% Score", "First Division"] },
    { id: "2", name: "Thanisha R", role: "Rank #2 · 98.6%", team: "BGHS · Science & Math", image: "/students/thanisha-r.png", score: "98.6%", rank: 2, tone: 2, drop: DROPS[1], bio: "Excellence in Mathematics & Sciences with dedicated academic discipline and high honours.", tags: ["Rank #2", "98.6% Score", "Distinction"] },
    { id: "3", name: "Niyati Kumari Kedia", role: "Rank #3 · 98.4%", team: "BGHS · Roll of Honour", image: "/students/niyati-kumari-kedia.png", score: "98.4%", rank: 3, tone: 3, drop: DROPS[2], bio: "Top distinction in Science, Humanities and English language board examinations.", tags: ["Rank #3", "98.4% Score", "Honour Roll"] },
    { id: "4", name: "Jinal", role: "Rank #4 · 98.2%", team: "BGHS · Distinction", image: "/students/jinal.png", score: "98.2%", rank: 4, tone: 4, drop: DROPS[3], bio: "Distinction holder and consistent high-merit scholar throughout secondary school.", tags: ["Rank #4", "98.2% Score", "Distinction"] },
    { id: "5", name: "Shehza Maryam Perveez", role: "Rank #5 · 98%", team: "BGHS · Scholar", image: "/students/shehza-maryam-perveez.png", score: "98%", rank: 5, tone: 5, drop: DROPS[4], bio: "High academic distinction and leadership across ICSE curriculum studies.", tags: ["Rank #5", "98% Score", "Merit Star"] },
    { id: "6", name: "Anushka G A", role: "Rank #6 · 97.2%", team: "BGHS · Science", image: "/students/anushka-g-a.png", score: "97.2%", rank: 6, tone: 2, drop: DROPS[5], bio: "Distinction in Board Examinations with exceptional marks in Science and Arts.", tags: ["Rank #6", "97.2% Score", "Distinction"] },
    { id: "7", name: "Tanisha Vinay", role: "Rank #7 · 97.2%", team: "BGHS · Distinction", image: "/students/tanisha-vinay.png", score: "97.2%", rank: 7, tone: 1, drop: DROPS[6], bio: "Academic excellence and dedication leading to outstanding board distinction.", tags: ["Rank #7", "97.2% Score", "Distinction"] },
    { id: "8", name: "Rishika R", role: "Rank #8 · 97.2%", team: "BGHS · Scholar", image: "/students/rishika-r.png", score: "97.2%", rank: 8, tone: 3, drop: DROPS[7], bio: "Outstanding performance in ICSE board exam with all-round brilliance.", tags: ["Rank #8", "97.2% Score", "Distinction"] },
    { id: "9", name: "S Bhavana", role: "Rank #9 · 96.8%", team: "BGHS · Distinction", image: "/students/s-bhavana.png", score: "96.8%", rank: 9, tone: 2, drop: DROPS[0], bio: "Consistent distinction performer with stellar scores in languages and sciences.", tags: ["Rank #9", "96.8% Score", "Distinction"] },
    { id: "10", name: "Vaibhavi Joshi", role: "Rank #10 · 96.8%", team: "BGHS · Science", image: "/students/vaibhavi-joshi.png", score: "96.8%", rank: 10, tone: 4, drop: DROPS[1], bio: "Excellence in mathematics, scientific reasoning and languages.", tags: ["Rank #10", "96.8% Score", "Distinction"] },
    { id: "11", name: "Aditi A Jain", role: "Rank #11 · 96.8%", team: "BGHS · Distinction", image: "/students/aditi-a-jain.png", score: "96.8%", rank: 11, tone: 5, drop: DROPS[2], bio: "Top-tier distinction laureate upholding Baldwin's heritage of excellence.", tags: ["Rank #11", "96.8% Score", "Distinction"] },
    { id: "12", name: "Jiya L Jain", role: "Rank #12 · 96.8%", team: "BGHS · Distinction", image: "/students/jiya-l-jain.png", score: "96.8%", rank: 12, tone: 1, drop: DROPS[3], bio: "High score distinction in Class X ICSE board examination.", tags: ["Rank #12", "96.8% Score", "Distinction"] },
    { id: "13", name: "Joyce K", role: "Rank #13 · 96.8%", team: "BGHS · Distinction", image: "/students/joyce-k.png", score: "96.8%", rank: 13, tone: 3, drop: DROPS[4], bio: "Stellar performance in academics and extracurricular commitments.", tags: ["Rank #13", "96.8% Score", "Distinction"] },
    { id: "14", name: "Sakshi Sisodia", role: "Rank #14 · 96.6%", team: "BGHS · Science", image: "/students/sakshi-sisodia.png", score: "96.6%", rank: 14, tone: 2, drop: DROPS[5], bio: "High distinction in sciences and humanities with dedicated study ethic.", tags: ["Rank #14", "96.6% Score", "Distinction"] },
    { id: "15", name: "I Sheeba Fathima", role: "Rank #15 · 96.6%", team: "BGHS · Distinction", image: "/students/i-sheeba-fathima.png", score: "96.6%", rank: 15, tone: 4, drop: DROPS[6], bio: "Distinction achiever demonstrating analytical and literary excellence.", tags: ["Rank #15", "96.6% Score", "Distinction"] },
    { id: "16", name: "Neksha", role: "Rank #16 · 96.6%", team: "BGHS · Distinction", image: "/students/neksha.png", score: "96.6%", rank: 16, tone: 5, drop: DROPS[7], bio: "Excellence across all ICSE board papers with stellar academic record.", tags: ["Rank #16", "96.6% Score", "Distinction"] },
    { id: "17", name: "Aandrita Ghosh", role: "Rank #17 · 96.6%", team: "BGHS · Scholar", image: "/students/aandrita-ghosh.png", score: "96.6%", rank: 17, tone: 1, drop: DROPS[0], bio: "Distinction laureate with commendable flair in analytical studies.", tags: ["Rank #17", "96.6% Score", "Distinction"] },
    { id: "18", name: "Jasmitha Sridharan", role: "Rank #18 · 96.6%", team: "BGHS · Distinction", image: "/students/jasmitha-sridharan.png", score: "96.6%", rank: 18, tone: 3, drop: DROPS[1], bio: "High achievement distinction in ICSE 2025 examination.", tags: ["Rank #18", "96.6% Score", "Distinction"] },
    { id: "19", name: "S Yazhini", role: "Rank #19 · 96.4%", team: "BGHS · Distinction", image: "/students/s-yazhini.png", score: "96.4%", rank: 19, tone: 2, drop: DROPS[2], bio: "Outstanding board examination performance in Class 10.", tags: ["Rank #19", "96.4% Score", "Distinction"] },
    { id: "20", name: "Alaina Khan", role: "Rank #20 · 96.2%", team: "BGHS · Distinction", image: "/students/alaina-khan.png", score: "96.2%", rank: 20, tone: 4, drop: DROPS[3], bio: "High merit distinction with dedicated scholastic discipline.", tags: ["Rank #20", "96.2% Score", "Distinction"] },
    { id: "21", name: "Tamanna Shekhar", role: "Rank #21 · 96.2%", team: "BGHS · Scholar", image: "/students/tamanna-shekhar.png", score: "96.2%", rank: 21, tone: 5, drop: DROPS[4], bio: "Superb distinction achievement across all subjects in ICSE 2025.", tags: ["Rank #21", "96.2% Score", "Distinction"] },
    { id: "22", name: "Emily Sujay", role: "Rank #22 · 96.2%", team: "BGHS · Distinction", image: "/students/emily-sujay.png", score: "96.2%", rank: 22, tone: 1, drop: DROPS[5], bio: "Distinction laureate representing Baldwinian academic values.", tags: ["Rank #22", "96.2% Score", "Distinction"] },
    { id: "23", name: "Trisha Naveen", role: "Rank #23 · 96.2%", team: "BGHS · Distinction", image: "/students/trisha-naveen.png", score: "96.2%", rank: 23, tone: 3, drop: DROPS[6], bio: "Merit scholar in ICSE examination with consistent excellence.", tags: ["Rank #23", "96.2% Score", "Distinction"] },
    { id: "24", name: "Maanya R", role: "Rank #24 · 96%", team: "BGHS · Distinction", image: "/students/maanya-r.png", score: "96%", rank: 24, tone: 2, drop: DROPS[7], bio: "High distinction honors in Class X ICSE board exams.", tags: ["Rank #24", "96% Score", "Distinction"] },
    { id: "25", name: "Aaheli Dutta", role: "Rank #25 · 96%", team: "BGHS · Scholar", image: "/students/aaheli-dutta.png", score: "96%", rank: 25, tone: 4, drop: DROPS[0], bio: "Distinction scholar with exemplary achievements.", tags: ["Rank #25", "96% Score", "Distinction"] },
    { id: "26", name: "Aanchal Jain N", role: "Rank #26 · 96%", team: "BGHS · Distinction", image: "/students/aanchal-jain-n.png", score: "96%", rank: 26, tone: 5, drop: DROPS[1], bio: "Outstanding distinction in ICSE Board Examination 2025.", tags: ["Rank #26", "96% Score", "Distinction"] },
    { id: "27", name: "Jainy Jain", role: "Rank #27 · 95.8%", team: "BGHS · Science", image: "/students/jainy-jain.png", score: "95.8%", rank: 27, tone: 1, drop: DROPS[2], bio: "Distinction score with high aptitude in scientific concepts.", tags: ["Rank #27", "95.8% Score", "Distinction"] },
    { id: "28", name: "Swara Sudhir", role: "Rank #28 · 95.8%", team: "BGHS · Distinction", image: "/students/swara-sudhir.png", score: "95.8%", rank: 28, tone: 3, drop: DROPS[3], bio: "Commendable distinction across curriculum papers.", tags: ["Rank #28", "95.8% Score", "Distinction"] },
    { id: "29", name: "Amina Imran", role: "Rank #29 · 95.6%", team: "BGHS · Distinction", image: "/students/amina-imran.png", score: "95.6%", rank: 29, tone: 2, drop: DROPS[4], bio: "Distinction marks in ICSE Board examinations.", tags: ["Rank #29", "95.6% Score", "Distinction"] },
    { id: "30", name: "Noor Hafsa", role: "Rank #30 · 95.6%", team: "BGHS · Scholar", image: "/students/noor-hafsa.png", score: "95.6%", rank: 30, tone: 4, drop: DROPS[5], bio: "High distinction scholar with all-round excellence.", tags: ["Rank #30", "95.6% Score", "Distinction"] },
    { id: "31", name: "S N Ayesha Khanum", role: "Rank #31 · 95.6%", team: "BGHS · Distinction", image: "/students/s-n-ayesha-khanum.png", score: "95.6%", rank: 31, tone: 5, drop: DROPS[6], bio: "Scholastic distinction in secondary education.", tags: ["Rank #31", "95.6% Score", "Distinction"] },
    { id: "32", name: "B A Afreen Sheriff", role: "Rank #32 · 95.4%", team: "BGHS · Distinction", image: "/students/b-a-afreen-sheriff.png", score: "95.4%", rank: 32, tone: 1, drop: DROPS[7], bio: "Distinction holder in Class X examination 2025.", tags: ["Rank #32", "95.4% Score", "Distinction"] },
    { id: "33", name: "Saarah Uz Zama", role: "Rank #33 · 95.4%", team: "BGHS · Scholar", image: "/students/saarah-uz-zama.png", score: "95.4%", rank: 33, tone: 3, drop: DROPS[0], bio: "Distinction laureate with stellar track record.", tags: ["Rank #33", "95.4% Score", "Distinction"] },
    { id: "34", name: "Saanvi Giridhar", role: "Rank #34 · 95.4%", team: "BGHS · Distinction", image: "/students/saanvi-giridhar.png", score: "95.4%", rank: 34, tone: 2, drop: DROPS[1], bio: "Consistent distinction performer in all core subjects.", tags: ["Rank #34", "95.4% Score", "Distinction"] },
    { id: "35", name: "Gargi Choudhury", role: "Rank #35 · 95.4%", team: "BGHS · Distinction", image: "/students/gargi-choudhury.png", score: "95.4%", rank: 35, tone: 4, drop: DROPS[2], bio: "High distinction in ICSE Board Examinations 2025.", tags: ["Rank #35", "95.4% Score", "Distinction"] },
  ];

  // Champions & Athletics
  const championItems: ChampionCard[] = [
    {
      id: "champ-swimming",
      sport: "AQUATIC SPORTS",
      title: "CISCE National Swim Meet Laureates",
      subtitle: "State & National Record Holders",
      description:
        "International-standard swimming pool training producing national champions: Loraine Verghese, Kirthi Rao, Natasha Sagar, and Nirupama Sunderraj.",
      badge: "NATIONAL MEDALS",
      image: "/bghs-swimming.png",
      accentColor: "#0284C7",
    },
    {
      id: "champ-gymnastics",
      sport: "GYMNASTICS",
      title: "Rhea Bhansali",
      subtitle: "National Silver Medalist (U-17)",
      description:
        "Silver Medal in Gymnastics at the prestigious 65th National School Games 2019-20, representing Baldwin Girls' High School on the national stage.",
      badge: "NATIONAL SILVER",
      image: "/story3.png",
      accentColor: "#D97706",
    },
    {
      id: "champ-athletics",
      sport: "ATHLETICS & TRACK",
      title: "Annual Sports Champions & Track Stars",
      subtitle: "Sprint & Relay Title Holders",
      description:
        "Comprehensive athletics and field sports nurturing speed, endurance, and teamwork. Star athletes have dominated inter-school track meets across Karnataka.",
      badge: "INTER-SCHOOL GOLD",
      image: "/bghs-sports-action.png",
      accentColor: "#16A34A",
    },
    {
      id: "champ-leadership",
      sport: "LEADERSHIP & DRILL",
      title: "Investiture Ceremony & March Past",
      subtitle: "House Trophies & Discipline",
      description:
        "Exemplary discipline, parade drill, and house sports cup tournaments fostering resilience, high athletic values, and team spirit across all grades.",
      badge: "CHAMPIONSHIP CUP",
      image: "/bghs-investiture.png",
      accentColor: "#7C3AED",
    },
  ];

  const championCardsPerFrame = Math.min(4, cardsPerFrame);
  const effectiveCardsPerFrame = activeTab === "icse" ? cardsPerFrame : championCardsPerFrame;
  const totalItems = activeTab === "icse" ? toppers.length : championItems.length;
  const maxSlide = Math.max(0, totalItems - effectiveCardsPerFrame);

  // Auto-slide every 6 seconds (pauses if user is interacting/hovering/flipping)
  useEffect(() => {
    if (flippedBadge !== null || hoveredBadge !== null) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [maxSlide, activeTab, flippedBadge, hoveredBadge]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  const toggleFlip = (id: string) => {
    setFlippedBadge((current) => (current === id ? null : id));
  };

  // Realistic pendulum physics on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to +1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to +1
    setMouseOffset((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredBadge(null);
    setMouseOffset((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  return (
    <section className="relative overflow-hidden bg-[#0C2544] py-16 sm:py-20 text-white border-t border-[#163863]">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#93c5fd 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-64 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1550px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#081B33]/90 px-3.5 py-1.5 border border-blue-400/20 mb-3 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-amber-300 uppercase font-sans">
                Honour Roll & Hall of Trophies
              </span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white tracking-tight">
              Triumphs in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Academia</span> &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-300">Athletics</span>
            </h2>

            <p className="mt-2 text-sm sm:text-base text-blue-100/80 leading-relaxed">
              Baldwin is set to pursue excellence in the classroom and beyond. Hover over the lanyards to swing them, or click to flip the ID badge!
            </p>
          </div>

          {/* Right Controls: Filter Toggle + Slider Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Control */}
            <div className="inline-flex rounded-xl bg-[#081B33]/90 p-1 border border-blue-400/20 shadow-inner backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("icse");
                  setCurrentSlide(0);
                  setFlippedBadge(null);
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "icse"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                    : "text-blue-200/70 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 9L12 4.34 20.55 9 12 13.66 3.45 9zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
                <span>ICSE 2025 ({toppers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("champions");
                  setCurrentSlide(0);
                  setFlippedBadge(null);
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "champions"
                    ? "bg-[#800020] text-white shadow-lg shadow-red-950/50"
                    : "text-blue-200/70 hover:text-white"
                }`}
              >
                <svg className="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.45 3.19-1.93 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                </svg>
                <span>Champions</span>
              </button>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#081B33] text-blue-200 shadow-md border border-blue-400/20 hover:bg-blue-900/60 hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#081B33] text-blue-200 shadow-md border border-blue-400/20 hover:bg-blue-900/60 hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Lanyard Overhead Hanging Rail (Only displayed when ICSE Lanyard tab is active) */}
        {activeTab === "icse" && (
          <div className="relative mb-0 mx-2 z-20">
            {/* Main Metallic Rail Bar */}
            <div
              className="h-2 w-full rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              style={{
                background:
                  "linear-gradient(180deg, #e2e8f0 0%, #ffffff 30%, #94a3b8 65%, #334155 100%)",
              }}
            />
            {/* Metal End Knobs */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-6 rounded-sm bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-lg border border-slate-500" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-6 rounded-sm bg-gradient-to-r from-slate-400 via-slate-100 to-slate-300 shadow-lg border border-slate-500" />
          </div>
        )}

        {/* Carousel Viewport */}
        <div className="overflow-visible pt-0 pb-6 px-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / effectiveCardsPerFrame)}%)`,
            }}
          >
            {activeTab === "icse"
              ? /* 35 TOPPERS WITH INTERACTIVE 3D SWINGING LANYARD BADGES */
                toppers.map((student) => {
                  const isFlipped = flippedBadge === student.id;
                  const isHovered = hoveredBadge === student.id;
                  const tone = MAROON_CONFIG;
                  const offset = mouseOffset[student.id] || { x: 0, y: 0 };

                  // Dynamic physics transformation when hovering and swinging
                  const swingRotateZ = isHovered ? offset.x * 12 : 0;
                  const swingRotateY = isHovered ? offset.x * 18 : 0;
                  const swingRotateX = isHovered ? -offset.y * 10 : 0;
                  const swingTranslateY = isHovered ? -10 : 0;
                  const extraDrop = student.drop ?? 10;

                  return (
                    <div
                      key={student.id}
                      className="shrink-0 px-2 sm:px-2.5"
                      style={{ width: `${100 / cardsPerFrame}%` }}
                    >
                      <div
                        className="flex flex-col items-center select-none group"
                        onMouseEnter={() => setHoveredBadge(student.id)}
                        onMouseMove={(e) => handleMouseMove(e, student.id)}
                        onMouseLeave={() => handleMouseLeave(student.id)}
                      >
                        {/* Hanging Hardware Assembly: Ring + Woven Ribbon + Badge Reel / Crimp */}
                        <div
                          className="flex flex-col items-center w-full transition-transform duration-300 ease-out origin-top"
                          style={{
                            transform: `rotate(${swingRotateZ * 0.4}deg)`,
                          }}
                        >
                          {/* Chrome Hanging Ring attached to rail */}
                          <div
                            className="w-4 h-6 rounded-full border-[2px] border-slate-200 shadow-md -mb-1 relative z-10"
                            style={{
                              background:
                                "linear-gradient(135deg, #cbd5e1 0%, #ffffff 45%, #64748b 100%)",
                            }}
                          />

                          {/* Woven Fabric Strap / Ribbon */}
                          <div
                            className={`w-3.5 relative shadow-lg bg-gradient-to-b ${tone.ribbon}`}
                            style={{
                              height: `${48 + extraDrop}px`,
                              backgroundImage:
                                "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 2px, transparent 2px, transparent 4px)",
                            }}
                          >
                            {/* Inner woven border stitches */}
                            <div className="absolute inset-y-0 left-[1px] right-[1px] border-x border-dotted border-white/40" />
                          </div>

                          {/* Circular Badge Reel / Chrome Retractor */}
                          <div className="relative -mt-1 flex flex-col items-center z-10">
                            {/* Reel Body */}
                            <div
                              className="w-5 h-5 rounded-full border border-slate-400 shadow-md flex items-center justify-center"
                              style={{
                                background:
                                  "radial-gradient(circle at 35% 35%, #ffffff 0%, #cbd5e1 50%, #64748b 100%)",
                              }}
                            >
                              <div className="w-2 h-2 rounded-full bg-slate-300 border border-slate-500" />
                            </div>

                            {/* Metal Carabiner Clip holding the card */}
                            <div className="w-5 h-2.5 rounded-[2px] bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 shadow-sm border border-slate-400 -mt-0.5" />
                          </div>
                        </div>

                        {/* Interactive 3D Badge Card (Pendulum Swing + 3D Hover + Flip) */}
                        <div
                          onClick={() => toggleFlip(student.id)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle badge details for ${student.name}`}
                          className="relative w-full aspect-[96/145] cursor-pointer mt-[-2px] transition-all duration-300 ease-out [perspective:1000px]"
                          style={{
                            transform: `translateY(${swingTranslateY}px) rotateZ(${swingRotateZ}deg) rotateY(${swingRotateY}deg) rotateX(${swingRotateX}deg)`,
                          }}
                        >
                          <div
                            className={`relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
                              isFlipped ? "[transform:rotateY(180deg)]" : ""
                            }`}
                            style={{
                              boxShadow: isHovered
                                ? `0 20px 35px -8px ${tone.glow}, 0 10px 15px -3px rgba(0,0,0,0.8)`
                                : "0 15px 30px -10px rgba(0,0,0,0.9)",
                            }}
                          >
                            {/* ============ FRONT FACE ============ */}
                            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-700/60 bg-[#161B22] p-3.5 text-center [backface-visibility:hidden] overflow-hidden">
                              {/* Top Tone Ribbon Band with Diagonal Stripes */}
                              <div
                                className={`absolute inset-x-0 top-0 h-12 ${tone.headerBg} overflow-hidden`}
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)",
                                }}
                              >
                                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black/30" />
                              </div>

                              {/* Lanyard Hole Punch Slot */}
                              <div
                                className="absolute left-1/2 top-2 h-2 w-7 -translate-x-1/2 rounded-full bg-[#0D1117] z-10"
                                style={{
                                  boxShadow:
                                    "inset 0 1.5px 3px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.3)",
                                }}
                              />

                              {/* Student Portrait with Glow Ring */}
                              <div className="relative mt-7 flex flex-col items-center">
                                <div
                                  className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-full p-[2.5px] shadow-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 100%)",
                                  }}
                                >
                                  <img
                                    src={student.image}
                                    alt={student.name}
                                    className="h-full w-full rounded-full object-cover object-top bg-slate-800"
                                  />
                                  {/* Rank Star Medal */}
                                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-md border-2 border-[#161B22]">
                                    ★
                                  </div>
                                </div>

                                {/* Student Name */}
                                <h3 className="mt-2.5 font-sans font-bold text-sm text-white leading-tight line-clamp-1">
                                  {student.name}
                                </h3>

                                {/* Role / Designation */}
                                <p className="text-[11px] font-medium text-slate-300 mt-0.5 line-clamp-1">
                                  {student.role}
                                </p>

                                {/* Team / School Line */}
                                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                                  {student.team}
                                </p>
                              </div>

                              {/* Realistic Barcode with Digits at Badge Bottom */}
                              <div className="w-full pt-1.5 border-t border-slate-700/50">
                                <div className="h-5 w-full flex items-center justify-center gap-[1.5px] opacity-80 px-2">
                                  {[3, 1, 4, 1, 2, 4, 1, 3, 1, 5, 2, 1, 4, 1, 3, 2, 4, 1, 2, 3].map(
                                    (w, i) => (
                                      <span
                                        key={i}
                                        className="h-full bg-slate-300"
                                        style={{ width: `${w}px` }}
                                      />
                                    )
                                  )}
                                </div>
                                <span className="block mt-0.5 font-mono text-[8px] tracking-[0.2em] text-slate-400 text-center">
                                  382040200{student.rank}
                                </span>
                              </div>
                            </div>

                            {/* ============ BACK FACE ============ */}
                            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-700/60 bg-[#161B22] p-3 text-left [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                              {/* Top Tone Ribbon Band */}
                              <div
                                className={`absolute inset-x-0 top-0 h-6 ${tone.headerBg}`}
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)",
                                }}
                              />
                              <div className="absolute left-1/2 top-1.5 h-1.5 w-6 -translate-x-1/2 rounded-full bg-[#0D1117]" />

                              {/* Student Details & Bio */}
                              <div className="mt-5">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-sans font-bold text-xs sm:text-sm text-white leading-tight">
                                    {student.name}
                                  </h4>
                                  <span className="font-mono text-[9px] font-bold text-amber-400">
                                    {student.score}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  Class X ICSE 2025 · Rank #{student.rank}
                                </p>

                                <p className="text-[10px] text-slate-300 leading-tight mt-2 line-clamp-3">
                                  {student.bio}
                                </p>

                                {/* Tag Chips */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {student.tags?.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className={`rounded px-1.5 py-0.5 text-[8px] font-medium border ${tone.tagBg}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Footer: Contacts & QR Code */}
                              <div className="border-t border-slate-800 pt-1.5 flex items-end justify-between">
                                <div className="text-[9px] text-slate-400 space-y-0.5">
                                  <p className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                                    ✉ Merit Record
                                  </p>
                                  <p className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                                    ❐ Baldwin High
                                  </p>
                                </div>

                                {/* Procedural QR Code Vector Graphic */}
                                <div className="h-9 w-9 p-0.5 bg-white rounded shadow-sm shrink-0">
                                  <svg viewBox="0 0 24 24" className="w-full h-full fill-slate-900">
                                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4 2h4v2h-4v-2zm-2-2h2v2h-2v-2z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Hint */}
                        <span className="mt-2 text-[9px] text-slate-400 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                          {isFlipped ? "↺ Turn back" : "↻ Click to flip"}
                        </span>
                      </div>
                    </div>
                  );
                })
              : /* CHAMPIONS TAB: Normal, high-impact athletic cards (4 in 1 frame, no overhead rail) */
                championItems.map((champ) => (
                  <div
                    key={champ.id}
                    className="shrink-0 px-3 sm:px-3.5"
                    style={{ width: `${100 / effectiveCardsPerFrame}%` }}
                  >
                    <div className="group relative flex flex-col h-full rounded-2xl bg-[#161B22] border border-slate-700/80 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                      {/* Photo Container */}
                      <div className="relative aspect-[4/3.2] overflow-hidden bg-slate-900">
                        <img
                          src={champ.image}
                          alt={champ.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-[#161B22]/20 to-transparent" />

                        {/* Top Sport Pill */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md shadow-md border border-white/20"
                            style={{ backgroundColor: `${champ.accentColor}ee` }}
                          >
                            {champ.sport}
                          </span>
                        </div>

                        {/* Honor Tag Bottom Right */}
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-block rounded-xl bg-black/80 backdrop-blur-md px-3 py-1.5 shadow-lg border border-slate-700 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            🏆 {champ.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                            {champ.title}
                          </h3>

                          <p className="text-xs font-semibold text-slate-300 mt-1">
                            {champ.subtitle}
                          </p>

                          <p className="text-xs text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                            {champ.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                          <span className="font-semibold text-rose-400">BGHS Athletics</span>
                          <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Explore Honours →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="mt-4 flex justify-center items-center gap-1.5">
          {Array.from({ length: Math.min(10, maxSlide + 1) }).map((_, idx) => {
            const targetSlide = Math.round(
              idx * (maxSlide / (Math.min(10, maxSlide + 1) - 1 || 1))
            );
            const isActive = Math.abs(currentSlide - targetSlide) <= Math.ceil(maxSlide / 10);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(targetSlide)}
                aria-label={`Go to slide group ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive ? "w-7 h-1.5 bg-blue-500 shadow-sm shadow-blue-500/50" : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>

        {/* Results Stats Strip */}
        <div className="mt-10 rounded-2xl bg-[#081B33]/90 border border-blue-400/20 shadow-xl p-5 sm:p-6 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-400/20 text-center">
            <div className="pt-2 md:pt-0">
              <span className="font-serif font-black text-2xl sm:text-3xl text-amber-400 block tracking-tight">
                100%
              </span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-1 block">
                Pass Percentage
              </span>
              <span className="text-[10px] text-blue-200/70 block mt-0.5">Consecutive decade</span>
            </div>

            <div className="pt-2 md:pt-0">
              <span className="font-serif font-black text-2xl sm:text-3xl text-cyan-300 block tracking-tight">
                99.0%
              </span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-1 block">
                Highest ICSE Score
              </span>
              <span className="text-[10px] text-blue-200/70 block mt-0.5">Yukthi D (School Topper)</span>
            </div>

            <div className="pt-2 md:pt-0">
              <span className="font-serif font-black text-2xl sm:text-3xl text-emerald-400 block tracking-tight">
                85%+
              </span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-1 block">
                Distinction Rate
              </span>
              <span className="text-[10px] text-blue-200/70 block mt-0.5">Over 200+ students</span>
            </div>

            <div className="pt-2 md:pt-0">
              <span className="font-serif font-black text-2xl sm:text-3xl text-purple-300 block tracking-tight">
                144+
              </span>
              <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-1 block">
                Years of Legacy
              </span>
              <span className="text-[10px] text-blue-200/70 block mt-0.5">Estd. 1880 in Bengaluru</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
