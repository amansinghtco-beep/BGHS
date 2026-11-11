import React, { useState, useEffect } from "react";
import { Link } from "react-router";

interface AcademicCard {
  id: string;
  name: string;
  badge: string;
  score: string;
  category: string;
  image: string;
  rankText?: string;
  isBanner?: boolean;
}

interface ChampionCard {
  id: string;
  sport: string;
  title: string;
  description: string;
  badge: string;
  image: string;
}

export default function TriumphsSection() {
  const [activeTab, setActiveTab] = useState<"icse" | "champions">("icse");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ICSE Toppers extracted from https://www.baldwingirls.edu.in/
  // Real banners topper1 through topper9 published by the school
  const academicItems: AcademicCard[] = [
    {
      id: "topper-1",
      name: "ICSE 2025 High Achievers",
      badge: "School Toppers",
      score: "98.8%",
      category: "ICSE Top Honours",
      image: "/topper1.png",
      rankText: "Rank 1 Distinction",
      isBanner: true,
    },
    {
      id: "topper-2",
      name: "ICSE Roll of Honour",
      badge: "Top Merit",
      score: "98.4%",
      category: "Science & Mathematics",
      image: "/topper2.png",
      rankText: "Top Tier Merit",
      isBanner: true,
    },
    {
      id: "topper-3",
      name: "Distinction Laureates",
      badge: "98%+",
      score: "98.0%",
      category: "Humanities & Sciences",
      image: "/topper3.png",
      rankText: "High Distinction",
      isBanner: true,
    },
    {
      id: "topper-4",
      name: "Excellence in Board",
      badge: "Merit Star",
      score: "97.6%",
      category: "Languages & Sciences",
      image: "/topper4.png",
      rankText: "Distinction",
      isBanner: true,
    },
    {
      id: "topper-5",
      name: "Academic Achievers",
      badge: "Distinction",
      score: "97.2%",
      category: "ICSE Curriculum",
      image: "/topper5.png",
      rankText: "Honours Roll",
      isBanner: true,
    },
    {
      id: "topper-6",
      name: "Board High Scorers",
      badge: "Merit",
      score: "96.8%",
      category: "Commerce & Arts",
      image: "/topper6.png",
      rankText: "Merit Laureate",
      isBanner: true,
    },
    {
      id: "topper-7",
      name: "Distinction Roll",
      badge: "Gold Star",
      score: "96.4%",
      category: "Sciences",
      image: "/topper7.png",
      rankText: "First Division",
      isBanner: true,
    },
    {
      id: "topper-8",
      name: "Top Percentile",
      badge: "Excellence",
      score: "96.0%",
      category: "All-Round Board",
      image: "/topper8.png",
      rankText: "Distinction",
      isBanner: true,
    },
    {
      id: "topper-9",
      name: "Merit Laureates",
      badge: "Top Performer",
      score: "95.6%",
      category: "Academic Star",
      image: "/topper9.png",
      rankText: "First Division",
      isBanner: true,
    },
  ];

  // Champions & Sports from baldwingirls.edu.in
  const championItems: ChampionCard[] = [
    {
      id: "champ-swimming",
      sport: "AQUATIC SPORTS",
      title: "CISCE National Swim Meet Laureates",
      description:
        "International-standard swimming pool training producing national champions: Loraine Verghese, Kirthi Rao, Natasha Sagar, and Nirupama Sunderraj winning laurels at state & national levels.",
      badge: "NATIONAL MEDALS",
      image: "/bghs-swimming.png",
    },
    {
      id: "champ-gymnastics",
      sport: "GYMNASTICS",
      title: "Rhea Bhansali - National Silver Medal",
      description:
        "Silver Medal in Gymnastics (Under-17 category) at the prestigious 65th National School Games 2019-20, representing Baldwin Girls' High School on the national stage.",
      badge: "NATIONAL SILVER",
      image: "/story3.png",
    },
    {
      id: "champ-athletics",
      sport: "ATHLETICS & TRACK",
      title: "Annual Sports Champions & Track Stars",
      description:
        "Comprehensive athletics and field sports nurturing speed, endurance, and teamwork. Star athletes have dominated inter-school CISCE athletic meets and regional championships.",
      badge: "INTER-SCHOOL GOLD",
      image: "/bghs-sports-hero.png",
    },
    {
      id: "champ-leadership",
      sport: "LEADERSHIP & DRILL",
      title: "Investiture Ceremony & March Past",
      description:
        "Exemplary discipline, parade drill, and house sports cup tournaments fostering resilience, high athletic values, and team spirit across all 7 school houses.",
      badge: "CHAMPIONSHIP CUP",
      image: "/bghs-investiture.png",
    },
    {
      id: "champ-indoor",
      sport: "INDOOR SPORTS & MIND GAMES",
      title: "Badminton, Chess & Table Tennis",
      description:
        "State-of-the-art indoor sports facilities for table tennis, badminton, and strategic chess tournaments with expert coaching for competitive excellence.",
      badge: "STATE MERIT",
      image: "/bghs-indoor-sports.jpg",
    },
    {
      id: "champ-relay",
      sport: "TEAM SPORTS",
      title: "Basketball & Throwball Squads",
      description:
        "Active team sports under the guidance of skilled NIS-certified coaches and trainers, winning championship trophies at prestigious Bangalore inter-school tournaments.",
      badge: "TOURNAMENT WINNERS",
      image: "/bghs-sports-action.png",
    },
  ];

  const itemsCount = activeTab === "icse" ? academicItems.length : championItems.length;
  const visibleCards = 4;
  const maxSlide = Math.max(0, itemsCount - visibleCards);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [maxSlide, activeTab]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  return (
    <section className="relative overflow-hidden bg-[#FBF9F4] py-20 sm:py-24 border-t border-[#EAE3D6]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF9E6] border border-[#E6CE8A] px-4 py-1.5 shadow-sm mb-4">
            <svg
              className="w-4 h-4 text-[#C59B27]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.45 3.19-1.93 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#8C6D15] uppercase font-sans">
              HONOUR ROLL & HALL OF TROPHIES
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-[#1E293B] tracking-tight mb-4">
            Triumphs in Academia & Athletics
          </h2>

          {/* Decorative Divider */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E293B] via-[#C59B27] to-[#1E293B] mx-auto rounded-full mb-5" />

          {/* Subtitle Description */}
          <p className="text-[#556987] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Baldwin is set to pursue excellence in the classroom and beyond. From academic
            distinction to remarkable athletic achievement, our girls strive to excel in every area.
          </p>

          {/* Filter Pills / Tabs matching the reference image */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white shadow-sm border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("icse");
                setCurrentSlide(0);
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "icse"
                  ? "bg-[#0C2340] text-white shadow-md"
                  : "text-[#556987] hover:text-[#0C2340]"
              }`}
            >
              <svg className="w-4 h-4 fill-current text-[#FCD34D]" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 9L12 4.34 20.55 9 12 13.66 3.45 9zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              <span>ICSE 2025 Results</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("champions");
                setCurrentSlide(0);
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === "champions"
                  ? "bg-[#800020] text-white shadow-md"
                  : "text-[#556987] hover:text-[#800020]"
              }`}
            >
              <svg className="w-4 h-4 fill-current text-[#FCD34D]" viewBox="0 0 24 24">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.45 3.19-1.93 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
              </svg>
              <span>Champions</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-[#1E293B] shadow-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-[#1E293B] shadow-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Track with smooth slide */}
          <div className="overflow-hidden py-4 px-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
              }}
            >
              {activeTab === "icse" ? (
                /* ICSE TOPPERS CARDS */
                academicItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0 px-3"
                  >
                    <div className="group relative flex flex-col h-full rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E5E7EB]">
                      {/* Image / Portrait Container */}
                      <div className="relative aspect-[4/4.2] overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Top Gold Star Badge */}
                        <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 shadow-sm">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>

                        {/* Category Tag on Top Left */}
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-[#0C2340]/90 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                            #{idx + 1} TOPPER
                          </span>
                        </div>

                        {/* Board Score Badge pinned near bottom right like reference */}
                        <div className="absolute bottom-3 right-3 rounded-lg bg-[#071F3B]/95 backdrop-blur-sm border border-cyan-400/30 px-3 py-1.5 text-right shadow-lg">
                          <span className="block text-[9px] font-bold tracking-wider text-cyan-300 uppercase">
                            BOARD SCORE
                          </span>
                          <span className="font-serif font-black text-lg text-white">
                            {item.score}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <h3 className="font-bold text-base text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#64748B] mt-1 font-medium">
                            {item.category} · {item.rankText}
                          </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-600">
                            ICSE 2025 Distinction
                          </span>
                          <span className="text-[#94A3B8] font-mono text-[11px]">BGHS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* CHAMPIONS & SPORTS CARDS */
                championItems.map((champ) => (
                  <div
                    key={champ.id}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0 px-3"
                  >
                    <div className="group relative flex flex-col h-full rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E5E7EB]">
                      {/* Image Container */}
                      <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-900">
                        <img
                          src={champ.image}
                          alt={champ.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Category Tag Top Left */}
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 px-3 py-1 text-[10px] font-extrabold tracking-wider text-[#800020] uppercase shadow-sm">
                            {champ.sport}
                          </span>
                        </div>

                        {/* Trophy Icon Top Right */}
                        <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-yellow-400/30 text-yellow-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.45 3.19-1.93 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                          </svg>
                        </div>

                        {/* Laurel Badge Bottom Right */}
                        <div className="absolute bottom-3 right-3 rounded-lg bg-[#800020]/90 backdrop-blur-sm border border-amber-400/30 px-2.5 py-1 text-right shadow-lg">
                          <span className="text-[10px] font-black tracking-wider text-amber-200 uppercase">
                            {champ.badge}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <h3 className="font-bold text-base text-[#0F172A] group-hover:text-[#800020] transition-colors leading-snug">
                            {champ.title}
                          </h3>
                          <p className="text-xs text-[#64748B] mt-2 line-clamp-3 leading-relaxed">
                            {champ.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#800020]">
                            Baldwin Athletics
                          </span>
                          <span className="text-[#94A3B8] font-mono text-[11px]">BGHS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center items-center gap-2">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 h-2.5 bg-[#C59B27]"
                    : "w-2.5 h-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Result Overview Banner from baldwingirls.edu.in */}
        <div className="mt-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0] text-center">
            <div className="pt-4 sm:pt-0">
              <span className="block text-2xl sm:text-3xl font-serif font-black text-[#0C2340]">
                409
              </span>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1 block">
                Total Students Appeared
              </span>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="block text-2xl sm:text-3xl font-serif font-black text-[#10B981]">
                396
              </span>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1 block">
                I Division Distinction
              </span>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="block text-2xl sm:text-3xl font-serif font-black text-[#D97706]">
                44
              </span>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1 block">
                Scored 95% & Above
              </span>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="block text-2xl sm:text-3xl font-serif font-black text-[#800020]">
                18+
              </span>
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1 block">
                Competitive Sports
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
