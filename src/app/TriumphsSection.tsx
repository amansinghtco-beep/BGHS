import React, { useState, useEffect, useRef } from "react";

export interface LanyardMember {
  id: string;
  name: string;
  role: string;
  team?: string;
  image: string;
  bio?: string;
  tags?: string[];
  tone?: 1 | 2 | 3 | 4 | 5;
  score?: string;
  rank?: number;
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

const TONES = [
  "text-blue-600",
  "text-amber-500",
  "text-rose-600",
  "text-emerald-600",
  "text-indigo-600",
] as const;

export default function TriumphsSection() {
  const [activeTab, setActiveTab] = useState<"icse" | "champions">("icse");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flippedBadge, setFlippedBadge] = useState<string | null>(null);

  // All 35 authentic ICSE 2025 Board Toppers formatted for the Lanyard Badge Design
  const toppers: LanyardMember[] = [
    { id: "1", name: "Yukthi D", role: "School Topper · 99%", team: "Rank #1 · Distinction", image: "/students/yukthi-d.png", score: "99%", rank: 1, tone: 1, bio: "Overall School Topper in ICSE 2025 Board Examinations with exceptional merit across all subjects.", tags: ["School Topper", "99% Score", "First Division"] },
    { id: "2", name: "Thanisha R", role: "School Rank #2 · 98.6%", team: "Distinction Laureate", image: "/students/thanisha-r.png", score: "98.6%", rank: 2, tone: 2, bio: "Excellence in Mathematics & Sciences with outstanding academic discipline.", tags: ["Rank #2", "98.6% Score", "Distinction"] },
    { id: "3", name: "Niyati Kumari Kedia", role: "School Rank #3 · 98.4%", team: "Distinction Laureate", image: "/students/niyati-kumari-kedia.png", score: "98.4%", rank: 3, tone: 3, bio: "Top distinction in Science, Humanities and English language board examinations.", tags: ["Rank #3", "98.4% Score", "Honour Roll"] },
    { id: "4", name: "Jinal", role: "School Rank #4 · 98.2%", team: "Distinction Laureate", image: "/students/jinal.png", score: "98.2%", rank: 4, tone: 4, bio: "Distinction holder and consistent high-merit scholar throughout secondary school.", tags: ["Rank #4", "98.2% Score", "Distinction"] },
    { id: "5", name: "Shehza Maryam Perveez", role: "School Rank #5 · 98%", team: "Distinction Laureate", image: "/students/shehza-maryam-perveez.png", score: "98%", rank: 5, tone: 5, bio: "High academic distinction and leadership across ICSE curriculum studies.", tags: ["Rank #5", "98% Score", "Merit Star"] },
    { id: "6", name: "Anushka G A", role: "High Distinction · 97.2%", team: "Distinction Laureate", image: "/students/anushka-g-a.png", score: "97.2%", rank: 6, tone: 1, bio: "Distinction in Board Examinations with exceptional marks in Science and Arts.", tags: ["Rank #6", "97.2% Score", "Distinction"] },
    { id: "7", name: "Tanisha Vinay", role: "High Distinction · 97.2%", team: "Distinction Laureate", image: "/students/tanisha-vinay.png", score: "97.2%", rank: 7, tone: 2, bio: "Academic excellence and dedication leading to outstanding board distinction.", tags: ["Rank #7", "97.2% Score", "Distinction"] },
    { id: "8", name: "Rishika R", role: "High Distinction · 97.2%", team: "Distinction Laureate", image: "/students/rishika-r.png", score: "97.2%", rank: 8, tone: 3, bio: "Outstanding performance in ICSE board exam with all-round brilliance.", tags: ["Rank #8", "97.2% Score", "Distinction"] },
    { id: "9", name: "S Bhavana", role: "Distinction · 96.8%", team: "Distinction Laureate", image: "/students/s-bhavana.png", score: "96.8%", rank: 9, tone: 4, bio: "Consistent distinction performer with stellar scores in languages and sciences.", tags: ["Rank #9", "96.8% Score", "Distinction"] },
    { id: "10", name: "Vaibhavi Joshi", role: "Distinction · 96.8%", team: "Distinction Laureate", image: "/students/vaibhavi-joshi.png", score: "96.8%", rank: 10, tone: 5, bio: "Excellence in mathematics, scientific reasoning and languages.", tags: ["Rank #10", "96.8% Score", "Distinction"] },
    { id: "11", name: "Aditi A Jain", role: "Distinction · 96.8%", team: "Distinction Laureate", image: "/students/aditi-a-jain.png", score: "96.8%", rank: 11, tone: 1, bio: "Top-tier distinction laureate upholding Baldwin's heritage of excellence.", tags: ["Rank #11", "96.8% Score", "Distinction"] },
    { id: "12", name: "Jiya L Jain", role: "Distinction · 96.8%", team: "Distinction Laureate", image: "/students/jiya-l-jain.png", score: "96.8%", rank: 12, tone: 2, bio: "High score distinction in Class X ICSE board examination.", tags: ["Rank #12", "96.8% Score", "Distinction"] },
    { id: "13", name: "Joyce K", role: "Distinction · 96.8%", team: "Distinction Laureate", image: "/students/joyce-k.png", score: "96.8%", rank: 13, tone: 3, bio: "Stellar performance in academics and extracurricular commitments.", tags: ["Rank #13", "96.8% Score", "Distinction"] },
    { id: "14", name: "Sakshi Sisodia", role: "Distinction · 96.6%", team: "Distinction Laureate", image: "/students/sakshi-sisodia.png", score: "96.6%", rank: 14, tone: 4, bio: "High distinction in sciences and humanities with dedicated study ethic.", tags: ["Rank #14", "96.6% Score", "Distinction"] },
    { id: "15", name: "I Sheeba Fathima", role: "Distinction · 96.6%", team: "Distinction Laureate", image: "/students/i-sheeba-fathima.png", score: "96.6%", rank: 15, tone: 5, bio: "Distinction achiever demonstrating analytical and literary excellence.", tags: ["Rank #15", "96.6% Score", "Distinction"] },
    { id: "16", name: "Neksha", role: "Distinction · 96.6%", team: "Distinction Laureate", image: "/students/neksha.png", score: "96.6%", rank: 16, tone: 1, bio: "Excellence across all ICSE board papers with stellar academic record.", tags: ["Rank #16", "96.6% Score", "Distinction"] },
    { id: "17", name: "Aandrita Ghosh", role: "Distinction · 96.6%", team: "Distinction Laureate", image: "/students/aandrita-ghosh.png", score: "96.6%", rank: 17, tone: 2, bio: "Distinction laureate with commendable flair in analytical studies.", tags: ["Rank #17", "96.6% Score", "Distinction"] },
    { id: "18", name: "Jasmitha Sridharan", role: "Distinction · 96.6%", team: "Distinction Laureate", image: "/students/jasmitha-sridharan.png", score: "96.6%", rank: 18, tone: 3, bio: "High achievement distinction in ICSE 2025 examination.", tags: ["Rank #18", "96.6% Score", "Distinction"] },
    { id: "19", name: "S Yazhini", role: "Distinction · 96.4%", team: "Distinction Laureate", image: "/students/s-yazhini.png", score: "96.4%", rank: 19, tone: 4, bio: "Outstanding board examination performance in Class 10.", tags: ["Rank #19", "96.4% Score", "Distinction"] },
    { id: "20", name: "Alaina Khan", role: "Distinction · 96.2%", team: "Distinction Laureate", image: "/students/alaina-khan.png", score: "96.2%", rank: 20, tone: 5, bio: "High merit distinction with dedicated scholastic discipline.", tags: ["Rank #20", "96.2% Score", "Distinction"] },
    { id: "21", name: "Tamanna Shekhar", role: "Distinction · 96.2%", team: "Distinction Laureate", image: "/students/tamanna-shekhar.png", score: "96.2%", rank: 21, tone: 1, bio: "Superb distinction achievement across all subjects in ICSE 2025.", tags: ["Rank #21", "96.2% Score", "Distinction"] },
    { id: "22", name: "Emily Sujay", role: "Distinction · 96.2%", team: "Distinction Laureate", image: "/students/emily-sujay.png", score: "96.2%", rank: 22, tone: 2, bio: "Distinction laureate representing Baldwinian academic values.", tags: ["Rank #22", "96.2% Score", "Distinction"] },
    { id: "23", name: "Trisha Naveen", role: "Distinction · 96.2%", team: "Distinction Laureate", image: "/students/trisha-naveen.png", score: "96.2%", rank: 23, tone: 3, bio: "Merit scholar in ICSE examination with consistent excellence.", tags: ["Rank #23", "96.2% Score", "Distinction"] },
    { id: "24", name: "Maanya R", role: "Distinction · 96%", team: "Distinction Laureate", image: "/students/maanya-r.png", score: "96%", rank: 24, tone: 4, bio: "High distinction honors in Class X ICSE board exams.", tags: ["Rank #24", "96% Score", "Distinction"] },
    { id: "25", name: "Aaheli Dutta", role: "Distinction · 96%", team: "Distinction Laureate", image: "/students/aaheli-dutta.png", score: "96%", rank: 25, tone: 5, bio: "Distinction scholar with exemplary achievements.", tags: ["Rank #25", "96% Score", "Distinction"] },
    { id: "26", name: "Aanchal Jain N", role: "Distinction · 96%", team: "Distinction Laureate", image: "/students/aanchal-jain-n.png", score: "96%", rank: 26, tone: 1, bio: "Outstanding distinction in ICSE Board Examination 2025.", tags: ["Rank #26", "96% Score", "Distinction"] },
    { id: "27", name: "Jainy Jain", role: "Distinction · 95.8%", team: "Distinction Laureate", image: "/students/jainy-jain.png", score: "95.8%", rank: 27, tone: 2, bio: "Distinction score with high aptitude in scientific concepts.", tags: ["Rank #27", "95.8% Score", "Distinction"] },
    { id: "28", name: "Swara Sudhir", role: "Distinction · 95.8%", team: "Distinction Laureate", image: "/students/swara-sudhir.png", score: "95.8%", rank: 28, tone: 3, bio: "Commendable distinction across curriculum papers.", tags: ["Rank #28", "95.8% Score", "Distinction"] },
    { id: "29", name: "Amina Imran", role: "Distinction · 95.6%", team: "Distinction Laureate", image: "/students/amina-imran.png", score: "95.6%", rank: 29, tone: 4, bio: "Distinction marks in ICSE Board examinations.", tags: ["Rank #29", "95.6% Score", "Distinction"] },
    { id: "30", name: "Noor Hafsa", role: "Distinction · 95.6%", team: "Distinction Laureate", image: "/students/noor-hafsa.png", score: "95.6%", rank: 30, tone: 5, bio: "High distinction scholar with all-round excellence.", tags: ["Rank #30", "95.6% Score", "Distinction"] },
    { id: "31", name: "S N Ayesha Khanum", role: "Distinction · 95.6%", team: "Distinction Laureate", image: "/students/s-n-ayesha-khanum.png", score: "95.6%", rank: 31, tone: 1, bio: "Scholastic distinction in secondary education.", tags: ["Rank #31", "95.6% Score", "Distinction"] },
    { id: "32", name: "B A Afreen Sheriff", role: "Distinction · 95.4%", team: "Distinction Laureate", image: "/students/b-a-afreen-sheriff.png", score: "95.4%", rank: 32, tone: 2, bio: "Distinction holder in Class X examination 2025.", tags: ["Rank #32", "95.4% Score", "Distinction"] },
    { id: "33", name: "Saarah Uz Zama", role: "Distinction · 95.4%", team: "Distinction Laureate", image: "/students/saarah-uz-zama.png", score: "95.4%", rank: 33, tone: 3, bio: "Distinction laureate with stellar track record.", tags: ["Rank #33", "95.4% Score", "Distinction"] },
    { id: "34", name: "Saanvi Giridhar", role: "Distinction · 95.4%", team: "Distinction Laureate", image: "/students/saanvi-giridhar.png", score: "95.4%", rank: 34, tone: 4, bio: "Consistent distinction performer in all core subjects.", tags: ["Rank #34", "95.4% Score", "Distinction"] },
    { id: "35", name: "Gargi Choudhury", role: "Distinction · 95.4%", team: "Distinction Laureate", image: "/students/gargi-choudhury.png", score: "95.4%", rank: 35, tone: 5, bio: "High distinction in ICSE Board Examinations 2025.", tags: ["Rank #35", "95.4% Score", "Distinction"] },
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
      sport: "TRACK & FIELD",
      title: "Annual Sports Champions",
      subtitle: "Inter-School CISCE Athletic Laureates",
      description:
        "Speed, endurance, and athletic excellence. Our track stars have continuously dominated inter-school athletic meets and regional championships.",
      badge: "INTER-SCHOOL GOLD",
      image: "/bghs-sports-hero.png",
      accentColor: "#800020",
    },
    {
      id: "champ-leadership",
      sport: "LEADERSHIP & DRILL",
      title: "Investiture & March Past",
      subtitle: "Discipline, Precision & Sportsmanship",
      description:
        "Exemplary parade drill and annual sports championship trophy tournaments fostering teamwork and high athletic values across all 7 school houses.",
      badge: "CHAMPIONSHIP CUP",
      image: "/bghs-investiture.png",
      accentColor: "#4F46E5",
    },
    {
      id: "champ-indoor",
      sport: "INDOOR SPORTS",
      title: "Badminton & Table Tennis",
      subtitle: "Tournament & Strategic Champions",
      description:
        "State-of-the-art indoor sports facilities for table tennis, badminton, and strategic chess tournaments with expert coaches for competitive play.",
      badge: "STATE MERIT",
      image: "/bghs-indoor-sports.jpg",
      accentColor: "#059669",
    },
    {
      id: "champ-relay",
      sport: "TEAM SPORTS",
      title: "Basketball & Throwball Squads",
      subtitle: "Bangalore Champions",
      description:
        "Active team athletics guided by skilled NIS-certified trainers, winning championship trophies at premier inter-school tournaments across Karnataka.",
      badge: "TOURNAMENT WINNERS",
      image: "/bghs-sports-action.png",
      accentColor: "#DC2626",
    },
  ];

  // Exactly 4 cards in one visible frame on desktop (slides 4 by 4 or 1 by 1)
  const [cardsPerFrame, setCardsPerFrame] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerFrame(1);
      else if (window.innerWidth < 880) setCardsPerFrame(2);
      else if (window.innerWidth < 1200) setCardsPerFrame(3);
      else setCardsPerFrame(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalItems = activeTab === "icse" ? toppers.length : championItems.length;
  const maxSlide = Math.max(0, totalItems - cardsPerFrame);

  // Auto-slide every 5 seconds (pauses if user is interacting with a badge)
  useEffect(() => {
    if (flippedBadge !== null) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxSlide, activeTab, flippedBadge]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  const toggleFlip = (id: string) => {
    setFlippedBadge((current) => (current === id ? null : id));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] py-20 sm:py-24 border-t border-[#E2E8F0]">
      {/* Subtle modern background accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Modern Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-sm border border-slate-200 mb-3.5">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#0A2540] uppercase font-sans">
                Hall of Excellence
              </span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#0A2540] tracking-tight">
              Triumphs in <span className="text-[#2563EB]">Academia</span> &{" "}
              <span className="text-[#800020]">Athletics</span>
            </h2>

            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Celebrating Baldwin's high achievers in the classroom and on the field. A tradition of
              holistic excellence and competitive spirit since 1880. Click any student lanyard badge to flip!
            </p>
          </div>

          {/* Right Controls: Filter Toggle + Slider Arrows */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Segmented Control */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("icse");
                  setCurrentSlide(0);
                  setFlippedBadge(null);
                }}
                className={`flex items-center gap-2 rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "icse"
                    ? "bg-[#0C2340] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
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
                className={`flex items-center gap-2 rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "champions"
                    ? "bg-[#800020] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <svg className="w-4 h-4 fill-current text-amber-300" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.45 3.19-1.93 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                </svg>
                <span>Champions</span>
              </button>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Lanyard Overhead Hanging Rail (Metal Bar with Rings) */}
        <div className="relative mb-3 mx-2 hidden sm:block">
          {/* Main Metallic Rail */}
          <div
            className="h-2.5 w-full rounded-full shadow-inner"
            style={{
              background:
                "linear-gradient(to bottom, #94a3b8 0%, #ffffff 25%, #cbd5e1 50%, #64748b 100%)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          />
          {/* Metal End Caps */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-5 rounded-[2px] bg-slate-700 shadow-md" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-5 rounded-[2px] bg-slate-700 shadow-md" />
        </div>

        {/* Lanyard Badges Carousel Viewport (Strictly 4 in 1 frame on desktop) */}
        <div className="overflow-hidden py-4 px-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / cardsPerFrame)}%)`,
            }}
          >
            {activeTab === "icse"
              ? /* 35 TOPPERS WITH INTERACTIVE LANYARD BADGE DESIGN */
                toppers.map((student, idx) => {
                  const isFlipped = flippedBadge === student.id;
                  const toneClass = TONES[((student.tone ?? (idx % 5) + 1) - 1) % TONES.length];

                  return (
                    <div
                      key={student.id}
                      className="shrink-0 px-2.5 sm:px-3"
                      style={{ width: `${100 / cardsPerFrame}%` }}
                    >
                      <div className="flex flex-col items-center select-none">
                        {/* Lanyard Top Ring & Woven Fabric Ribbon Strap */}
                        <div className="flex flex-col items-center w-full">
                          {/* Chrome Ring hanging on the rail */}
                          <div
                            className="w-5 h-7 rounded-full border-[2.5px] border-slate-300 shadow-sm -mb-1"
                            style={{
                              background:
                                "linear-gradient(to right, #94a3b8, #ffffff, #64748b)",
                            }}
                          />

                          {/* Woven Fabric Strap */}
                          <div
                            className={`w-6 h-12 relative shadow-md ${toneClass}`}
                            style={{
                              background:
                                "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 2px, transparent 2px 5px), linear-gradient(90deg, #1e293b 0%, currentColor 50%, #0f172a 100%)",
                            }}
                          >
                            {/* Inner woven stitch lines */}
                            <div className="absolute inset-y-0 left-[2px] right-[2px] border-x border-dashed border-white/40" />
                          </div>

                          {/* Metallic Clip / Reel Connector */}
                          <div className="w-8 h-3.5 rounded-[3px] bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 shadow-sm border border-slate-300 -mt-0.5 z-10" />
                        </div>

                        {/* 3D Flip Badge Card */}
                        <div
                          onClick={() => toggleFlip(student.id)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle badge details for ${student.name}`}
                          className="relative w-full aspect-[96/145] cursor-pointer group mt-[-2px] [perspective:1000px]"
                        >
                          <div
                            className={`relative w-full h-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] shadow-xl hover:shadow-2xl ${
                              isFlipped ? "[transform:rotateY(180deg)]" : ""
                            }`}
                          >
                            {/* ============ FRONT FACE ============ */}
                            <div className="absolute inset-0 flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-center [backface-visibility:hidden] overflow-hidden">
                              {/* Top Tone Ribbon Band */}
                              <div
                                className={`absolute inset-x-0 top-0 h-10 ${toneClass}`}
                                style={{
                                  background:
                                    "repeating-linear-gradient(135deg, transparent 0 4px, rgba(255,255,255,0.2) 4px 8px), linear-gradient(180deg, currentColor, #0f172a)",
                                }}
                              >
                                <span className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
                              </div>

                              {/* Lanyard Hole Punch Slot */}
                              <div
                                className="absolute left-1/2 top-2.5 h-2 w-8 -translate-x-1/2 rounded-full bg-slate-900"
                                style={{
                                  boxShadow:
                                    "inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.4)",
                                }}
                              />

                              {/* Front Circular Photo Container */}
                              <div className="relative mt-8 flex flex-col items-center">
                                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1 bg-white shadow-lg border-2 border-slate-100">
                                  <img
                                    src={student.image}
                                    alt={student.name}
                                    className="h-full w-full rounded-full object-cover object-top"
                                  />
                                  {/* Rank Medal Star Badge */}
                                  <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-900 font-black text-xs shadow-md border-2 border-white">
                                    ★
                                  </div>
                                </div>

                                {/* Student Name & Score */}
                                <h3 className="mt-3 font-serif font-black text-lg text-slate-900 leading-tight">
                                  {student.name}
                                </h3>
                                <p className="text-xs font-bold text-blue-600 mt-0.5">
                                  ICSE Score: {student.score}
                                </p>
                                <span className="inline-block mt-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                                  {student.team}
                                </span>
                              </div>

                              {/* Realistic Barcode at Badge Bottom */}
                              <div className="w-full border-t border-dashed border-slate-200 pt-2.5">
                                <div className="h-6 w-full flex items-center justify-center gap-0.5 opacity-80">
                                  {[4, 2, 6, 1, 3, 5, 2, 4, 1, 7, 3, 2, 5, 1, 4, 3, 6, 2].map(
                                    (w, i) => (
                                      <span
                                        key={i}
                                        className="h-full bg-slate-800"
                                        style={{ width: `${w}px` }}
                                      />
                                    )
                                  )}
                                </div>
                                <span className="block mt-1 font-mono text-[9px] tracking-[0.25em] text-slate-400 text-center">
                                  BGHS-2025-{String(student.rank).padStart(3, "0")}
                                </span>
                              </div>
                            </div>

                            {/* ============ BACK FACE ============ */}
                            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 text-left [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                              {/* Top Band & Hole */}
                              <div
                                className={`absolute inset-x-0 top-0 h-6 ${toneClass}`}
                                style={{ background: "linear-gradient(180deg, currentColor, #0f172a)" }}
                              />
                              <div className="absolute left-1/2 top-2 h-1.5 w-7 -translate-x-1/2 rounded-full bg-black/60" />

                              <div className="mt-5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                  Official Roll of Honour
                                </span>
                                <h4 className="font-serif font-black text-base text-white mt-0.5">
                                  {student.name}
                                </h4>
                                <p className="text-xs text-slate-300 font-mono mt-0.5">
                                  Board Merit: {student.score} · Rank #{student.rank}
                                </p>

                                {/* Bio Paragraph */}
                                <p className="text-xs text-slate-300 leading-relaxed mt-3">
                                  {student.bio}
                                </p>

                                {/* Tag Chips */}
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {student.tags?.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-slate-200 border border-white/15"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* QR Code Graphic at bottom right */}
                              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                                <div className="text-[10px] text-slate-400">
                                  <p className="font-bold text-white">Baldwin Girls</p>
                                  <p>High School, BLR</p>
                                </div>
                                <div className="h-10 w-10 p-1 bg-white rounded-md shadow-sm shrink-0">
                                  <svg viewBox="0 0 24 24" className="w-full h-full fill-slate-900">
                                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v2h-4v-2zm-4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm4 2h4v2h-4v-2zm-2-2h2v2h-2v-2z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Instruction Hint */}
                        <p className="mt-2 text-[10px] text-slate-400 font-medium tracking-wide">
                          {isFlipped ? "↺ Click to flip front" : "↻ Click to view profile"}
                        </p>
                      </div>
                    </div>
                  );
                })
              : /* CHAMPIONS TAB (4 per frame) */
                championItems.map((champ) => (
                  <div
                    key={champ.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / cardsPerFrame}%` }}
                  >
                    <div className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      {/* Photo Container */}
                      <div className="relative aspect-[4/4.6] overflow-hidden bg-slate-900">
                        <img
                          src={champ.image}
                          alt={champ.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                        {/* Top Sport Pill */}
                        <div className="absolute top-3 left-3">
                          <span
                            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md shadow-sm border border-white/20"
                            style={{ backgroundColor: `${champ.accentColor}dd` }}
                          >
                            {champ.sport}
                          </span>
                        </div>

                        {/* Honor Tag Bottom Right */}
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-block rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-lg border border-slate-100 text-[10px] font-extrabold text-[#800020] uppercase tracking-wider">
                            🏆 {champ.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-[#800020] transition-colors leading-snug">
                            {champ.title}
                          </h3>

                          <p className="text-xs font-semibold text-slate-700 mt-1">
                            {champ.subtitle}
                          </p>

                          <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                            {champ.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                          <span className="font-semibold text-[#800020]">BGHS Athletics</span>
                          <span className="text-[#800020] font-semibold group-hover:translate-x-0.5 transition-transform">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="mt-8 flex justify-center items-center gap-2">
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
                aria-label={`Go to section ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive ? "w-8 h-2 bg-[#0C2340]" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>

        {/* Clean Results Stats Strip */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 text-center">
            <div className="pt-3 md:pt-0">
              <span className="block font-serif font-black text-3xl sm:text-4xl text-[#0A2540]">
                409
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
                Total Students Appeared
              </span>
            </div>
            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="block font-serif font-black text-3xl sm:text-4xl text-emerald-600">
                396
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
                First Division Distinction
              </span>
            </div>
            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="block font-serif font-black text-3xl sm:text-4xl text-blue-600">
                44
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
                Scored 95% & Above
              </span>
            </div>
            <div className="pt-3 md:pt-0 md:pl-6">
              <span className="block font-serif font-black text-3xl sm:text-4xl text-[#800020]">
                18+
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
                Sports & Athletic Laurels
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
