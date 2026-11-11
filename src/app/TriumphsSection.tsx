import React, { useState, useEffect } from "react";

interface TopperStudent {
  id: string;
  name: string;
  score: string;
  rank: number;
  image: string;
  badgeText: string;
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

export default function TriumphsSection() {
  const [activeTab, setActiveTab] = useState<"icse" | "champions">("icse");
  const [currentSlide, setCurrentSlide] = useState(0);

  // All 35 authentic ICSE 2025 Board Toppers
  const toppers: TopperStudent[] = [
    { id: "1", name: "Yukthi D", score: "99%", rank: 1, image: "/students/yukthi-d.png", badgeText: "School Topper" },
    { id: "2", name: "Thanisha R", score: "98.6%", rank: 2, image: "/students/thanisha-r.png", badgeText: "Distinction" },
    { id: "3", name: "Niyati Kumari Kedia", score: "98.4%", rank: 3, image: "/students/niyati-kumari-kedia.png", badgeText: "Distinction" },
    { id: "4", name: "Jinal", score: "98.2%", rank: 4, image: "/students/jinal.png", badgeText: "Distinction" },
    { id: "5", name: "Shehza Maryam Perveez", score: "98%", rank: 5, image: "/students/shehza-maryam-perveez.png", badgeText: "Distinction" },
    { id: "6", name: "Anushka G A", score: "97.2%", rank: 6, image: "/students/anushka-g-a.png", badgeText: "Distinction" },
    { id: "7", name: "Tanisha Vinay", score: "97.2%", rank: 7, image: "/students/tanisha-vinay.png", badgeText: "Distinction" },
    { id: "8", name: "Rishika R", score: "97.2%", rank: 8, image: "/students/rishika-r.png", badgeText: "Distinction" },
    { id: "9", name: "S Bhavana", score: "96.8%", rank: 9, image: "/students/s-bhavana.png", badgeText: "Distinction" },
    { id: "10", name: "Vaibhavi Joshi", score: "96.8%", rank: 10, image: "/students/vaibhavi-joshi.png", badgeText: "Distinction" },
    { id: "11", name: "Aditi A Jain", score: "96.8%", rank: 11, image: "/students/aditi-a-jain.png", badgeText: "Distinction" },
    { id: "12", name: "Jiya L Jain", score: "96.8%", rank: 12, image: "/students/jiya-l-jain.png", badgeText: "Distinction" },
    { id: "13", name: "Joyce K", score: "96.8%", rank: 13, image: "/students/joyce-k.png", badgeText: "Distinction" },
    { id: "14", name: "Sakshi Sisodia", score: "96.6%", rank: 14, image: "/students/sakshi-sisodia.png", badgeText: "Distinction" },
    { id: "15", name: "I Sheeba Fathima", score: "96.6%", rank: 15, image: "/students/i-sheeba-fathima.png", badgeText: "Distinction" },
    { id: "16", name: "Neksha", score: "96.6%", rank: 16, image: "/students/neksha.png", badgeText: "Distinction" },
    { id: "17", name: "Aandrita Ghosh", score: "96.6%", rank: 17, image: "/students/aandrita-ghosh.png", badgeText: "Distinction" },
    { id: "18", name: "Jasmitha Sridharan", score: "96.6%", rank: 18, image: "/students/jasmitha-sridharan.png", badgeText: "Distinction" },
    { id: "19", name: "S Yazhini", score: "96.4%", rank: 19, image: "/students/s-yazhini.png", badgeText: "Distinction" },
    { id: "20", name: "Alaina Khan", score: "96.2%", rank: 20, image: "/students/alaina-khan.png", badgeText: "Distinction" },
    { id: "21", name: "Tamanna Shekhar", score: "96.2%", rank: 21, image: "/students/tamanna-shekhar.png", badgeText: "Distinction" },
    { id: "22", name: "Emily Sujay", score: "96.2%", rank: 22, image: "/students/emily-sujay.png", badgeText: "Distinction" },
    { id: "23", name: "Trisha Naveen", score: "96.2%", rank: 23, image: "/students/trisha-naveen.png", badgeText: "Distinction" },
    { id: "24", name: "Maanya R", score: "96%", rank: 24, image: "/students/maanya-r.png", badgeText: "Distinction" },
    { id: "25", name: "Aaheli Dutta", score: "96%", rank: 25, image: "/students/aaheli-dutta.png", badgeText: "Distinction" },
    { id: "26", name: "Aanchal Jain N", score: "96%", rank: 26, image: "/students/aanchal-jain-n.png", badgeText: "Distinction" },
    { id: "27", name: "Jainy Jain", score: "95.8%", rank: 27, image: "/students/jainy-jain.png", badgeText: "Distinction" },
    { id: "28", name: "Swara Sudhir", score: "95.8%", rank: 28, image: "/students/swara-sudhir.png", badgeText: "Distinction" },
    { id: "29", name: "Amina Imran", score: "95.6%", rank: 29, image: "/students/amina-imran.png", badgeText: "Distinction" },
    { id: "30", name: "Noor Hafsa", score: "95.6%", rank: 30, image: "/students/noor-hafsa.png", badgeText: "Distinction" },
    { id: "31", name: "S N Ayesha Khanum", score: "95.6%", rank: 31, image: "/students/s-n-ayesha-khanum.png", badgeText: "Distinction" },
    { id: "32", name: "B A Afreen Sheriff", score: "95.4%", rank: 32, image: "/students/b-a-afreen-sheriff.png", badgeText: "Distinction" },
    { id: "33", name: "Saarah Uz Zama", score: "95.4%", rank: 33, image: "/students/saarah-uz-zama.png", badgeText: "Distinction" },
    { id: "34", name: "Saanvi Giridhar", score: "95.4%", rank: 34, image: "/students/saanvi-giridhar.png", badgeText: "Distinction" },
    { id: "35", name: "Gargi Choudhury", score: "95.4%", rank: 35, image: "/students/gargi-choudhury.png", badgeText: "Distinction" },
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

  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 880) setVisibleCards(2);
      else if (window.innerWidth < 1200) setVisibleCards(3);
      else setVisibleCards(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsCount = activeTab === "icse" ? toppers.length : championItems.length;
  const maxSlide = Math.max(0, itemsCount - visibleCards);

  // Auto-slide every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4200);
    return () => clearInterval(timer);
  }, [maxSlide, activeTab]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
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
              Celebrating Baldwin's high achievers in the classroom and on the field.
              A tradition of holistic excellence and competitive spirit since 1880.
            </p>
          </div>

          {/* Right Controls: Filter Toggle + Slider Arrows */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Elegant Floating Segmented Control */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("icse");
                  setCurrentSlide(0);
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

        {/* Carousel Viewport */}
        <div className="overflow-hidden py-3">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
            }}
          >
            {activeTab === "icse"
              ? /* MODERN LUXE ICSE TOPPER CARDS */
                toppers.map((student) => (
                  <div
                    key={student.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <div className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      {/* Portrait Container */}
                      <div className="relative aspect-[4/4.6] overflow-hidden bg-gradient-to-b from-[#0F223D] to-[#0A1628]">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Smooth vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A182E] via-transparent to-transparent opacity-90" />

                        {/* Top Rank Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A182E]/85 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                            <span className="text-amber-400">★</span> Rank #{student.rank}
                          </span>
                        </div>

                        {/* Floating Score Badge */}
                        <div className="absolute bottom-3 right-3 text-right">
                          <div className="inline-block rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-lg border border-slate-100">
                            <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
                              ICSE SCORE
                            </span>
                            <span className="font-serif font-black text-xl text-[#0A2540] leading-none">
                              {student.score}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content Info */}
                      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                              {student.badgeText}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-600">
                              Distinction
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mt-1">
                            {student.name}
                          </h3>

                          <p className="text-xs text-slate-500 mt-1">
                            Class 10 Board Examination · 2025
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                          <span>Baldwin Girls' High School</span>
                          <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                            Full Merit →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : /* MODERN LUXE CHAMPION CARDS */
                championItems.map((champ) => (
                  <div
                    key={champ.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{ width: `${100 / visibleCards}%` }}
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
            const targetSlide = Math.round(idx * (maxSlide / (Math.min(10, maxSlide + 1) - 1 || 1)));
            const isActive = Math.abs(currentSlide - targetSlide) <= Math.ceil(maxSlide / 10);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(targetSlide)}
                aria-label={`Go to section ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-8 h-2 bg-[#0C2340]"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
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
