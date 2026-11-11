import React, { useState, useEffect, useRef, TouchEvent } from "react";

interface Alumna {
  id: number;
  name: string;
  role: string;
  category: "Leadership & Business" | "Cinema & Arts" | "Royalty & Aviation" | "Sports Laureate";
  image?: string;
  initials: string;
}

export default function DistinguishedAlumniWall() {
  const alumni: Alumna[] = [
    {
      id: 1,
      name: "Akshatha Murthy",
      role: "Businesswoman, fashion designer, venture capitalist and wife of UK's prime minister, Rishi Sunak",
      category: "Leadership & Business",
      image: "/alumni-akshatha.jpg",
      initials: "AM",
    },
    {
      id: 2,
      name: "Aindrita Ray",
      role: "Indian Actress & Model",
      category: "Cinema & Arts",
      image: "/alumni-aindrita.jpg",
      initials: "AR",
    },
    {
      id: 3,
      name: "Shobhna Samarth",
      role: "Pioneering Indian Director and Acclaimed Actress",
      category: "Cinema & Arts",
      image: "/alumni-shobhna.jpg",
      initials: "SS",
    },
    {
      id: 4,
      name: "Kriti Kharbanda",
      role: "Prominent Indian Film Actress & Model",
      category: "Cinema & Arts",
      image: "/alumni-kriti.jpg",
      initials: "KK",
    },
    {
      id: 5,
      name: "Shubra Aiyappa",
      role: "Indian Film Actress & Model",
      category: "Cinema & Arts",
      image: "/alumni-shubra.jpg",
      initials: "SA",
    },
    {
      id: 6,
      name: "Sapthami Gowda",
      role: "Indian Actress (Kantara) & Former Competitive Swimmer",
      category: "Cinema & Arts",
      image: "/alumni-sapthami.jpg",
      initials: "SG",
    },
    {
      id: 7,
      name: "Chaitra Vasudevan",
      role: "Indian Actress, Anchor, Producer & Media Entrepreneur",
      category: "Cinema & Arts",
      initials: "CV",
    },
    {
      id: 8,
      name: "Trishikha Wodeyar",
      role: "Maharani of Mysore, Wife of Yaduveer Krishnadatta Chamaraja Wadiyar",
      category: "Royalty & Aviation",
      initials: "TW",
    },
    {
      id: 9,
      name: "Audrey Maben",
      role: "India's first woman microlight flight instructor & Aviation Pioneer",
      category: "Royalty & Aviation",
      initials: "AM",
    },
    {
      id: 10,
      name: "Christine Brown",
      role: "Member of the relay team that won India's first gold at the Asian Games (1984)",
      category: "Sports Laureate",
      initials: "CB",
    },
    {
      id: 11,
      name: "Nirupama Sunderraj",
      role: "Co-founder of ALTFIT, Commonwealth Games 2010 Athlete, 16x National Gold Medalist",
      category: "Sports Laureate",
      image: "/bghs-swimming.png",
      initials: "NS",
    },
    {
      id: 12,
      name: "Loraine Verghese",
      role: "International Marathon Swimmer & English Channel Swimmer",
      category: "Sports Laureate",
      image: "/bghs-sports-hero.png",
      initials: "LV",
    },
    {
      id: 13,
      name: "Natasha Sagar",
      role: "CEO of THAP, Winner of 12 national medals & holder of 2 national records in Asian Grand Prix",
      category: "Sports Laureate",
      image: "/story1.png",
      initials: "NS",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(1);

  // Responsive items visible: 4 on desktop, 3 on tablet, 2 on small tablet, 1 on mobile
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 900) setVisibleCount(2);
      else if (window.innerWidth < 1200) setVisibleCount(3);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, alumni.length - visibleCount);

  // Auto self-sliding carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex, isPaused]);

  // Touch Swipe Handling for mobile & tablet
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 45;

  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setIsPaused(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section
      className="relative overflow-hidden bg-[#070F1E] text-white py-20 sm:py-24 border-t border-[#132238]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle radial ambient backdrop glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Top Header Block matching reference */}
        <div className="max-w-3xl mb-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#182337] border border-[#273B5B] px-3.5 py-1.5 shadow-sm mb-4">
            <svg className="w-3.5 h-3.5 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 9L12 4.34 20.55 9 12 13.66 3.45 9zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#F3BA4F] uppercase font-sans">
              LEGACY OF BALDWIN GIRLS
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
            Distinguished Alumni Wall
          </h2>

          {/* Accent Color Bar */}
          <div className="w-14 h-1 bg-gradient-to-r from-[#1D4ED8] via-[#EAB308] to-[#EF4444] rounded-full mb-5" />

          {/* Editorial Paragraph */}
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            The Baldwin legacy of achievement lives on through our illustrious alumnae. From visionary
            entrepreneurs and celebrated filmmakers to pioneer aviators and international sportspersons,
            our women carry the spirit of "Loyalty and Service" from their school days into global leadership.
          </p>
        </div>

        {/* Carousel Header Controls (Arrows above cards matching screenshot) */}
        <div className="flex items-center justify-end gap-2.5 mb-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Alumni"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132238] hover:bg-[#1E3352] text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Alumni"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132238] hover:bg-[#1E3352] text-white/80 hover:text-white border border-white/10 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Swipable Carousel Track */}
        <div
          className="relative overflow-hidden py-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {alumni.map((alumna) => {
              const isSelected = selectedId === alumna.id;
              return (
                <div
                  key={alumna.id}
                  className="shrink-0 px-2.5 sm:px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div
                    onClick={() => setSelectedId(alumna.id)}
                    className={`group relative flex flex-col h-full rounded-2xl bg-[#0D182B] p-3.5 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? "border-[#2563EB] shadow-[0_0_25px_rgba(37,99,235,0.35)] ring-1 ring-[#3B82F6]"
                        : "border-[#1E2D45] hover:border-[#334D77] hover:shadow-lg"
                    }`}
                  >
                    {/* Portrait Photo Container with subtle monochrome/grayscale tint on resting state */}
                    <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-xl bg-[#08101E]">
                      {alumna.image ? (
                        <img
                          src={alumna.image}
                          alt={alumna.name}
                          className="h-full w-full object-cover object-top filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        /* Sophisticated Monogram Badge for alumnae without public domain photographs */
                        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#121E36] via-[#0E1729] to-[#070D18] p-4 text-center">
                          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#1C2C4E] border border-[#2E4675] text-[#93C5FD] font-serif font-black text-2xl shadow-inner mb-3 group-hover:border-[#60A5FA] group-hover:scale-110 transition-all">
                            {alumna.initials}
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EAB308] text-[9px] text-black font-black">
                              ★
                            </span>
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            Baldwin Alumna
                          </span>
                        </div>
                      )}

                      {/* Number Rank Tag */}
                      <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white font-mono">
                        {alumna.id}
                      </div>

                      {/* Subtle Bottom Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D182B] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Card Content & Text */}
                    <div className="pt-4 pb-2 px-1 flex flex-col justify-between flex-1">
                      <div>
                        {/* Alumna Name */}
                        <h3 className="font-bold text-base sm:text-[17px] text-white group-hover:text-[#60A5FA] transition-colors tracking-tight">
                          {alumna.name}
                        </h3>

                        {/* Category Tag */}
                        <p className="text-[10px] sm:text-[11px] font-semibold text-[#F59E0B] tracking-wider uppercase mt-0.5">
                          {alumna.category}
                        </p>

                        {/* Role & Achievement Paragraph */}
                        <p className="text-xs text-[#94A3B8] leading-relaxed mt-2.5 line-clamp-3">
                          {alumna.role}
                        </p>
                      </div>

                      {/* Footer Badge */}
                      <div className="mt-4 pt-2.5 border-t border-[#1C2C47] flex items-center justify-between text-[11px]">
                        <span className="text-[#64748B]">BGHS Alumna</span>
                        <span className="font-semibold text-[#60A5FA] group-hover:translate-x-0.5 transition-transform">
                          Roll of Honour →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 flex justify-center items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-8 h-2 bg-[#EAB308]"
                  : "w-2 h-2 bg-[#334155] hover:bg-[#64748B]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

