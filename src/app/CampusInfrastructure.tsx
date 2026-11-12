import React, { useState, useEffect } from "react";
import { Link } from "react-router";

interface FacilityItem {
  id: string;
  name: string;
  type: "INDOOR" | "OUTDOOR";
  badge: string;
  subtitle: string;
  image: string;
  categoryIcon: string;
}

export default function CampusInfrastructure() {
  const [activeTab, setActiveTab] = useState<"indoor" | "outdoor">("outdoor");
  const [currentSlide, setCurrentSlide] = useState(0);

  // INDOOR Facilities (11 requested items):
  // boardingfacility, library, physics lab, dining hall, auditorium, bio lab, junior library, chem lab, robotics lab, comp lab, infirmary
  const indoorFacilities: FacilityItem[] = [
    {
      id: "in-1",
      name: "Boarding Facility",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Secure & Nurturing Residential Quarters",
      image: "/campus-boarding.jpg",
      categoryIcon: "bed",
    },
    {
      id: "in-2",
      name: "Senior Library",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Extensive Academic Resource Center & Reading Hall",
      image: "/campus-library.jpg",
      categoryIcon: "book",
    },
    {
      id: "in-3",
      name: "Physics Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Optics, Mechanics & Advanced Experiments Studio",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "lab",
    },
    {
      id: "in-4",
      name: "Hostel Dining Hall",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Hygienic Multi-Cuisine Meal Service Area",
      image: "/campus-dininghall.jpg",
      categoryIcon: "utensils",
    },
    {
      id: "in-5",
      name: "School Auditorium",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Acoustic Multi-Purpose Theater & Assembly Hall",
      image: "/campus-auditorium.jpg",
      categoryIcon: "stage",
    },
    {
      id: "in-6",
      name: "Biology Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Microscopy & Life Sciences Specimen Studio",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "bio",
    },
    {
      id: "in-7",
      name: "Junior Library",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Early Reading & Illustrated Storybooks Wing",
      image: "/campus-library.jpg",
      categoryIcon: "book-open",
    },
    {
      id: "in-8",
      name: "Chemistry Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Fume-Protected Chemical Apparatus & Analysis Station",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "flask",
    },
    {
      id: "in-9",
      name: "Robotics & AI Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "STEM Automation, Coding & IoT Workspace",
      image: "/bghs-events.png",
      categoryIcon: "cpu",
    },
    {
      id: "in-10",
      name: "Computer Lab",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "High-Speed Computing & Digital Literacy Hub",
      image: "/campus-sciencelab.jpg",
      categoryIcon: "monitor",
    },
    {
      id: "in-11",
      name: "School Infirmary",
      type: "INDOOR",
      badge: "INDOOR",
      subtitle: "Full-Time Medical Care & First Aid Sanctuary",
      image: "/campus-infirmary.jpg",
      categoryIcon: "medical",
    },
  ];

  // OUTDOOR Facilities (5 requested items):
  // basketball court, cycle parking, swimming pool, school transport, playground
  const outdoorFacilities: FacilityItem[] = [
    {
      id: "out-1",
      name: "Swimming Pool",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Olympic-Dimension Aquatics Center",
      image: "/bghs-swimming.png",
      categoryIcon: "water",
    },
    {
      id: "out-2",
      name: "School Transport",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Comprehensive GPS-Monitored Bus Fleet",
      image: "/campus-parking.jpg",
      categoryIcon: "bus",
    },
    {
      id: "out-3",
      name: "Playground & Athletics",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Expansive Lush Athletics & Sports Grounds",
      image: "/campus-playground.jpg",
      categoryIcon: "flag",
    },
    {
      id: "out-4",
      name: "Basketball Court",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "FIBA-Spec Hardcourt with Floodlit Arenas",
      image: "/bghs-sports-hero.png",
      categoryIcon: "basketball",
    },
    {
      id: "out-5",
      name: "Cycle Parking & Campus",
      type: "OUTDOOR",
      badge: "OUTDOOR",
      subtitle: "Organized Eco-Commute Bays & Walkways",
      image: "/campus-garden.jpg",
      categoryIcon: "cycle",
    },
  ];

  const currentList = activeTab === "indoor" ? indoorFacilities : outdoorFacilities;

  // Responsive cards count
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 880) setCardsPerView(2);
      else if (window.innerWidth < 1200) setCardsPerView(3);
      else setCardsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, currentList.length - cardsPerView);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxSlide, activeTab]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  return (
    <section className="relative overflow-hidden bg-[#781428] text-white py-20 sm:py-24">
      {/* Background Architectural & School Illustration Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
        {/* Floating Protractor / Compass SVG */}
        <svg
          className="absolute top-10 left-12 w-28 h-28 stroke-white/60 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <path d="M 10 70 A 40 40 0 0 1 90 70 Z" />
          <line x1="50" y1="70" x2="50" y2="60" />
          <line x1="30" y1="70" x2="33" y2="63" />
          <line x1="70" y1="70" x2="67" y2="63" />
          <line x1="10" y1="70" x2="90" y2="70" />
        </svg>

        {/* Floating Ruler / Notepad Doodle */}
        <svg
          className="absolute top-12 left-1/4 w-16 h-20 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 60 80"
        >
          <rect x="5" y="5" width="50" height="70" rx="4" />
          <line x1="15" y1="20" x2="45" y2="20" />
          <line x1="15" y1="35" x2="45" y2="35" />
          <line x1="15" y1="50" x2="35" y2="50" />
        </svg>

        {/* Whistle / Stopwatch Doodle */}
        <svg
          className="absolute bottom-16 left-16 w-24 h-24 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="55" r="30" />
          <line x1="50" y1="25" x2="50" y2="15" />
          <rect x="42" y="10" width="16" height="5" rx="1" />
          <line x1="50" y1="55" x2="65" y2="45" />
        </svg>

        {/* Science Flask Doodle */}
        <svg
          className="absolute top-16 right-20 w-24 h-28 stroke-white/50 fill-none stroke-[1.5]"
          viewBox="0 0 80 100"
        >
          <path d="M 32 10 L 48 10 L 48 35 L 68 80 A 10 10 0 0 1 58 92 L 22 92 A 10 10 0 0 1 12 80 L 32 35 Z" />
          <line x1="24" y1="70" x2="56" y2="70" />
        </svg>

        {/* Basketball Net / Hoop Doodle */}
        <svg
          className="absolute bottom-12 right-28 w-28 h-28 stroke-white/40 fill-none stroke-[1.5]"
          viewBox="0 0 100 100"
        >
          <rect x="20" y="20" width="60" height="40" rx="3" />
          <rect x="35" y="35" width="30" height="25" />
          <ellipse cx="50" cy="65" rx="15" ry="5" />
          <path d="M 35 65 L 42 85 L 58 85 L 65 65" />
        </svg>

        {/* Ambient Gradient Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Top Header Block matching the reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          {/* Main Headline with Triple Spark Dash */}
          <div className="lg:col-span-5">
            {/* Spark Dash Graphic */}
            <div className="flex items-center gap-1 mb-3">
              <span className="w-1.5 h-3.5 bg-amber-300 rounded-full rotate-[-20deg]" />
              <span className="w-1.5 h-4.5 bg-amber-300 rounded-full" />
              <span className="w-1.5 h-3.5 bg-amber-300 rounded-full rotate-[20deg]" />
            </div>

            <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-white">
              Campus
              <br />
              Infrastructure
            </h2>

            <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
              Baldwin's infrastructure is designed to inspire learning, encourage exploration
              and create opportunities to thrive. Our world-class indoor and outdoor spaces
              are a hub where potential takes shape.
            </p>
          </div>

          {/* Right Controls: Pill Category Switcher */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end justify-end h-full">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300/90 mb-3">
              CAMPUS INFRASTRUCTURE
            </span>

            {/* Segmented Pill Toggle */}
            <div className="inline-flex rounded-full bg-[#520C1A]/80 p-1.5 border border-white/10 shadow-lg backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("indoor");
                  setCurrentSlide(0);
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "indoor"
                    ? "bg-[#F3C44E] text-[#520C1A] shadow-md font-extrabold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                </svg>
                <span>INDOOR {indoorFacilities.length}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("outdoor");
                  setCurrentSlide(0);
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === "outdoor"
                    ? "bg-[#F3C44E] text-[#520C1A] shadow-md font-extrabold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span>OUTDOOR {outdoorFacilities.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-header Bar: Showing Count & Arrows (e.g. "Showing 5 Outdoor Campus Spaces   03 / 05  <  >") */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5 mb-8 text-xs text-white/75">
          <span className="font-medium tracking-wide">
            Showing {currentList.length} {activeTab === "indoor" ? "Indoor" : "Outdoor"} Campus Spaces
          </span>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/90">
              {String(Math.min(currentSlide + 1, currentList.length)).padStart(2, "0")} /{" "}
              {String(currentList.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous facility"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next facility"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all active:scale-95 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
            }}
          >
            {currentList.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#570B1B] border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/40">
                  {/* Photo Container with subtle dark overlay */}
                  <div className="relative aspect-[4/5.2] w-full overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Uniform contrast gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

                    {/* Top Left Tag: Pill Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#FCD34D] border border-white/10 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        {item.badge}
                      </span>
                    </div>

                    {/* Top Right Mini Utility Icon */}
                    <div className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 backdrop-blur-md text-white/80 border border-white/10">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                      </svg>
                    </div>

                    {/* Enhanced Bottom Foreground Content with optimal contrast & typography */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-12">
                      <div className="pr-1">
                        <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-amber-300 uppercase mb-1 drop-shadow">
                          Baldwin Campus
                        </span>
                        <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-normal leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-white/80 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Circular Arrow Button with smooth hover effect */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 group-hover:bg-[#F3C44E] group-hover:text-[#520C1A] group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:scale-105">
                        <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 flex justify-center items-center gap-1.5">
          {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? "w-8 h-2 bg-[#F3C44E]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

